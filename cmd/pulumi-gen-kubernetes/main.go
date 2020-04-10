// Copyright 2016-2018, Pulumi Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path"
	"path/filepath"
	"strings"
	"text/template"

	"github.com/pkg/errors"
	gogen "github.com/pulumi/pulumi/pkg/codegen/go"
	nodejsgen "github.com/pulumi/pulumi/pkg/codegen/nodejs"
	"github.com/pulumi/pulumi/pkg/codegen/schema"
	"github.com/pulumi/pulumi/sdk/go/common/tools"
	"github.com/pulumi/pulumi/sdk/go/common/util/contract"

	"github.com/pulumi/pulumi-kubernetes/pkg/gen"
)

// This is the URL for the v1.17.0 swagger spec. This is the last version of the spec containing the following
// deprecated resources:
// - extensions/v1beta1/*
// - apps/v1beta1/*
// - apps/v1beta2/*
// Since these resources will continue to be important to users for the foreseeable future, we will merge in
// newer specs on top of this spec so that these resources continue to be available in our SDKs.
const Swagger117Url = "https://raw.githubusercontent.com/kubernetes/kubernetes/v1.17.0/api/openapi-spec/swagger.json"
const Swagger117FileName = "swagger-v1.17.0.json"

func main() {
	if len(os.Args) < 5 {
		log.Fatal("Usage: gen <language> <swagger-file> <template-dir> <out-dir>")
	}

	language := os.Args[1]

	swagger, err := ioutil.ReadFile(os.Args[2])
	if err != nil {
		panic(err)
	}

	swaggerDir := filepath.Dir(os.Args[2])

	legacySwaggerPath := filepath.Join(swaggerDir, Swagger117FileName)
	err = DownloadFile(legacySwaggerPath, Swagger117Url)
	if err != nil {
		panic(err)
	}
	legacySwagger, err := ioutil.ReadFile(legacySwaggerPath)
	if err != nil {
		panic(err)
	}
	mergedSwagger := mergeSwaggerSpecs(legacySwagger, swagger)
	data := mergedSwagger.(map[string]interface{})

	templateDir := os.Args[3]
	outdir := fmt.Sprintf("%s/%s", os.Args[4], language)

	switch language {
	case "nodejs":
		writeNodeJSClient(data, outdir, templateDir)
	case "python":
		writePythonClient(data, outdir, templateDir)
	case "dotnet":
		writeDotnetClient(data, outdir, templateDir)
	case "go":
		writeGoClient(data, outdir)
	case "schema":
		if err := writePulumiSchema(data, outdir); err != nil {
			panic(err)
		}
	default:
		panic(fmt.Sprintf("Unrecognized language '%s'", language))
	}
}

func writeNodeJSClient(data map[string]interface{}, outdir, templateDir string) {
	pkg := genPulumiSchemaPackage(data)

	languageResources := nodejsgen.LanguageResources(pkg)

	// TODO: generate overlay files

	nodejsPath, err := ioutil.ReadFile(filepath.Join(templateDir, "path.ts"))
	if err != nil {
		panic(err)
	}
	nodejsTests := `
import * as assert from "assert";
import * as path from "../path";

describe("path.quoteWindowsPath", () => {
    it("escapes Windows path with drive prefix correctly", () => {
        const p = path.quoteWindowsPath("C:\\Users\\grace hopper\\AppData\\Local\\Temp");
        assert.strictEqual(p, "C:\\Users\\grace hopper\\AppData\\Local\\Temp");
    });
    it("escapes Windows path with no drive prefix correctly", () => {
        const p = path.quoteWindowsPath("\\Users\\grace hopper\\AppData\\Local\\Temp");
        assert.strictEqual(p, "\\Users\\grace hopper\\AppData\\Local\\Temp");
    });
    it("escapes relative Windows path correctly", () => {
        const p = path.quoteWindowsPath("Users\\grace hopper\\AppData\\Local\\Temp");
        assert.strictEqual(p, "Users\\grace hopper\\AppData\\Local\\Temp");
    });
    it("escapes Windows repo URL correctly", () => {
        const p = path.quoteWindowsPath("https\://gcsweb.istio.io/gcs/istio-release/releases/1.1.2/charts/");
        assert.strictEqual(p, "https://gcsweb.istio.io/gcs/istio-release/releases/1.1.2/charts/");
    });
});
`

	type nodePackageInfo struct {
		// Map from module -> package name
		//
		//    { "flowcontrol.apiserver.k8s.io/v1alpha1": "flowcontrol/v1alpha1" }
		//
		ModuleToPackage map[string]string `json:"moduleToPackage,omitempty"`
	}
	// Decode node-specific info
	var info nodePackageInfo
	if node, ok := pkg.Language["nodejs"]; ok {
		if err := json.Unmarshal(node, &info); err != nil {
			panic(err)
		}
	}

	b, err := ioutil.ReadFile(filepath.Join(templateDir, "yaml.tmpl"))
	if err != nil {
		panic(err)
	}
	funcMap := template.FuncMap{
		"toGVK": func(s string) string {
			parts := strings.Split(s, ":")
			contract.Assert(len(parts) == 3)
			gvk := parts[1] + "/" + parts[2]
			return strings.TrimPrefix(gvk, "core/")
		},
	}
	t := template.Must(template.New("resources").Funcs(funcMap).Parse(string(b)))

	// Execute the template for each recipient.
	var buf bytes.Buffer
	err = t.Execute(&buf, languageResources)
	if err != nil {
		panic(err)
	}

	overlays := map[string][]byte{
		"path.ts":       nodejsPath,
		"tests/path.ts": []byte(nodejsTests),
		"yaml/yaml.ts":  buf.Bytes(),
	}
	files, err := nodejsgen.GeneratePackage("pulumigen", pkg, overlays)
	if err != nil {
		panic(err)
	}
	for filename, contents := range files {
		path := filepath.Join(outdir, filename)

		if err = os.MkdirAll(filepath.Dir(path), 0755); err != nil {
			panic(err)
		}
		err := ioutil.WriteFile(path, contents, 0644)
		if err != nil {
			panic(err)
		}
	}

	//inputAPIts, ouputAPIts, indexts, yamlts, packagejson, groupsts, err := gen.NodeJSClient(
	//	data, templateDir)
	//if err != nil {
	//	panic(err)
	//}
	//
	//err = os.MkdirAll(outdir, 0700)
	//if err != nil {
	//	panic(err)
	//}
	//
	//typesDir := fmt.Sprintf("%s/types", outdir)
	//err = os.MkdirAll(typesDir, 0700)
	//if err != nil {
	//	panic(err)
	//}
	//
	//err = ioutil.WriteFile(fmt.Sprintf("%s/input.ts", typesDir), []byte(inputAPIts), 0777)
	//if err != nil {
	//	panic(err)
	//}
	//
	//err = ioutil.WriteFile(fmt.Sprintf("%s/output.ts", typesDir), []byte(ouputAPIts), 0777)
	//if err != nil {
	//	panic(err)
	//}
	//
	//err = ioutil.WriteFile(fmt.Sprintf("%s/yaml/yaml.ts", outdir), []byte(yamlts), 0777)
	//if err != nil {
	//	panic(err)
	//}
	//
	//for groupName, group := range groupsts {
	//	groupDir := fmt.Sprintf("%s/%s", outdir, groupName)
	//	err = os.MkdirAll(groupDir, 0700)
	//	if err != nil {
	//		panic(err)
	//	}
	//
	//	for versionName, version := range group.Versions {
	//		versionDir := fmt.Sprintf("%s/%s", groupDir, versionName)
	//		err = os.MkdirAll(versionDir, 0700)
	//		if err != nil {
	//			panic(err)
	//		}
	//
	//		for kindName, kind := range version.Kinds {
	//			err = ioutil.WriteFile(fmt.Sprintf("%s/%s.ts", versionDir, kindName), []byte(kind), 0777)
	//			if err != nil {
	//				panic(err)
	//			}
	//		}
	//
	//		err = ioutil.WriteFile(fmt.Sprintf("%s/%s.ts", versionDir, "index"), []byte(version.Index), 0777)
	//		if err != nil {
	//			panic(err)
	//		}
	//	}
	//
	//	err = ioutil.WriteFile(fmt.Sprintf("%s/%s.ts", groupDir, "index"), []byte(group.Index), 0777)
	//	if err != nil {
	//		panic(err)
	//	}
	//}
	//
	//err = ioutil.WriteFile(fmt.Sprintf("%s/index.ts", outdir), []byte(indexts), 0777)
	//if err != nil {
	//	panic(err)
	//}
	//
	//err = ioutil.WriteFile(fmt.Sprintf("%s/package.json", outdir), []byte(packagejson), 0777)
	//if err != nil {
	//	panic(err)
	//}
	//
	//err = CopyFile(
	//	filepath.Join(templateDir, "CustomResource.ts"), filepath.Join(outdir, "apiextensions", "CustomResource.ts"))
	//if err != nil {
	//	panic(err)
	//}
	//
	//err = CopyFile(filepath.Join(templateDir, "README.md"), filepath.Join(outdir, "README.md"))
	//if err != nil {
	//	panic(err)
	//}
	//
	//err = CopyDir(filepath.Join(templateDir, "helm"), filepath.Join(outdir, "helm"))
	//if err != nil {
	//	panic(err)
	//}
	//fmt.Printf("%s/package.json\n", outdir)
	//fmt.Println(err)
}

func writePythonClient(data map[string]interface{}, outdir, templateDir string) {
	sdkDir := filepath.Join(outdir, "pulumi_kubernetes")

	err := gen.PythonClient(data, templateDir,
		func(initPy string) error {
			return ioutil.WriteFile(filepath.Join(sdkDir, "__init__.py"), []byte(initPy), 0777)
		},
		func(group, initPy string) error {
			destDir := filepath.Join(sdkDir, group)

			err := os.MkdirAll(destDir, 0700)
			if err != nil {
				return err
			}

			return ioutil.WriteFile(filepath.Join(destDir, "__init__.py"), []byte(initPy), 0777)
		},
		func(crBytes string) error {
			destDir := filepath.Join(sdkDir, "apiextensions")

			err := os.MkdirAll(destDir, 0700)
			if err != nil {
				return err
			}

			return ioutil.WriteFile(
				filepath.Join(destDir, "CustomResource.py"),
				[]byte(crBytes), 0777)
		},
		func(group, version, initPy string) error {
			destDir := filepath.Join(sdkDir, group, version)

			err := os.MkdirAll(destDir, 0700)
			if err != nil {
				return err
			}

			return ioutil.WriteFile(filepath.Join(destDir, "__init__.py"), []byte(initPy), 0777)
		},
		func(group, version, kind, kindPy string) error {
			destDir := filepath.Join(sdkDir, group, version, fmt.Sprintf("%s.py", kind))
			return ioutil.WriteFile(destDir, []byte(kindPy), 0777)
		},
		func(casingPy string) error {
			destDir := filepath.Join(sdkDir, "tables.py")
			return ioutil.WriteFile(destDir, []byte(casingPy), 0777)
		},
		func(yamlPy string) error {
			destDir := filepath.Join(sdkDir, "yaml.py")
			return ioutil.WriteFile(destDir, []byte(yamlPy), 0777)
		})
	if err != nil {
		panic(err)
	}

	err = CopyDir(filepath.Join(templateDir, "helm"), filepath.Join(sdkDir, "helm"))
	if err != nil {
		panic(err)
	}

	err = CopyFile(filepath.Join(templateDir, "README.md"), filepath.Join(sdkDir, "README.md"))
	if err != nil {
		panic(err)
	}
}

func writeDotnetClient(data map[string]interface{}, outdir, templateDir string) {

	inputAPIcs, ouputAPIcs, yamlcs, kindsCs, err := gen.DotnetClient(data, templateDir)
	if err != nil {
		panic(err)
	}

	err = os.MkdirAll(outdir, 0700)
	if err != nil {
		panic(err)
	}

	typesDir := fmt.Sprintf("%s/Types", outdir)
	err = os.MkdirAll(typesDir, 0700)
	if err != nil {
		panic(err)
	}

	err = ioutil.WriteFile(fmt.Sprintf("%s/Input.cs", typesDir), []byte(inputAPIcs), 0777)
	if err != nil {
		panic(err)
	}

	err = ioutil.WriteFile(fmt.Sprintf("%s/Output.cs", typesDir), []byte(ouputAPIcs), 0777)
	if err != nil {
		panic(err)
	}

	err = ioutil.WriteFile(fmt.Sprintf("%s/Yaml/Yaml.cs", outdir), []byte(yamlcs), 0777)
	if err != nil {
		panic(err)
	}

	for path, contents := range kindsCs {
		filename := filepath.Join(outdir, path)
		err := os.MkdirAll(filepath.Dir(filename), 0700)
		if err != nil {
			panic(err)
		}
		err = ioutil.WriteFile(filename, []byte(contents), 0777)
		if err != nil {
			panic(err)
		}
	}

	err = CopyFile(filepath.Join(templateDir, "README.md"), filepath.Join(outdir, "README.md"))
	if err != nil {
		panic(err)
	}

	err = CopyFile(filepath.Join(templateDir, "Utilities.cs"), filepath.Join(outdir, "Utilities.cs"))
	if err != nil {
		panic(err)
	}

	err = CopyFile(filepath.Join(templateDir, "Provider.cs"), filepath.Join(outdir, "Provider.cs"))
	if err != nil {
		panic(err)
	}

	err = CopyFile(filepath.Join(templateDir, "logo.png"), filepath.Join(outdir, "logo.png"))
	if err != nil {
		panic(err)
	}

	err = CopyFile(
		filepath.Join(templateDir, "Pulumi.Kubernetes.csproj"), filepath.Join(outdir, "Pulumi.Kubernetes.csproj"))
	if err != nil {
		panic(err)
	}
}

func writeGoClient(data map[string]interface{}, outdir string) {
	pkg := genPulumiSchemaPackage(data)
	files, err := gogen.GeneratePackage("pulumigen", pkg)
	if err != nil {
		panic(err)
	}
	for filename, contents := range files {
		path := filepath.Join(outdir, filename)

		if err = os.MkdirAll(filepath.Dir(path), 0755); err != nil {
			panic(err)
		}
		err := ioutil.WriteFile(path, contents, 0644)
		if err != nil {
			panic(err)
		}
	}
}

func genPulumiSchemaPackage(data map[string]interface{}) *schema.Package {
	pkgSpec := gen.PulumiSchema(data)

	pkg, err := schema.ImportSpec(pkgSpec)
	if err != nil {
		panic(err)
	}
	return pkg
}

func writePulumiSchema(data map[string]interface{}, outDir string) error {
	pkgSpec := gen.PulumiSchema(data)
	schema, err := json.MarshalIndent(pkgSpec, "", "    ")
	if err != nil {
		return errors.Wrap(err, "marshaling Pulumi schema")
	}

	if err := emitFile(outDir, "schema.json", schema); err != nil {
		return errors.Wrap(err, "emitting schema.json")
	}
	return nil
}

func emitFile(outDir, relPath string, contents []byte) error {
	p := path.Join(outDir, relPath)
	if err := tools.EnsureDir(path.Dir(p)); err != nil {
		return errors.Wrap(err, "creating directory")
	}

	f, err := os.Create(p)
	if err != nil {
		return errors.Wrap(err, "creating file")
	}
	defer contract.IgnoreClose(f)

	_, err = f.Write(contents)
	return err
}

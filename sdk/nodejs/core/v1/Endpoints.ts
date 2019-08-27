// *** WARNING: this file was generated by the Pulumi Kubernetes codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import { core } from "../..";
import * as inputs from "../../types/input";
import * as outputs from "../../types/output";
import { getVersion } from "../../version";

    /**
     * Endpoints is a collection of endpoints that implement the actual service. Example:
     *   Name: "mysvc",
     *   Subsets: [
     *     {
     *       Addresses: [{"ip": "10.10.1.1"}, {"ip": "10.10.2.2"}],
     *       Ports: [{"name": "a", "port": 8675}, {"name": "b", "port": 309}]
     *     },
     *     {
     *       Addresses: [{"ip": "10.10.3.3"}],
     *       Ports: [{"name": "a", "port": 93}, {"name": "b", "port": 76}]
     *     },
     *  ]
     */
    export class Endpoints extends pulumi.CustomResource {
      /**
       * APIVersion defines the versioned schema of this representation of an object. Servers should
       * convert recognized schemas to the latest internal value, and may reject unrecognized
       * values. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
       */
      public readonly apiVersion: pulumi.Output<"v1">;

      /**
       * Kind is a string value representing the REST resource this object represents. Servers may
       * infer this from the endpoint the client submits requests to. Cannot be updated. In
       * CamelCase. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
       */
      public readonly kind: pulumi.Output<"Endpoints">;

      /**
       * Standard object's metadata. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
       */
      public readonly metadata: pulumi.Output<outputs.meta.v1.ObjectMeta>;

      /**
       * The set of all endpoints is the union of all subsets. Addresses are placed into subsets
       * according to the IPs they share. A single address with multiple ports, some of which are
       * ready and some of which are not (because they come from different containers) will result
       * in the address being displayed in different subsets for the different ports. No address
       * will appear in both Addresses and NotReadyAddresses in the same subset. Sets of addresses
       * and ports that comprise a service.
       */
      public readonly subsets: pulumi.Output<outputs.core.v1.EndpointSubset[]>;

      /**
       * Get the state of an existing `Endpoints` resource, as identified by `id`.
       * The ID is of the form `[namespace]/<name>`; if `namespace` is omitted, then (per
       * Kubernetes convention) the ID becomes `default/<name>`.
       *
       * Pulumi will keep track of this resource using `name` as the Pulumi ID.
       *
       * @param name _Unique_ name used to register this resource with Pulumi.
       * @param id An ID for the Kubernetes resource to retrieve. Takes the form `[namespace]/<name>`.
       * @param opts Uniquely specifies a CustomResource to select.
       */
      public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): Endpoints {
          return new Endpoints(name, undefined, { ...opts, id: id });
      }

      /** @internal */
      private static readonly __pulumiType = "kubernetes:core/v1:Endpoints";

      /**
       * Returns true if the given object is an instance of Endpoints.  This is designed to work even
       * when multiple copies of the Pulumi SDK have been loaded into the same process.
       */
      public static isInstance(obj: any): obj is Endpoints {
          if (obj === undefined || obj === null) {
              return false;
          }

          return obj["__pulumiType"] === Endpoints.__pulumiType;
      }

      /**
       * Create a core.v1.Endpoints resource with the given unique name, arguments, and options.
       *
       * @param name The _unique_ name of the resource.
       * @param args The arguments to use to populate this resource's properties.
       * @param opts A bag of options that control this resource's behavior.
       */
      constructor(name: string, args?: inputs.core.v1.Endpoints, opts?: pulumi.CustomResourceOptions) {
          const props: pulumi.Inputs = {};

          props["apiVersion"] = "v1";
          props["kind"] = "Endpoints";
          props["metadata"] = args && args.metadata || undefined;
          props["subsets"] = args && args.subsets || undefined;

          props["status"] = undefined;

          if (!opts) {
              opts = {};
          }

          if (!opts.version) {
              opts.version = getVersion();
          }
          super(Endpoints.__pulumiType, name, props, opts);
      }
    }

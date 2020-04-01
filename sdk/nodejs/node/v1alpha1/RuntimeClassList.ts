// *** WARNING: this file was generated by pulumigen. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as inputs from "../../types/input";
import * as outputs from "../../types/output";
import * as utilities from "../../utilities";

/**
 * RuntimeClassList is a list of RuntimeClass objects.
 */
export class RuntimeClassList extends pulumi.CustomResource {
    /**
     * Get an existing RuntimeClassList resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param state Any extra arguments used during the lookup.
     */
    public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): RuntimeClassList {
        return new RuntimeClassList(name, undefined{ ...opts, id: id });
    }

    /** @internal */
    public static readonly __pulumiType = 'kubernetes:node.k8s.io/v1alpha1:RuntimeClassList';

    /**
     * Returns true if the given object is an instance of RuntimeClassList.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is RuntimeClassList {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === RuntimeClassList.__pulumiType;
    }

    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     */
    public readonly apiVersion!: pulumi.Output<string | undefined>;
    /**
     * Items is a list of schema objects.
     */
    public readonly items!: pulumi.Output<outputs.node.v1alpha1.RuntimeClass[] | undefined>;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    public readonly kind!: pulumi.Output<string | undefined>;
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    public readonly metadata!: pulumi.Output<outputs.meta.v1.ListMeta | undefined>;

    /**
     * Create a RuntimeClassList resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args: RuntimeClassListArgs, opts?: pulumi.CustomResourceOptions)
    constructor(name: string, argsOrState?: RuntimeClassListArgs | RuntimeClassListState, opts?: pulumi.CustomResourceOptions) {
        let inputs: pulumi.Inputs = {};
        if (opts && opts.id) {
            const state = argsOrState as RuntimeClassListState | undefined;
            inputs["apiVersion"] = state ? state.apiVersion : undefined;
            inputs["items"] = state ? state.items : undefined;
            inputs["kind"] = state ? state.kind : undefined;
            inputs["metadata"] = state ? state.metadata : undefined;
        } else {
            const args = argsOrState as RuntimeClassListArgs | undefined;
            if (!args || args.items === undefined) {
                throw new Error("Missing required property 'items'");
            }
            inputs["apiVersion"] = (args ? args.apiVersion : undefined) || "node.k8s.io/v1alpha1";
            inputs["items"] = args ? args.items : undefined;
            inputs["kind"] = (args ? args.kind : undefined) || "RuntimeClassList";
            inputs["metadata"] = args ? args.metadata : undefined;
        }
        if (!opts) {
            opts = {}
        }

        if (!opts.version) {
            opts.version = utilities.getVersion();
        }
        super(RuntimeClassList.__pulumiType, name, inputs, opts);
    }
}

/**
 * The set of arguments for constructing a RuntimeClassList resource.
 */
export interface RuntimeClassListArgs {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     */
    readonly apiVersion?: pulumi.Input<string>;
    /**
     * Items is a list of schema objects.
     */
    readonly items: pulumi.Input<pulumi.Input<inputs.node.v1alpha1.RuntimeClass>[]>;
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    readonly kind?: pulumi.Input<string>;
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     */
    readonly metadata?: pulumi.Input<inputs.meta.v1.ListMeta>;
}

// *** WARNING: this file was generated by the Pulumi Kubernetes codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import { core } from "../..";
import * as inputs from "../../types/input";
import * as outputs from "../../types/output";
import { getVersion } from "../../version";

    /**
     * DEPRECATED - This group version of DaemonSet is deprecated by apps/v1beta2/DaemonSet. See the
     * release notes for more information. DaemonSet represents the configuration of a daemon set.
     */
    export class DaemonSet extends pulumi.CustomResource {
      /**
       * APIVersion defines the versioned schema of this representation of an object. Servers should
       * convert recognized schemas to the latest internal value, and may reject unrecognized
       * values. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
       */
      public readonly apiVersion: pulumi.Output<"extensions/v1beta1">;

      /**
       * Kind is a string value representing the REST resource this object represents. Servers may
       * infer this from the endpoint the client submits requests to. Cannot be updated. In
       * CamelCase. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
       */
      public readonly kind: pulumi.Output<"DaemonSet">;

      /**
       * Standard object's metadata. More info:
       * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
       */
      public readonly metadata: pulumi.Output<outputs.meta.v1.ObjectMeta>;

      /**
       * The desired behavior of this daemon set. More info:
       * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
       */
      public readonly spec: pulumi.Output<outputs.extensions.v1beta1.DaemonSetSpec>;

      /**
       * The current status of this daemon set. This data may be out of date by some window of time.
       * Populated by the system. Read-only. More info:
       * https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
       */
      public readonly status: pulumi.Output<outputs.extensions.v1beta1.DaemonSetStatus>;

      /**
       * Get the state of an existing `DaemonSet` resource, as identified by `id`.
       * The ID is of the form `[namespace]/<name>`; if `namespace` is omitted, then (per
       * Kubernetes convention) the ID becomes `default/<name>`.
       *
       * Pulumi will keep track of this resource using `name` as the Pulumi ID.
       *
       * @param name _Unique_ name used to register this resource with Pulumi.
       * @param id An ID for the Kubernetes resource to retrieve. Takes the form `[namespace]/<name>`.
       * @param opts Uniquely specifies a CustomResource to select.
       */
      public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): DaemonSet {
          return new DaemonSet(name, undefined, { ...opts, id: id });
      }

      /** @internal */
      private static readonly __pulumiType = "kubernetes:extensions/v1beta1:DaemonSet";

      /**
       * Returns true if the given object is an instance of DaemonSet.  This is designed to work even
       * when multiple copies of the Pulumi SDK have been loaded into the same process.
       */
      public static isInstance(obj: any): obj is DaemonSet {
          if (obj === undefined || obj === null) {
              return false;
          }

          return obj["__pulumiType"] === DaemonSet.__pulumiType;
      }

      /**
       * Create a extensions.v1beta1.DaemonSet resource with the given unique name, arguments, and options.
       *
       * @param name The _unique_ name of the resource.
       * @param args The arguments to use to populate this resource's properties.
       * @param opts A bag of options that control this resource's behavior.
       */
      constructor(name: string, args?: inputs.extensions.v1beta1.DaemonSet, opts?: pulumi.CustomResourceOptions) {
          const props: pulumi.Inputs = {};

          props["apiVersion"] = "extensions/v1beta1";
          props["kind"] = "DaemonSet";
          props["metadata"] = args && args.metadata || undefined;
          props["spec"] = args && args.spec || undefined;

          props["status"] = undefined;

          if (!opts) {
              opts = {};
          }

          if (!opts.version) {
              opts.version = getVersion();
          }
          super(DaemonSet.__pulumiType, name, props, opts);
      }
    }

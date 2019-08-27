// *** WARNING: this file was generated by the Pulumi Kubernetes codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import { core } from "../..";
import * as inputs from "../../types/input";
import * as outputs from "../../types/output";
import { getVersion } from "../../version";

    /**
     * ClusterRole is a cluster level, logical grouping of PolicyRules that can be referenced as a
     * unit by a RoleBinding or ClusterRoleBinding.
     */
    export class ClusterRole extends pulumi.CustomResource {
      /**
       * AggregationRule is an optional field that describes how to build the Rules for this
       * ClusterRole. If AggregationRule is set, then the Rules are controller managed and direct
       * changes to Rules will be stomped by the controller.
       */
      public readonly aggregationRule: pulumi.Output<outputs.rbac.v1.AggregationRule>;

      /**
       * APIVersion defines the versioned schema of this representation of an object. Servers should
       * convert recognized schemas to the latest internal value, and may reject unrecognized
       * values. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
       */
      public readonly apiVersion: pulumi.Output<"rbac.authorization.k8s.io/v1">;

      /**
       * Kind is a string value representing the REST resource this object represents. Servers may
       * infer this from the endpoint the client submits requests to. Cannot be updated. In
       * CamelCase. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
       */
      public readonly kind: pulumi.Output<"ClusterRole">;

      /**
       * Standard object's metadata.
       */
      public readonly metadata: pulumi.Output<outputs.meta.v1.ObjectMeta>;

      /**
       * Rules holds all the PolicyRules for this ClusterRole
       */
      public readonly rules: pulumi.Output<outputs.rbac.v1.PolicyRule[]>;

      /**
       * Get the state of an existing `ClusterRole` resource, as identified by `id`.
       * The ID is of the form `[namespace]/<name>`; if `namespace` is omitted, then (per
       * Kubernetes convention) the ID becomes `default/<name>`.
       *
       * Pulumi will keep track of this resource using `name` as the Pulumi ID.
       *
       * @param name _Unique_ name used to register this resource with Pulumi.
       * @param id An ID for the Kubernetes resource to retrieve. Takes the form `[namespace]/<name>`.
       * @param opts Uniquely specifies a CustomResource to select.
       */
      public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): ClusterRole {
          return new ClusterRole(name, undefined, { ...opts, id: id });
      }

      /** @internal */
      private static readonly __pulumiType = "kubernetes:rbac.authorization.k8s.io/v1:ClusterRole";

      /**
       * Returns true if the given object is an instance of ClusterRole.  This is designed to work even
       * when multiple copies of the Pulumi SDK have been loaded into the same process.
       */
      public static isInstance(obj: any): obj is ClusterRole {
          if (obj === undefined || obj === null) {
              return false;
          }

          return obj["__pulumiType"] === ClusterRole.__pulumiType;
      }

      /**
       * Create a rbac.v1.ClusterRole resource with the given unique name, arguments, and options.
       *
       * @param name The _unique_ name of the resource.
       * @param args The arguments to use to populate this resource's properties.
       * @param opts A bag of options that control this resource's behavior.
       */
      constructor(name: string, args?: inputs.rbac.v1.ClusterRole, opts?: pulumi.CustomResourceOptions) {
          const props: pulumi.Inputs = {};

          props["aggregationRule"] = args && args.aggregationRule || undefined;
          props["apiVersion"] = "rbac.authorization.k8s.io/v1";
          props["kind"] = "ClusterRole";
          props["metadata"] = args && args.metadata || undefined;
          props["rules"] = args && args.rules || undefined;

          props["status"] = undefined;

          if (!opts) {
              opts = {};
          }

          if (!opts.version) {
              opts.version = getVersion();
          }
          super(ClusterRole.__pulumiType, name, props, opts);
      }
    }

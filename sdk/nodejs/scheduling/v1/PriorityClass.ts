// *** WARNING: this file was generated by the Pulumi Kubernetes codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as inputs from "../../types/input";
import * as outputs from "../../types/output";
import { getVersion } from "../../version";

    /**
     * PriorityClass defines mapping from a priority class name to the priority integer value. The
     * value can be any valid integer.
     */
    export class PriorityClass extends pulumi.CustomResource {
      /**
       * APIVersion defines the versioned schema of this representation of an object. Servers should
       * convert recognized schemas to the latest internal value, and may reject unrecognized
       * values. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
       */
      public readonly apiVersion: pulumi.Output<"scheduling.k8s.io/v1">;

      /**
       * description is an arbitrary string that usually provides guidelines on when this priority
       * class should be used.
       */
      public readonly description: pulumi.Output<string>;

      /**
       * globalDefault specifies whether this PriorityClass should be considered as the default
       * priority for pods that do not have any priority class. Only one PriorityClass can be marked
       * as `globalDefault`. However, if more than one PriorityClasses exists with their
       * `globalDefault` field set to true, the smallest value of such global default
       * PriorityClasses will be used as the default priority.
       */
      public readonly globalDefault: pulumi.Output<boolean>;

      /**
       * Kind is a string value representing the REST resource this object represents. Servers may
       * infer this from the endpoint the client submits requests to. Cannot be updated. In
       * CamelCase. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
       */
      public readonly kind: pulumi.Output<"PriorityClass">;

      /**
       * Standard object's metadata. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
       */
      public readonly metadata: pulumi.Output<outputs.meta.v1.ObjectMeta>;

      /**
       * PreemptionPolicy is the Policy for preempting pods with lower priority. One of Never,
       * PreemptLowerPriority. Defaults to PreemptLowerPriority if unset. This field is alpha-level
       * and is only honored by servers that enable the NonPreemptingPriority feature.
       */
      public readonly preemptionPolicy: pulumi.Output<string>;

      /**
       * The value of this priority class. This is the actual priority that pods receive when they
       * have the name of this class in their pod spec.
       */
      public readonly value: pulumi.Output<number>;

      /**
       * Get the state of an existing `PriorityClass` resource, as identified by `id`.
       * Typically this ID  is of the form <namespace>/<name>; if <namespace> is omitted, then (per
       * Kubernetes convention) the ID becomes default/<name>.
       *
       * Pulumi will keep track of this resource using `name` as the Pulumi ID.
       *
       * @param name _Unique_ name used to register this resource with Pulumi.
       * @param id An ID for the Kubernetes resource to retrieve. Takes the form
       *  <namespace>/<name> or <name>.
       * @param opts Uniquely specifies a CustomResource to select.
       */
      public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): PriorityClass {
          return new PriorityClass(name, undefined, { ...opts, id: id });
      }

      /** @internal */
      private static readonly __pulumiType = "kubernetes:scheduling.k8s.io/v1:PriorityClass";

      /**
       * Returns true if the given object is an instance of PriorityClass.  This is designed to work even
       * when multiple copies of the Pulumi SDK have been loaded into the same process.
       */
      public static isInstance(obj: any): obj is PriorityClass {
          if (obj === undefined || obj === null) {
              return false;
          }

          return obj["__pulumiType"] === PriorityClass.__pulumiType;
      }

      /**
       * Create a scheduling.v1.PriorityClass resource with the given unique name, arguments, and options.
       *
       * @param name The _unique_ name of the resource.
       * @param args The arguments to use to populate this resource's properties.
       * @param opts A bag of options that control this resource's behavior.
       */
      constructor(name: string, args?: inputs.scheduling.v1.PriorityClass, opts?: pulumi.CustomResourceOptions) {
          let inputs: pulumi.Inputs = {};
          inputs["apiVersion"] = "scheduling.k8s.io/v1";
          inputs["description"] = args && args.description || undefined;
          inputs["globalDefault"] = args && args.globalDefault || undefined;
          inputs["kind"] = "PriorityClass";
          inputs["metadata"] = args && args.metadata || undefined;
          inputs["preemptionPolicy"] = args && args.preemptionPolicy || undefined;
          inputs["value"] = args && args.value || undefined;

          if (!opts) {
              opts = {};
          }

          if (!opts.version) {
              opts.version = getVersion();
          }
          super(PriorityClass.__pulumiType, name, inputs, opts);
      }
    }

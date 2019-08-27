// *** WARNING: this file was generated by the Pulumi Kubernetes codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import { core } from "../..";
import * as inputs from "../../types/input";
import * as outputs from "../../types/output";
import { getVersion } from "../../version";

    /**
     * TokenReview attempts to authenticate a token to a known user. Note: TokenReview requests may
     * be cached by the webhook token authenticator plugin in the kube-apiserver.
     */
    export class TokenReview extends pulumi.CustomResource {
      /**
       * APIVersion defines the versioned schema of this representation of an object. Servers should
       * convert recognized schemas to the latest internal value, and may reject unrecognized
       * values. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
       */
      public readonly apiVersion: pulumi.Output<"authentication.k8s.io/v1beta1">;

      /**
       * Kind is a string value representing the REST resource this object represents. Servers may
       * infer this from the endpoint the client submits requests to. Cannot be updated. In
       * CamelCase. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
       */
      public readonly kind: pulumi.Output<"TokenReview">;

      
      public readonly metadata: pulumi.Output<outputs.meta.v1.ObjectMeta>;

      /**
       * Spec holds information about the request being evaluated
       */
      public readonly spec: pulumi.Output<outputs.authentication.v1beta1.TokenReviewSpec>;

      /**
       * Status is filled in by the server and indicates whether the request can be authenticated.
       */
      public readonly status: pulumi.Output<outputs.authentication.v1beta1.TokenReviewStatus>;

      /**
       * Get the state of an existing `TokenReview` resource, as identified by `id`.
       * The ID is of the form `[namespace]/<name>`; if `namespace` is omitted, then (per
       * Kubernetes convention) the ID becomes `default/<name>`.
       *
       * Pulumi will keep track of this resource using `name` as the Pulumi ID.
       *
       * @param name _Unique_ name used to register this resource with Pulumi.
       * @param id An ID for the Kubernetes resource to retrieve. Takes the form `[namespace]/<name>`.
       * @param opts Uniquely specifies a CustomResource to select.
       */
      public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): TokenReview {
          return new TokenReview(name, undefined, { ...opts, id: id });
      }

      /** @internal */
      private static readonly __pulumiType = "kubernetes:authentication.k8s.io/v1beta1:TokenReview";

      /**
       * Returns true if the given object is an instance of TokenReview.  This is designed to work even
       * when multiple copies of the Pulumi SDK have been loaded into the same process.
       */
      public static isInstance(obj: any): obj is TokenReview {
          if (obj === undefined || obj === null) {
              return false;
          }

          return obj["__pulumiType"] === TokenReview.__pulumiType;
      }

      /**
       * Create a authentication.v1beta1.TokenReview resource with the given unique name, arguments, and options.
       *
       * @param name The _unique_ name of the resource.
       * @param args The arguments to use to populate this resource's properties.
       * @param opts A bag of options that control this resource's behavior.
       */
      constructor(name: string, args?: inputs.authentication.v1beta1.TokenReview, opts?: pulumi.CustomResourceOptions) {
          const props: pulumi.Inputs = {};
          props["spec"] = args && args.spec || undefined;

          props["apiVersion"] = "authentication.k8s.io/v1beta1";
          props["kind"] = "TokenReview";
          props["metadata"] = args && args.metadata || undefined;

          props["status"] = undefined;

          if (!opts) {
              opts = {};
          }

          if (!opts.version) {
              opts.version = getVersion();
          }
          super(TokenReview.__pulumiType, name, props, opts);
      }
    }

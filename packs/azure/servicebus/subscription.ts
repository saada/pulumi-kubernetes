// *** WARNING: this file was generated by the Lumi Terraform Bridge (TFGEN) Tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as lumi from "@lumi/lumi";

export class Subscription extends lumi.NamedResource implements SubscriptionArgs {
    public readonly autoDeleteOnIdle?: string;
    public readonly deadLetteringOnFilterEvaluationExceptions?: boolean;
    public readonly deadLetteringOnMessageExpiration?: boolean;
    public readonly defaultMessageTtl?: string;
    public readonly enableBatchedOperations?: boolean;
    public readonly location: string;
    public readonly lockDuration?: string;
    public readonly maxDeliveryCount: number;
    public readonly _name: string;
    public readonly namespaceName: string;
    public readonly requiresSession?: boolean;
    public readonly resourceGroupName: string;
    public readonly topicName: string;

    constructor(name: string, args: SubscriptionArgs) {
        super(name);
        this.autoDeleteOnIdle = args.autoDeleteOnIdle;
        this.deadLetteringOnFilterEvaluationExceptions = args.deadLetteringOnFilterEvaluationExceptions;
        this.deadLetteringOnMessageExpiration = args.deadLetteringOnMessageExpiration;
        this.defaultMessageTtl = args.defaultMessageTtl;
        this.enableBatchedOperations = args.enableBatchedOperations;
        this.location = args.location;
        this.lockDuration = args.lockDuration;
        this.maxDeliveryCount = args.maxDeliveryCount;
        this._name = args._name;
        this.namespaceName = args.namespaceName;
        this.requiresSession = args.requiresSession;
        this.resourceGroupName = args.resourceGroupName;
        this.topicName = args.topicName;
    }
}

export interface SubscriptionArgs {
    readonly autoDeleteOnIdle?: string;
    readonly deadLetteringOnFilterEvaluationExceptions?: boolean;
    readonly deadLetteringOnMessageExpiration?: boolean;
    readonly defaultMessageTtl?: string;
    readonly enableBatchedOperations?: boolean;
    readonly location: string;
    readonly lockDuration?: string;
    readonly maxDeliveryCount: number;
    readonly _name: string;
    readonly namespaceName: string;
    readonly requiresSession?: boolean;
    readonly resourceGroupName: string;
    readonly topicName: string;
}

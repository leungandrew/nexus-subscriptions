Subscription Type throws an error when building for production.

# Repro steps

```
yarn dev
```

Start a subscription:

```
subscription {
  hello
}
```

Publish an event:

```
query {
  hello
}
```

Observe that the subscription is pushed a payload.

Now that a subscription works with websockets, attempt to run a
production build:

```
yarn build
```

Observe the following output:

```
yarn run v1.22.4
$ nexus build
 522 ● nexus:build get used plugins
● nexus:build starting reflection
● nexus:build building typescript program
● nexus:build compiling a production build
Error: node_modules/@nexus/schema/dist/definitions/subscriptionType.d.ts:31:9 - error TS2416: Property 'list' in type 'SubscriptionDefinitionBlock' is not assignable to the same property in base type 'ObjectDefinitionBlock<"Subscription">'.
  Type 'SubscriptionDefinitionBlock' is not assignable to type 'OutputDefinitionBlock<"Subscription">'.
    Types of property 'field' are incompatible.
      Type '<FieldName extends string>(name: FieldName, fieldConfig: SubscribeFieldConfig<"Subscription", FieldName, any>) => void' is not assignable to type '<FieldName extends string>(name: FieldName, fieldConfig: FieldOutConfig<"Subscription", FieldName>) => void'.
        Types of parameters 'fieldConfig' and 'fieldConfig' are incompatible.
          Type 'FieldOutConfig<"Subscription", FieldName>' is not assignable to type 'SubscribeFieldConfig<"Subscription", FieldName, any>'.
            Type 'NexusOutputFieldConfig<"Subscription", FieldName> | (NexusOutputFieldConfig<"Subscription", FieldName> & { ...; })' is not assignable to type 'SubscribeFieldConfig<"Subscription", FieldName, any>'.
              Property 'subscribe' is missing in type 'NexusOutputFieldConfig<"Subscription", FieldName>' but required in type 'SubscribeFieldConfig<"Subscription", FieldName, any>'.

31     get list(): SubscriptionDefinitionBlock;
           ~~~~

  node_modules/@nexus/schema/dist/definitions/subscriptionType.d.ts:23:5
    23     subscribe(root: object, args: ArgsValue<TypeName, FieldName>, ctx: GetGen<'context'>, info: GraphQLResolveInfo): MaybePromise<AsyncIterator<T>> | MaybePromiseDeep<AsyncIterator<T>>;
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    'subscribe' is declared here.
node_modules/@nexus/schema/dist/definitions/subscriptionType.d.ts:37:5 - error TS2416: Property 'field' in type 'SubscriptionDefinitionBlock' is not assignable to the same property in base type 'ObjectDefinitionBlock<"Subscription">'.
  Type '<FieldName extends string>(name: FieldName, fieldConfig: SubscribeFieldConfig<"Subscription", FieldName, any>) => void' is not assignable to type '<FieldName extends string>(name: FieldName, fieldConfig: FieldOutConfig<"Subscription", FieldName>) => void'.
    Types of parameters 'fieldConfig' and 'fieldConfig' are incompatible.
      Type 'FieldOutConfig<"Subscription", FieldName>' is not assignable to type 'SubscribeFieldConfig<"Subscription", FieldName, any>'.
        Type 'NexusOutputFieldConfig<"Subscription", FieldName> | (NexusOutputFieldConfig<"Subscription", FieldName> & { ...; })' is not assignable to type 'SubscribeFieldConfig<"Subscription", FieldName, any>'.
          Property 'subscribe' is missing in type 'NexusOutputFieldConfig<"Subscription", FieldName>' but required in type 'SubscribeFieldConfig<"Subscription", FieldName, any>'.

37     field<FieldName extends string>(name: FieldName, fieldConfig: SubscribeFieldConfig<'Subscription', FieldName>): void;
       ~~~~~

  node_modules/@nexus/schema/dist/definitions/subscriptionType.d.ts:23:5
    23     subscribe(root: object, args: ArgsValue<TypeName, FieldName>, ctx: GetGen<'context'>, info: GraphQLResolveInfo): MaybePromise<AsyncIterator<T>> | MaybePromiseDeep<AsyncIterator<T>>;
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    'subscribe' is declared here.

    at Object.emitTSProgram (/Users/andrew/workspace/my-nexus-app-9164280524622883/node_modules/nexus/src/lib/tsc.ts:102:11)
    at Object.buildNexusApp (/Users/andrew/workspace/my-nexus-app-9164280524622883/node_modules/nexus/src/lib/build/build.ts:97:3)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
    at Build.parse (/Users/andrew/workspace/my-nexus-app-9164280524622883/node_modules/nexus/src/cli/commands/build.ts:35:5)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

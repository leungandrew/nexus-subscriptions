import { schema } from 'nexus'

schema.subscriptionType({
  definition: (t) => {
    t.field('hello', {
      type: 'String',
      subscribe: async (root, args, ctx) => {
        return ctx.pubsub.asyncIterator('hello')
      },
      resolve: async (payload, args, ctx) => {
        return payload
      },
    })
  },
})

schema.queryType({
  definition: (t) => {
    t.string('hello', {
      resolve: async (root, args, ctx) => {
        ctx.pubsub.publish('hello', 'Hello World')
        return 'Hello'
      },
    })
  },
})

import { use, schema, server, log } from 'nexus'
import { PubSub } from 'graphql-subscriptions'
import { subscriptions } from 'nexus-plugin-subscriptions'
const pubsub = new PubSub()

use(
  subscriptions({
    ws: { server: server.raw.http, path: '/graphql' },
    keepAlive: 10 * 1000,
    onConnect: (payload: Record<string, any>) => {
      log.info('client connected')
      return { pubsub, log }
    },
    onDisconnect: () => {
      log.info('client disconnected')
    },
  }),
)

schema.addToContext(() => {
  return {
    pubsub,
  }
})

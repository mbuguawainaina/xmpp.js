'use strict'

/**
 * References
 * https://xmpp.org/rfcs/rfc6120.html#streams-negotiation Stream Negotiation
 * https://xmpp.org/extensions/xep-0170.html XEP-0170: Recommended Order of Stream Feature Negotiation
 * https://xmpp.org/registrar/stream-features.html XML Stream Features
 */

const route = require('./route')

module.exports = function(middleware) {
  middleware.use(route())

  function use(name, xmlns, handler) {
    return middleware.use((ctx, next) => {
      const {stanza} = ctx
      if (!stanza.is('features', 'http://etherx.jabber.org/streams'))
        return next()
      if (!stanza.getChild(name, xmlns)) return next()
      return handler(ctx, next)
    })
  }

  return {
    use,
  }
}

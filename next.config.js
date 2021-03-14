module.exports = {
  images: {
    domains: ['assets.coinlayer.com']
  },
  webpack(config) {
    config.module.rules.push({
      sideEffects: true,
      test: /react-spring/
    })

    return config
  }
}

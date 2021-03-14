module.exports = {
  webpack(config) {
    config.module.rules.push({
      sideEffects: true,
      test: /react-spring/
    })

    return config
  }
}

module.exports = function override(config, env) {
    // Exclude 'mapbox-gl' from transpilation
    config.module.rules[1].oneOf[2].exclude = /node_modules\/(?!(mapbox-gl)\/).*/;
    return config;
  };
  
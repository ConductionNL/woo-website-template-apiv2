exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "@babel/plugin-transform-react-jsx",
    options: {
      runtime: "automatic",
    },
  });
};

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig();

  if (config.optimization) {
    config.optimization.minimize = false;
  }

  if (stage === "develop" || stage === "build-javascript") {
    const miniCssExtractPlugin = config.plugins?.find(
      (plugin) => plugin.constructor.name === "MiniCssExtractPlugin",
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }
  }

  actions.replaceWebpackConfig(config);
};

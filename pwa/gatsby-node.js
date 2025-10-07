exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "@babel/plugin-transform-react-jsx",
    options: {
      runtime: "automatic",
    },
  });
};

exports.onCreateWebpackConfig = ({ stage, actions, getConfig, plugins }) => {
  if (stage === "develop" || stage === "build-javascript") {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === "MiniCssExtractPlugin",
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }

    const options = {
      minimizerOptions: {
        preset: [
          `default`,
          {
            svgo: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      // Disable plugins that can break SVGs
                      removeViewBox: false, // Keep viewBox for proper scaling
                      removeDimensions: false, // Keep width/height attributes
                      cleanupIds: false, // Prevent ID reference issues
                      removeTitle: false, // Keep titles for accessibility
                      removeDesc: false, // Keep descriptions for accessibility
                    },
                  },
                },
                // Additional safe optimization plugins
                "removeUselessDefs",
                "cleanupAttrs",
                "cleanupEnableBackground",
                "cleanupListOfValues",
                "cleanupNumericValues",
                "collapseGroups",
                "convertColors",
                "convertPathData",
                "convertStyleToAttrs",
                "convertTransform",
                "inlineStyles",
                "mergePaths",
                "minifyStyles",
                "moveElemsAttrsToGroup",
                "moveGroupAttrsToElems",
                "removeComments",
                "removeDoctype",
                "removeEditorsNSData",
                "removeEmptyAttrs",
                "removeEmptyContainers",
                "removeEmptyText",
                "removeHiddenElems",
                "removeMetadata",
                "removeNonInheritableGroupAttrs",
                "removeOffCanvasPaths",
                "removeRasterImages",
                "removeScriptElement",
                "removeUnknownsAndDefaults",
                "removeUnusedNS",
                "removeUselessStrokeAndFill",
                "removeXMLProcInst",
                "reusePaths",
                "sortAttrs",
              ],
            },
          },
        ],
      },
    };

    actions.replaceWebpackConfig(config);
  }

  // Configure CSS optimization to preserve SVGs
  if (stage === "build-css") {
    const config = getConfig();

    // Find and configure the CSS minimizer to disable SVGO
    const minimizer = config.optimization.minimizer.find(
      (plugin) => plugin.constructor.name === "CssMinimizerPlugin",
    );

    if (minimizer) {
      minimizer.options = {
        ...minimizer.options,
        minimizerOptions: {
          preset: [
            "default",
            {
              svgo: false, // Disable SVGO in CSS to preserve SVG data URIs
            },
          ],
        },
      };
    }

    actions.replaceWebpackConfig(config);
  }
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "@babel/plugin-transform-react-jsx",
    options: {
      runtime: "automatic",
    },
  });
};

// Always load root .env as the single source of truth
try { require("dotenv").config({ path: `${__dirname}/../.env`, override: true }); } catch (_) {}

// In local development, proxy /api → remote API to avoid CORS
exports.onCreateDevServer = ({ app }) => {
  try {
    const { createProxyMiddleware } = require("http-proxy-middleware");
    const targetBase = process.env.DEV_PROXY_TARGET || process.env.GATSBY_API_BASE_URL;

    if (!targetBase || targetBase === "/api") return; // nothing to proxy

    app.use(
      "/api",
      createProxyMiddleware({
        target: targetBase,
        changeOrigin: true,
        secure: false,
        logLevel: "warn",
      }),
    );
  } catch (_) {
    // proxy is optional in dev; fail silently if missing
  }
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
              full: true,
              plugins: [
                // potentially destructive plugins removed - see https://github.com/gatsbyjs/gatsby/issues/15629
                // use correct config format and remove plugins requiring specific params - see https://github.com/gatsbyjs/gatsby/issues/31619
                `removeUselessDefs`,
                `cleanupAttrs`,
                `cleanupEnableBackground`,
                `cleanupIDs`,
                `cleanupListOfValues`,
                `cleanupNumericValues`,
                `collapseGroups`,
                `convertColors`,
                `convertPathData`,
                `convertStyleToAttrs`,
                `convertTransform`,
                `inlineStyles`,
                `mergePaths`,
                `minifyStyles`,
                `moveElemsAttrsToGroup`,
                `moveGroupAttrsToElems`,
                `prefixIds`,
                `removeAttrs`,
                `removeComments`,
                `removeDesc`,
                `removeDimensions`,
                `removeDoctype`,
                `removeEditorsNSData`,
                `removeEmptyAttrs`,
                `removeEmptyContainers`,
                `removeEmptyText`,
                `removeHiddenElems`,
                `removeMetadata`,
                `removeNonInheritableGroupAttrs`,
                `removeOffCanvasPaths`,
                `removeRasterImages`,
                `removeScriptElement`,
                `removeTitle`,
                `removeUnknownsAndDefaults`,
                `removeUnusedNS`,
                `removeUselessStrokeAndFill`,
                `removeXMLProcInst`,
                `reusePaths`,
                `sortAttrs`,
              ],
            },
          },
        ],
      },
    };

    actions.replaceWebpackConfig(config);
  }
};

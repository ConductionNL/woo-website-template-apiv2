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

const path = require("path");

module.exports = {
  publicPath: "./",
  devServer: {
    proxy: {
      "^/": {
        target: `http://localhost:${process.env.VUE_APP_SERVER_PORT}`,
        ws: true,
        changeOrigin: true,
      },
    },
  },
  outputDir: path.resolve(__dirname, process.env.OUTPUT_DIR),
};

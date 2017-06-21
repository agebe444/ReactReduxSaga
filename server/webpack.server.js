const path = require("path");
const express = require("express");
const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const config = require("../webpack/webpack.local.config");

const app = express();
const compiler = webpack(config);

const middleware = devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: "dist",
  stats: { colors: true },
  historyApiFallback: true,
});

app.use(middleware);
app.use(hotMiddleware(compiler));

app.get("*", (req, res) => {
  res.write(middleware.fileSystem.readFileSync(path.resolve("dist/index.html")));
  res.end();
});

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log("Express started at http://localhost:%d", listener.address().port);
});

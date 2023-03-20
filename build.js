const { build } = require("esbuild");
const { nodeExternalsPlugin } = require('esbuild-node-externals');

build({
  entryPoints: ["src/weatherAlert.ts"],
  bundle: true,
  platform: "node",
  target: "node14",
  outdir: "dist",
  minify: true,
  sourcemap: true,
//   external: ["telegraf", "axios", "winston"], // Add any other external dependencies here
  plugins: [nodeExternalsPlugin()],
}).catch((error) => {
  console.error(error);
  process.exit(1);
});

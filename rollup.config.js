import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import svgr from "@svgr/rollup";
import url from "rollup-plugin-url";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import sass from "rollup-plugin-sass";
import react from "react";
import reactDom from "react-dom";
const extensions = [".js", ".jsx", ".ts", ".tsx", ".jsxs"];

process.env.BABEL_ENV = "production";

export default {
  input: "./src/index.ts",
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        react: Object.keys(react),
        "react-dom": Object.keys(reactDom),
        "react/jsx-runtime": ["jsx", "jsxs"],
      },
    }),
    babel({ extensions, include: ["src/**/*"], runtimeHelpers: true }),
    url(),
    svgr(),
    typescript(),
    sass(),
  ],
  output: [
    {
      file: pkg.module,
      format: "es",
    },
  ],
};

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import svgr from '@svgr/rollup';
import url from 'rollup-plugin-url';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import react from 'react';
import reactDom from 'react-dom';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.jsxs'];

process.env.BABEL_ENV = 'production';

export default {
  input: './src/index.tsx',
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        react: Object.keys(react),
        'react-dom': Object.keys(reactDom),
        'react/jsx-runtime': ['jsx', 'jsxs'],
      },
    }),
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),
    url(),
    svgr(),
    typescript(),
    postcss({
      plugins: [autoprefixer()],
      extract: true,
      minimize: true,
    }),
    copy({
      targets: [
        { src: 'src/scss/fonts', dest: 'dist/library' },
        { src: 'src/scss/libs', dest: 'dist/library/scss' },
        { src: 'src/scss/libs.scss', dest: 'dist/library/scss' },
      ],
    }),
    json(),
    nodeResolve(),
    terser(),
  ],
  output: [
    {
      file: pkg.module,
      format: 'cjs',
    },
  ],
};

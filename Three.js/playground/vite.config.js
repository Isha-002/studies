// vite.config.js
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import glsl from 'vite-plugin-glsl';

export default {
  plugins: [wasm(), topLevelAwait(), glsl()],
};

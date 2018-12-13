import { terser } from 'rollup-plugin-terser';
import * as meta from './package.json';

const copyright = `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author}`;

export default [
  {
    input: 'src/canvas-overlay-hd.js',
    plugins: [],
    output: {
      extend: true,
      banner: copyright,
      file: 'dist/openseadragon-canvas-overlay-hd.js',
      format: 'umd',
      indent: false,
      name: 'OpenSeadragon.CanvasOverlayHd',
    },
  },
  {
    input: 'src/canvas-overlay-hd.js',
    plugins: [
      terser({ output: { preamble: copyright } }),
    ],
    output: {
      extend: true,
      file: 'dist/openseadragon-canvas-overlay-hd.min.js',
      format: 'umd',
      indent: false,
      name: 'OpenSeadragon.CanvasOverlayHd',
    },
  },
];

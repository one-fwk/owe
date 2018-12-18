import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.ts',
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json',
    }),
    resolve({
      jsnext: true,
      main: true,
      module: true,
    }),
    commonjs(),
  ],
  output: [
    {
      file: 'lib/index.js',
      format: 'cjs',
    },
    {
      file: 'lib/index.mjs',
      format: 'esm',
    },
  ],
};
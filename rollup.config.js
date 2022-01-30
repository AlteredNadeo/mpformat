import typescript from '@rollup/plugin-typescript'

export default {
  input: 'lib/mpformat.ts',
  output: [
    {
      file: 'dist/mpformat.esm.js',
      format: 'es',
    },
    {
      file: 'dist/mpformat.umd.js',
      format: 'umd',
      name: 'MPFormat',
    },
  ],
  plugins: [typescript()],
}

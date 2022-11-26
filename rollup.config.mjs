export default {
  input: 'dist-transpiled/index.js',
  type: "module",
  output: [
    {
      dir: 'dist/',
      entryFileNames: '[name].cjs.js',
      chunkFileNames: '[name]-[hash].cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: 'dist/',
      format: 'cjs',
      preferConst: true,
      sourcemap: true,
    },
  ],
  external: ['keycloak-js', 'jwt-decode', 'vue'],
}

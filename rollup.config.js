import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';

export default {
  input: './src/index.js',
  output: [
    {
      format: 'cjs',
      file: 'dist/predictive-prefetch.cjs.js',
      exports: 'auto',
    },
    {
      format: 'esm',
      file: 'dist/predictive-prefetch.esm.js',
    },
  ],
  plugins: [
    babel(),
    generatePackageJson({
      outputFolder: 'dist',
      baseContents: ({
        scripts,
        dependencies,
        devDependencies,
        jest,
        ...pkg
      }) => ({
        ...pkg,
        main: 'predictive-prefetch.cjs.js',
        module: 'predictive-prefetch.esm.js',
      }),
    }),
    copy({
      targets: [{ src: 'README.md', dest: 'dist' }],
    }),
  ],
};

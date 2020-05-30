export default {
  // compileEnhancements: false,
  extensions: ['ts', 'tsx'],
  concurrency: 5,
  // files: ['./test/*.spec.ts', './test/**/*.spec.ts'],
  require: ['ts-node/register', 'esm']
};

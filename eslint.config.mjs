import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

export default [
  {
    ignores: [
      'dist'
    ]
  },
  ...bpmnIoPlugin.configs.browser,
  ...bpmnIoPlugin.configs.jsx,
  ...bpmnIoPlugin.configs.node.map(config => {
    return {
      ...config,
      files: [
        'karma.config.js',
        'karma.distro.js',
        'rollup.config.js',
        'tasks/**/*.mjs',
        '**/test/**/*.js'
      ]
    };
  }),
  ...bpmnIoPlugin.configs.mocha.map(config => {
    return {
      ...config,
      files: [
        '**/test/**/*.js'
      ]
    };
  }),
  {
    languageOptions: {
      globals: {
        sinon: true
      },
    },
    files: [
      '**/test/**/*.js'
    ]
  }
];

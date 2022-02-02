import path from 'path';

import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';

const outputDir = 'dist';

const domains = [
  'base',
  'camunda-cloud',
  'camunda-platform'
];

const styles = [
  {
    src: resolve('dmn-js', '/dist/assets/*.css'),
    dest: 'dist/assets'
  },
  {
    src: resolve('dmn-js', '/dist/assets/dmn-font/{font,css}/**'),
    dest: 'dist/assets/dmn-font'
  }
].concat(domains.map(function(domain) {
  return {
    src: 'styles/' + domain + '-modeler.css',
    dest: 'dist/assets'
  };
}));

const distros = domains.map(function(domain) {
  return {
    input: domain + '/Modeler',
    output: domain + '-modeler'
  };
});

const configs = distros.reduce(function(configs, distro) {
  const {
    input,
    output
  } = distro;

  return [
    ...configs,
    {
      input: `./lib/${input}.js`,
      output: {
        name: 'DmnModeler',
        file: `${outputDir}/${output}.development.js`,
        format: 'umd'
      },
      plugins: pgl([
        replace({
          'process.env.NODE_ENV': JSON.stringify('development'),
          preventAssignment: true
        }),
        copyStyles(styles)
      ])
    },
    {
      input: `./lib/${input}.js`,
      output: {
        name: 'DmnModeler',
        file: `${outputDir}/${output}.production.min.js`,
        format: 'umd'
      },
      plugins: pgl([
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
          preventAssignment: true
        }),
        terser()
      ])
    }
  ];
}, []);

export default configs;


// helpers //////////////////////

function pgl(plugins = []) {
  return [
    nodeResolve({
      mainFields: [
        'browser',
        'module',
        'main'
      ]
    }),
    commonjs(),
    json(),
    ...plugins
  ];
}

function copyStyles(styles) {
  return copy({
    targets: styles.map(function(sheet) {
      return {
        src: sheet.src,
        dest: sheet.dest
      };
    })
  });
}

function resolve(module, sub) {
  var pkg = require.resolve(module + '/package.json');

  return path.dirname(pkg) + sub;
}
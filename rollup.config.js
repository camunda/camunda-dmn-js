/* eslint-env node */

import path from 'path';

import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';

import pkg from './package.json';

const nonbundledDependencies = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });
const nonExternalDependencies = [ 'dmn-js-shared' ];

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
    src: resolve('dmn-js', '/dist/assets/dmn-font/{font,css}'),
    dest: 'dist/assets/dmn-font'
  },
  {
    src: resolve('dmn-js-properties-panel', '/dist/assets/*.css'),
    dest: 'dist/assets'
  },
  {
    src: 'styles/*.css',
    dest: 'dist/assets'
  }
];

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
}, []).concat({
  input: './lib/index.js',
  output: [
    {
      sourcemap: true,
      format: 'commonjs',
      file: pkg.main,
    },
    {
      sourcemap: true,
      format: 'esm',
      file: pkg.module
    }
  ],
  external: externalDependencies(),
  plugins: pgl()
});

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
    json(),
    babel({
      babelHelpers: 'bundled'
    }),
    commonjs(),
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

function externalDependencies() {
  return id => {
    return nonbundledDependencies.find(dep => dependencyMatches(id, dep)) &&
      !nonExternalDependencies.find(dep => dependencyMatches(id, dep));
  };
}

function dependencyMatches(id, dependency) {
  return id === dependency || id.startsWith(dependency + '/');
}

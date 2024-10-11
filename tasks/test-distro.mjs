import { execaSync as execSync } from 'execa';

import { existsSync } from 'node:fs';

var failures = 0;

function verifyAssets() {
  const assetPaths = [
    'dist/assets/diagram-js.css',
    'dist/assets/dmn-js-decision-table-controls.css',
    'dist/assets/dmn-js-decision-table.css',
    'dist/assets/dmn-js-drd.css',
    'dist/assets/dmn-js-literal-expression.css',
    'dist/assets/dmn-js-shared.css',
    'dist/assets/dmn-font/css/dmn.css',
    'dist/assets/properties-panel.css',
    'dist/assets/overview.css',
    'dist/assets/base-modeler.css',
    'dist/assets/camunda-cloud-modeler.css',
    'dist/assets/camunda-platform-modeler.css'
  ];

  for (const assetPath of assetPaths) {

    console.error('[TEST] ASSET ' + assetPath);

    if (!existsSync(assetPath)) {
      console.error(`[TEST] FAILURE <${assetPath}> does not exist!`);

      failures++;
    }
  }
}

function runTest(variant, env) {

  var NODE_ENV = process.env.NODE_ENV;

  process.env.VARIANT = variant;
  process.env.NODE_ENV = env;

  console.log('[TEST] ' + variant + '@' + env);
  console.log(`[EXEC] VARIANT=${variant} NODE_ENV=${env} karma start karma.distro.js`);

  try {
    execSync('karma', [ 'start', 'karma.distro.js' ]);
  } catch (e) {
    console.error('[TEST] FAILURE ' + variant + '@' + env);
    console.error(e);

    failures++;
  } finally {
    process.env.NODE_ENV = NODE_ENV;
  }
}

function test() {

  runTest('base-modeler', 'development');
  runTest('base-modeler', 'production');

  runTest('camunda-cloud-modeler', 'development');
  runTest('camunda-cloud-modeler', 'production');

  runTest('camunda-platform-modeler', 'development');
  runTest('camunda-platform-modeler', 'production');

  verifyAssets();

  if (failures) {
    process.exit(1);
  }
}


test();
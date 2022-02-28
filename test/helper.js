import MochaTestContainer from 'mocha-test-container-support';
import { insertCSS } from 'dmn-js/test/helper';

import PlatformModeler from '../lib/camunda-platform/Modeler';
import CloudModeler from '../lib/camunda-cloud/Modeler';


let DMN_JS;

insertStyles();

export * from './util/EventUtil';

export function bootstrapDmnJS(Modeler, diagram, options = {}) {
  return function() {
    const testContainer = MochaTestContainer.get(this);

    const editor = new Modeler({
      container: testContainer,
      common: {
        keyboard: {
          bindTo: document
        }
      },
      ...options
    });

    DMN_JS = editor;

    return editor.importXML(diagram);
  };
}

export function bootstrapCamundaPlatformModeler(diagram, options = {}) {
  return bootstrapDmnJS(PlatformModeler, diagram, options);
}

export function bootstrapCamundaCloudModeler(diagram, options = {}) {
  return bootstrapDmnJS(CloudModeler, diagram, options);
}

export function getDmnJS() {
  return DMN_JS;
}

export function inject(fn) {
  return function() {
    return DMN_JS.getActiveViewer().invoke(fn);
  };
}

function insertStyles() {
  const styles = [
    { name: 'diagram-js.css', css: require('dmn-js/dist/assets/diagram-js.css').default },
    { name: 'dmn-embedded.css', css: require('dmn-js/dist/assets/dmn-font/css/dmn-embedded.css').default },
    { name: 'dmn-js-decision-table-controls.css', css: require('dmn-js/dist/assets/dmn-js-decision-table-controls.css').default },
    { name: 'dmn-js-decision-table.css', css: require('dmn-js/dist/assets/dmn-js-decision-table.css').default },
    { name: 'dmn-js-drd.css', css: require('dmn-js/dist/assets/dmn-js-drd.css').default },
    { name: 'dmn-js-literal-expression.css', css: require('dmn-js/dist/assets/dmn-js-literal-expression.css').default },
    { name: 'dmn-js-shared.css', css: require('dmn-js/dist/assets/dmn-js-shared.css').default }
  ];

  styles.forEach(({ name, css }) => insertCSS(name, css));
}

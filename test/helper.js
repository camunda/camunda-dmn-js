import MochaTestContainer from 'mocha-test-container-support';
import { insertCSS } from 'dmn-js/test/helper';

import {
  BaseModeler,
  CamundaPlatformModeler,
  CamundaCloudModeler
} from '../lib';


let DMN_JS;

insertStyles();

export * from './util/EventUtil';

export function bootstrapDmnJS(Modeler, diagram, options = {}) {
  return function() {
    const testContainer = MochaTestContainer.get(this);

    const container = document.createElement('div');
    container.classList.add('container');

    const propertiesContainer = document.createElement('div');
    propertiesContainer.classList.add('properties-container');

    const overviewContainer = document.createElement('div');
    overviewContainer.classList.add('overview-container');

    testContainer.append(overviewContainer, container, propertiesContainer);

    const editor = new Modeler({
      container: container,
      ...options,
      common: {
        keyboard: {
          bindTo: document
        },
        propertiesPanel: {
          parent: propertiesContainer
        },
        overview: {
          parent: overviewContainer
        },
        ...options.common
      }
    });

    DMN_JS = window.DMN_JS = editor;

    return editor.importXML(diagram);
  };
}

export function bootstrapBaseModeler(diagram, options = {}) {
  return bootstrapDmnJS(BaseModeler, diagram, options);
}

export function bootstrapCamundaPlatformModeler(diagram, options = {}) {
  return bootstrapDmnJS(CamundaPlatformModeler, diagram, options);
}

export function bootstrapCamundaCloudModeler(diagram, options = {}) {
  return bootstrapDmnJS(CamundaCloudModeler, diagram, options);
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
  const testStyles = `
body {
  margin: 8px
}

.test-container {
  padding-bottom: 24px;
}

.test-content-container {
  display: flex;
}

.container {
  flex: 1;
  overflow: auto;
}

.properties-container {
  width: 300px;
  border-left: 1px solid #ccc;
  background: #f8f8f8;
  overflow: auto;
}

.overview-container {
  width: 500px;
  flex: 0 0 auto;
}

.overview-container:empty,
.properties-container:empty {
  display: none;
}
`;

  const styles = [
    { name: 'test.css', css: testStyles },
    { name: 'diagram-js.css', css: require('dmn-js/dist/assets/diagram-js.css').default },
    { name: 'dmn-embedded.css', css: require('dmn-js/dist/assets/dmn-font/css/dmn-embedded.css').default },
    { name: 'dmn-js-decision-table-controls.css', css: require('dmn-js/dist/assets/dmn-js-decision-table-controls.css').default },
    { name: 'dmn-js-decision-table.css', css: require('dmn-js/dist/assets/dmn-js-decision-table.css').default },
    { name: 'dmn-js-drd.css', css: require('dmn-js/dist/assets/dmn-js-drd.css').default },
    { name: 'dmn-js-literal-expression.css', css: require('dmn-js/dist/assets/dmn-js-literal-expression.css').default },
    { name: 'dmn-js-boxed-expression-controls.css', css: require('dmn-js/dist/assets/dmn-js-boxed-expression-controls.css').default },
    { name: 'dmn-js-boxed-expression.css', css: require('dmn-js/dist/assets/dmn-js-boxed-expression.css').default },
    { name: 'dmn-js-shared.css', css: require('dmn-js/dist/assets/dmn-js-shared.css').default },
    { name: 'properties-panel.css', css: require('dmn-js-properties-panel/dist/assets/properties-panel.css').default },
    { name: 'overview.css', css: require('../styles/overview.css').default }
  ];

  styles.forEach(({ name, css }) => insertCSS(name, css));
}

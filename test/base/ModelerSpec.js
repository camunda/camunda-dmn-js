import MochaTestContainer from 'mocha-test-container-support/lib/MochaTestContainer';

import Modeler from '../../lib/base/Modeler';
import '../helper';

import diagramXML from '../fixtures/simple.dmn';

const singleStart = window.__env__ && window.__env__.SINGLE_START === 'base-modeler';


describe('BaseModeler', function() {

  let testContainer, container, propertiesContainer;

  beforeEach(function() {
    testContainer = MochaTestContainer.get(this);

    container = document.createElement('div');
    container.classList.add('container');

    propertiesContainer = document.createElement('div');
    propertiesContainer.classList.add('properties-container');

    testContainer.append(container, propertiesContainer);
  });

  (singleStart ? it.only : it)('should import DMN', async function() {

    // given
    const modeler = new Modeler({ container, common: {
      propertiesPanel: {
        parent: propertiesContainer
      }
    } });

    // when
    const { warnings } = await modeler.importXML(diagramXML);

    // then
    expect(warnings).to.be.empty;
  });
});

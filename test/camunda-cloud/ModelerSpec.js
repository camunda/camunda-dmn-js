import MochaTestContainer from 'mocha-test-container-support/lib/MochaTestContainer';

import Modeler from '../../lib/camunda-cloud/Modeler';
import '../helper';

import diagramXML from '../fixtures/simple.dmn';

const singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-cloud-modeler';


describe('CamundaCloudModeler', function() {

  describe('bootstrap', function() {

    let testContainer, container, propertiesContainer, overviewContainer;

    beforeEach(function() {
      testContainer = MochaTestContainer.get(this);

      container = document.createElement('div');
      container.classList.add('container');

      propertiesContainer = document.createElement('div');
      propertiesContainer.classList.add('properties-container');

      overviewContainer = document.createElement('div');
      overviewContainer.classList.add('overview-container');

      testContainer.append(overviewContainer, container, propertiesContainer);
    });

    (singleStart ? it.only : it)('should import DMN', async function() {

      // given
      const modeler = new Modeler({ container, common: {
        propertiesPanel: {
          parent: propertiesContainer
        },
        overview: {
          parent: overviewContainer
        }
      } });

      // when
      const { warnings } = await modeler.importXML(diagramXML);

      // then
      expect(warnings).to.be.empty;
    });
  });
});

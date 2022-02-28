import MochaTestContainer from 'mocha-test-container-support/lib/MochaTestContainer';

import Modeler from '../../lib/camunda-cloud/Modeler';
import '../helper';

import diagramXML from '../fixtures/simple.dmn';

const singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-cloud-modeler';


describe('CamundaCloudModeler', function() {

  let container;

  beforeEach(function() {
    container = MochaTestContainer.get(this);
  });

  (singleStart ? it.only : it)('should import DMN', async function() {

    // given
    const modeler = new Modeler({ container });

    // when
    const { warnings } = await modeler.importXML(diagramXML);

    // then
    expect(warnings).to.be.empty;
  });
});

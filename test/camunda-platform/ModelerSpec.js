import MochaTestContainer from 'mocha-test-container-support/lib/MochaTestContainer';

import Modeler from '../../lib/camunda-platform/Modeler';
import {
  bootstrapCamundaPlatformModeler,
  inject
} from '../helper';

import diagramXML from '../fixtures/simple.dmn';


const singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-platform-modeler';

describe('CamundaPlatformModeler', function() {

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


  describe('config', function() {

    beforeEach(bootstrapCamundaPlatformModeler(diagramXML));


    it('should use Camunda Platform expression languages', inject(
      function(expressionLanguages) {

        // when
        const expressionLanguagesList = expressionLanguages.getAll();

        // then
        expect(expressionLanguagesList).to.eql([ {
          label: 'FEEL',
          value: 'feel'
        }, {
          label: 'JUEL',
          value: 'juel'
        }, {
          label: 'JavaScript',
          value: 'javascript'
        }, {
          label: 'Groovy',
          value: 'groovy'
        }, {
          label: 'Python',
          value: 'python'
        }, {
          label: 'JRuby',
          value: 'jruby'
        } ]);

      })
    );


    it('should use Camunda Platform data types', inject(
      function(dataTypes) {

        // when
        const dataTypesList = dataTypes.getAll();

        // then
        expect(dataTypesList).to.eql([
          'string',
          'boolean',
          'integer',
          'long',
          'double',
          'date'
        ]);
      })
    );

  });
});

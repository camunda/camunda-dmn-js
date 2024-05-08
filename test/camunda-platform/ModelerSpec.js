import MochaTestContainer from 'mocha-test-container-support/lib/MochaTestContainer';

import Modeler from '../../lib/camunda-platform/Modeler';
import {
  bootstrapCamundaPlatformModeler,
  inject
} from '../helper';

import diagramXML from '../fixtures/simple.dmn';
import bkmXML from '../fixtures/function-definition.dmn';


const singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-platform-modeler';

describe('CamundaPlatformModeler', function() {

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


    describe('additional modules', function() {

      it('should pass additional modules to boxed expression', async function() {

        // given
        const modeler = new Modeler({ container,
          common: {
            propertiesPanel: {
              parent: propertiesContainer
            },
            overview: {
              parent: overviewContainer
            }
          },
          boxedExpression: {
            additionalModules: [
              {
                foo: [ 'type', function() {
                  return {
                    name: 'foo'
                  };
                } ]
              }
            ]
          }
        });

        // when
        await modeler.importXML(bkmXML);

        // then
        const viewer = modeler.getActiveViewer();
        const foo = viewer.get('foo');

        expect(foo).to.exist;
        expect(foo.name).to.equal('foo');
      });
    });
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

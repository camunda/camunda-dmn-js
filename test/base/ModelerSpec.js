import MochaTestContainer from 'mocha-test-container-support/lib/MochaTestContainer';

import Modeler from '../../lib/base/Modeler';
import '../helper';

import diagramXML from '../fixtures/simple.dmn';
import drdXML from '../fixtures/diagram.dmn';
import bkmXML from '../fixtures/function-definition.dmn';

const singleStart = window.__env__ && window.__env__.SINGLE_START === 'base-modeler';


describe('BaseModeler', function() {

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

    window.dmn = modeler;

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


  describe('disableAdjustToOrigin', function() {

    it('should NOT disable adjust origin per default', async function() {

      // given
      const modeler = new Modeler({ container });

      // when
      await modeler.importXML(drdXML);

      // then
      const activeViewer = modeler.getActiveViewer();
      expect(activeViewer.get('alignToOrigin', false)).to.exist;
    });


    it('should disable adjust origin when passed via `common`', async function() {

      // given
      const modeler = new Modeler({ container, common: {
        disableAdjustOrigin: true
      } });

      // when
      await modeler.importXML(drdXML);

      // then
      const activeViewer = modeler.getActiveViewer();
      expect(activeViewer.get('alignToOrigin', false)).not.to.exist;
    });


    it('should disable adjust origin when passed via `drd`', async function() {

      // given
      const modeler = new Modeler({ container, drd: {
        disableAdjustOrigin: true
      } });

      // when
      await modeler.importXML(drdXML);

      // then
      const activeViewer = modeler.getActiveViewer();
      expect(activeViewer.get('alignToOrigin', false)).not.to.exist;
    });
  });


  describe('disableGrid', function() {

    it('should NOT disable grid per default', async function() {

      // given
      const modeler = new Modeler({ container });

      // when
      await modeler.importXML(drdXML);

      // then
      const activeViewer = modeler.getActiveViewer();
      expect(activeViewer.get('grid', false)).to.exist;
    });


    it('should disable grid when passed via `common`', async function() {

      // given
      const modeler = new Modeler({ container, common: {
        disableGrid: true
      } });

      // when
      await modeler.importXML(drdXML);

      // then
      const activeViewer = modeler.getActiveViewer();
      expect(activeViewer.get('grid', false)).not.to.exist;
    });


    it('should disable grid when passed via `drd`', async function() {

      // given
      const modeler = new Modeler({ container, drd: {
        disableGrid: true
      } });

      // when
      await modeler.importXML(drdXML);

      // then
      const activeViewer = modeler.getActiveViewer();
      expect(activeViewer.get('grid', false)).not.to.exist;
    });

  });

});

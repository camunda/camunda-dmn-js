import { expect } from 'chai';

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


    it('should open each view', async function() {

      // given
      const modeler = new Modeler({ container, common: {
        propertiesPanel: {
          parent: propertiesContainer
        },
        overview: {
          parent: overviewContainer
        }
      } });
      await modeler.importXML(diagramXML);
      const views = modeler.getViews();

      for (const view of views) {

        // when
        await modeler.open(view);

        // then
        expect(modeler.getActiveView()).to.eql(view);
      }
    });


    it('should inject mandatory modules', async function() {

      // when
      const modeler = new Modeler({
        container,
        common: {
          propertiesPanel: {
            parent: propertiesContainer
          },
          overview: {
            parent: overviewContainer
          }
        }
      });

      await modeler.importXML(diagramXML);

      await modeler.open(modeler.getViews().find(({ type }) => type === 'drd'));

      // assume
      expect(modeler.getActiveView().type).to.eql('drd');

      const viewer = modeler.getActiveViewer();

      // then
      expect(viewer.get('propertiesPanel')).to.exist;
      expect(viewer.get('zeebePropertiesProvider')).to.exist;
    });


    it('should inject zeebe moddle descriptors', async function() {

      // when
      const modeler = new Modeler({
        container,
        common: {
          propertiesPanel: {
            parent: propertiesContainer
          },
          overview: {
            parent: overviewContainer
          }
        }
      });

      await modeler.importXML(diagramXML);

      await modeler.open(modeler.getViews().find(({ type }) => type === 'drd'));

      // assume
      expect(modeler.getActiveView().type).to.eql('drd');

      const viewer = modeler.getActiveViewer();

      // when
      const moddle = viewer.get('moddle');

      // then
      expect(moddle.getPackage('zeebe')).to.exist;
    });


    it('should inject tooltipContextProvider', async function() {

      // when
      const modeler = new Modeler({
        container,
        common: {
          propertiesPanel: {
            parent: propertiesContainer
          },
          overview: {
            parent: overviewContainer
          }
        }
      });

      await modeler.importXML(diagramXML);

      await modeler.open(modeler.getViews().find(({ type }) => type === 'drd'));

      // assume
      expect(modeler.getActiveView().type).to.eql('drd');

      const viewer = modeler.getActiveViewer();

      // when
      const propertiesPanel = viewer.get('propertiesPanel');

      // then
      expect(propertiesPanel._tooltipConfig).to.exist;
    });

  });

});

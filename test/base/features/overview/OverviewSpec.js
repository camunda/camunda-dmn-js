import { expect } from 'chai';

import TestContainer from 'mocha-test-container-support';

import { query as domQuery } from 'min-dom';

import diagramXML from '../../../fixtures/diagram.dmn';
import {
  bootstrapBaseModeler,
  inject
} from '../../../helper';

import { waitFor } from '@testing-library/dom';


// TODO(barmac): re-enable when overview is done
describe.skip('Overview', function() {

  let container;

  beforeEach(function() {
    container = TestContainer.get(this);
  });


  describe('automatic attachment/detachment', function() {

    beforeEach(bootstrapBaseModeler(diagramXML));


    it('should automatically attach', inject(function(_parent) {

      // given
      const decisionTableView = _parent.getViews().find(view => view.type === 'decisionTable');

      // when
      _parent.open(decisionTableView);

      // then
      expect(domQuery('.djs-overview-container', container)).to.exist;
    }));


    it('should detach when switched to DRD view', inject(function(_parent) {

      // given
      const drdView = _parent.getActiveView();
      const decisionTableView = _parent.getViews().find(view => view.type === 'decisionTable');

      // when
      _parent.open(decisionTableView);
      _parent.open(drdView);

      // then
      expect(domQuery('.djs-overview-container', container)).not.to.exist;
    }));


    it('should detach when diagram is destroyed', inject(function(_parent) {

      // given
      const decisionTableView = _parent.getViews().find(view => view.type === 'decisionTable');

      // when
      _parent.open(decisionTableView);
      _parent.destroy();

      // then
      expect(domQuery('.djs-overview-container', container)).not.to.exist;
    }));
  });


  describe('manual attachment', function() {

    beforeEach(bootstrapBaseModeler(diagramXML, {
      common: {
        overview: {
          parent: null
        }
      }
    }));


    it('should NOT automatically attach if no container is given', inject(function(_parent) {

      // given
      const decisionTableView = _parent.getViews().find(view => view.type === 'decisionTable');

      // when
      _parent.open(decisionTableView);

      // then
      expect(domQuery('.djs-overview-container', container)).not.to.exist;
    }));


    it('should attach when overviewContainer#attachTo is called', inject(function(_parent) {

      // given
      const newParent = domQuery('.overview-container', container);
      const decisionTableView = _parent.getViews().find(view => view.type === 'decisionTable');
      _parent.open(decisionTableView);

      // when
      const activeViewer = _parent.getActiveViewer();
      activeViewer.get('overviewContainer').attachTo(newParent);

      // then
      expect(domQuery('.djs-overview-container', container)).to.exist;
    }));
  });


  describe('updating', function() {

    beforeEach(bootstrapBaseModeler(diagramXML));

    beforeEach(inject(function(_parent) {
      return openView(_parent, 'decisionTable');
    }));


    it('should automatically update when element is changed', inject(
      function(_parent, modeling, overviewContainer) {

        // when
        modeling.editDecisionTableName('newName');

        // then
        const elementRegistry = overviewContainer.get('elementRegistry');
        const decision = elementRegistry.get('dish-decision');

        expect(decision.businessObject.get('name')).to.equal('newName');
      })
    );


    it('should automatically update when element is added in DRD', inject(
      async function(_parent, overviewContainer) {

        // given
        await waitForOverviewUpdate(overviewContainer);
        const originalNumberOfElements = overviewContainer.get('elementRegistry').getAll().length;

        // when
        await openView(_parent, 'drd');
        const modeling = getModule(_parent, 'modeling');
        const canvas = getModule(_parent, 'canvas');
        const root = canvas.getRootElement();

        modeling.createShape({ type: 'dmn:Decision' }, { x: 100, y: 100 }, root);

        await openView(_parent, 'decisionTable');

        // then
        await waitFor(() => {
          const newNumberOfElements = overviewContainer.get('elementRegistry').getAll().length;

          expect(newNumberOfElements).to.equal(originalNumberOfElements + 1);
        });
      })
    );
  });


  describe('opening element', function() {

    beforeEach(bootstrapBaseModeler(diagramXML));


    it('should open decision table when clicked', inject(async function(_parent) {

      // given
      await openView(_parent, 'decisionTable');
      const overviewContainer = getModule(_parent, 'overviewContainer');
      await waitForOverviewUpdate(overviewContainer);
      const elementRegistry = overviewContainer.get('elementRegistry');
      const decision = elementRegistry.get('season');
      const eventBus = overviewContainer.get('eventBus');

      // when
      eventBus.fire('element.click', { element: decision });

      // then
      await waitFor(() => {
        const visual = elementRegistry.getGraphics(decision);

        expect(visual.classList.contains('open')).to.be.true;
      });
    }));


    it('should NOT mark text annotation as can-open', inject(async function(_parent) {

      // given
      await openView(_parent, 'decisionTable');
      const overviewContainer = getModule(_parent, 'overviewContainer');
      await waitForOverviewUpdate(overviewContainer);
      const elementRegistry = overviewContainer.get('elementRegistry');
      const textAnnotation = elementRegistry.get('TextAnnotation_1');

      // when
      const visual = elementRegistry.getGraphics(textAnnotation);

      // then
      expect(visual.classList.contains('can-open')).to.be.false;
    }));


    it('should NOT mark decision without logic as can-open', inject(async function(_parent) {

      // given
      await openView(_parent, 'decisionTable');
      const overviewContainer = getModule(_parent, 'overviewContainer');
      await waitForOverviewUpdate(overviewContainer);
      const elementRegistry = overviewContainer.get('elementRegistry');
      const decision = elementRegistry.get('empty');

      // when
      const visual = elementRegistry.getGraphics(decision);

      // then
      expect(visual.classList.contains('can-open')).to.be.false;
    }));
  });
});



// helpers //////////
function openView(dmnjs, type) {
  const view = dmnjs.getViews().find(view => view.type === type);
  return dmnjs.open(view);
}

function getModule(dmnjs, name) {
  const activeViewer = dmnjs.getActiveViewer();

  return activeViewer.get(name);
}

async function waitForOverviewUpdate(overviewContainer) {
  return new Promise(resolve => {
    overviewContainer.on('import.done', function onImport() {
      overviewContainer.off('import.done', onImport);
      resolve();
    });
  });
}
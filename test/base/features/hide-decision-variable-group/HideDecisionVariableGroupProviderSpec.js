import { expect } from 'chai';

import { act } from '@bpmn-io/properties-panel/preact/test-utils';

import { query as domQuery } from 'min-dom';

import TestContainer from 'mocha-test-container-support';

import diagramXML from '../../../fixtures/diagram.dmn';

import { bootstrapBaseModeler, inject } from '../../../helper';


describe('HideDecisionVariableGroupProvider', function() {

  let propertiesContainer;

  beforeEach(function() {
    propertiesContainer = document.createElement('div');
    TestContainer.get(this).appendChild(propertiesContainer);
  });

  beforeEach(function() {
    const bootstrap = bootstrapBaseModeler(diagramXML, {
      common: {
        propertiesPanel: {
          parent: propertiesContainer
        }
      }
    }).bind(this);

    return act(() => bootstrap());
  });

  function getVariableGroup() {
    return domQuery('[data-group-id="group-variable"]', propertiesContainer);
  }


  it('should display variable group for input data', inject(
    async function(elementRegistry, selection) {

      // given
      const inputData = elementRegistry.get('dayType_id');

      // when
      await act(() => {
        selection.select(inputData);
      });

      // then
      expect(getVariableGroup()).to.exist;
    })
  );


  it('should hide variable group when selecting a decision', inject(
    async function(elementRegistry, selection) {

      // given
      const inputData = elementRegistry.get('dayType_id');
      const decision = elementRegistry.get('dish-decision');

      await act(() => {
        selection.select(inputData);
      });

      expect(getVariableGroup()).to.exist;

      // when
      await act(() => {
        selection.select(decision);
      });

      // then
      expect(getVariableGroup()).not.to.exist;
    })
  );
});

import { expect } from 'chai';

import diagramXML from '../../../fixtures/simple.dmn';
import functionDefinitionXML from '../../../fixtures/function-definition.dmn';

import { bootstrapBaseModeler, inject } from '../../../helper';


describe('CamundaVariableProvider', function() {

  describe('drg elements', function() {

    beforeEach(bootstrapBaseModeler(diagramXML));


    it('should provide decision as ID', inject(function(variableResolver, _parent) {

      // given
      const requiringDecision = _parent.getDefinitions().get('drgElement').find(e => e.id === 'decision_2');

      // when
      const variables = variableResolver.getVariables(requiringDecision);

      // then
      expect(variables).to.have.length(1);
      expect(variables[0]).to.have.property('name', 'decision');
    }));


    it('should provide input data as name', inject(function(variableResolver, elementRegistry) {

      // given
      const inputEntry = elementRegistry.get('inputEntry1').businessObject;

      // when
      const variables = variableResolver.getVariables(inputEntry);

      // then
      expect(variables).to.have.length(1);
      expect(variables[0]).to.have.property('name', 'status');
    }));


    it('should provide BKM as name', inject(
      function(variableResolver, _parent) {

        // given
        const requiringBkm = _parent.getDefinitions().get('drgElement').find(e => e.id === 'Bkm_1');

        // when
        const variables = variableResolver.getVariables(requiringBkm);

        // then
        expect(variables).to.have.length(1);
        expect(variables[0]).to.have.property('name', 'Business Knowledge Model 2');
      })
    );
  });


  describe('boxed expression', function() {

    beforeEach(bootstrapBaseModeler(functionDefinitionXML));


    it('should NOT change formal parameters\' names', inject(
      function(variableResolver, viewer) {

        // given
        const bkm = viewer.getRootElement();
        const body = bkm.get('encapsulatedLogic').get('body');

        // when
        const variables = variableResolver.getVariables(body);

        // then
        expect(variables).to.have.length(3);
        expect(variables[0]).to.have.property('name', 'noType');
        expect(variables[1]).to.have.property('name', 'string');
        expect(variables[2]).to.have.property('name', 'num');
      })
    );
  });
});

import diagramXML from '../../../fixtures/simple.dmn';
import functionDefinitionXML from '../../../fixtures/function-definition.dmn';

import { bootstrapBaseModeler, inject } from '../../../helper';

describe('CamundaVariableProvider', function() {

  describe('drg elements', function() {

    beforeEach(bootstrapBaseModeler(diagramXML));


    it('should provide input data id as name', inject(function(variableResolver, elementRegistry) {

      // given
      const inputEntry = elementRegistry.get('inputEntry1').businessObject;

      // when
      const variables = variableResolver.getVariables(inputEntry);

      // then
      expect(variables).to.have.length(1);
      expect(variables[0]).to.have.property('name', 'InputData_status');
    }));
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

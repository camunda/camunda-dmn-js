import diagramXML from '../../../fixtures/simple.dmn';

import { bootstrapBaseModeler, inject } from '../../../helper';

describe('CamundaVariableProvider', function() {

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

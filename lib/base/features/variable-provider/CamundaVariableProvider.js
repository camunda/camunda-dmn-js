import { is } from 'dmn-js-shared/lib/util/ModelUtil';

/**
 * Camunda-specific variable provider. Replaces variable name with element's id.
 */
export class CamundaVariableProvider {
  constructor(variableResolver) {
    variableResolver.registerProvider(this);
  }

  getVariables(variables, element) {
    return variables.map(variable => {
      return {
        ...variable,
        name: getVariableName(variable)
      };
    });
  }
}

CamundaVariableProvider.$inject = [ 'variableResolver' ];

function getVariableName(variable) {
  const { origin } = variable;

  if (origin && is(origin, 'dmn:DRGElement')) {
    return origin.get('id');
  }

  return variable.name;
}

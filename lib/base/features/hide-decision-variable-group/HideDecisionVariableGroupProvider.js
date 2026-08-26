/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import { is } from 'dmn-js-shared/lib/util/ModelUtil';

// run after DmnPropertiesProvider (1000) and Zeebe/Camunda providers (500)
const LOW_PRIORITY = 400;

/**
 * Removes the "Variable" group from the properties panel for decisions,
 * keeping it for input data.
 */
export class HideDecisionVariableGroupProvider {

  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(LOW_PRIORITY, this);
  }

  getGroups(element) {
    return (groups) => {
      if (!is(element, 'dmn:Decision')) {
        return groups;
      }

      return groups.filter(group => group.id !== 'variable');
    };
  }
}

HideDecisionVariableGroupProvider.$inject = [ 'propertiesPanel' ];

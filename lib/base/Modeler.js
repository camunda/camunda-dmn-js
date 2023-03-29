/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import DmnModeler from 'dmn-js/lib/Modeler';

import diagramOriginModule from 'diagram-js-origin';
import gridModule from 'diagram-js-grid';

import alignToOriginModule from '@bpmn-io/align-to-origin';

import {
  DmnPropertiesPanelModule,
  DmnPropertiesProviderModule
} from 'dmn-js-properties-panel';

export default class CamundaDmnModeler extends DmnModeler {

  constructor(options = {}) {

    const {
      common = {},
      drd = {},
      ...otherOptions
    } = options;

    const disableAdjustOrigin = drd.disableAdjustOrigin || common.disableAdjustOrigin;
    const disableGrid = drd.disableGrid || common.disableGrid;

    super({
      ...otherOptions,
      common,
      drd: mergeModules(drd, [
        disableAdjustOrigin ? diagramOriginModule : alignToOriginModule,
        disableGrid ? {} : gridModule,
        DmnPropertiesPanelModule,
        DmnPropertiesProviderModule
      ])
    });
  }
}


// helpers ///////////////////////

function mergeModules(config, editorModules) {

  const additionalModules = config.additionalModules || [];

  return {
    ...config,
    additionalModules: [
      ...editorModules,
      ...additionalModules
    ]
  };
}

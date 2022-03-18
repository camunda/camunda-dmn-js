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

import alignToOriginModule from '@bpmn-io/align-to-origin';

import {
  DmnPropertiesPanelModule,
  DmnPropertiesProviderModule
} from 'dmn-js-properties-panel';

import { createOverviewModule } from './features/overview/Overview';

export default class CamundaDmnModeler extends DmnModeler {

  constructor(options = {}) {

    const {
      common = {},
      moddleExtensions = {},
      drd = {},
      decisionTable = {},
      literalExpression = {},
      ...otherOptions
    } = options;

    const disableAdjustOrigin = drd.disableAdjustOrigin || common.disableAdjustOrigin;

    const overviewModule = createOverviewModule();

    super({
      ...otherOptions,
      common,
      drd: mergeModules(drd, [
        disableAdjustOrigin ? diagramOriginModule : alignToOriginModule,
        DmnPropertiesPanelModule,
        DmnPropertiesProviderModule
      ]),
      decisionTable: mergeModules(decisionTable, [
        overviewModule
      ]),
      literalExpression: mergeModules(literalExpression, [
        overviewModule
      ]),
      moddleExtensions
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

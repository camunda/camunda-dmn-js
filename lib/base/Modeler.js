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


export default class CamundaDmnModeler extends DmnModeler {

  constructor(options = {}) {

    const {
      moddleExtensions = {},
      drd = {},
      decisionTable = {},
      literalExpression = {},
      disableAdjustOrigin = false,
      ...otherOptions
    } = options;

    super({
      ...otherOptions,
      drd: mergeModules(drd, [
        disableAdjustOrigin ? diagramOriginModule : alignToOriginModule,
      ]),
      decisionTable,
      literalExpression,
      moddleExtensions
    });
  }
}


// helpers ///////////////////////

function mergeModules(editorConfig, additionalModules) {

  const editorModules = editorConfig.additionalModules || [];

  return {
    ...editorConfig,
    additionalModules: [
      ...editorModules,
      ...additionalModules
    ]
  };
}

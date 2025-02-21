/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import BaseModeler from '../base/Modeler';

import {
  ZeebePropertiesProviderModule,
  ZeebeTooltipProvider
} from 'dmn-js-properties-panel';

import { commonModdleExtensions } from './util/commonModules';

export default class CamundaDmnModeler extends BaseModeler {
  constructor(options = {}) {
    const {
      common = {},
      drd = {},
      moddleExtensions = {}
    } = options;

    const { propertiesPanel = {} } = common;

    super({
      ...options,
      common: {
        ...common,
        propertiesPanel: {
          ...propertiesPanel,
          tooltip: ZeebeTooltipProvider
        }
      },
      drd: mergeModules(drd, [
        ZeebePropertiesProviderModule
      ]),
      moddleExtensions: {
        ...commonModdleExtensions,
        ...moddleExtensions
      }
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

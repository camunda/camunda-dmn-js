/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import CamundaModdle from 'camunda-dmn-moddle/resources/camunda.json';

import BaseModeler from '../base/Modeler';

const EXPRESSION_LANGUAGE_OPTIONS = [ {
  label: 'FEEL',
  value: 'feel'
}, {
  label: 'JUEL',
  value: 'juel'
}, {
  label: 'JavaScript',
  value: 'javascript'
}, {
  label: 'Groovy',
  value: 'groovy'
}, {
  label: 'Python',
  value: 'python'
}, {
  label: 'JRuby',
  value: 'jruby'
} ];

const dataTypes = [
  'string',
  'boolean',
  'integer',
  'long',
  'double',
  'date'
];

export default class CamundaDmnModeler extends BaseModeler {
  constructor(options = {}) {
    const expressionLanguages = mergeExpressionLanguagesConfig(options.common);

    super({
      ...options,
      common: {
        dataTypes,
        ...options.common,
        expressionLanguages
      },
      moddleExtensions: {
        camunda: CamundaModdle,
        ...options.moddleExtensions
      }
    });
  }

}

function mergeExpressionLanguagesConfig(options = {}) {
  const expressionLanguagesConfig = options.expressionLanguages || {};

  const effectiveConfig = {
    options: expressionLanguagesConfig.options || EXPRESSION_LANGUAGE_OPTIONS,
    default: expressionLanguagesConfig.default || {
      editor: 'feel'
    }
  };

  return effectiveConfig;
}

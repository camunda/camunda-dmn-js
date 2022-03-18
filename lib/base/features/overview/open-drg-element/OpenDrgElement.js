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

import { getBBox } from 'diagram-js/lib/util/Elements';


const CAN_OPEN_DRG_ELEMENT_MARKER = 'can-open',
      CURRENT_OPEN_DRG_ELEMENT_MARKER = 'open';

const LOW_PRIORITY = 500;

export default class OpenDrgElement {
  constructor(canvas, elementRegistry, eventBus) {
    this._canvas = canvas;

    let currentOpenDrgElementId;

    eventBus.on('import.done', () => {
      elementRegistry.forEach(element => {
        if (this.canOpenDrgElement(element)) {
          canvas.addMarker(element, CAN_OPEN_DRG_ELEMENT_MARKER);
        }
      });

      if (currentOpenDrgElementId) {
        const currentOpenDrgElement = elementRegistry.get(currentOpenDrgElementId);

        if (currentOpenDrgElement) {
          canvas.addMarker(currentOpenDrgElement, CURRENT_OPEN_DRG_ELEMENT_MARKER);
        }
      }
    });

    // center viewbox arround opened element
    eventBus.on('drgElementOpened', LOW_PRIORITY, ({ shouldRecenter }) => {
      if (currentOpenDrgElementId && shouldRecenter) {
        const currentOpenDrgElement = elementRegistry.get(currentOpenDrgElementId);

        if (currentOpenDrgElement) {
          this.centerViewbox(currentOpenDrgElement);
        }
      }
    });

    // highlight open DRG element
    eventBus.on('drgElementOpened', ({ id }) => {
      let currentOpenDrgElement;

      // (1) remove highlight from previously open DRG element
      if (currentOpenDrgElementId) {
        currentOpenDrgElement = elementRegistry.get(currentOpenDrgElementId);

        if (currentOpenDrgElement) {
          canvas.removeMarker(currentOpenDrgElement, CURRENT_OPEN_DRG_ELEMENT_MARKER);
        }
      }

      currentOpenDrgElementId = id;

      currentOpenDrgElement = elementRegistry.get(currentOpenDrgElementId);

      // (2) add highlight to open DRG element
      if (currentOpenDrgElement) {
        canvas.addMarker(currentOpenDrgElement, CURRENT_OPEN_DRG_ELEMENT_MARKER);
      }
    });

    // open DRG element on click
    eventBus.on('element.click', ({ element }) => {
      if (!this.canOpenDrgElement(element)) {
        return;
      }

      const { id } = element;

      eventBus.fire('openDrgElement', {
        id
      });
    });
  }

  canOpenDrgElement(element) {
    const { businessObject } = element;

    const hasDecisionLogic = !!businessObject.decisionLogic;

    return is(element, 'dmn:Decision') && hasDecisionLogic;
  }

  centerViewbox(element) {
    const viewbox = this._canvas.viewbox();

    const bBox = getBBox(element);

    const newViewbox = {
      x: (bBox.x + bBox.width / 2) - viewbox.outer.width / 2,
      y: (bBox.y + bBox.height / 2) - viewbox.outer.height / 2,
      width: viewbox.outer.width,
      height: viewbox.outer.height
    };

    this._canvas.viewbox(newViewbox);

    this._canvas.zoom(viewbox.scale);
  }
}

OpenDrgElement.$inject = [
  'canvas',
  'elementRegistry',
  'eventBus'
];

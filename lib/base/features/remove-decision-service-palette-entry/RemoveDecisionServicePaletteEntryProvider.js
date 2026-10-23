/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

const DECISION_SERVICE_ENTRY_ID = 'create.decision-service';

// run after the DRD palette provider (1000)
const LOW_PRIORITY = 500;

/**
 * Removes the "Create decision service" entry from the palette.
 */
export class RemoveDecisionServicePaletteEntryProvider {

  constructor(palette) {
    palette.registerProvider(LOW_PRIORITY, this);
  }

  getPaletteEntries() {
    return (entries) => {
      delete entries[ DECISION_SERVICE_ENTRY_ID ];

      return entries;
    };
  }
}

RemoveDecisionServicePaletteEntryProvider.$inject = [ 'palette' ];

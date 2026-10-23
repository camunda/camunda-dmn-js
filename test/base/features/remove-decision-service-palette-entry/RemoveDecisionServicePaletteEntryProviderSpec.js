import { expect } from 'chai';

import { query as domQuery } from 'min-dom';

import diagramXML from '../../../fixtures/diagram.dmn';

import { bootstrapBaseModeler, inject } from '../../../helper';


describe('RemoveDecisionServicePaletteEntryProvider', function() {

  beforeEach(bootstrapBaseModeler(diagramXML));


  it('should NOT provide decision service palette entry', inject(function(palette) {

    // when
    const entries = palette.getEntries();

    // then
    expect(entries).not.to.have.property('create.decision-service');
  }));


  it('should NOT render decision service palette entry', inject(function(canvas) {

    // when
    const entry = domQuery('.djs-palette [data-action="create.decision-service"]', canvas.getContainer());

    // then
    expect(entry).not.to.exist;
  }));


  it('should keep other palette entries', inject(function(palette) {

    // when
    const entries = palette.getEntries();

    // then
    expect(entries).to.include.keys(
      'create.decision',
      'create.input-data',
      'create.knowledge-source',
      'create.business-knowledge-model'
    );
  }));

});

import TestContainer from 'mocha-test-container-support/lib/MochaTestContainer';

import {
  query as domQuery
} from 'min-dom';

import {
  bootstrapCamundaPlatformModeler,
  triggerClick
} from '../../../helper';

import simpleModeXML from './simple-mode.dmn';

describe('camunda-platform/simple-mode', function() {

  beforeEach(bootstrapCamundaPlatformModeler(simpleModeXML, {
    common: {
      debounceInput: false
    }
  }));

  let testContainer;

  beforeEach(function() {
    testContainer = TestContainer.get(this);
  });


  function selectCell(elementId) {
    const cell = domQuery(`[data-element-id="${ elementId }"]`, testContainer);

    triggerClick(cell);
  }


  it('should NOT provide simple mode for <dateTime>', function() {

    // when
    selectCell('dateTime');

    // then
    expect(domQuery('.simple-mode-button', testContainer)).not.to.exist;
  });


  it('should NOT provide simple mode for <time>', function() {

    // when
    selectCell('time');

    // then
    expect(domQuery('.simple-mode-button', testContainer)).not.to.exist;
  });


  it('should NOT provide simple mode for <dayTimeDuration>', function() {

    // when
    selectCell('dayTimeDuration');

    // then
    expect(domQuery('.simple-mode-button', testContainer)).not.to.exist;
  });


  it('should NOT provide simple mode for <yearMonthDuration>', function() {

    // when
    selectCell('yearMonthDuration');

    // then
    expect(domQuery('.simple-mode-button', testContainer)).not.to.exist;
  });
});
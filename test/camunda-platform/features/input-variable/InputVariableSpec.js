import {
  bootstrapCamundaPlatformModeler,
  inject,
  triggerInputEvent,
  triggerMouseEvent
} from '../../../helper';

import { query as domQuery } from 'min-dom';

import TestContainer from 'mocha-test-container-support';

import simpleXML from './InputVariable.dmn';


describe('camunda-platform/input-variable', function() {

  beforeEach(bootstrapCamundaPlatformModeler(simpleXML, {
    common: {
      debounceInput: false
    }
  }));

  let testContainer;

  beforeEach(function() {
    testContainer = TestContainer.get(this);
  });


  function openEditor(columnId) {
    const cellEl = domQuery(`[data-col-id="${columnId}"]`, testContainer);

    // open input editor
    triggerMouseEvent(cellEl, 'dblclick');

    // return input editor
    return domQuery('.input-edit', testContainer);
  }

  beforeEach(function() {
    openEditor('input1');
  });


  it('set', inject(function(elementRegistry) {

    // given
    const inputBo = elementRegistry.get('input1').businessObject;

    const inputEl = domQuery('.ref-input-variable', testContainer);

    inputEl.focus();

    // when
    triggerInputEvent(inputEl, 'foo bar');

    // then
    expect(inputBo.get('camunda:inputVariable')).to.equal('foo bar');
  }));


  it('unset', inject(function(elementRegistry) {

    // given
    const inputBo = elementRegistry.get('input1').businessObject;

    const inputEl = domQuery('.ref-input-variable', testContainer);

    inputEl.focus();

    // when
    triggerInputEvent(inputEl, 'foo bar');
    triggerInputEvent(inputEl, '');

    // then
    expect(inputBo.get('camunda:inputVariable')).not.to.exist;
  }));
});

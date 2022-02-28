import InputVariable from './InputVariable';

export default class InputVariableProvider {

  constructor(components) {

    components.onGetComponent('context-menu', (context = {}) => {
      if (
        context.contextMenuType === 'input-edit'
      ) {
        return InputVariable;
      }
    });
  }
}

InputVariableProvider.$inject = [
  'components'
];
import { Component } from 'inferno';

import Input from 'dmn-js-shared/lib/components/Input';

export default class InputEditor extends Component {

  constructor(props, context) {
    super(props, context);

    this._translate = context.injector.get('translate');
    this._modeling = context.injector.get('modeling');

    const debounceInput = context.injector.get('debounceInput');

    this.state = {
      inputVariable: this.props.context.input.get('camunda:inputVariable') || ''
    };

    this.handleInputVariableChange = this.handleInputVariableChange.bind(this);

    this._setInputVariable = debounceInput(this._setInputVariable);
  }

  handleInputVariableChange(value) {
    this.setState({
      inputVariable: value || undefined
    }, () => this._setInputVariable(value));
  }

  _setInputVariable(inputVariable) {
    return this._modeling.updateProperties(this.props.context.input, {

      // set to <undefined> to remove the property
      'camunda:inputVariable': inputVariable || undefined
    });
  }

  render() {
    const { inputVariable } = this.state;

    return (
      <div className="context-menu-container">
        <div className="dms-form-control">
          <label className="dms-label">
            {
              this._translate('Input Variable')
            }
          </label>

          <Input
            className="ref-input-variable"
            value={ inputVariable || '' }
            onInput={ this.handleInputVariableChange }
            placeholder={ this._translate('cellInput') } />
        </div>
      </div>
    );
  }
}

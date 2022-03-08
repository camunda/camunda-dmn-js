# camunda-dmn-js

[![CI](https://github.com/camunda/camunda-dmn-js/workflows/CI/badge.svg)](https://github.com/camunda/camunda-dmn-js/actions?query=workflow%3ACI)


Embeddable Camunda modeling distributions based on [dmn-js](https://github.com/bpmn-io/dmn-js).

## Usage

This project is designed to deliver different DMN modeling distributions. Instead of creating custom Modeler implementations based on [dmn-js](https://github.com/bpmn-io/dmn-js), choose one of the existing packages to mirror the modeling experience of [Camunda's modeling](https://github.com/camunda/camunda-modeler/) products.

Use a pre-packaged distribution

```html
<link rel="stylesheet" href="https://unpkg.com/camunda-dmn-js/dist/assets/camunda-platform-modeler.css" />

<script src="https://unpkg.com/camunda-dmn-js/dist/camunda-platform-modeler.development.js"></script>
```

or install it via npm

```js
import { CamundaPlatformModeler as DmnModeler } from 'camunda-dmn-js';

import 'camunda-dmn-js/dist/assets/camunda-platform-modeler.css';
```

into your web-application.

```js
var dmnModeler = new DmnModeler({
  container: '#canvas',
  drd: {
    propertiesPanel: {
      parent: '#properties-container'
    }
  }
});

try {

  await dmnModeler.importXML(someDiagram);

  console.log('success!');
} catch (err) {

  console.error('something went wrong:', err);
}
```

Checkout [the docs](./docs/DISTRIBUTIONS.md) to learn more about the available distributions.

## Build and Run

Prepare the project by installing all dependencies:

```sh
npm install
```

Then, depending on your use-case, you may run any of the following commands:

```sh
# build the library and run all tests
npm run all

# spin up a single local camunda platform modeler instance
npm run start:platform

# run the full development setup
npm run dev
```

## Related

camunda-dmn-js builds on top of a few powerful tools:

* [dmn-js](https://github.com/bpmn-io/dmn-js): View and edit DMN 1.3 diagrams in the browser
* [diagram-js](https://github.com/bpmn-io/diagram-js): Diagram rendering and editing toolkit

## License

MIT

Uses [dmn-js](https://github.com/bpmn-io/dmn-js) licensed under the bpmn.io license.

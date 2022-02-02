# Distributions

This document lists and describes all available distributions.

## Base Modeler

This delivers the basic DMN modeling experience of the [Camunda Modeler](https://github.com/camunda/camunda-modeler/), without any process engine specific behaviors.

This includes a set of extension modules, as follows

  * [diagram-js-origin](https://github.com/bpmn-io/diagram-js-origin) - A point of origin cross and contour for diagram-js (disabled as default)
  * [@bpmn-io/align-to-origin](https://github.com/bpmn-io/align-to-origin) - Nicely align your diagrams to the coordinate origin (enabled as default)

Install and import the Modeler via npm to include it in your application.

```js
import DmnModeler from 'camunda-dmn-js/lib/base/Modeler';

import 'camunda-dmn-js/dist/assets/base-modeler.css';

var dmnModeler = new DmnModeler({
  container: '#canvas',
  propertiesPanel: {
    parent: '#properties'
  }
});
```

## Camunda Platform Modeler

This delivers a distribution to mirror the modeling experience of the Camunda Modeler to work on the Camunda Platform.

The Modeler includes all extensions provided by the [base distribution](#base-modeler). To provide the Camunda Platform specific properties, it includes additionally:

  * [camunda-bpmn-moddle](https://github.com/camunda/camunda-bpmn-moddle) - Camunda moddle extensions for DMN
  * TODO

```js
import DmnModeler from 'camunda-dmn-js/lib/camunda-platform/Modeler';

import 'camunda-dmn-js/dist/assets/camunda-platform-modeler.css';

var dmnModeler = new DmnModeler({
  container: '#canvas',
  propertiesPanel: {
    parent: '#properties'
  }
});
```

## Camunda Cloud Modeler

This delivers a distribution to mirror the modeling experience of the Camunda Modeler to work on Camunda Cloud.

The Modeler includes all extensions provided by the [base distribution](#base-modeler). To provide the Camunda Cloud specific properties, it includes additionally:

* TODO

```js
import DmnModeler from 'camunda-dmn-js/lib/camunda-cloud/Modeler';

import 'camunda-dmn-js/dist/assets/camunda-cloud-modeler.css';

var dmnModeler = new DmnModeler({
  container: '#canvas',
  propertiesPanel: {
    parent: '#properties'
  }
});
```

## Build your own

By design, dmn-js applications are easy to extend. Therefore it's possible to build your own Modeler out of the provided packages.

Refer to the [dmn-js-examples](https://github.com/bpmn-io/dmn-js-examples) directory to get some inspiration.
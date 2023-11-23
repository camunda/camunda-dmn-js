# Changelog

All notable changes to [camunda-dmn-js](https://github.com/camunda/camunda-dmn-js) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 1.7.0

* `DEPS`: update to `dmn-js@14.7.1`

### Key Changes in Modeling

* `FEAT`: provide element ID in variable suggestions ([#83](https://github.com/camunda/camunda-dmn-js/issues/83))

## 1.6.0

* `DEPS`: update to `dmn-js-properties-panel@3.2.1`
* `DEPS`: update to `diagram-js@12.8.0`

### Key Changes in Propertie Panel

* `FEAT`: support documentation fields ([dmn-js-properties-panel#62](https://github.com/bpmn-io/dmn-js-properties-panel/issues/62))

## 1.5.0

* `DEPS`: update to `dmn-js@14.7.0`
* `DEPS`: update to `diagram-js@12.7.2`

### Key Changes in Modeling

* `FEAT`: adjust selection outline to shapes ([dmn-js#799](https://github.com/bpmn-io/dmn-js/issues/799))
* `FEAT`: implement search in DRD ([dmn-js#792](https://github.com/bpmn-io/dmn-js/pull/792))
* `FIX`: make literal expression box grow with content ([dmn-js#789](https://github.com/bpmn-io/dmn-js/issues/789))
* `FIX`: add missing translations ([dmn-js#793](https://github.com/bpmn-io/dmn-js/issues/793))

## 1.4.0

* `DEPS`: update to `dmn-js@14.5.0`
* `DEPS`: update to `diagram-js@12.5.0`

### Key Changes in Modeling

* `FEAT`: implement variable suggestions ([dmn-js#785](https://github.com/bpmn-io/dmn-js/issues/785))

## 1.3.3

* `DEPS`: update to `dmn-js@14.4.3`

### Key Changes in Modeling

* `FIX`: make FEEL editor in literal expression save value ([dmn-js#786](https://github.com/bpmn-io/dmn-js/issues/786))

## 1.3.2

* `DEPS`: update to `dmn-js@14.4.2`

### Key Changes in Modeling

* `FIX`: display literal expression autocomplete in correct position

## 1.3.1

* `DEPS`: update to `dmn-js@14.4.1`

## 1.3.0

* `DEPS`: update to `dmn-js@14.4.0`

### Key Changes in Modeling

* `FEAT`: use FEEL editor in literal expression editor ([bpmn-io/dmn-js#780](https://github.com/bpmn-io/dmn-js/issues/780))

## 1.2.1

* `DEPS`: update to `dmn-js@14.3.1`

### Key Changes in Modeling

* `FIX`: display FEEL autocomplete in correct position
* `FIX`: increase decision table cell editor line height

## 1.2.0

* `DEPS`: update to `dmn-js@14.3.0`

### Key Changes in Modeling

* `FEAT`: use FEEL editor in decision table cell editor ([bpmn-io/dmn-js#774](https://github.com/bpmn-io/dmn-js/issues/774))
* `FEAT`: use FEEL editor in decision table input expression ([bpmn-io/dmn-js#768](https://github.com/bpmn-io/dmn-js/issues/768))

## 1.1.0

* `DEPS`: bump to `dmn-js-properties-panel@3`

## 1.0.0

* `DEPS`: bump to `dmn-js-properties-panel@2`

### Breaking Changes

* Properties panel open state no longer handled within the panel.

## 0.10.1

* `DEPS`: update to `diagram-js@12`
* `DEPS`: update to `dmn-js@14.1.5`

### Key Changes in Modeling

* `FIX`: fix crashes when `typeRef` is not defined

## 0.10.0

* `FEAT`: add grid ([#67](https://github.com/camunda/camunda-dmn-js/pull/67))
* `DEPS`: update to `diagram-js@11.12.0`
* `DEPS`: update to `dmn-js@14.1.1`
* `DEPS`: update to `bpmn-io/properties-panel@1.7.0`
* `DEPS`: update to `dmn-js-properties-panel@1.3.2`

## 0.9.0

* `DEPS`: update to `diagram-js@11.9.0`
* `DEPS`: update to `@bpmn-io/properties-panel@1.3.1`
* `DEPS`: update to `dmn-js@14.1.0`

### Key Changes in Modeling

* `FEAT`: set decision table header as title

## 0.8.1

* `DEPS`: update to `dmn-js@14.0.2`

## 0.8.0

* `DEPS`: update to `dmn-js@14`
* `DEPS`: update to `@bpmn-io/properties-panel@1`

### Breaking Changes
* New popup menu UI introduced with `diagram-js@11` / `dmn-js@14`. See [`diagram-js` breaking changes and migration guide](https://github.com/bpmn-io/diagram-js/blob/develop/CHANGELOG.md#breaking-changes).

## 0.7.0

* `DEPS`: update to `diagram-js@9.9.0`
* `DEPS`: update to `dmn-js@13.0.0`
* `DEPS`: update to `dmn-js-properties-panel@1.2.1`
* `DEPS`: update to `@bpmn-io/properties-panel@0.22.0`
* `DEPS`: update to `min-dash@4.0.0`
* `DEPS`: update to `min-dom@4.0.0`

## 0.6.1

* `CHORE`: remove unused properties-panel peer dependency ([#23](https://github.com/camunda/camunda-dmn-js/pull/23))

## 0.6.0

* `DEPS`: update to `dmn-js@12.3.0` ([changelog](https://github.com/bpmn-io/dmn-js/blob/develop/packages/dmn-js/CHANGELOG.md#1230))
* `DEPS`: update to `dmn-js-properties-panel@1.1.1` ([changelog](https://github.com/bpmn-io/dmn-js-properties-panel/blob/master/CHANGELOG.md#111))
* `DEPS`: update to `diagram-js@8.9.0` ([changelog](https://github.com/bpmn-io/diagram-js/blob/master/CHANGELOG.md#890))

## 0.5.0

* `DEPS`: update to `dmn-js@12.2.0` ([changelog](https://github.com/bpmn-io/dmn-js/blob/develop/packages/dmn-js/CHANGELOG.md#1220))

## 0.4.1

* `DEPS`: update to `diagram-js@8.7.0` ([changelog](https://github.com/bpmn-io/diagram-js/blob/master/CHANGELOG.md#870))

## 0.4.0

* `FEAT`: temporarily disable overview ([#18](https://github.com/camunda/camunda-dmn-js/pull/18))
* `DEPS`: update to `dmn-js-properties-panel@1.1.0` ([changelog](https://github.com/bpmn-io/dmn-js-properties-panel/blob/master/CHANGELOG.md#110))

## 0.3.0

* `FEAT`: add overview ([#2](https://github.com/camunda/camunda-dmn-js/issues/2))
* `DEPS`: update dependencies

## 0.2.3

* `DEPS`: update to `dmn-js-properties-panel@1.0.0-alpha.3`

## 0.2.2

* `DEPS`: peer depend on `dmn-js`

## 0.2.1

* `DEPS`: update to `dmn-js-properties-panel@1.0.0-alpha.2`
* `DEPS`: update to `dmn-js@12.1.0`

## 0.2.0

* `FEAT`: move `disableAdjustOrigin` config to common/drd section

## 0.1.2

* `FIX`: move `dmn-js-properties-panel` to peer dependencies

## 0.1.1

* `FIX`: move `inferno` and `@bpmn-io/properties-panel` to peer dependencies

## 0.1.0

* `CHORE`: first release 🎉

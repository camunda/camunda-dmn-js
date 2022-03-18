import Viewer from 'dmn-js-drd/lib/NavigatedViewer';

import { containsDi } from 'dmn-js-shared/lib/util/DiUtil';
import OpenDrgElementModule from './open-drg-element';

export function createOverviewModule() {
  const overviewContainer = new OverviewContainer();

  return {
    __init__: [ 'overview' ],
    overview: [ 'type', Overview ],
    overviewContainer: [ 'value', overviewContainer ]
  };
}

class OverviewContainer {
  constructor() {
    this._viewer = new Viewer({
      drdRenderer: {
        defaultStrokeColor: 'var(--default-stroke-color)',
        defaultFillColor: 'var(--default-fill-color)'
      },
      additionalModules: [
        createNoopModule('definitionPropertiesView', 'definitionPropertiesPaletteAdapter'),
        createNoopModule('selection', 'selectionVisuals', 'selectionBehavior'),
        OpenDrgElementModule,
        { overviewContainer: [ 'value', this ] }
      ]
    });

    const container = this._viewer.get('canvas').getContainer();
    container.classList.add('djs-overview-container');

    this._openDrgElement = this._openDrgElement.bind(this);
    this._onViewsChanged = this._onViewsChanged.bind(this);
    this.attach = this.attach.bind(this);
    this.detach = this.detach.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  init(dmnjs, config) {
    if (this._dmnjs) {
      return;
    }

    this._dmnjs = dmnjs;
    this._parent = config.parent;

    dmnjs.on('import.done', this.attach);
    dmnjs.on('views.changed', this._onViewsChanged);
    dmnjs.on('attach', this.attach);
    dmnjs.on('detach', this.detach);
    this.on('openDrgElement', this._openDrgElement);
  }

  attach() {
    if (this._parent && this._dmnjs.getActiveView().type !== 'drd') {
      this.attachTo(this._parent);
    }
  }

  attachTo(parent) {
    this._viewer.attachTo(parent);
  }

  detach() {
    this._viewer.detach();
  }

  on(event, priority, listener) {
    this._viewer.on(event, priority, listener);
  }

  off(event, listener) {
    this._viewer.off(event, listener);
  }

  destroy() {
    if (this._dmnjs) {
      this._dmnjs.off('import.done', this.attach);
      this._dmnjs.off('views.changed', this._onViewsChanged);
      this._dmnjs.off('attach', this.attach);
      this._dmnjs.off('detach', this.detach);

      this.off('openDrgElement', this._openDrgElement);
    }

    this._viewer.destroy();
  }

  refresh() {
    const definitions = this._dmnjs.getDefinitions();

    if (!containsDi(definitions)) {
      return Promise.resolve();
    }

    return this._viewer.open(definitions);
  }

  get(id) {
    return this._viewer.get(id);
  }

  _openDrgElement(event) {
    const elementId = event.id;
    const views = this._dmnjs.getViews();
    const view = views.find(view => view.element.id === elementId);
    const activeView = this._dmnjs.getActiveView();

    if (view !== activeView) {
      this._dmnjs.open(view);
    }
  }

  _onViewsChanged(event) {
    const { activeView } = event;

    let shouldRecenter = false;

    // center opened element if moving from drd
    if (this._previousActiveView && this._previousActiveView.type === 'drd') {
      shouldRecenter = true;
    }

    // update previous active view
    this._previousActiveView = activeView;

    const id = activeView.element.id;

    return this.refresh().then(() => {
      this._viewer.get('eventBus').fire('drgElementOpened', {
        id,
        shouldRecenter
      });
    });
  }
}

function Overview(overviewContainer, config = {}, dmnjs, eventBus) {
  overviewContainer.init(dmnjs, config);

  eventBus.on('commandStack.changed', () => {
    overviewContainer.refresh();
  });

  eventBus.on([ 'table.destroy', 'viewer.destroy' ], () => {
    overviewContainer.destroy();
  });

  eventBus.on('attach', () => {
    overviewContainer.attach();
  });

  eventBus.on('detach', () => {
    overviewContainer.detach();
  });
}

Overview.$inject = [ 'overviewContainer', 'config.overview', '_parent', 'eventBus' ];

function createNoopModule(...moduleNames) {
  const module = {};

  for (const name of moduleNames) {
    module[name] = [ 'value', null ];
  }

  return module;
}

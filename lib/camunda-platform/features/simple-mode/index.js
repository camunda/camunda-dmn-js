// disables simple edit mode for unsupported data types
export default {
  simpleDurationEdit: [ 'type', noop ],
  simpleDateTimeEdit: [ 'type', noop ],
  simpleTimeEdit: [ 'type', noop ]
};

function noop() {}

import { Map, fromJS } from 'immutable';

var OPEN_DIALOG = 'c2-dialog/open-dialog';
var CLOSE_DIALOG = 'c2-dialog/close-dialog';

export var openDialog = function openDialog(id, component) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var channel = arguments[3];

  return { type: OPEN_DIALOG, id: id, component: component, props: props, channel: channel };
};

export var closeDialog = function closeDialog(id) {
  return { type: CLOSE_DIALOG, id: id };
};

export function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Map();
  var action = arguments[1];

  switch (action.type) {
    case OPEN_DIALOG:
      return state.set(action.id, fromJS({
        id: action.id,
        channel: action.channel,
        component: action.component,
        props: action.props || {}
      }));
    case CLOSE_DIALOG:
      return state.delete(action.id);
    default:
      return state;
  }
}

reducer.key = 'c2-dialog';

export var dialogs = function dialogs(state, _ref) {
  var channel = _ref.channel;

  var defaultChannel = 'c2-dialog/app';
  return state.get(reducer.key, Map()).toList().filter(function (d) {
    return (d.get('channel') || defaultChannel) === (channel || defaultChannel);
  });
};
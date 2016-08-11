// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
function CustomEvent(event, params) {
  params = params || {bubbles: false, cancelable: false, detail: undefined};
  const evt = document.createEvent('CustomEvent');

  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
}

CustomEvent.prototype = window.Event.prototype;

export default typeof window.CustomEvent === 'function' ? window.CustomEvent : CustomEvent;

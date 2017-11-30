/**
 *
 * @param {!Node} element DOM element that is going to be changed
 * @param {!string} property CSS property that is going to be change
 * @param {!Object} values Object with parts of the changing `property` with their new values
 *
 * @returns {?Node} the changed DOM element
 */
export default function updateCSSPropertyString(element, property, values) {
  const propertyValue = element.style[property];
  const newPropertyValue = Object.getOwnPropertyNames(values).reduce((acc, rule) => {
    const value = !values[rule] ? '' : `${rule}(${values[rule]})`;

    return ~acc.indexOf(rule) ?
      acc.replace(new RegExp(`${rule}\\([^\\)]+?\\)`), value) :
      [acc, value].join(' ');
  }, propertyValue);

  if (propertyValue !== newPropertyValue) {
    element.style[property] = newPropertyValue;
  }

  return element;
}

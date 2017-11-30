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
  let newPropertyValue = propertyValue;

  for (const rule in values) {
    if (values.hasOwnProperty(rule)) {
      const value = values[rule];

      if (value) {
        newPropertyValue = -1 === newPropertyValue.indexOf(rule) ?
          `${newPropertyValue} ${rule}(${value})` :
          newPropertyValue.replace(new RegExp(`${rule}\\([^\\)]+?\\)`), `${rule}(${value})`);
      }
    }
  }

  if (propertyValue !== newPropertyValue) {
    element.style[property] = newPropertyValue;
  }

  return element;
}

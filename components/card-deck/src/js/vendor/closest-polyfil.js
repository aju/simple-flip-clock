// IE/Edge/OperaMini do not support Node.closest yet
function closest(el, sel) {
  do {
    if ((el.matches && el.matches(sel)) || (el.matchesSelector && el.matchesSelector(sel))) {
      return el;
    }
    el = el.parentElement;
  } while (el);
  return null;
}

export default closest;

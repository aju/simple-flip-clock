import {onTransitionEnd} from './animation-helper';

const OVERLAY_CLASS = 'buic-eh-overlay';
const OVERLAY_ACTIVE_CLASS = 'buic-eh-overlay--active';
const NEW_CONTAINER_CLASS = 'buic-eh-container';

class ElementHighlighter {
  constructor({element, container}) {
    this.element = element;
    this.container = container;

    this.shown = false;
    this.placeholder = null;
    this.overlay = null;
  }

  show(callback) {
    if (this.shown) {
      if (typeof callback === 'function') {
        callback(null);
      }

      return;
    }

    // setup
    const containerBcr = this.container.getBoundingClientRect();
    const elementBcr = this.element.getBoundingClientRect();
    const elementStyles = window.getComputedStyle(this.element);
    const windowScrollPos = {
      left: window.scrollX,
      top: window.scrollY
    };
    const elementParent = this.element.parentNode;

    // replace original highlighted element with a placeholder
    const placeholder = document.createElement('div');

    placeholder.style.width = elementBcr.width + 'px';
    placeholder.style.height = elementBcr.height + 'px';
    placeholder.style.marginLeft = elementStyles.marginLeft;
    placeholder.style.marginRight = elementStyles.marginRight;
    placeholder.style.marginTop = elementStyles.marginTop;
    placeholder.style.marginBottom = elementStyles.marginBottom;
    placeholder.style.position = elementStyles.position;
    
    elementParent.replaceChild(placeholder, this.element);

    // create an overlay
    const overlay = document.createElement('div');

    overlay.classList.add(OVERLAY_CLASS);
    overlay.style.width = containerBcr.width + 'px';
    overlay.style.height = containerBcr.height + 'px';
    overlay.style.left = (containerBcr.left + windowScrollPos.left) + 'px';
    overlay.style.top = (containerBcr.top + windowScrollPos.top) + 'px';

    // create a container for highlighted element to make sure it maintains size
    const newContainer = document.createElement('div');

    newContainer.classList.add(NEW_CONTAINER_CLASS);
    newContainer.style.width = elementBcr.width + 'px';
    newContainer.style.height = elementBcr.height + 'px';
    newContainer.style.left = (elementBcr.left + windowScrollPos.left) + 'px';
    newContainer.style.top = (elementBcr.top + windowScrollPos.top) + 'px';

    // put everything together
    newContainer.appendChild(this.element);
    document.body.appendChild(overlay);
    document.body.appendChild(newContainer);

    if (typeof callback === 'function') {
      onTransitionEnd(overlay, () => callback(overlay));
    }

    // start animation
    overlay.getBoundingClientRect();
    overlay.classList.add(OVERLAY_ACTIVE_CLASS);

    // update status
    this.overlay = overlay;
    this.placeholder = placeholder;
    this.shown = true;
  }

  hide(callback) {
    if (!this.shown) {
      if (typeof callback === 'function') {
        callback(null);
      }

      return;
    }

    onTransitionEnd(this.overlay, () => {
      const newContainer = this.element.parentNode;

      // move highlighted element to its original place in DOM
      this.placeholder.parentNode.replaceChild(this.element, this.placeholder);

      // remove helper container and overlay
      newContainer.parentNode.removeChild(newContainer);
      this.overlay.parentNode.removeChild(this.overlay);

      if (typeof callback === 'function') {
        callback(this.overlay);
      }

      // update status
      this.placeholder = null;
      this.overlay = null;
      this.shown = false;
    });

    // start animation
    this.overlay.classList.remove(OVERLAY_ACTIVE_CLASS);
  }

}

export default ElementHighlighter;

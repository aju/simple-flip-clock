class FlipCard {
  /**
   * @param {!Node} element - parent node
   * @param {?boolean} vertical - controls if animation should be vertical or horizontal
   * @param {?Number} duration - animation duration in ms
   */
  constructor({element, vertical = false, duration = 800}) {
    this.element = element;
    this.vertical = !!vertical;
    this.duration = duration;
    this.flipped = false;

    this.front = element.querySelector('.fc-box__front');
    this.back = element.querySelector('.fc-box__back');

    if (vertical) {
      this.element.classList.add('fc-box--vertical');
    }

    this.front.addEventListener('animationend', this._onAnimationEnd.bind(this));
  }

  flip() {
    this.front.style.animation = this.vertical ? 'fcBoxFlipHorizontallyFront' : 'fcBoxFlipVerticallyFront';
    this.front.style.animationDuration = this.duration + 'ms';
    this.front.style.animationTimingFunction = 'ease-in-out';
    this.front.style.animationDirection = this.flipped ? 'reverse' : 'normal';

    this.back.style.animation = this.vertical ? 'fcBoxFlipHorizontallyBack' : 'fcBoxFlipVerticallyBack';
    this.back.style.animationDuration = this.duration + 'ms';
    this.back.style.animationTimingFunction = 'ease-in-out';
    this.back.style.animationDirection = this.flipped ? 'reverse' : 'normal';

  }

  _onAnimationEnd(e) {
    if (e.target !== this.front) {
      return;
    }

    const flippedClass = this.vertical ? 'fc-box--flipped-vertically' : 'fc-box--flipped';

    this.flipped = !this.flipped;

    if (this.flipped) {
      this.element.classList.add(flippedClass);
    } else {
      this.element.classList.remove(flippedClass);
    }

    this.front.style.animation = '';
    this.back.style.animation = '';
  }
}

export default FlipCard;

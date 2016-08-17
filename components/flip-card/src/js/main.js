class FlipCard {
  /**
   * @param {!Node} element
   * @param {?boolean} vertical
     */
  constructor({element, vertical=false}) {
    this.element = element;
    this.vertical = !!vertical;

    if(vertical) {
      this.element.classList.add('fc-box--vertical');
    }
  }

  flip() {
    const flipClass = this.vertical ? 'fc-box--flipped-vertically' : 'fc-box--flipped';
    this.element.classList.toggle(flipClass);
  }
}

export default FlipCard;

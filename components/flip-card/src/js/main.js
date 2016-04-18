class FlipCard {
  constructor({element, buttonSelector = '.js-flip-card-button'}) {
    this.element = element;

    this.buttons = [...element.querySelectorAll(buttonSelector)];
    this.buttons.forEach(button => button.addEventListener('click', this.onButtonClick.bind(this)));
  }
  onButtonClick(event) {
    event.preventDefault();
    this.flip();
  }
  flip() {
    this.element.classList.toggle('fc-box--flipped');
  }
}


window.FlipCard  = FlipCard;

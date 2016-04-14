class SimpleFlipClock {
  constructor({element, currentNumber, maxNumber = 9, minNumber = 0}) {
    this.element = element;
    this.currentNumber = currentNumber;
    this.maxNumber = maxNumber;
    this.minNumber = minNumber;

    this.upPartDom = element.querySelector('.sfc-number__up');
    this.downPartDom = element.querySelector('.sfc-number__down');
  }

  update(number) {
    const numberElementHtml = this.getNumberElementHtml(number);

    this.upPartDom.insertAdjacentHTML('beforeend', numberElementHtml);
    this.downPartDom.insertAdjacentHTML('beforeend', numberElementHtml);

    if (this.upPartDom.children.length === 3) {
      this.upPartDom.removeChild(this.upPartDom.children[0]);
      this.downPartDom.removeChild(this.downPartDom.children[0]);
    }

    this.element.getBoundingClientRect();

    this.upPartDom.children[0].classList.remove('sfc-number__element--active');
    this.downPartDom.children[0].classList.remove('sfc-number__element--active');
    this.upPartDom.children[0].classList.add('sfc-number__element--before');
    this.downPartDom.children[0].classList.add('sfc-number__element--before');

    this.upPartDom.children[1].classList.add('sfc-number__element--active');
    this.downPartDom.children[1].classList.add('sfc-number__element--active');

    this.currentNumber = number;
  }

  increment() {
    let number = this.currentNumber + 1;

    if (number > this.maxNumber) {
      number = this.minNumber;
    }
    this.update(number);
  }

  decrement() {
    let number = this.currentNumber - 1;

    if (number < this.minNumber) {
      number = this.maxNumber;
    }
    this.update(number);
  }

  getNumberElementHtml(number) {
    return `
        <li class="sfc-number__element">
          <div class="sfc-number__digit">
            <div class="sfc-number__digit-full">${number}</div>
          </div>
        </li>
      `;
  }
}

window.SimpleFlipClock  = SimpleFlipClock;

/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 * Modifications copyright (C) 2016 Brainly
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import closest from './vendor/closest-polyfil';

const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';

class CardDeck {
  /**
   * @param {!Node} element root DOM element
   * @param {?function(CardDeck, Node, string)} discardCallback function called when card is discarded
   * @param {?function(CardDeck, Node, float)} dragCallback function called when card is dragged
   */
  constructor({element, discardCallback = null, dragCallback = null}) {
    this.root = element;
    this.cards = [...this.root.querySelectorAll('.cd-card')];

    this._discardCallback = discardCallback;
    this._dragCallback = dragCallback;
    this._onStart = this._onStart.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onEnd = this._onEnd.bind(this);
    this._update = this._update.bind(this);
    this.rafId = null;
    this.targetBCR = null;
    this.target = null;
    this.startX = 0;
    this.currentX = 0;
    this.screenX = 0;

    this.scatterCards();
    this.enableDragging();
  }

  scatterCards() {
    this.cards.forEach(card => {
      const rotation = Math.round(Math.random() * 4 - 2);

      card.style.transform = `rotateZ(${rotation}deg)`;
    });
  }

  swipeCardLeft() {
    this._animateCardToTheEnd({
      card: this.getTopCard(),
      direction: DIRECTION_LEFT
    });
  }

  swipeCardRight() {
    this._animateCardToTheEnd({
      card: this.getTopCard(),
      direction: DIRECTION_RIGHT
    });
  }

  enableDragging() {
    this.root.addEventListener('touchstart', this._onStart);
    this.root.addEventListener('touchmove', this._onMove);
    this.root.addEventListener('touchend', this._onEnd);
    this.root.addEventListener('touchcancel', this._onEnd);

    this.root.addEventListener('mousedown', this._onStart);
    this.root.addEventListener('mousemove', this._onMove);
    this.root.addEventListener('mouseup', this._onEnd);
  }

  disableDragging() {
    // if card is currently being dragged, let it go
    this._onEnd();

    this.root.removeEventListener('touchstart', this._onStart);
    this.root.removeEventListener('touchmove', this._onMove);
    this.root.removeEventListener('touchend', this._onEnd);
    this.root.removeEventListener('touchcancel', this._onEnd);

    this.root.removeEventListener('mousedown', this._onStart);
    this.root.removeEventListener('mousemove', this._onMove);
    this.root.removeEventListener('mouseup', this._onEnd);
  }

  /**
   * @returns {?Node} node representing the top card
   */
  getTopCard() {
    if (!this.cards.length) {
      return null;
    }

    return this.cards[this.cards.length - 1];
  }

  _onStart(evt) {
    if (this.target) {
      return;
    }

    const target = closest(evt.target, '.cd-card');

    // allow card to be dragged only if it exists and is on the top of the deck
    if (!target || target !== this.getTopCard()) {
      return;
    }

    this.target = target;
    this.targetBCR = this.target.getBoundingClientRect();

    this.startX = evt.pageX || evt.touches[0].pageX;
    this.currentX = this.startX;

    this.target.style.willChange = 'transform';

    this.rafId = requestAnimationFrame(this._update);

    if (target === evt.target) {
      evt.preventDefault();
    }
  }

  _onMove(evt) {
    if (!this.target) {
      return;
    }

    if (evt.pageX !== undefined) {
      this.currentX = evt.pageX;
    } else {
      this.currentX = evt.touches[0].pageX;
    }

    evt.preventDefault();
  }

  _onEnd() {
    if (!this.target) {
      return;
    }

    const screenX = this.currentX - this.startX;

    if (Math.abs(screenX) > this.targetBCR.width * 0.35) {
      this._animateCardToTheEnd({
        card: this.target,
        direction: this.screenX < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT
      });
    } else {
      this._animateCardBackInPlace({
        card: this.target
      });
    }

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this._resetTarget();
  }

  _update() {
    this.rafId = requestAnimationFrame(this._update);

    if (!this.target) {
      return;
    }

    const newScreenX = this.currentX - this.startX;

    if (this.screenX === newScreenX) {
      return;
    }

    this.screenX = newScreenX;
    this.target.style.transition = 'initial';
    this.target.style.transform = `translateX(${this.screenX}px)`;

    if (typeof this._dragCallback === 'function') {
      const distance = this.screenX / this.targetBCR.width;

      this._dragCallback(this, this.target, distance);
    }
  }

  _animateCardBackInPlace({card}) {
    card.style.transition = 'transform 200ms ease-in-out';
    card.style.transform = 'translateX(0)';
  }

  _animateCardToTheEnd({card, direction}) {
    // update cards array to reflect actual card order
    this.cards.splice(this.cards.indexOf(card), 1);
    this.cards.unshift(card);

    if (typeof this._discardCallback === 'function') {
      this._discardCallback(this, card, direction);
    }

    const cardWidth = card.getBoundingClientRect().width;
    const midStop = direction === DIRECTION_LEFT ? -cardWidth : cardWidth;
    const rotation = Math.round(Math.random() * 4 - 2);
    let step = 1;

    card.style.transition = 'transform 200ms ease-out';
    card.style.transform = `translateX(${midStop}px)`;

    card.addEventListener('transitionend', function animationStep(event) {
      if (event.target !== card) {
        return;
      }

      if (step === 1) { // slide in
        card.style.transition = 'transform 300ms ease-out';
        card.style.transform = 'translateX(0) scale(0.9)';
        card.style.zIndex = 0;
      } else if (step === 2) { // move back up
        card.style.transition = 'transform 200ms ease-out';
        card.style.transform = `rotateZ(${rotation}deg) scale(1)`;
      } else if (step === 3) { // cleanup
        const parent = card.parentNode;

        parent.insertBefore(card, parent.firstChild);

        card.style.zIndex = 1;
        card.removeEventListener('transitionend', animationStep);
      }

      step++;
    });
  }

  _resetTarget() {
    if (!this.target) {
      return;
    }

    this.target.style.willChange = 'initial';
    this.target = null;
  }
}

export default CardDeck;

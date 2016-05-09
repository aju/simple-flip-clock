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

class CardDeck {
  constructor({element}) {
    this.root = element;
    this.cards = [...this.root.querySelectorAll('.cd-card')];

    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.update = this.update.bind(this);
    this.targetBCR = null;
    this.target = null;
    this.startX = 0;
    this.currentX = 0;
    this.screenX = 0;
    this.targetX = 0;
    this.draggingCard = false;

    this.addEventListeners();

    this.scatterCards();

    requestAnimationFrame(this.update);
  }

  scatterCards() {
    this.cards.forEach(card => {
      const rotation = Math.round(Math.random() * 4 - 2);

      card.style.transform = `rotateZ(${rotation}deg)`;
    });
  }

  addEventListeners() {
    this.root.addEventListener('touchstart', this.onStart);
    this.root.addEventListener('touchmove', this.onMove);
    this.root.addEventListener('touchend', this.onEnd);
    this.root.addEventListener('touchcancel', this.onEnd);

    this.root.addEventListener('mousedown', this.onStart);
    this.root.addEventListener('mousemove', this.onMove);
    this.root.addEventListener('mouseup', this.onEnd);
  }

  onStart(evt) {
    if (this.target) {
      return;
    }

    if (!evt.target.classList.contains('cd-card')) {
      return;
    }

    this.target = evt.target;
    this.targetBCR = this.target.getBoundingClientRect();

    this.startX = evt.pageX || evt.touches[0].pageX;
    this.currentX = this.startX;

    this.draggingCard = true;
    this.target.style.willChange = 'transform';

    evt.preventDefault();
  }

  onMove(evt) {
    if (!this.target) {
      return;
    }

    if (evt.pageX !== undefined) {
      this.currentX = evt.pageX;
    } else {
      this.currentX = evt.touches[0].pageX;
    }
  }

  onEnd(evt) {
    if (!this.target) {
      return;
    }

    this.targetX = 0;
    const screenX = this.currentX - this.startX;

    if (Math.abs(screenX) > this.targetBCR.width * 0.35) {
      this.targetX = (screenX > 0) ? this.targetBCR.width : -this.targetBCR.width;
    }

    this.draggingCard = false;
  }

  update() {

    requestAnimationFrame(this.update);

    if (!this.target) {
      return;
    }

    if (this.draggingCard) {
      this.screenX = this.currentX - this.startX;
    } else {
      this.screenX += (this.targetX - this.screenX) / 4;
    }

    const normalizedDragDistance =
      (Math.abs(this.screenX) / this.targetBCR.width);

    this.target.style.transform = `translateX(${this.screenX}px)`;

    // User has finished dragging.
    if (this.draggingCard) {
      return;
    }

    const isNearlyAtStart = (Math.abs(this.screenX) < 0.1);
    const isNearlyInvisible = (1 - Math.pow(normalizedDragDistance, 3) < 0.01);

    // If the card is nearly gone.
    if (isNearlyInvisible) {

      // Bail if there's no target or it's not attached to a parent anymore.
      if (!this.target || !this.target.parentNode) {
        return;
      }

      // Slide card to the back of the deck
      this.animateCardToTheEnd(this.target);
      this.resetTarget();

    } else if (isNearlyAtStart) {
      this.resetTarget();
    }
  }

  animateCardToTheEnd(card) {
    const midStop = this.screenX < 0 ? -this.targetBCR.width : this.targetBCR.width;
    const rotation = Math.round(Math.random() * 4 - 2);
    let step = 1;

    card.style.transition = 'transform 200ms ease-in';
    card.style.transform = `translateX(${midStop}px) scale(0.9)`;

    card.addEventListener('transitionend', function animationStep() {
      if (step === 1) {
        card.style.transition = 'transform 300ms ease-out';
        card.style.transform = `translateX(0) scale(0.9) rotateZ(${rotation}deg)`;
        card.style.zIndex = 0;
      } else if (step === 2) {
        const parent = card.parentNode;

        card.removeEventListener('transitionend', animationStep);
        card.style.zIndex = 1;
        card.style.transform = `rotateZ(${rotation}deg)`;

        parent.removeChild(card);
        parent.insertBefore(card, parent.firstChild);
      }

      step++;
    });
  }

  resetTarget() {
    if (!this.target) {
      return;
    }

    this.target.style.willChange = 'initial';
    this.target = null;
  }
}

window.CardDeck = CardDeck;

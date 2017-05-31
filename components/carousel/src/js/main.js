class Carousel {
  constructor({
    element,
    slideChangeCallback = null
  }) {
    this.root = element;
    this.slider = this.root.querySelector('.buic-carousel__slider');

    this._slideChangeCallback = slideChangeCallback;

    this.slidesLength = this.slider.children.length;

    this._updateSlideWidth();

    this.currentIndex = 1;
    this.lastSlideTranslateX = 0;
    this.currentSlideTranslateX = 0;
    this.isDragged = false;
    this.isClicked = false;

    this._onStart = this._onStart.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onEnd = this._onEnd.bind(this);
    this._onClick = this._onClick.bind(this);
    this._update = this._update.bind(this);

    this.enableDragging();

    window.addEventListener('resize', this._onResize.bind(this));
  }

  next() {
    if (!this._isLastSlide()) {
      this.goTo(this.currentIndex + 1);
    }
  }

  prev() {
    if (!this._isFirstSlide()) {
      this.goTo(this.currentIndex - 1);
    }
  }

  goTo(index) {
    if (this.isDragged) {
      return;
    }

    if (index !== this.currentIndex && typeof this._slideChangeCallback === 'function') {
      this._slideChangeCallback(this, index);
    }

    this.currentIndex = index;
    this.slider.style.transform = `translateX(${-(this.currentIndex - 1) * this.slideWidth}px)`;
    this.lastSlideTranslateX = this.slideWidth * (this.currentIndex - 1);
  }

  enableDragging() {
    this.root.addEventListener('touchstart', this._onStart);
    this.root.addEventListener('touchmove', this._onMove);
    this.root.addEventListener('touchend', this._onEnd);
    this.root.addEventListener('touchcancel', this._onEnd);

    this.root.addEventListener('click', this._onClick);
    this.root.addEventListener('mousedown', this._onStart);
    this.root.addEventListener('mousemove', this._onMove);
    document.addEventListener('mouseup', this._onEnd);
  }

  disableDragging() {
    // if slide is currently being dragged, let it go
    this._onEnd();

    this.root.removeEventListener('touchstart', this._onStart);
    this.root.removeEventListener('touchmove', this._onMove);
    this.root.removeEventListener('touchend', this._onEnd);
    this.root.removeEventListener('touchcancel', this._onEnd);

    this.root.removeEventListener('mousedown', this._onStart);
    this.root.removeEventListener('mousemove', this._onMove);
    document.removeEventListener('mouseup', this._onEnd);
  }

  _onStart(event) {
    this.startX = event.touches ? event.touches[0].screenX : event.screenX;
    this.startY = event.touches ? event.touches[0].screenY : event.screenY;
    this.currentX = this.startX;
    this.currentY = this.startY;
    this.isDragged = true;
    this.rafId = requestAnimationFrame(this._update);
  }

  _onMove(event) {
    this.currentX = event.touches ? event.touches[0].screenX : event.screenX;
    this.currentY = event.touches ? event.touches[0].screenY : event.screenY;

    // this allows scrolling vertically on mobile devices
    if (Math.abs(this.currentX - this.startX) > Math.abs(this.currentY - this.startY)) {
      event.preventDefault();
    }
  }

  _onEnd() {
    if (!this.isDragged) {
      return;
    }

    this.slider.style.transition = '';

    let index = Math.round(-this.currentSlideTranslateX / this.slideWidth) + 1;

    index = Math.max(1, index);
    index = Math.min(index, this.slidesLength);

    this.isDragged = false;

    // if content is clickable, we should allow to make action when there was no change in slides
    if (this.currentIndex !== index) {
      this.isClicked = true;
    }

    this.goTo(index);

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  _onClick(event) {
    if (this.isClicked) {
      this.isClicked = false;
      event.preventDefault();
      event.stopPropagation();
    }
  }

  _update() {
    if (!this.isDragged) {
      return;
    }

    this.rafId = requestAnimationFrame(this._update);

    const screenX = this.currentX - this.startX;

    this.currentSlideTranslateX = screenX - this.lastSlideTranslateX;

    this.slider.style.transition = 'initial';
    this.slider.style.transform = `translateX(${this.currentSlideTranslateX}px)`;
  }

  _updateSlideWidth() {
    this.slideWidth = this.slider.getBoundingClientRect().width / this.slidesLength;
  }

  _isLastSlide() {
    return this.currentIndex === this.slidesLength;
  }

  _isFirstSlide() {
    return this.currentIndex === 1;
  }

  _onResize() {
    const slideWidthBefore = this.slideWidth;

    this._updateSlideWidth();

    if (slideWidthBefore !== this.slideWidth) {
      this.goTo(this.currentIndex);
    }
  }
}

export default Carousel;

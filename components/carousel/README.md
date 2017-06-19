# Carousel

Simple swipable carousel component

![carousel in action](https://cloud.githubusercontent.com/assets/1231144/20526748/b7265bf4-b0c5-11e6-8560-ff8ed2a93940.gif)

## Basic usage

Include `dist/css/default.css` and `dist/js/main.min.js` on your page.

Create basic structure:
    
     <div class="buic-carousel">
      <div class="buic-carousel__viewport">
        <div class="buic-carousel__slider">
          <div class="buic-carousel__slide">
            1st slide
          </div>
          <div class="buic-carousel__slide">
            2nd slide
          </div>
          ...
        </div>
      </div>
    </div>

Initialize component:

    <script>
      const carousel = new Carousel({element: document.querySelector('.buic-carousel')});
    </script>

### Parameters:
    element: DOM node with basic structure as specified above (.buic-carousel)
    slideChangeCallback: function called when slide has changed. Callback will be called with Carousel object as a first param and current slide index as a second param
    edgeFriction: how far user needs to drag a slide in order to change it (`[0-1]`, default - `0.15`)

### Methods
        
    disableDragging() - disable possibility of dragging slides using touch/mouse
    enableDragging() - enable possibility of dragging slides using touch/mouse
    prev() - go to the previous slide
    next() - go to the next slide
    goTo(number) - go to the slide with provided index

[DEMO](https://brainly.github.io/ui-components/components/carousel/)

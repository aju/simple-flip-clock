# Card deck

Deck of swipeable cards. Heavily based on https://github.com/GoogleChrome/ui-element-samples

## Basic usage

Include `dist/css/default.css` on your page

Include `dist/js/main.min.js` on your page

Include in your HTML

    <div class="cd-card-container">
      ...
      <div class="cd-card">card #2</div>
      <div class="cd-card">card #1</div>
    </div>

Sample usage

    <script>
      const t = new CardDeck({element: document.querySelector('.cd-card-container')});
    </script>

![result](http://i.imgur.com/airbhXs.gif)

### Parameters:

    element: dom node with basic structure as specified above

[DEMO](https://brainly.github.io/ui-components/components/card-deck/)

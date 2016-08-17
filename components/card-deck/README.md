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

    element - dom node with basic structure as specified above
    dragCallback - function called when card is dragged. Contains information about the deck, card being dragged and relative distance from the center of the deck.
    discardCallback - function called when card is discarded. Contains information about the deck, card being discarded and direction.
    cancelCallback - function called when dragged card was released and will return to the top of the deck. Contains information about the deck and the card being released.

### Methods:

    disableDragging() - disable possibility to drag cards using touch/mouse
    enableDragging() - enable possibility to drag cards using touch/mouse
    swipeCardLeft() - move top card to the bottom of the deck by swiping it to the left
    swipeCardRight() - move top card to the bottom of the deck by swiping it to the right

[DEMO](https://brainly.github.io/ui-components/components/card-deck/)

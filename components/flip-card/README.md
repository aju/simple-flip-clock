# Flip Card

Library for simple flip card effect

## Basic usage

Include `dist/css/default.css` and `dist/js/main.min.js` on your page.

Add this basic markup:

    <div class="fc-box">
        <div class="fc-box__front">your front content goes here</div>
        <div class="fc-box__back">your back content goes here</div>
    </div>

For each card create a `FlipCard` object and call `flip` method whenever you want to rotate it.

    <script>
        var fc = new FlipCard({element: document.querySelector('.fc-box')});
        fc.flip();
    </script>

![result](http://i.imgur.com/xZLaW0I.gif)

Parameters:

    element: dom node with basic structure as specified above
    vertical: decide if animation should be vertical or horizontal (default)
    duration: animation duration in milliseconds (800 by default)
    
Methods
        
    flip() - flips the card
        
[DEMO](https://brainly.github.io/ui-components/components/flip-card/)

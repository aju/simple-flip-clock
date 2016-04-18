# Flip Card

Library for simple flip card effect

## Basic usage

Include `dist/css/default.css` on your page

Include `dist/js/main.min.js` on your page

Include in your HTML

    <div class="fc-box">
        <div class="fc-box__front"></div>
        <div class="fc-box__back"></div>
      </div>

Put inside `fc-box__front` and `fc-box__back` container your custom content

Sample usage

    <script>
      var fc = new FlipCard({element: document.querySelector('.fc-box')});
    </script>

![result](https://i.gyazo.com/f21a3f54a75be9ce93690ff60493fcfb.gif)

Parameters:

    element: dom node with basic structure as specified above
    buttonSelector: selector for buttons inside container that trigger flip (default: '.js-flip-card-button')
    
Methods
        
    flip() - flips card
        
[DEMO](https://brainly.github.io/ui-components/components/flip-card/)

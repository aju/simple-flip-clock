# Simple Flip Clock

Library for simple flip clock effect

## Basic usage

Include `dist/css/default.css` on your page

Include `dist/js/main.min.js` on your page

Include in your HTML

    <div class="sfc-number">
      <ol class="sfc-number__up">
        <li class="sfc-number__element sfc-number__element--active">
          <div class="sfc-number__digit">
            <div class="sfc-number__digit-full">0</div>
          </div>
        </li>
      </ol>
      <ol class="sfc-number__down">
        <li class="sfc-number__element sfc-number__element--active">
          <div class="sfc-number__digit">
            <div class="sfc-number__digit-full">0</div>
          </div>
        </li>
      </ol>
    </div>

Sample usege

    <script>
      var sfc = new SimpleFlipClock(document.querySelector('.sfc-number'), 0);
      sfc.decrement();
    </script>

![result](https://i.gyazo.com/8925a6b8f2d4d82ee9b4307a25e48017.gif)

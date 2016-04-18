# Template

Short description

## Basic usage

Include `dist/css/default.css` on your page

Include `dist/js/main.min.js` on your page

Include in your HTML

    <div id='element'></div>

Sample usage

    <script>
      const t = new Template({element: document.querySelector('#element')});
    </script>

![result](https://i.gyazo.com/8925a6b8f2d4d82ee9b4307a25e48017.gif)

### Parameters:

    element: dom node with basic structure as specified above
    a: other param
    b: some param

### Methods
        
    a(number) - some method
    b - other method

[DEMO](https://brainly.github.io/ui-components/components/template/)

# :dizzy: Dashed Progress Bar

Canvas library for drawing an animated dashed progress bar.

## Basic usage

    <canvas id='progress-bar1'></canvas>


    const bar = new DashedProgressBar({
      canvas: document.querySelector('.progress-bar1'),
      tiles: 30,//number of "dashes"
      radius: 75,//size
      gapSize: 0.25,//0-1 size of the gap between tiles
      startWidth: 2,//animation - starting width of the tile
      endWidth: 14,//animation - end width of the tile
      animationStep: 0.015//animation - speed
    });
    
    bar.addTiles(randomAmount, '#6ed6a0');
    bar.addTiles(randomAmount2, '#ffbe32');

    d.animate(() => console.log('animation finished!'));

![result](http://i.imgur.com/EgpQFSU.gif)

For more details see [project page](https://brainly.github.io/ui-components/components/dashed-progress-bar).

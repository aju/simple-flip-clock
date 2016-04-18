# :doughnut: Doughnut Progress Bar

Canvas library for drawing an animated doughnut progress bar with conic gradient background.

Based on [this research](https://github.com/kdzwinel/progress-bar-animation), uses (simplified) [conic gradient polyfill](https://leaverou.github.io/conic-gradient/) by Lea Verou.

## Basic usage

    <canvas id='progress-bar1'></canvas>


    const d = new DoughnutProgressBar({
        element: document.querySelector('.progress-bar1'), // canvas element to use
        outerR: 70, // outer radius (doughnut size)
        innerR: 60, // inner radius (hole in the doughnut)
        colorStart: '#6ed6a0', // conic gradient start color
        colorEnd: '#5bb8ff', // conic gradient end color
        percentage: 10, // starting value (0-100)
        duration: 300 // value change animation duration in ms
    });

    d.setPercentage(50, () => console.log('animation finished!'));

![result](http://i.imgur.com/7Zmc0nI.gif)

For more details see [project page](https://brainly.github.io/ui-components/components/doughnut-progress-bar).

import easeInOutQuad from './ease-in-out-quad';
import easeSin from './ease-sin';

class DashedProgressBar {
  constructor({canvas, radius = 75, tiles = 30, gapSize = 0.25, animatedTiles = 10, startWidth = 2, endWidth = 12,
    animationStep = 0.015, backgroundColor = '#fff', inactiveTileColor = '#dde1e4'}) {
    // basic params
    this.radius = radius;
    this.tiles = tiles;
    this.gapSize = gapSize;//0-1
    this.backgroundColor = backgroundColor;
    this.inactiveTileColor = inactiveTileColor;

    // animation params
    this.animatedTiles = animatedTiles;
    this.startWidth = startWidth;
    this.endWidth = endWidth;
    this.animationStep = animationStep;

    //canvas setup
    this.margin = Math.max(this.startWidth, this.endWidth);
    this.canvas = canvas;
    this.canvas.width = this.canvas.height = this.radius * 2 + this.margin * 2;
    this.ctx = this.canvas.getContext('2d');

    //tiles
    this.tileColors = [];
  }

  addTiles(amount, color) {
    for (let i = 0; i < amount; i++) {
      this.tileColors.push(color);
    }
  }

  _drawTile(idx, color, width) {
    const offsetArc = -Math.PI / 2;// first tile should be at 12 o'clock, not 3 o'clock
    const gapArc = ((2 * Math.PI) / this.tiles) * this.gapSize;
    const barArc = ((2 * Math.PI) / this.tiles) - gapArc;

    const start = offsetArc + idx * (barArc + gapArc);
    const end = start + barArc;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;

    this.ctx.beginPath();
    this.ctx.arc(this.radius + this.margin, this.radius + this.margin, this.radius, start, end, 0);
    this.ctx.stroke();
  }

  animate(callback) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let time = 0;// 0 -> 1

    //draw gray tiles
    for (let i = 0; i < this.tiles; i++) {
      this._drawTile(i, this.inactiveTileColor, this.endWidth - 1);
    }

    const draw = () => {
      const currentIdx = Math.floor(easeInOutQuad(time) * (this.tileColors.length + this.animatedTiles));

      for (let idx = currentIdx - this.animatedTiles; idx < currentIdx; idx++) {
        if (!this.tileColors[idx]) {
          continue;
        }

        this._drawTile(idx, this.backgroundColor, Math.max(this.startWidth, this.endWidth) + 1);

        const barTime = easeSin((currentIdx - idx) / this.animatedTiles);
        const width = this.startWidth + barTime * (this.endWidth - this.startWidth);

        this._drawTile(idx, this.tileColors[idx], width);
      }

      if (time > 1) {
        if (typeof callback === 'function') {
          callback();
        }
        return;
      }

      time += this.animationStep;

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
  }
}

window.DashedProgressBar = DashedProgressBar;

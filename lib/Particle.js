export default class Particle {
  static radius = 20;

  constructor(context, x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    /** @type {CanvasRenderingContext2D} */
    this.c = context;
  }

  update = () => {
    this.draw();
  };

  draw = () => {
    this.c.fillStyle = this.color;
    this.c.strokeStyle = this.color;

    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.c.closePath();
    // this.c.fill();
    this.c.stroke();
  };
}

const sqrt = Math.sqrt;
const random = Math.random;

export default class Particle {
  static radius = 20;
  static diameter = 40;

  static newRandom = (game) => {
    const x = random() * (innerWidth - Particle.diameter) + Particle.radius;
    const y = random() * (innerHeight - Particle.diameter) + Particle.radius;

    const COLORS = ["#3288F0", "#34FA99", "#B1E33B", "#FABF34", "#F04C22"];
    const color = COLORS[Math.floor(random() * COLORS.length)];

    return new Particle(game, x, y, Particle.radius, color);
  };

  constructor(game, x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.radius = radius;
    this.diameter = 2 * this.radius;
    this.color = color;

    /** @type {CanvasRenderingContext2D} */
    this.c = game.context;
    this.particles = game.particles;
  }

  distance = (particle) => {
    const dx = particle.x - this.x;
    const dy = particle.y - this.y;

    return sqrt(dx ** 2 + dy ** 2);
  };

  update = () => {
    this.x += this.dx;
    this.y += this.dy;

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

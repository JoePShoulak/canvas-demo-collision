import { resolveCollision } from "./helper.js";
import Vector2 from "./Vector2.js";

const sqrt = Math.sqrt;
const random = Math.random;

const COLORS = ["#3288F0", "#34FA99", "#B1E33B", "#FABF34", "#F04C22"];

export default class Particle {
  static radius = 20;
  static diameter = 40;

  static minOpacity = 0.2;
  static maxOpacity = 0.6;

  static newRandom = (game) => {
    const x = random() * (innerWidth - Particle.diameter) + Particle.radius;
    const y = random() * (innerHeight - Particle.diameter) + Particle.radius;

    const color = COLORS[Math.floor(random() * COLORS.length)];

    return new Particle(game, x, y, Particle.radius, color);
  };

  constructor(game, x, y, radius, color) {
    this.x = x;
    this.y = y;

    this.mass = 1;
    this.opacity = Particle.minOpacity;

    this.velocity = Vector2.random().normal.toObject();

    this.radius = radius;
    this.diameter = this.radius * 2;
    this.color = color;

    /** @type {CanvasRenderingContext2D} */
    this.c = game.context;
    /** @type {Array} */
    this.particles = game.particles;
  }

  get verticalWallCollision() {
    return this.x < this.radius || this.x > innerWidth - this.radius;
  }

  get horizontalWallCollision() {
    return this.y < this.radius || this.y > innerHeight - this.radius;
  }

  get particleCollision() {
    return this.particles.find((particle) => {
      const distance = this.distance(particle);
      return distance == 0 ? false : distance < this.diameter;
    });
  }

  bounce = (particle) => {
    resolveCollision(this, particle);
  };

  // This also happens to handle a mouseEvent
  distance = (particle) => {
    const dx = particle.x - this.x;
    const dy = particle.y - this.y;

    return sqrt(dx ** 2 + dy ** 2);
  };

  validatePosition = () => {
    this.x = Math.max(this.x, this.radius);
    this.y = Math.max(this.y, this.radius);
    this.x = Math.min(this.x, innerWidth - this.radius);
    this.y = Math.min(this.y, innerHeight - this.radius);
  };

  update = () => {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.verticalWallCollision) this.velocity.x *= -1;
    if (this.horizontalWallCollision) this.velocity.y *= -1;

    this.validatePosition();

    const target = this.particleCollision;
    if (target) this.bounce(target);

    this.opacity = Math.max(Particle.minOpacity, this.opacity - 0.01);

    this.draw();
  };

  draw = () => {
    this.c.fillStyle = this.color;
    this.c.strokeStyle = this.color;

    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.c.closePath();
    this.c.stroke();
    this.c.save();
    this.c.globalAlpha = this.opacity;
    this.c.fill();
    this.c.restore();
  };
}

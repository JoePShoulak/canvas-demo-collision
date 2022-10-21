import { resizeCanvas } from "./lib/helper.js";
import Particle from "./lib/Particle.js";

const particleCount = 100;
const padding = 5;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");

const particles = [];

const game = {
  context: c,
  particles: particles,
};

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const setup = () => {
  particles.length = 0;

  for (let i = 0; i < particleCount; i++) {
    let newParticle;

    do {
      newParticle = Particle.newRandom(game);
    } while (
      // Check if this particle is closer than padding to another particle
      particles.some((p) => newParticle.distance(p) < p.diameter + padding)
    );

    particles.push(newParticle);
  }
};

const renderMouseEffect = () => {
  particles.forEach((particle) => {
    if (particle.distance(mouse) < mouseRadius) {
      particle.opacity = Math.min(particle.opacity + 0.05, Particle.maxOpacity);
    }
  });
};

const animate = () => {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);

  particles.forEach((particle) => particle.update());
  renderMouseEffect();
};

window.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  setup();
});

window.addEventListener("resize", () => {
  resizeCanvas(canvas);
});

const mouseRadius = 100;

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

resizeCanvas(canvas);
setup();
animate();

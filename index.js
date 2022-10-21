import { resizeCanvas } from "./lib/helper.js";
import Particle from "./lib/Particle.js";

const particleCount = 4;
const padding = 5;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");

const particles = [];

const game = {
  context: c,
  particles: particles,
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

const animate = () => {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);

  particles.forEach((particle) => particle.update());
};

window.addEventListener("contextmenu", (event) => {
  console.log("Reset called.");

  event.preventDefault();

  setup();
});

window.addEventListener("resize", () => {
  console.log("Resize called.");

  resizeCanvas(canvas);

  setup(); // FIXME
});

resizeCanvas(canvas);
setup();
animate();

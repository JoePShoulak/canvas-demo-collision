import { randPosition, distance, resizeCanvas } from "./lib/helper.js";
import Particle from "./lib/Particle.js";

const COLORS = ["#3288F0", "#34FA99", "#B1E33B", "#FABF34", "#F04C22"];
const particleCount = 4;
const padding = 5;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");

let particles;

const setup = () => {
  particles = [];

  for (let i = 0; i < particleCount; i++) {
    let newParticle;

    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    do {
      newParticle = new Particle(c, ...randPosition(), Particle.radius, color);
    } while (
      // Check if this particle is closer than padding to another particle
      particles.some((p) => distance(p, newParticle) < p.radius * 2 + padding)
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

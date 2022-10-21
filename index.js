import { randomPosition, distanceTo } from "./lib/helper.js";
import Particle from "./lib/Particle.js";

const COLORS = ["#3288F0", "#34FA99", "#B1E33B", "#FABF34", "#F04C22"];
const particleCount = 100;
const padding = 5;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let particles;

const setup = () => {
  particles = [];

  for (let i = 0; i < particleCount; i++) {
    let x, y;

    do {
      [x, y] = randomPosition();
    } while (
      particles.some((particle) => {
        return (
          distanceTo(particle.x, particle.y, x, y) <
          particle.radius * 2 + padding
        );
      })
    );

    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    particles.push(new Particle(c, x, y, Particle.radius, color));
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

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  setup();
});

setup();
animate();

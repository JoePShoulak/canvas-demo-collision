import Particle from "./Particle.js";

const random = Math.random;
const sqrt = Math.sqrt;

/* == MISC HELPERS == */
export const Do = (n) => {
  return {
    times: (callback) => [...Array(n).keys()].forEach(callback),
  };
};

export const randomPosition = () => {
  const x = random() * (innerWidth - 2 * Particle.radius) + Particle.radius;
  const y = random() * (innerHeight - 2 * Particle.radius) + Particle.radius;

  return [x, y];
};

export const distanceTo = (x1, y1, x2, y2) => {
  return sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

export const resizeCanvas = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};

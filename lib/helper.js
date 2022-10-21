import Particle from "./Particle.js";

const random = Math.random;
const sqrt = Math.sqrt;

/* == MISC HELPERS == */
export const Do = (n) => {
  return {
    times: (callback) => [...Array(n).keys()].forEach(callback),
  };
};

export const randPosition = () => {
  const x = random() * (innerWidth - 2 * Particle.radius) + Particle.radius;
  const y = random() * (innerHeight - 2 * Particle.radius) + Particle.radius;

  return [x, y];
};

export const distance = (particle1, particle2) => {
  const dx = particle2.x - particle1.x;
  const dy = particle2.y - particle1.y;

  return sqrt(dx ** 2 + dy ** 2);
};

export const resizeCanvas = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};

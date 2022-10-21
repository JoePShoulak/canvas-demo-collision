import Particle from "./Particle.js";

const random = Math.random;

/* == MISC HELPERS == */
export const Do = (n) => {
  return {
    times: (callback) => [...Array(n).keys()].forEach(callback),
  };
};

export const resizeCanvas = (canvas) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};

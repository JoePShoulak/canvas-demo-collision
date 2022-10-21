// FIXME
// const util = require('util');

class Vector2 {
  #x;
  #y;
  #magnitude;
  #direction;
  #normal;

  /* == STATIC == */
  // Poor-man's overload: contructs an array from direction and magnitude, unit default
  static createFromDirection = (direction, magnitude = 1) => {
    return new Vector2(
      magnitude * Math.cos(direction),
      magnitude * Math.sin(direction)
    );
  };

  // Returns a random unit vector
  static random = () =>
    Vector2.createFromDirection(Math.random() * 2 * Math.PI);

  /* == CONSTRUCTOR == */
  // Constructor as defined by x and y components
  constructor(x = 0, y = 0) {
    this.#x = x;
    this.#y = y;
    this.#magnitude = Math.sqrt(this.#x ** 2 + this.#y ** 2);
    this.#direction = this.#x ? Math.atan(this.#y / this.#x) : undefined;

    if (this.#magnitude == 1) {
      this.#normal = this;
    } else {
      this.#normal = new Vector2(
        this.#x / this.#magnitude,
        this.#y / this.#magnitude
      );
    }
  }

  /* == GETTERS == */

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get direction() {
    return this.#direction;
  }

  get magnitude() {
    return this.#magnitude;
  }

  get normal() {
    return this.#normal;
  }

  /* == MAIN == */
  add = (vector) => new Vector2(this.#x + vector.x, this.#y + vector.y);
  subtract = (vector) => new Vector2(this.#x - vector.x, this.#y - vector.y);
  timesScalar = (scalar) => new Vector2(this.#x * scalar, this.#y * scalar);

  /* == UTILITIES == */
  // TODO: Find a way to make this work and not just in Node
  /*[util.inspect.custom](depth, opts) {
        return `Vector2 { x: ${this.#x}, y: ${this.#y} }`;
    };*/

  toArray = () => [this.#x, this.#y];
  toString = () => `<${this.#x}, ${this.#y}>`;
}

export default Vector2;

const TEST = false;

if (TEST) {
  const v = new Vector2(3, 4);

  console.log(v);
  console.log(v.magnitude);
  console.log(v.normal);

  const a = new Vector2(2, 3);
  const b = new Vector2(1, 2);

  console.log(a.add(b));
  console.log(a.subtract(b));
  console.log(a.timesScalar(2));

  const c = new Vector2(1, 1);

  console.log((c.direction / (2 * Math.PI)) * 360);

  const d = Vector2.createFromDirection(c.direction, c.magnitude);

  console.log(c);
  console.log(d);

  console.log("=======================");

  const randomUnit = Vector2.createFromDirection(Math.random() * 2 * Math.PI);
  console.log(randomUnit);
  console.log(randomUnit.magnitude);
}

export const make2DArray = (d1, d2, value) =>
  new Array(d1).fill().map(() => new Array(d2).fill(value));

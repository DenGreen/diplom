import { calcTileType } from "../utils";

test("calcTileType должен возвращать top-left при index = 0", () => {
  const response = calcTileType(0, 8);
  const result = "top-left";
  expect(response).toBe(result);
});

test("calcTileType должен возвращать top-right при index = 7", () => {
  const response = calcTileType(7, 8);
  const result = "top-right";
  expect(response).toBe(result);
});

test("calcTileType должен возвращать bottom-right при index = 63", () => {
  const response = calcTileType(63, 8);
  const result = "bottom-right";
  expect(response).toBe(result);
});

test("calcTileType должен возвращать bottom-left при index = 56", () => {
  const response = calcTileType(56, 8);
  const result = "bottom-left";
  expect(response).toBe(result);
});

test.each([1, 2, 3, 4, 5, 6])(
  "calcTileType должен возвращать top при index = 1, 2, 3, 4, 5, 6",
  (index) => {
    const result = "top";
    const response = calcTileType(index, 8);
    expect(response).toBe(result);
  }
);

test.each([8, 16, 24, 32, 40, 48])(
  "calcTileType должен возвращать left при index = 8, 16, 24, 32, 40, 48",
  (index) => {
    const result = "left";
    const response = calcTileType(index, 8);
    expect(response).toBe(result);
  }
);

test.each([15, 23, 31, 39, 47, 55])(
  "calcTileType должен возвращать right при index = 15, 23, 31, 39, 47, 55",
  (index) => {
    const result = "right";
    const response = calcTileType(index, 8);
    expect(response).toBe(result);
  }
);

test.each([57, 58, 59, 60, 61, 62])(
  "calcTileType должен возвращать bottom при index = 57, 58, 59, 60, 61, 62",
  (index) => {
    const result = "bottom";
    const response = calcTileType(index, 8);
    expect(response).toBe(result);
  }
);

test.each([9, 10, 11, 12, 13, 14])(
  "calcTileType должен возвращать center при index = 9, 10, 11, 12, 13, 14",
  (index) => {
    const result = "center";
    const response = calcTileType(index, 8);
    expect(response).toBe(result);
  }
);
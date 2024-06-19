require("@testing-library/jest-dom");
require("@testing-library/jest-dom/jest-globals");

console.warn = jest.fn();

window.matchMedia = jest.fn().mockReturnValue({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

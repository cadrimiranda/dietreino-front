require("@testing-library/jest-dom");
require("@testing-library/jest-dom/jest-globals");

window.matchMedia = jest.fn().mockReturnValue({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

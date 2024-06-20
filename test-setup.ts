require("@testing-library/jest-dom");
require("@testing-library/jest-dom/jest-globals");

global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

window.matchMedia = jest.fn().mockReturnValue({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

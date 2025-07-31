/**
 * @jest-environment jsdom
 */

const { fireEvent } = require("@testing-library/dom");
require("@testing-library/jest-dom");

// Mock fetch and localStorage
global.fetch = jest.fn();
global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

beforeEach(() => {
  // 1️⃣ Setup DOM FIRST
  document.body.innerHTML = `
    <form id="registerForm">
      <input type="text" id="username" />
      <input type="email" id="email" />
      <input type="password" id="password" />
      <input type="password" id="confirmPassword" />
      <button type="submit">Register</button>
    </form>
  `;

  // 2️⃣ Load register.js AFTER DOM is ready
  jest.isolateModules(() => {
    require("./register.js");
  });
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

test("alerts if passwords do not match", () => {
  window.alert = jest.fn();

  document.getElementById("username").value = "John";
  document.getElementById("email").value = "john@example.com";
  document.getElementById("password").value = "123456";
  document.getElementById("confirmPassword").value = "654321";

  fireEvent.submit(document.getElementById("registerForm"));

  expect(window.alert).toHaveBeenCalledWith("The passwords entered twice are inconsistent");
});

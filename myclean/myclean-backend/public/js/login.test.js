/**
 * @jest-environment jsdom
 */
require("@testing-library/jest-dom");

global.fetch = jest.fn();
global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

let handleLogin;

beforeEach(() => {
  // 1️⃣ 创建 DOM
  document.body.innerHTML = `
    <form id="loginForm">
      <input type="email" id="email" />
      <input type="password" id="password" />
      <button type="submit">Login</button>
    </form>
  `;

  // 2️⃣ Mock window.location 和 alert
  delete window.location;
  window.location = { href: "", assign: jest.fn() };
  window.alert = jest.fn();

  // 3️⃣ 在 DOM 创建后加载 login.js
  jest.isolateModules(() => {
    handleLogin = require("./login.js").handleLogin;
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("should alert on successful login", async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true, userId: "12345" }),
  });

  document.getElementById("email").value = "john@example.com";
  document.getElementById("password").value = "123456";

  await handleLogin({ preventDefault: jest.fn() });

  expect(window.alert).toHaveBeenCalledWith("Login successful!");
});

test("should alert on failed login", async () => {
  global.fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ success: false, message: "Invalid credentials" }),
  });

  document.getElementById("email").value = "john@example.com";
  document.getElementById("password").value = "wrongpass";

  await handleLogin({ preventDefault: jest.fn() });

  expect(window.alert).toHaveBeenCalledWith("Login failed: Invalid credentials");
});

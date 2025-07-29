const { isValidPhoneNumber } = require('./validate');

test('valid 8-digit phone number returns true', () => {
  expect(isValidPhoneNumber("12345678")).toBe(true);
});

test('phone number with non-digit characters returns false', () => {
  expect(isValidPhoneNumber("1234abcD")).toBe(false);
});

test('phone number that is not a string returns false', () => {
  expect(isValidPhoneNumber(12345678)).toBe(false);
});

test('phone number with less than 8 digits returns false', () => {
  expect(isValidPhoneNumber("1234567")).toBe(false);
});

test('phone number with more than 8 digits returns false', () => {
  expect(isValidPhoneNumber("123456789")).toBe(false);
});

test('empty string returns false', () => {
  expect(isValidPhoneNumber("")).toBe(false);
});

test('null input returns false', () => {
  expect(isValidPhoneNumber(null)).toBe(false);
});

test('undefined input returns false', () => {
  expect(isValidPhoneNumber(undefined)).toBe(false);
});

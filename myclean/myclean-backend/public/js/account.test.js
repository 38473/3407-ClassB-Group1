const { saveAccountChanges } = require('./account');

test('saving account changes with valid data shows success message', () => {
  const result = saveAccountChanges("Alice", "alice@example.com");
  expect(result).toBe("✅ Saving changes...");
});

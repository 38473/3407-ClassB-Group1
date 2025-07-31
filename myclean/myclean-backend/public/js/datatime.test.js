/**
 * @jest-environment jsdom
 */
const { setupDateTimeValidation } = require("./booking");
const { fireEvent } = require("@testing-library/dom");

describe("Booking form date & time validation (Green Phase)", () => {
  let dateInput, timeInput;

  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <input type="date" id="date" />
        <input type="time" id="time" />
      </form>
    `;
    dateInput = document.getElementById("date");
    timeInput = document.getElementById("time");

    // ✅ 直接调用 setup 方法
    setupDateTimeValidation();
  });

  test("should set today's date as minimum date", () => {
    const today = new Date().toISOString().split("T")[0];
    expect(dateInput.min).toBe(today);
  });

  test("should set current time as minimum if date is today", () => {
    const now = new Date();
    dateInput.value = now.toISOString().split("T")[0];
    fireEvent.change(dateInput);

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    expect(timeInput.min).toBe(`${hours}:${minutes}`);
  });
});

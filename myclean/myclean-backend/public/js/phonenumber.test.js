/**
 * @jest-environment jsdom
 */
const { fireEvent } = require("@testing-library/dom");
const { validatePhoneNumber, setupBookingFormValidation } = require("./booking.js");

describe("Booking form phone number validation (Refactor)", () => {
  let bookingForm, mobileInput, mobileError;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="bookingForm">
        <input type="tel" id="mobile" name="mobile" required />
        <div class="error" id="mobileError" style="display:none;">Please enter a valid 8-digit phone number.</div>
        <button type="submit">Submit</button>
      </form>
    `;
    bookingForm = document.getElementById("bookingForm");
    mobileInput = document.getElementById("mobile");
    mobileError = document.getElementById("mobileError");

    setupBookingFormValidation();
  });

  test("should show error for invalid phone number (<8 digits)", () => {
    mobileInput.value = "12345";
    fireEvent.submit(bookingForm);
    expect(mobileError.style.display).toBe("block");
  });

  test("should NOT show error for valid 8-digit phone number", () => {
    mobileInput.value = "12345678";
    fireEvent.submit(bookingForm);
    expect(mobileError.style.display).toBe("none");
  });
});

describe("validatePhoneNumber function (Refactor)", () => {
  test("returns true for valid 8-digit numbers", () => {
    expect(validatePhoneNumber("12345678")).toBe(true);
    expect(validatePhoneNumber("87654321")).toBe(true);
  });

  test("returns false for invalid numbers", () => {
    expect(validatePhoneNumber("123")).toBe(false);
    expect(validatePhoneNumber("123456789")).toBe(false);
    expect(validatePhoneNumber("abcd5678")).toBe(false);
  });
});

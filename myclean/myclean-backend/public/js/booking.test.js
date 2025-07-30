/**
 * @jest-environment jsdom
 */
require("@testing-library/jest-dom");
const { fireEvent, waitFor } = require("@testing-library/dom");
const { autoFillAddress, fetchAddress, validateAndSubmitBooking } = require("./booking.js");

describe("Booking auto-fill address (Refactor)", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="bookingForm">
        <select id="serviceType"><option value="">-- Select --</option><option value="home_cleaning">Home</option></select>
        <input type="text" id="address" />
        <input type="tel" id="mobile" />
        <input type="date" id="date" />
        <input type="time" id="time" />
        <button type="submit">Submit</button>
        <div id="serviceTypeError" class="error"></div>
        <div id="addressError" class="error"></div>
        <div id="mobileError" class="error"></div>
        <div id="dateError" class="error"></div>
        <div id="timeError" class="error"></div>
      </form>
    `;

    global.navigator.geolocation = { getCurrentPosition: jest.fn() };
    global.fetch = jest.fn();
    global.localStorage = {
      getItem: jest.fn(() => "123"),
      setItem: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // ✅ 自动地址填充
  test("should request geolocation when autoFillAddress is called", () => {
    autoFillAddress();
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
  });

  test("should auto-fill address after successful geolocation", async () => {
    const addressInput = document.getElementById("address");

    // Mock geolocation callback
    const mockPosition = { coords: { latitude: 1.3521, longitude: 103.8198 } };
    navigator.geolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success(mockPosition)
    );

    // Mock fetch response
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          address: {
            road: "Orchard Road",
            house_number: "123",
            city: "Singapore",
            country: "Singapore",
          },
        }),
    });

    await autoFillAddress();
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(addressInput.value).toContain("Orchard Road");
    });
  });

  test("fetchAddress should call fetch with correct URL", async () => {
    fetch.mockResolvedValueOnce({ json: () => Promise.resolve({}) });
    await fetchAddress(1.3521, 103.8198);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("lat=1.3521&lon=103.8198")
    );
  });
});

describe("Booking form validation and submission", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ 表单验证
  test("should show errors if required fields are empty", async () => {
    const form = document.getElementById("bookingForm");

    const result = await validateAndSubmitBooking(form);

    expect(result).toBe(false); // 表单无效
    expect(document.getElementById("serviceTypeError").style.display).toBe("block");
    expect(document.getElementById("addressError").style.display).toBe("block");
    expect(document.getElementById("mobileError").style.display).toBe("block");
  });

  test("should validate phone number format", async () => {
    const form = document.getElementById("bookingForm");

    document.getElementById("serviceType").value = "home_cleaning";
    document.getElementById("address").value = "123 Orchard Road";
    document.getElementById("mobile").value = "123"; // Invalid
    document.getElementById("date").value = "2025-08-01";
    document.getElementById("time").value = "10:00";

    const result = await validateAndSubmitBooking(form);

    expect(result).toBe(false); 
    expect(document.getElementById("mobileError").style.display).toBe("block");
  });

  // ✅ 成功提交
  test("should submit booking if all fields valid", async () => {
    const form = document.getElementById("bookingForm");

    document.getElementById("serviceType").value = "home_cleaning";
    document.getElementById("address").value = "123 Orchard Road";
    document.getElementById("mobile").value = "98765432";
    document.getElementById("date").value = "2025-08-01";
    document.getElementById("time").value = "10:00";

    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ insertId: 1 }) });

    const result = await validateAndSubmitBooking(form);

    expect(result).toBe(true); 
    expect(fetch).toHaveBeenCalled();
  });
});

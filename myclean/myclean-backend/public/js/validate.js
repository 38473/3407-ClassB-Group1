// validate.js

function isValidPhoneNumber(phone) {
    return typeof phone === 'string' &&
           phone.length === 8 &&
           /^[0-9]+$/.test(phone);
}

module.exports = { isValidPhoneNumber };

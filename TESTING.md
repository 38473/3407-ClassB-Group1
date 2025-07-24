# Testing Report

**This testing report documents the results of functional tests on the Login Page, Booking Page, and Account Page.**


## 1. 🔐 Login Page Test

- In the test, for the login page, users must enter the correct email and password to enter the website. If the email and password entered are incorrect, it will display Login failed: Invalid credentials. Click OK to ask the user to enter the password again. When the email and password are correct, it will display Login successful! Then you will enter the Home page. 

### 📸 Comparison Screenshots:

- **Incorrect:**
<img width="1470" height="956" alt="6e5fbd212fe41b29d1ba576e171b75e3" src="https://github.com/user-attachments/assets/dd3b038c-833d-4314-86a8-909617b76f43" />

- **Correct:**
<img width="1470" height="956" alt="6dce500d3c80ac284846940c7b62c452" src="https://github.com/user-attachments/assets/fd9ccb72-1b87-4bf6-b006-05231122f377" />

---

## 2. 📍 Booking Page Test

- For the Booking page, when you enter this page, the website will ask you whether you can obtain your real-time location information. When you click Allow, your current location will be automatically filled in the address. The following are two examples of our test.

### 📸 Comparison Screenshots:
- **At home**
<img width="2938" height="1396" alt="f97010ea4145fe98a10bd7bc89263e01" src="https://github.com/user-attachments/assets/d09bdcc2-9458-4916-98af-22a33e13cbc9" />

- **At school**
<img width="2940" height="1912" alt="5eabb12d797bfcaad03750890a1c1f78" src="https://github.com/user-attachments/assets/6701c076-d381-4de3-894e-e1ea065a9e1c" />


---

- Secondly, all parts must be filled with valid information. For example: phone number must be a valid 8-digit number, not letters or punctuation marks (will be displayed: Please enter a valid 8-digit phone number.).

### 📸 Screenshots:
<img width="2940" height="1664" alt="b01b4f594acf8020526a792d17af39ee" src="https://github.com/user-attachments/assets/b681d6c7-5f1b-4188-b0ec-87a1499dd517" />

---

- For the service date and time part, during the test, we found that we can choose to fill in the time before the real-time date of the form, but this is impossible. We found this error and made changes. Now our website design can only choose a future time. As shown in the picture:

### 📸 Screenshots:
- **Service date**
<img width="2940" height="1912" alt="953f8c91d2d24d41e304271ffb8b285b" src="https://github.com/user-attachments/assets/90463759-ceef-49f4-89c0-56b398a232e5" />

- **Service time**
<img width="2940" height="1912" alt="dd35760158ce83465c8e1ac08f4069ed" src="https://github.com/user-attachments/assets/a6724ccb-2f34-4c76-9339-60ee52f797fa" />


- All the information filled in later will be updated to payment.

### 📸 Screenshots:
- **Booking**
![36b6bd52675f8d019f87641702944b45](https://github.com/user-attachments/assets/67a1e057-4550-49ff-9b8c-0b5ba43130f0)

- **Payment**
![1e6100e6d5b7714dd3d4c5fe455300e3](https://github.com/user-attachments/assets/53a69898-1994-4848-9027-7208c15e0494)

---

## 3.  👤 Account Page Test
- During the test, we found that although there was a component on the account page to change personal information and save the changes, we were unable to implement the change. And the phone number format error verification was performed. Then we improved the code. When we tested the modified project code, we found that we had perfectly solved this problem.

### 📸 Screenshots:
- **Phone number**
<img width="1512" height="982" alt="c6cc5efaf9e315e9feac68d72d91b4e1" src="https://github.com/user-attachments/assets/38c244fc-1d73-4c4d-a050-c05c8c5c2344" />

- **Saving changes**
<img width="1512" height="982" alt="bc7ecb37b4dc17a2e3abca3561f74a2b" src="https://github.com/user-attachments/assets/eadc3770-749f-4985-85f4-4588c9f8a2c6" />



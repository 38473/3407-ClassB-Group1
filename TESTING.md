# Testing Report

**This testing report documents the results of functional tests on the Login Page, Booking Page, and Account Page.**


## 1. 🔐 Login Page Test

- In the test, for the login page, users must enter the correct email and password to enter the website. If the email and password entered are incorrect, it will display Login failed: Invalid credentials. Click OK to ask the user to enter the password again. When the email and password are correct, it will display Login successful! Then you will enter the Home page. 

### 📸 Comparison Screenshots:

-**TDD**

**red**

![image](https://github.com/user-attachments/assets/ad457354-9529-4d40-ab0d-f2a57b34d953)

**green**

<img width="684" height="155" alt="image" src="https://github.com/user-attachments/assets/fa412b1a-40ce-4f33-af12-8d07da16b3ba" />

**refactor**

<img width="704" height="295" alt="image" src="https://github.com/user-attachments/assets/847a7815-d5be-41ee-bac6-65a8a735df2a" />


**on the website**

- **Incorrect:**
<img width="1470" height="956" alt="6e5fbd212fe41b29d1ba576e171b75e3" src="https://github.com/user-attachments/assets/dd3b038c-833d-4314-86a8-909617b76f43" />

- **Correct:**
<img width="1470" height="956" alt="6dce500d3c80ac284846940c7b62c452" src="https://github.com/user-attachments/assets/fd9ccb72-1b87-4bf6-b006-05231122f377" />

---

## 2. 📍 Booking Page Test

- For the Booking page, when you enter this page, the website will ask you whether you can obtain your real-time location information. When you click Allow, your current location will be automatically filled in the address. The following are two examples of our test.

### 📸 Comparison Screenshots:

-**TDD**

**red**

<img width="710" height="614" alt="image" src="https://github.com/user-attachments/assets/6a02f88e-3f42-4b52-a2b7-012a0851158d" />

**green**

<img width="707" height="174" alt="image" src="https://github.com/user-attachments/assets/ddff5f99-ef41-4f98-ab1b-38453b68ce46" />

**refactor**

<img width="678" height="238" alt="image" src="https://github.com/user-attachments/assets/cf45601f-c2ad-429b-8b7e-e190f04c84cf" />

**on the website**

- **At home**
<img width="2938" height="1396" alt="f97010ea4145fe98a10bd7bc89263e01" src="https://github.com/user-attachments/assets/d09bdcc2-9458-4916-98af-22a33e13cbc9" />

- **At school**
<img width="2940" height="1912" alt="5eabb12d797bfcaad03750890a1c1f78" src="https://github.com/user-attachments/assets/6701c076-d381-4de3-894e-e1ea065a9e1c" />


---

- Secondly, all parts must be filled with valid information. For example: phone number must be a valid 8-digit number, not letters or punctuation marks (will be displayed: Please enter a valid 8-digit phone number.).

### 📸 Screenshots:

-**TDD**

**red**

![image](https://github.com/user-attachments/assets/6f15f280-4e16-45f5-875b-e81fd0663b33)

**green**

<img width="693" height="170" alt="image" src="https://github.com/user-attachments/assets/09555bb2-7a5e-4224-90f2-fcb882567d05" />

**refactor**

<img width="823" height="758" alt="image" src="https://github.com/user-attachments/assets/0af0e6e8-acd7-4ce5-970d-718b8d87eb12" />

**on the website**

<img width="2940" height="1664" alt="b01b4f594acf8020526a792d17af39ee" src="https://github.com/user-attachments/assets/b681d6c7-5f1b-4188-b0ec-87a1499dd517" />

---

- For the service date and time part, during the test, we found that we can choose to fill in the time before the real-time date of the form, but this is impossible. We found this error and made changes. Now our website design can only choose a future time. As shown in the picture:

### 📸 Screenshots:

-**TDD**

**red**

<img width="696" height="659" alt="image" src="https://github.com/user-attachments/assets/31cf487a-2063-4e0d-ba47-83687393cb93" />

**green**

<img width="677" height="168" alt="image" src="https://github.com/user-attachments/assets/a3eca659-7b75-48e9-8072-2c2461025ae6" />

**factor**

<img width="684" height="170" alt="image" src="https://github.com/user-attachments/assets/ed9add53-2074-47a5-992b-2edfea8c2b09" />

**on the website**

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
- **TDD**

**red**

<img width="431" height="404" alt="截屏2025-07-30 14 15 18" src="https://github.com/user-attachments/assets/e4c44879-04e4-4a72-bd72-7d513dd655c6" />

**green**

<img width="332" height="233" alt="截屏2025-07-30 14 15 44" src="https://github.com/user-attachments/assets/c089e266-894b-4c8d-afaa-2ef43349b48b" />

**refactor**

<img width="344" height="251" alt="截屏2025-07-30 14 16 11" src="https://github.com/user-attachments/assets/3e1e80e7-0736-4bfc-80ce-97a39b4c06df" />

**on the website**

<img width="1512" height="982" alt="c6cc5efaf9e315e9feac68d72d91b4e1" src="https://github.com/user-attachments/assets/38c244fc-1d73-4c4d-a050-c05c8c5c2344" />

- **Saving changes**
- **TDD**

**red**

<img width="634" height="427" alt="截屏2025-07-30 14 22 00" src="https://github.com/user-attachments/assets/3c6bdeaa-0b32-46f7-9627-0730cc3b0a06" />

**green**

<img width="256" height="183" alt="截屏2025-07-30 14 39 22" src="https://github.com/user-attachments/assets/597271e4-bda7-440b-af85-8772ed35679d" />

**factor**

<img width="367" height="197" alt="截屏2025-07-30 14 39 31" src="https://github.com/user-attachments/assets/65f409c4-3bd3-4981-bfc6-462bb63da4cc" />

**on the website**
<img width="1512" height="982" alt="bc7ecb37b4dc17a2e3abca3561f74a2b" src="https://github.com/user-attachments/assets/eadc3770-749f-4985-85f4-4588c9f8a2c6" />



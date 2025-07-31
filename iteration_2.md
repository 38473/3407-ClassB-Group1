# Actual iteration-2 board, (see chapters 3 and 4), add your start and end dates 

Checklist: 
1. github entry timestamps
2. User stories are correct: see p39

* Assumed Velocity FROM iteration-1:

  v1 = E1 / A1 = 14 / 20 = 0.7​

  v2 = E2 / E1 * V1 = 9 / 14 * 0.7 = 0.45
* Number of developers: 3
* Total estimated amount of work: 15 * 3 * 0.45 = 20.25 days


# 3 User stories or tasks:


**1. User Story 3:**

   Title: Multi-Languages
   
   Description: As a user, I hope to be able to interact with the chatbot and the cleaning company in various languages. When chatting with real people, the language is automatically translated, thereby enhancing accessibility.
   
   Priority: Medium
   
   Estimated: 3 days

* Task 1: 

    Integrate a translation API (e.g., Google Translate API or Microsoft Translator)

    Estimated Time: 0.5 day

* Task 2: 

    Enable automatic translation in chatbot conversations

    Estimated Time: 0.5 day

* Task 3: 

    Implement real-time translation for human chat support

    Estimated Time: 1.5 day

* Task 4: 

    Add language preference selector in user profile or site header

    Estimated Time: 0.5 day



**2. User Story 5:**

   
   Title: Give Feedback

   Description: As a business owner, I would like to be able to provide feedback or report inaccuracies to help improve the service and performance of the MyClean website.

   Priority: Low

   Effort Estimate: 4 days

* Task 1: 

    Design and implement front-end feedback from UI

    Estimated Time: 0.5 day


* Task 2: 

    Implement basic validation and confirmation message for feedback form

    Estimated Time: 1 day

* Task 3: 

    Add ‘Give Feedback’ or ‘Report an Issue’ button in the site footer or profile page

    Estimated Time: 1 day



**3. User Story 8:**

   Title: Profile Editing
   
   Description: As a regular user, I need a Profile for showing my individual’s stylish.
   
   Priority: Medium
   
   Estimated: 2 days

* Task 1:

    Design and Create Profile Page Layout： Set up the HTML/CSS structure with fields like name, email, phone number, anything else.

    Estimated time: 1 day

* Task 2:

    Implement Edit and Save Functionality: Allow users to edit their profile info and save changes (frontend only).

    Estimated Time:  0.5 day

* Task 3:

    Add Profile Information Upload and Preview: Enable users to upload and preview their profile information before saving.

    Estimated time: 0.5 day

### week 7

To do:
* User Story 3 Task-1 (Zihan Wang)
* User Story 3 Task-2 (Zihan Wang)
* User Story 3 Task-3 (Chenxi Wang)
* User Story 3 Task-4 (Yuye Guo)
* User Story 5 Task-1 (Zihan Wang)
* User Story 5 Task-2 (Chenxi Wang)
* User Story 5 Task-3 (Yuye Guo)

In progress:
* User Story 8 Task-2 (Yuye Guo), 16/7/2025

Completed:
* User Story 8 Task-1 (Zihan Wang), 16/7/2025
* User Story 8 Task-3 (Chenxi Wang), 16/7/2025

### Week 8

In progress:
* User Story 3 Task-1 (Zihan Wang), 23/7/2025
* User Story 3 Task-2 (Zihan Wang), 23/7/2025
* User Story 3 Task-3 (Chenxi Wang), 23/7/2025
* User Story 3 Task-4 (Yuye Guo), 23/7/2025

Completed:
* User Story 3 Task-1 (Zihan Wang), 24/7/2025
* User Story 3 Task-2 (Zihan Wang), 24/7/2025
* User Story 3 Task-3 (Chenxi Wang), 24/7/2025
* User Story 3 Task-4 (Yuye Guo), 24/7/2025
* User Story 5 Task-1 (Zihan Wang), 23/7/2025
* User Story 5 Task-2 (Chenxi Wang), 23/7/2025
* User Story 5 Task-3 (Yuye Guo), 23/7/2025
* User Story 8 Task-1 (Zihan Wang), 16/7/2025
* User Story 8 Task-3 (Chenxi Wang), 16/7/2025
* User Story 8 Task-2 (Chenxi Wang), 23/7/2025

### Week 9

Completed:
* User Story 3 Task-1 (Zihan Wang), 24/7/2025
* User Story 3 Task-2 (Zihan Wang), 24/7/2025
* User Story 3 Task-3 (Chenxi Wang), 24/7/2025
* User Story 3 Task-4 (Yuye Guo), 24/7/2025
* User Story 5 Task-1 (Zihan Wang), 23/7/2025
* User Story 5 Task-2 (Chenxi Wang), 23/7/2025
* User Story 5 Task-3 (Yuye Guo), 23/7/2025
* User Story 8 Task-1 (Zihan Wang), 16/7/2025
* User Story 8 Task-2 (Chenxi Wang), 23/7/2025
* User Story 8 Task-3 (Chenxi Wang), 16/7/2025


### Burn Down for iteration-2 (see chapter 4):
Update this at least once per week
* 3 weeks left, 9 days of estimated amount of work
* 2 weeks left, 7.5 days of estimated amount of work
* 1 week left, 0 days of estimated amount of work
* 0 week left, 0 days of estimated amount of work
* Actual Velocity: v2 = E2 / A2 = 9 / 15 = 0.6
![26625022dbb76abb61681eb73095ccdf](https://github.com/user-attachments/assets/bd512812-014e-40e8-810b-82364d2e96fb)

v2 = E2 / A2 = 9 / 15 = 0.6

## Connect to AWS Cloud

To achieve backend database connectivity and data persistence for this project, we used the Amazon Web Services (AWS) RDS service as the database hosting platform, and used MySQL Workbench for remote connection and data manipulation. The following is an implementation guide with screenshots:

### 1. AWS RDS instance setup successful

<img width="468" height="305" alt="image" src="https://github.com/user-attachments/assets/b1f084ca-5923-4568-83a6-bf73644b8a93" />

As shown in the figure, I created and enabled a MySQL RDS instance named myclean in the AWS console. This instance is set to Publicly accessible, ensuring that I can connect remotely from my local machine using Workbench.
* Endpoint: myclean.c3as8c8e0uku.ap-southeast-2.rds.amazonaws.com
* Port: 3306
* Engine: MySQL Community


### 2. Configure db.js to connect to AWS RDS

<img width="468" height="191" alt="image" src="https://github.com/user-attachments/assets/5ec613b1-5327-4d59-8ec8-1e67f427d53b" />

In my backend project, the db.js file uses the mysql2/promise package and configures the connection parameters to point to the AWS RDS host address and specify the database mydb:

### 3. Workbench successfully connects to and queries the AWS database

#### User

<img width="468" height="345" alt="image" src="https://github.com/user-attachments/assets/57b87dc2-8b3a-4255-974b-550b76ceb317" />


#### Reservation

<img width="1469" height="917" alt="image" src="https://github.com/user-attachments/assets/d18b3140-e217-44f6-bda4-844d94b5142f" />

#### Chat Message

<img width="1469" height="919" alt="image" src="https://github.com/user-attachments/assets/65b2e5c8-a10c-4bbd-a24a-08f9e5fee361" />

After successfully connecting to RDS using MySQL Workbench, I checked the User, Reserva, and ChatMessage tables in the mydb database. Multiple records were returned after successful operation, indicating that the connection is valid and the data is complete.

### 4. Browser verification backend interface reads AWS RDS data

#### User

<img width="1466" height="916" alt="image" src="https://github.com/user-attachments/assets/25692ef7-dc28-436d-9fd8-c9466dc9f248" />

Visit http://localhost:3000/api/users in your browser and you will see the User table contents returned from the AWS RDS database. This indicates that the backend project has successfully read the remote AWS database data.

#### Reservation

<img width="1464" height="912" alt="image" src="https://github.com/user-attachments/assets/32de92ca-1772-4424-8eb2-36be6ef54413" />

Visit http://localhost:3000/api/reservations in your browser and you will see the contents of the Reservation table returned from the AWS RDS database. This indicates that the backend project has successfully read data from the remote AWS database.

#### Chat Message

<img width="1464" height="917" alt="image" src="https://github.com/user-attachments/assets/03f34a2c-adc6-4279-be49-663776c0fbc0" />

Visit http://localhost:3000/api/chat/history in your browser and you will see the ChatMessage table contents returned from the AWS RDS database. This indicates that the backend project has successfully read the remote AWS database data.

**So, all of these have been successfully connected to AWS cloud**


## System test
After completing all tasks outlined in the user stories, we proceeded with system testing. During this phase, we identified several minor bugs. For instance, when the website was zoomed out, the components became cluttered and overlapped, as illustrated in Figure 1. To address this issue, we revised the code to enhance responsiveness, ensuring that the layout adapts properly and maintains an optimal display across all screen sizes and zoom levels.

Here show some examples before and after realize screen adaptation:

### Example 1
#### Before


<img width="655" height="824" alt="image" src="https://github.com/user-attachments/assets/6bab912f-a705-4318-8778-83ffba6f45c6" />

#### After

<img width="655" height="824" alt="image" src="https://github.com/user-attachments/assets/dcaf91fa-c828-4aa9-b93a-eef2cc9ccade" />

#### After
When the screen is zoomed out to a certain extent, the hamburger will be displayed

<img width="655" height="824" alt="image" src="https://github.com/user-attachments/assets/b0582cfd-0c61-407a-9022-e1377e5bf098" />

### Example 2
#### Before


<img width="655" height="824" alt="image" src="https://github.com/user-attachments/assets/19198235-e30c-4cbb-9f1f-c37fed7505cc" />

#### After

<img width="655" height="824" alt="image" src="https://github.com/user-attachments/assets/9fbd20a1-322e-4cae-bc14-f2c027408c44" />


### Example 3
#### Before

<img width="655" height="824" alt="image" src="https://github.com/user-attachments/assets/5c73d323-f28f-4023-a1e7-b7845eaa4645" />


#### After

<img width="655" height="824" alt="image" src="https://github.com/user-attachments/assets/35330724-a1f9-47ae-8d2c-8102e382d1d1" />


### Example 4
#### Before

<img width="655" height="824" alt="image" src="https://github.com/user-attachments/assets/9c336b9a-6fc5-48ef-b34f-60388bfec670" />

#### After

<img width="655" height="824" alt="image" src="https://github.com/user-attachments/assets/37a3d0c7-252f-48a1-81c1-60b6fb054848" />






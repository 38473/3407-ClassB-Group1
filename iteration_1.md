# Actual iteration-1 board, (see chapters 3 and 4), add your start and end dates 

Checklist: 
1. github entry timestamps
2. User stories are correct: see p39

* Assumed Velocity: 0.7
* Number of developers: 3
* Total estimated amount of work: 10 * 0.7 * 3 = 21 days

User stories or tasks (see chapter 4):
User Story 1:
   Title: Gather Location Information from Users
   Description: As a user, I want the MyClean app to collect my location information during booking, so that nearby service providers can be suggested and the appointment address can be filled automatically.
   Priority: High
   Estimated: 3 days
   
* Task 1:

Design and add the location permission request interface.

Estimated Time: 0.5 day

* Task 2: 

Implement the back-end logic for obtaining GPS or network locations.

Estimated Time: 1 day

* Task 3: 

Pre-fill the location information into the reservation form.

Estimated Time: 0.5 day

* Task 4: 

Integrate Google Maps or the local map API to obtain and display addresses.

Estimated Time: 1 day

User Story 2:
   Title: Smart Chat with Human and Bot Switching
   Description: As a user, I want to chat with my cleaners in real time through the website. If they are offline, the chatbot will automatically reply so that I can get support and updates in time. For some difficult problems, you can transfer to manual customer service or cleaners at any time.
   Priority: Medium
   Estimated: 2 days

* Task 1:

Design and implement front-end chat interface components 

Estimated Time: 0.5 day

* Task 2:

Build chatbot default answering system 

Estimated Time: 0.5 day

* Task 3:

Implement online status detection to determine whether to transfer to manual mechanism.

Estimated Time: 0.5 day

* Task 4:

Create manual customer service access module.

Estimated Time: 0.5 day

User Story 4:
    Title: Reservation System
    Description: As a service provider, I hope there will be a dedicated page for customers to fill in the reservation information, so that our company can arrange services efficiently.
    Priority: Medium
    Effort Estimate: 2 days

* Task 1: 

After a successful submission, there should be a prompt indicating success.

Estimated Time: 0.5 day

* Task 2: 

Create the address, mobile phone number, date and time input verification logic.

Estimated Time: 1 day

* Task 3: 

The pop-up window prompts that the table cannot be blank.

Estimated Time: 0.5 day

User Story 6:
   Title: Conversation history
   Description: As a user, I want to be able to view previous messages in the same conversation so I can reference previous questions and keep the conversation coherent and consistent throughout the interaction.
   Priority: Low
   Effort Estimate: 1 days

* Task 1: 

Design chat record interface which is front-end display component.

Estimated Time: 0.5 day

* Task 2: 

Realize storage and query of chat records in a database.

Estimated Time: 0.5 day

User Story 7:
   Title: In-app Payment
   Description: As an end user, I want to pay for the cleaning service through the MyClean app using secure payment methods (such as credit cards, PayPal), and also pay in cash directly after the cleaner finishes the cleaning work. The system should provide receipts and support refunds in case of cancellation.
   Priority: Low
   Effort Estimate: 1 day

* Task 1: 

Integrate third-party payment SDK (such as Stripe, PayPal)

Estimated Time: 0.5 day

* Task 2: 

Implement the function of generating electronic receipts after successful payment

Estimated Time: 0.25 day

* Task 3: 

Implement refund and cancellation logic including front-end confirmation

Estimated Time: 0.25 day


In progress:
* Task-2 (developer name or initials), date started
* ...

Completed:
* Task-3 (developer name or initials), date completed
* ...

### Burn Down for iteration-1 (see chapter 4):
Update this at least once per week
* 4 weeks left, xx days of estimated amount of work 
* 2 weeks left, xx days
* 1 weeks left, xx days
* 0 weeks left, xx days
* Actual Velocity: ?? 

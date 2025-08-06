# 📄 Technical Documentation

## 🛠️ Software Development Tools

### ✅ Front-end Tools

- **HTML** – Used for building and rendering web content.
- **CSS** – Sets the appearance of the website, such as fonts, colors, sizes, and page layouts.
- **JavaScript** – Handles form validation and interactive functionality for buttons and other elements.
- **Figma** – Used for UI/UX design and website prototyping before actual implementation.

### 🖥️ Back-end Tools

- **JavaScript (Node.js)** – Used to connect to the database and build server applications (e.g. server.js is used to build server applications, db.js is used to connect to the database).
- **MySQL Workbench** – A graphical database management tool that assists developers in database structure management and SQL testing.

### 🗄️ Database Engine / Software

- **MySQL** – A relational database used to manage structured data.
- **AWS RDS (Relational Database Service)** – A cloud-hosted MySQL service used for scalable and remote data access.

### 💻 IDE (Integrated Development Environment)

- **Visual Studio Code (VS Code)** – Used for both front-end development (HTML/CSS/JavaScript) and back-end JavaScript development, with the help of relevant extensions.

### 💬 Programming Languages

- **JavaScript** – Main back-end programming language and for interactive front-end features.
- **HTML** – For building front-end web page structure.
- **CSS** – For styling the front-end interface.
- **MySQL** – For database querying and manipulation.


### 🔗 Database Connection

- The JavaScript backend connects to the MySQL database using the `mysql2` library in node.js.
- The connection string includes:
  - `host`
  - `user`
  - `password`
  - `database name`
  - `connectionLimit`
  - `waitForConnections`
  - `queueLimit`(secured via environment configuration).


### ☁️ Cloud Connection

- The MySQL database is hosted on **AWS RDS** with **public endpoints** to allow remote access.
- The backend application is securely configured to connect to AWS RDS over the internet.


### 🔄 Version Control System

- **Git** is used for source code version control:
  - All commits include **clear messages** and explanations of changes.
  - Separate **branches** are created for new features and bug fixes.
  - Team members collaborate through **pull requests** and proper **merge strategies**.
  - **Retrospective notes** for *Iteration 1* are added in commit messages or Markdown documentation.
  - **Tags** are used to mark important versions:
    - Example: `v1.0.0` marks the end of Iteration 1.
    - Example: `v1.1.0` indicates bug fixes after testing.


### 📁 Remote Code Repository

- GitHub – hosts project code repositories and provides collaboration tools.

### figma link for mornitoring our work:
https://www.figma.com/board/ZJ5Mw2ckssVhX6q9xeVAT1/FigJam-basics?node-id=0-1&p=f&t=tuTemW3iG7OGDwDu-0

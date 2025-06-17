# **Fragments - Back-End API**

## **Project Overview**

The **Fragments** project is a back-end API built with **Node.js** and **Express**. It includes several development tools and libraries to enhance code quality, ensure security, and improve performance. These tools include **Pino** for logging, **ESLint** for linting, **Prettier** for code formatting, and **Nodemon** for auto-reloading during development. This setup ensures a smooth and efficient development environment.

### **Key Features:**
- **Prettier Setup**
- **Express** framework to handle HTTP requests and define routes.
- **Pino** for efficient structured logging to capture requests and errors.
- **ESLint** for enforcing coding standards and **Prettier** for auto-formatting the code.
- **Nodemon** for automatic server restarts during development.
- **VSCode Debugger** integration for real-time debugging and variable inspection.

---

## **Prerequisites**

Before setting up the project locally, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (Node Package Manager), which comes bundled with **Node.js**.

If you don’t have **Node.js** installed, you can download and install it from [nodejs.org](https://nodejs.org/).

---

## **Step-by-Step Setup Instructions**

### **Step 1: GitHub Setup**

1. **Create a GitHub Repository** named `fragments`:
   - Make it **Private**.
   - Add a **README.md** and **.gitignore** for **Node.js**.
   - **Clone the repository** to your local machine and navigate to the project folder on your computer.

2. **Generate an SSH Key** (if not done already):
   - Run the following command to generate a new SSH key:
     ```bash
     ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
     ```
   - Add the SSH key to your **GitHub** account.

3. **Link your local repository** to GitHub using the SSH URL.

---

### **Step 2: Project Initialization**

1. Use **npm init -y** to generate the **package.json** file in the project directory. This file manages all the project dependencies and configurations.
2. Modify the **package.json** file to update:
   - **Project name**: fragments
   - **Version**: 1.0.0
   - **Author**: Your name
   - **License**: UNLICENSED

---

### **Step 3: Install Project Dependencies**

1. **Install Express**, **CORS**, **Helmet**, and **Compression** for building the API, handling security, and optimizing performance.
2. **Install ESLint** to help you maintain code quality by ensuring that your JavaScript follows standard practices.
3. **Install Prettier** to automatically format your code according to the predefined rules.

---

### **Step 4: Set Up Logging with Pino**

1. **Install Pino** for logging and set it up to log incoming HTTP requests and errors.
   - This helps in monitoring and tracking server activity, making it easier to debug issues in production.

---

### **Step 5: Set Up Express Server**

1. Set up an **Express server** that listens on **port 8080** and defined a **Health Check route** (`/`), which returns a status message about the API’s health.
2. Integrated **CORS**, **Helmet**, and **Compression** middlewares into the server to secure the API and improve performance.

---

### **Step 6: Debugging Setup in VSCode**

1. Set up **VSCode’s debugger** by creating a **launch.json** configuration file. This configuration allows you to run the server in **debug mode**, where you can inspect code execution and variables in real-time.
2. Set breakpoints in the code (e.g., the Health Check route) to pause the execution at specific lines and inspect the state of the application.
3. Use **VSCode’s Debugger** to connect to the running process, step through the code, and debug in real-time.

---

### **Step 7: Nodemon for Automatic Server Restart**

1. Installed **Nodemon** as a development dependency to automatically restart the server whenever changes are made to the source code. This ensures that you don’t have to manually restart the server during development.
2. Added a **`dev` script** in your **package.json** to use **Nodemon** for development mode.

---

### **Step 8: Version Control with Git**

1. Regularly **commit your changes** to Git to keep track of your progress and ensure that you can revert back to previous states if needed.
2. After committing changes, push the changes to your **GitHub** repository to keep it up-to-date.

---

### **Step 9: Testing the API**

1. Tested the **Health Check route** by visiting the URL `http://localhost:8080` in your browser or using **curl** to make an HTTP GET request.
2. The server should respond with a **JSON** containing the status, author, and version information.

---

## **Installation**

To get started, clone the repository to your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MehakDhull/fragments.git
  cd fragments 
  npm install

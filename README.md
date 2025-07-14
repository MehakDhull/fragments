# Lab1

# Key Features:

Prettier for automatic code formatting.
Utilizes the Express framework for handling HTTP requests and defining routes.
Pino is used for structured logging to capture requests and errors effectively.
ESLint ensures coding standards are maintained, while Prettier automates code formatting.
Nodemon automatically restarts the server during development for a smoother workflow.
Integration with the VSCode Debugger allows for real-time debugging and inspecting variables.

# Prerequisites

Before setting up the project on your local machine, make sure the following are installed:

Node.js (version 16 or higher)
npm (Node Package Manager, which comes with Node.js)
If you don’t have Node.js, you can download it from nodejs.org.

# Step-by-Step Setup Instructions

Step 1: GitHub Setup
Create a GitHub repository called fragments:
Set the repository to Private.
Include a README.md and a .gitignore for Node.js.
Clone the repository to your local machine and navigate to the project folder.
Generate an SSH Key (if you haven’t already):
Run this command to create an SSH key:
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
Add the generated SSH key to your GitHub account.
Link your local repository to GitHub using the SSH URL.

Step 2: Project Initialization
Run the following command to initialize the package.json file:
npm init -y
This file will manage your project’s dependencies and settings.

Update the package.json with the following details:

Project name: fragments
Version: 1.0.0
Author: Mehak
License: UNLICENSED

Step 3: Install Project Dependencies
Install the following dependencies:
Express, CORS, Helmet, Compression: For API development, security, and performance optimization.
ESLint: To maintain code quality by enforcing standard JavaScript practices.
Prettier: For automatic code formatting.

Step 4: Set Up Logging with Pino
Install Pino for structured logging:
Configure it to log incoming requests and errors, which helps in tracking server activity and debugging production issues.

Step 5: Set Up Express Server
Set up an Express server to listen on port 8080, and define a Health Check route (/) that returns a status message about the API's health.
Integrate CORS, Helmet, and Compression middlewares for security and performance enhancements.

Step 6: Debugging Setup in VSCode
Set up VSCode Debugger by creating a launch.json configuration file:
This allows you to run the server in debug mode, inspect variables, and trace the flow of execution.

Set breakpoints (for example, on the Health Check route) to pause execution and examine the application's state.
Use the VSCode Debugger to connect to the process and step through the code for real-time debugging.

Step 7: Nodemon for Automatic Server Restart
Install Nodemon as a development dependency to automatically restart the server on file changes.
Add a dev script in your package.json to use Nodemon for automatic server restarts during development.

Step 8: Version Control with Git
Commit your changes to Git regularly to track progress and allow easy reversion to previous versions.
After committing changes, push them to your GitHub repository to keep it updated.

Step 9: Testing the API
Test the Health Check route by visiting http://localhost:8080 in your browser or using curl:
curl http://localhost:8080
The server should respond with a JSON message containing the API's status, author, and version information.

Mehak Dhull

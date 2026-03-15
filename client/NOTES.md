Node.js → Download from nodejs.org (download LTS version)
VS Code → Your code editor
Postman → Download from postman.com (to test APIs later)
Git → Download from git-scm.com

# 1. Create the main project folder
mkdir blog-platform
cd blog-platform

# 2. Create the server folder
mkdir server
cd server

# 3. Initialize Node.js in server folder
npm init -y

    npm init -y creates a package.json file.

# 4. Go back to root folder
cd ..

# 5. Create React app using Vite (faster than create-react-app)
npm create vite@latest client
cd client
npm install

- Install All Backend Packages

# Go into server folder
cd ../server

# Install main packages
npm install express mongoose bcryptjs jsonwebtoken dotenv cors multer cloudinary

# Install nodemon as a dev dependency
npm install --save-dev nodemon

    What is nodemon? Normally when you change your server code, you have to manually stop and restart the server. nodemon watches your files and automatically restarts the server when you save. It's only needed during development, so we install it as --save-dev.

# Now open server/package.json and update the scripts section to look like this:
    "scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
        },

    Also add this line to enable modern import/export syntax:
        json"type": "module",

    This lets you write "import express from 'express'" instead of the older "const express = require('express')" style.

- Install All Frontend Packages

# Go into client folder
cd ../client

# Install frontend packages
npm install axios react-router-dom react-hot-toast react-quill

    Axios is used to send requests to a server or API.
    Routing means switching between pages without reloading the website.
    react-hot-toast is used to show small popup messages (notifications).
    react-quill is a rich text editor. It allows users to write formatted content like in Word / Google Docs.
    
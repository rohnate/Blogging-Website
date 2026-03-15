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
    tiptap is a rich text editor. It allows users to write formatted content like in Word / Google Docs.

# Now let's create all the folders and files we'll need. Run these commands from inside the server/ folder:

    # Create all folders
    mkdir models routes controllers middleware config

        -models contain the database structure. They define how data is stored in MongoDB. In MERN stack we usually use Mongoose.
        -routes define the API endpoints.
        -Controllers contain the business logic. They define what happens when a route is called.
        -Middleware runs before the request reaches the controller. It is used for: Authentication, Authorization, Logging, Validation.
        -config contains configuration settings. Example: Database connection, Environment variables.

    # Create main files
    touch server.js .env

    # Create model files
    touch models/User.js models/Post.js models/Comment.js

    # Create route files
    touch routes/authRoutes.js routes/postRoutes.js routes/commentRoutes.js

    # Create controller files
    touch controllers/authController.js controllers/postController.js controllers/commentController.js

    # Create middleware file
    touch middleware/authMiddleware.js

    # Create config file
    touch config/db.js


# Setup MongoDB Atlas (Free Cloud Database)

    Instead of installing MongoDB on your computer, we'll use MongoDB Atlas — a free cloud database.

    Follow these steps:

    1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) and create a free account

    2. Click "Build a Database" → Choose FREE tier → Select any region close to you

    3. Create a username and password for your database
    > ⚠️ Save this password somewhere — you'll need it soon!

    4. Under "Where would you like to connect from?" click "Allow access from anywhere" and add `0.0.0.0/0`
    > 💡 This means any IP address can connect. Fine for development.

    5. Click "Connect" → "Connect your application" → Copy the connection string. It looks like:
    ```
    mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/

# Setup the .env File
The .env file stores your secret keys. This file should NEVER be pushed to GitHub.
Open server/.env and add this:
    envPORT=5000
    MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/blogplatform
    JWT_SECRET=makethisalongrandombunchofcharacters123456

 # Use ONE .gitignore in the root of the project.

Git automatically ignores files inside both client and server if you list them there.


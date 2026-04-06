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

# Now open server/package.json and update the scripts section to look like this

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

npm install axios react-router-dom tailwindcss @tailwindcss/vite @tiptap/react @tiptap/pm @tiptap/starter-kit

    Axios is used to send requests to a server or API.
    Routing means switching between pages without reloading the website.
    tailwind css for styling
    tiptap is a rich text editor. It allows users to write formatted content like in Word / Google Docs.

    Why 3 Tiptap packages?

        @tiptap/react → The main Tiptap package that connects with React
        @tiptap/pm → This is ProseMirror, the engine that powers Tiptap under the hood. Tiptap is built on top of it, so it needs this to work
        @tiptap/starter-kit → A bundle of the most common text formatting features like Bold, Italic, Headings, Lists, Blockquote etc. Instead of installing each feature separately, starter-kit gives you all the basics in one package

    * Setup Path Alias (Required for Shadcn) :

        Shadcn needs a path alias so it can import files using @/ instead of long relative paths like ../../components.
         Instead of writing import Button from '../../components/ui/Button' you can write import Button from '@/components/ui/Button' — much cleaner!

        Install the path package: npm install -D @types/node

        Update vite.config.js with :
            resolve: {
            alias: {
            "@": path.resolve(__dirname, "./src"), // @ now points to the src folder
            },
            },

        Now create a jsconfig.json file in the client/ folder: touch jsconfig.json

        and update it with :
            {
            "compilerOptions": {
                "baseUrl": ".",
                "paths": {
                "@/*": ["./src/*"]
                }
            }
            }
        
        Now Initialize Shadcn/ui, run the Shadcn setup command : npx shadcn@latest init
            This command automatically sets up everything Shadcn needs inside your project.

            *npx - Runs a package without installing it globally

        Install Shadcn Components like :
            npx shadcn@latest add button
            npx shadcn@latest add input
            etc...

            * each command copies the component code into your src/components/ui/ folder. Open that folder in VS Code and you'll see the actual code for each component. You can edit it however you want!


# Now let's create all the folders and files we'll need. Run these commands from inside the server/ folder

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

# Use ONE .gitignore in the root of the project

Git automatically ignores files inside both client and server if you list them there.

# Setup config/db.js for Database Connection and server.js for The Main Server File

# What We've Done in Phase 1

    ✅ Created project folder structure
    ✅ Initialized Node.js backend
    ✅ Created React frontend with Vite
    ✅ Installed all packages
    ✅ Connected to MongoDB Atlas
    ✅ Setup .env for secret keys
    ✅ Server is running successfully

# Phase 2 : Authentication System

    full flow in english :
        REGISTER:
        User fills form → React sends data to Express → 
        Express hashes password → Saves user in MongoDB → 
        Sends back a JWT token → React stores token

        LOGIN:
        User fills form → React sends data to Express → 
        Express checks password → If correct, sends JWT token → 
        React stores token → User is now "logged in"

        PROTECTED ROUTE:
        User requests something private → React sends JWT token → 
        Express middleware checks token → If valid, allow access → 
        If invalid/missing, block access

    - IMP to know the request flow : Request → Middleware → Controller → Response   

    Step 1 — Build the User Model

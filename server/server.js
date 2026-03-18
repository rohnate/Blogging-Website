import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import dns from 'dns'

// changing DNS (because this is the reason why i am not able to connect to mongoDb though node)
dns.setServers(["1.1.1.1","8.8.8.8"])

// Load environment variables from .env file
dotenv.config();

// connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows React (port 3000) to talk to this server (port 5000)
app.use(express.json()); // Allows server to read JSON data from requests

// Test route
app.get("/", (req, resp) => {
  resp.send("Blog API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
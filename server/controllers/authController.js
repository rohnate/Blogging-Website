import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, // payload (data inside token)
    process.env.JWT_SECRET, // secret key to sign the token
    { expiresIn: "7d" }, // token expires in 7 days
  );
};

// @POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // getting data form the request

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // 2. Hash the password (never store plain text passwords in the database)
    const hashedPassword = await bcrypt.hash(password, 10); // generate salt(10 rounds) + hash
    // flow : Password → Add salt → Hash → Store in DB

    // 3. Create the new user in MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Generate token and send response
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: "true", // removes extra spaces from the stored string
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // no two users with same email
      lowercase: true, // always store as lowercase
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be atleast 6 characters long"],
    },
    avatar: {
      type: String,
      default: "", // empty until user uploads one
    },
  },
  {
    timestamps: true, // auto adds createdAt and updatedAt fields
  },
);

export default mongoose.model("User", userSchema);

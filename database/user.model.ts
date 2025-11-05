import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

// 🧩 TypeScript interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // optional for Google users
  role: "user" | "admin";
  image?: string;
  provider?: "credentials" | "google";
  createdAt: Date;
  updatedAt: Date;
}

// 🧠 User Schema
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (email: string) {
          const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(email);
        },
        message: "Please provide a valid email address",
      },
    },

    password: {
      type: String,
      required: false, // not required for Google users
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // never return password in queries by default
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    image: {
      type: String,
      default: "",
    },

    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// 🔒 Index for performance & uniqueness
UserSchema.index({ email: 1 }, { unique: true });

// 🧂 Pre-save hook: hash password before saving (only if password exists)
UserSchema.pre("save", async function (next) {
  const user = this as IUser;

  // Only hash if password exists and is modified
  if (!user.isModified("password") || !user.password) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// ✅ Model creation
const User = models.User || model<IUser>("User", UserSchema);

export default User;

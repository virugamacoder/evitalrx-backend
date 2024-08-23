const mongoose = require("mongoose");

// CamelCase is used for naming convention

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNo: { type: Number, required: true, match: /^[0-9]{10}$/ }, // Assuming 10-digit phone number
    email: {
      type: String,
      required: true,
      match: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
    }, // Assuming email pattern
    password: { type: String, required: true, minLength: 8 }, // Assuming minimum length of password is 8
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    // Assuming Only 2 value Male and Female are allowed
    address: { type: String, required: true },
    resetPasswordLinkExpire: { type: Number, default: 0 },
    otp: { type: Number }, // OTP field
    otpExpire: { type: Date }, // OTP expiry field
    otpVerified: { type: Boolean, default: false }, // OTP verification status
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

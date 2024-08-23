const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modal/User");
const moment = require("moment");
const SendMail = require("../utils/SendMail");

/*
API Response Structure

{
  message: "Message",
  data: { data }
}

this structure is used to send response to the client
*/

// Without Otp API
exports.signup = async (req, res) => {
  console.log("Signup api");

  try {
    const {
      firstName,
      lastName,
      mobileNo,
      email,
      password,
      dateOfBirth,
      gender,
      address,
    } = req.body;

    // Validation: Check if all fields are provided and not empty
    if (
      !firstName ||
      !lastName ||
      !mobileNo ||
      !email ||
      !password ||
      !dateOfBirth ||
      !gender ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists !" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Convert dateOfBirth to a valid date format
    const formattedDateOfBirth = moment(dateOfBirth, "DD-MM-YYYY").toDate();

    // Create a new User
    const newUser = await User.create({
      firstName,
      lastName,
      mobileNo,
      email,
      password: hashedPassword,
      dateOfBirth: formattedDateOfBirth,
      address,
      gender,
    });

    if (!newUser) {
      return res
        .status(400)
        .json({ message: "Something Went Wrong Please Try Again !" });
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Signup Data Get and Send OTP
exports.signupSendOtp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobileNo,
      email,
      password,
      dateOfBirth,
      gender,
      address,
    } = req.body;

    // Validation: Check if all fields are provided and not empty
    if (
      !firstName ||
      !lastName ||
      !mobileNo ||
      !email ||
      !password ||
      !dateOfBirth ||
      !gender ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Generate a 6-digit OTP and set its expiry time
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otpExpire = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

    // Find the user by email
    let user = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    const formattedDateOfBirth = moment(dateOfBirth, "DD-MM-YYYY").toDate();

    if (user) {
      if (user.otpVerified) {
        return res.status(400).json({ message: "User already exists !" });
      }

      user.otp = otp;
      user.otpExpire = otpExpire;
      user.otpVerified = false;
      user.firstName = firstName;
      user.lastName = lastName;
      user.mobileNo = mobileNo;
      user.email = email;
      user.password = hashedPassword;
      user.dateOfBirth = formattedDateOfBirth;
      user.address = address;
      user.gender = gender;
      await user.save();
    } else {
      user = await User.create({
        firstName,
        lastName,
        mobileNo,
        email,
        password: hashedPassword,
        dateOfBirth: formattedDateOfBirth,
        address,
        gender,
        otp,
        otpExpire,
        otpVerified: false,
      });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Something Went Wrong Please Try Again !" });
      }
    }

    // Send the OTP to the user's email
    await SendMail(
      "Your OTP Code",
      email,
      ` <p>Your OTP code is <strong>${otp}</strong>. It is valid for 15 minutes.</p> `
    );

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Otp Verification
exports.signupVerifyotp = async (req, res) => {
  const { email, otp } = req.body;

  // Check if email and OTP are provided
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }

    // Check if the OTP has expired or doesn't match
    if (user.otp !== parseInt(otp) || Date.now() > user.otpExpire) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = undefined;
    user.otpExpire = undefined;
    user.otpVerified = true;
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if User exists and exclude fields not send in response
    const user = await User.findOne({ email, otpVerified: true }).select(
      "-resetPasswordLinkExpire -otp -otpExpire -otpVerified -createdAt -updatedAt -__v _id"
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Remove the password from the user object
    user.password = undefined;

    res
      .status(200)
      .json({ message: "User Login Successfully", data: { token, user } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Forgot Password Send Email
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res
        .status(400)
        .json({ message: "Forgot Password Email is required" });
    }

    // Check if User exists
    const user = await User.findOne({ email, otpVerified: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Create a password reset link
    const passwordResetLink = `${process.env.FRONTEND_URL}/resetpassword?token=${token}`;

    const data = `
    <h1>Forgot Your Password</h1>
    <p>You requested a Forgot password. Please click the link below to Change your password:</p>
    <a href="${passwordResetLink}">Change Password</a>
    <p>This link will expire in one hour.</p>`;

    // Send email
    await SendMail("Forgot Password", email, data);

    // Set the resetPasswordLinkExpire field
    user.resetPasswordLinkExpire = 1;
    await user.save();

    res
      .status(200)
      .json({ message: "Please Check The Email Send A Reset Password Link" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    // Check if password and token are provided
    if (!password || !token) {
      return res
        .status(400)
        .json({ message: "Password and Token are required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Check if User exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the reset password link has expired
    if (!user.resetPasswordLinkExpire) {
      return res.status(400).json({ message: "Password Link Expire" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the new password is the same as the old password
    const isOldPasswordMatch = await bcrypt.compare(password, user.password);

    if (isOldPasswordMatch) {
      return res.status(400).json({
        message: "New password must be different from the previous password",
      });
    }

    user.password = hashedPassword;
    user.resetPasswordLinkExpire = 0;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Password Link expired." });
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Profile Update
exports.updateUser = async (req, res) => {
  try {
    const userId = req.userId;

    console.log(req.body);

    // Update user details and exclude fields not send in response
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).select(
      "-password -createdAt -updatedAt -__v -resetPasswordLinkExpire -otp -otpExpire -otpVerified -_id"
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the updated user details
    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

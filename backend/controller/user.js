
import { sendEmail } from "../libs/send-email.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
// import {sendEmail} from "../libs/send-email";

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    delete user.password;

    // jfkd

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);

    res.status(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, profilePicture } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.profilePicture = profilePicture;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);

    res.status(500).json({ message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);

    res.status(500).json({ message: "Server error" });
  }
};

 const toggleTwoFactorAuth = async (req, res) => {
  const userId = req.user.id; // from `authenticateUser` middleware
  const { enable } = req.body;



  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { is2FAEnabled: enable }, // ✅ match schema
      { new: true }
    ).select('-password');
     // exclude password

   

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(user.is2FAEnabled);

    return res.status(200).json({
      message: `2FA ${enable ? 'enabled' : 'disabled'}`,
      user,
    });
  } catch (err) {
    console.error('2FA toggle error:', err);
    return res.status(500).json({ error: 'Server error while toggling 2FA' });
  }
};

export const sendVerificationEmail = async (req, res) => {
  try {
    
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Email and code are required" });
    }

    console.log("Received email:", email);
    

    const user = await User.findOne({ email }).select("+emailVerificationCode +emailVerificationExpiry");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.emailVerificationCode = verificationCode;
    user.emailVerificationExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    await user.save();

    const emailSubject = "Verify your email address";
    const emailBody = `Your email verification code is: ${verificationCode}`;

    const isEmailSent = await sendEmail(email, emailSubject, emailBody);

    if (!isEmailSent) {
      return res.status(500).json({ message: "Failed to send verification email." });
    }

    res.status(200).json({ message: "Verification code sent to your email." });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({ message: "Server error." });
  }
};



export { getUserProfile, updateUserProfile, changePassword, toggleTwoFactorAuth };

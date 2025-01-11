import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/user.js";

export const signup = async (req, res, next) => {
  const {name, emailId, password } = req.body;
  if (
    !name ||
    !emailId ||
    !password ||
    name === " " ||
    emailId === " " ||
    password === " "
  ) {
    alert("All fields are required");
  }

  const hashPassword = bcryptjs.hashSync(password, 10); //In the bcryptjs.hashSync(password, 10) function, the 10 represents the number of rounds the bcrypt algorithm will run to hash the password. Increasing the number of rounds increases the computational effort required to hash the password, making it more secure against brute-force attacks.

  const newUser = new User({
    name,
    emailId,
    password: hashPassword,
  });
  try {
    await newUser.save();
    res.json({ message: "Signup Successfull" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { emailId, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // Validate password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // Create JWT Token
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET || "secret_key", {
      expiresIn: "1d", // Token expiry time
    });

    // Add token to cookie and send response
    res.cookie("token", token, { httpOnly: true, secure: false }); // Use 'secure: true' in production
    res.status(200).json({ message: "Login Successfully!!!", token });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong: " + err.message });
  }
};

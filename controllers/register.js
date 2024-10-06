import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import usermodel from '../models/usermodel.js';

export const registerController = async (req, res) => {
  try {
    const existingUser = await usermodel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: 'User already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const user = new usermodel(req.body);
    await user.save();

    return res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Error in register API',
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const user = await usermodel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Invalid credentials',
      });
    }

    if (user.role !== req.body.role) {
      return res.status(403).send({
        success: false,
        message: 'Role does not match',
      });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.status(200).send({
      success: true,
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Error in login API',
      error,
    });
  }
};

export const currentUserController = async (req, res) => {
  try {
    const user = await usermodel.findOne({ _id: req.user.userId });

    return res.status(200).send({
      success: true,
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Unable to get current user',
      error,
    });
  }
};

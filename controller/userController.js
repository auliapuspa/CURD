import User from "../models/user.js";
import helpers from "../helpers/password.js";
import authToken from "../helpers/token.js";
//import sendEmail from "../helpers/mailer.js";

const userController = {

  // ================= REGISTER =================
  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;


      if (!email || !password) {
        const error = new Error("Email and password are required");
        error.statusCode = 400;
        throw error;
      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        const error = new Error("Email already registered");
        error.statusCode = 400;
        throw error;
      }



      const user = await User.create({
        email,
        password,
      
      });  

      res.status(201).json({
        success: true,
        data: {
          id: user._id,
          email: user.email,
        },
      });

    } catch (err) {
      next(err);
    }
  },

  // ================= LOGIN =================
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        const error = new Error("Email and password are required");
        error.statusCode = 400;
        throw error;
      }

      const user = await User.findOne({ email });

      if (!user) {
        const error = new Error("Email Not Found");
        error.statusCode = 401;
        throw error;
      }

      const isMatch = await helpers.compare(password, user.password);

      if (!isMatch) {
        const error = new Error("Wrong Password");
        error.statusCode = 401;
        throw error;
      }

      const token = authToken.generateToken({
        id: user._id,
        email: user.email,
      });

      res.status(200).json({
        success: true,
        data: {
          id: user._id,
          email: user.email,
          token,
        },
      });

    } catch (err) {
      next(err);
    }
  }

};

export default userController;
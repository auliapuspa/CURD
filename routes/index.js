import express from "express";
import userController from "../controller/userController.js";
import productController from "../controller/productController.js";
import auth from "../middlewares/auth.js";
import sendEmail from "../helpers/mailer.js";
// import dotenv from "dotenv";
// dotenv.config();

const router = express.Router();

router.get('/test-email', async (req, res, next) => {
    try {
      await sendEmail({
        to: 'auliapuspa27@gmail.com', //fill with email address
        subject: 'Test Email 🚀',
        html: '<h1>Hello from Nodemailer</h1>'
      })
  
      res.json({ message: 'Email sent successfully' })
    } catch (err) {
      next(err)
    }
  })

// USER ROUTES
router.post("/register", userController.register);
router.post("/login", userController.login);

// Apply authentication middleware to all routes below
router.use(auth.authentication);

// PRODUCT ROUTES
router.get("/products", productController.find);
router.get("/products/:id", productController.findById);
router.post("/products", productController.create);
router.put("/products/:id", auth.authorization, productController.update);
router.delete("/products/:id", productController.delete);




export default router;
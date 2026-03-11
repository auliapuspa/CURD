import authToken from "../helpers/token.js";
import Product from "../models/product.js";

// ================= AUTHENTICATION =================
const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Login dulu" });
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = authToken.decodedToken(token);

    req.userId = decoded.id;

    next();
  } catch (err) {
    res.status(401).json({ message: "Login dulu" });
  }
}; 

// ================= AUTHORIZATION =================
const authorization = (req, res, next) => {

  Product.findById(req.params.id)
    .then((product) => {

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();

    })
    .catch((err) => {
      res.status(500).json({
        message: "Authorization failed",
        error: err.message,
      });
    });
};

export default { authentication, authorization };
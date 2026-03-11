import Product from "../models/product.js";

const productController = {

  // ================= GET ALL PRODUCTS (HANYA MILIK USER LOGIN) =================
  find: (req, res) => {

    const userId = req.userId;

    Product.find({ userId })
      .then((products) => {
        res.status(200).json({
          success: true,
          data: products
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Failed fetching products",
          error: err.message,
        });
      });
  },


  // ================= GET PRODUCT BY ID =================
  findById: (req, res) => {

    const userId = req.userId;

    Product.findOne({
      _id: req.params.id,
      userId
    })
      .then((product) => {

        if (!product) {
          return res.status(404).json({
            success: false,
            message: "Product not found"
          });
        }

        res.status(200).json({
          success: true,
          data: product
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Fetch failed",
          error: err.message,
        });
      });
  },


  // ================= CREATE PRODUCT =================
  create: (req, res) => {

    const userId = req.userId;

    const newProduct = new Product({
      ...req.body,
      userId
    });

    newProduct.save()
      .then((data) => {
        res.status(201).json({
          success: true,
          message: "Product created",
          data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: "Create failed",
          error: err.message,
        });
      });
  },


  // ================= UPDATE PRODUCT =================
  update: (req, res) => {

    const userId = req.userId;

    Product.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    )
      .then((updated) => {

        if (!updated) {
          return res.status(404).json({
            success: false,
            message: "Product not found"
          });
        }

        res.status(200).json({
          success: true,
          message: "Updated successfully",
          data: updated,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: "Update failed",
          error: err.message,
        });
      });
  },


  // ================= DELETE PRODUCT =================
  delete: (req, res) => {

    const userId = req.userId;

    Product.findOneAndDelete({
      _id: req.params.id,
      userId
    })
      .then((deleted) => {

        if (!deleted) {
          return res.status(404).json({
            success: false,
            message: "Product not found"
          });
        }

        res.status(200).json({
          success: true,
          message: "Product deleted"
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Delete failed",
          error: err.message,
        });
      });
  }

};

export default productController;
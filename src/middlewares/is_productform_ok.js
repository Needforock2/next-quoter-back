export default function is_productform_ok(req, res, next) {
  try {
    const { name, brand, code, stock, description, price } = req.body;
    if (name && brand && code && stock && description && price) {
      next();
    } else {
      return res.status(400).json({
        success: false,
        message: "Fill out all information",
      });
    }
  } catch (error) {
    next(error);
  }
}

import { model, Schema } from "mongoose";

let collection = "products";
let schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    stock: {type: Number, required:true},
    pType: { type: String, required: true, enum: ["Product", "Service"] },
  },
  {
    timestamps: true,
  }
);

let Product = model(collection, schema);

export default Product;

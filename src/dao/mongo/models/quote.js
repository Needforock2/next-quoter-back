import mongoose, { model, Schema } from "mongoose";

let collection = "quotes";
let schema = new Schema(
  {
    products: {
      type: [
        {
          product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
      default: [],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    status: { type: String, required: true, default: "Pending" },
    number: { type: Number, unique: true, index: true },
  },

  {
    timestamps: true,
  }
);

const Quote = model(collection, schema);
export default Quote;

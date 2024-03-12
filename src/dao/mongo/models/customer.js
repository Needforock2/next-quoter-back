import mongoose, { model, Schema } from "mongoose";

let collection = "customers";
let schema = new Schema(
  {
    first_name: { type: String, required: true, index: true },
    last_name: { type: String, required: true },
    mail: { type: String, unique: true, required: true },
    rut: { type: String, required: true, unique: true, index: true },
    image: {type: String, required: true},
    street: { type: String, required: true },
    street_number: { type: Number, required: true },
    country: { type: String, default: "Chile" },

    /* equipments: {
    type: [
      {
        equipment: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "equipments",
        },
      },
    ],
  }, */
  },
  {
    timestamps: true,
  }
);

let Customer = model(collection, schema);

export default Customer;

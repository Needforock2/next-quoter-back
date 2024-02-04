import { model, Schema } from "mongoose";

let collection = "users";
let schema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    mail: { type: String, unique: true, index: true, required: true },
    role: { type: Number, default: 0 },
    rut: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

let User = model(collection, schema);

export default User;

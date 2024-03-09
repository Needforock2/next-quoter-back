import { model, Schema } from "mongoose";

let collection = "users";
let schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, index: true, required: true },
    image: {type: String, required: true},
    role: { type: String, default: 'Admin' },
    rut: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

let User = model(collection, schema);

export default User;

import { Schema, model, models } from "mongoose";

const DetailSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/\S+@\S+\.\S+/, "Email invalid."],
  },
  phone: {
    type: String,
    match: [/^[6-9]\d{9}$/, "Phone Number should be 10 digits long"],
  },
  password: {
    type: String,
  },
  connections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Detail", // Reference to other Detail documents
    },
  ],
});

const Detail = models.Detail || model("Detail", DetailSchema);

export default Detail;

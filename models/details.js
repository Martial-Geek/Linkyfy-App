import { Schema, model, models } from "mongoose";

const DetailSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/\S+@\S+\.\S+/, "Email invalid."],
  },
  phone: {
    type: String,
    required: [true, "Phone Number is required"],
    match: [/^[6-9]\d{9}$/, "Phone Number should be 10 digits long"],
  },
  password: {
    type: String,
    required: [true, "Phone Number is required"],
    match: [
      /^(?=.*\d)(?=.*[A-Z])(?=.*\W)[A-Za-z\d\W]{8,16}$/,
      "Password invalid, it should contain 8-16 characters, with at least 1 digit, 1 uppercase letter, and 1 special symbol.",
    ],
  },
});

const Detail = models.Detail || model("Detail", DetailSchema);

export default Detail;

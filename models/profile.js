import { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Detail",
  },
  pfp: {
    type: String,
    required: [true, "Prompt is required."],
  },
});

const Profile = models.Profile || model("Profile", ProfileSchema);

export default Profile;

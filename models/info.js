import { Schema, model, models } from "mongoose";

const InfoSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Detail",
  },
  about: {
    type: String,
  },
  skills: {
    type: [String],
  },
  education: {
    collegeName: String,
    startingYear: String,
    endingYear: String,
    courseName: String,
    description: String,
  },
  experiences: [
    {
      duration: String,
      startingYear: String,
      endingYear: String,
      companyName: String,
      jobType: String,
      jobStatus: String,
      ending: String,
    },
  ],
  certifications: [
    {
      skillName: String,
      platform: String,
    },
  ],
  exist: Boolean,
});

const Info = models.Info || model("Info", InfoSchema);

export default Info;

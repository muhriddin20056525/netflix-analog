import { model, models, Schema } from "mongoose";

const ProfileSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  userId: { type: String, required: true },
  savedMovies: { type: [String], default: [] },
});

const ProfileModel = models.Profile || model("Profile", ProfileSchema);
export default ProfileModel;

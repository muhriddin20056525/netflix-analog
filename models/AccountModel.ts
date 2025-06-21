import { model, models, Schema } from "mongoose";

const AccountSchema = new Schema({
  accountImg: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  uid: { type: String, required: true },
  fileId: { type: String, required: true },
});

const AccountModel = models.Account || model("Account", AccountSchema);
export default AccountModel;

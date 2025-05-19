import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongodb is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI || "", {
      dbName: "netflix-analog",
    });

    isConnected = true;
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log(`Mongodb connection error ${error}`);
  }
};

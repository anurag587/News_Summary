import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://anuragusict09:newssummary@news.0tg2z.mongodb.net/?retryWrites=true&w=majority&appName=news"
  );
};

export default connectDb;

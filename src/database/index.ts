import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
class Database {
  private URI: string;

  constructor() {
    // Replace 'your_mongodb_uri' with your actual MongoDB URI
    this.URI = process.env.MONGO_URL;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Exit the application on connection failure
    }
  }
}

export default new Database();

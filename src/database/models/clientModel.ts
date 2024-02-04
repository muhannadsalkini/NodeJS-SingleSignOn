import { Schema, model, Document } from "mongoose";

interface IClient extends Document {
  id: string;
  name: string;
  secret: string;
  redirectUrl: string;
}

const clientSchema: Schema<IClient> = new Schema(
  {
    id: {
      type: String,
      unique: true,
      index: true,
    },
    name: { type: String, required: true },
    secret: { type: String, required: true },
    redirectUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Client = model<IClient>("Client", clientSchema);
export default Client;

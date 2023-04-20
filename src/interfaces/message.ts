import { Types } from "mongoose";

interface PostMessageData {
  content: string;
  from: Types.ObjectId | string;
  to: Types.ObjectId | string;
}

export { PostMessageData };
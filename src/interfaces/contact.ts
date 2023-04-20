import { Types } from "mongoose";

interface PostContactData {
  name: string;
  participants: [ Types.ObjectId ];
}

interface UpdateContactData {
  id: Types.ObjectId | string;
  name?: string;
  messages?: [ Types.ObjectId ];
}

export { PostContactData, UpdateContactData }
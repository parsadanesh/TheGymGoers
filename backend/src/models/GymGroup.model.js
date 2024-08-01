import User from "./user.model.js";
import { Schema, model } from "mongoose";

const gymGroupSchema = new Schema({
    name: { type: String, required: true, unique: true },
    admin: {type:Schema.Types.ObjectId, ref: "User", required: true},
    members: [{type: Schema.Types.ObjectId, ref: "User", default: []}]
});

const GymGroup = model("GymGroup", gymGroupSchema);

export default GymGroup;
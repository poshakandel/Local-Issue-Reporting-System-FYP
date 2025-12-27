import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },

   role: {
  type: String,
  enum: ["Citizen", "WardAdmin", "SuperAdmin"],
  default: "Citizen",
},


    ward: {
      type: Number,
      min: 1,
      max: 33,
      default: null,
      required: function () {
        return this.role !== "superAdmin";
      },
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

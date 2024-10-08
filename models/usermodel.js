import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "role is required"],
    enum: ["admin", "organisation", "donar", "hospital"],
  },
  name: {
    type: String,
    required: function () {
      return this.role === "admin" || this.role === "donar";
    },
  },
  organisationName: {
    type: String,
    required: function () {
      return this.role === "organisation";
    },
  },
  hospitalName: {
    type: String,
    required: function () {
      return this.role === "hospital";
    },
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  phone: {
    type: String,
    required: [true, "phone number is required"],
  },
}, {
  timestamps: true
});

export default mongoose.model("users", userSchema);

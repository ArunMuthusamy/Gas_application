const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    available: { type: String, require: true },
    time: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: String, default: false },
  },
  {
    versionKey: false,
  }
);
const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = { BookingModel };

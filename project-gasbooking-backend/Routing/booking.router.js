const express = require("express");
const { BookingModel } = require("../Model/book.model");
const auth = require("../middleware/auth.middleware");

const BookingRouter = express.Router();

BookingRouter.post("/booking-post", auth, async (req, res) => {
  const { name, address, available, time, price, description } = req.body;
  try {
    const booking = new BookingModel({
      name,
      address,
      available,
      time,
      price,
      description,
    });
    await booking.save();
    res
      .status(200)
      .json({ Message: "Your booking is successful", Booking: booking });
  } catch (error) {
    res
      .status(400)
      .json({ Message: "Something went wrong...", error: error.Message });
  }
});

BookingRouter.get("/bookingdetails", auth, async (req, res) => {
  try {
    const list = await BookingModel.find();
    if (!list || list.length <= 0) {
      return res.status(404).json({ Message: "Booking status not found..." });
    }
    res.status(200).json({ Message: "Your booking list..", BookingList: list });
  } catch (error) {
    res.status(400).json({
      Message: "Something went wrong in booking",
      Error: error.Message,
    });
  }
});

BookingRouter.delete("/bookingCancel/:id", auth, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedBooking = await BookingModel.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ Message: "Booking not found with the given ID." });
    }

    res.status(200).json({
      Message: "Booking cancelled successfully",
      Deleted: deletedBooking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Error cancelling booking", Error: error.message });
  }
});

BookingRouter.put("/updateStatus/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ Message: "Booking not found" });
    }

    res.status(200).json({
      Message: "Status updated successfully",
      Updated: updatedBooking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Error updating status", Error: error.message });
  }
});

module.exports = { BookingRouter };

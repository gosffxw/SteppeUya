const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    propertyOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rentPeriod: {
      type: String,
      required: true,
    },

    guestsCount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Новая", "Одобрена", "Отклонена"],
      default: "Новая",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
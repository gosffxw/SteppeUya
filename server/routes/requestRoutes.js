const express = require("express");
const Request = require("../models/Request");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { propertyId, propertyOwnerId, userId, rentPeriod, guestsCount } =
      req.body;

    const newRequest = new Request({
      propertyId,
      propertyOwnerId,
      userId,
      rentPeriod,
      guestsCount,
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании заявки" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении статуса заявки" });
  }
});

module.exports = router;
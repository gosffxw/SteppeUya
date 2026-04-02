const express = require("express");
const multer = require("multer");
const path = require("path");
const Property = require("../models/Property");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { ownerId, title, city, price, type, guests, description, address } =
      req.body;

    const newProperty = new Property({
      ownerId,
      title,
      city,
      price,
      type,
      guests,
      description,
      address,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании квартиры" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, city, price, type, guests, description, address } = req.body;

    const updatedData = {
      title,
      city,
      price,
      type,
      guests,
      description,
      address,
    };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении квартиры" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Квартира удалена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении квартиры" });
  }
});

module.exports = router;
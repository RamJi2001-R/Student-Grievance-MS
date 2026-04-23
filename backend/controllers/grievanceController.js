const Grievance = require("../models/Grievance");

// Create
exports.create = async (req, res) => {
  try {
    const grievance = new Grievance({
      ...req.body,
      user: req.user,
    });
    await grievance.save();
    res.json(grievance);
  } catch (error) {
    console.error("Grievance create error:", error.message);
    res.status(400).json({ msg: "Unable to save grievance", error: error.message });
  }
};

// Get all
exports.getAll = async (req, res) => {
  try {
    const data = await Grievance.find({ user: req.user });
    res.json(data);
  } catch (error) {
    console.error("Grievance fetch error:", error.message);
    res.status(500).json({ msg: "Unable to fetch grievances" });
  }
};

// Get by ID
exports.getOne = async (req, res) => {
  const data = await Grievance.findById(req.params.id);
  res.json(data);
};

// Update
exports.update = async (req, res) => {
  const updated = await Grievance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// Delete
exports.delete = async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

// Search
exports.search = async (req, res) => {
  const { title } = req.query;

  const data = await Grievance.find({
    title: { $regex: title, $options: "i" },
  });

  res.json(data);
};
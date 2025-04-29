const auth = require("../middleware/auth.middleware");
const { ProviderModel } = require("../Model/provider.model");

const express = require("express");

const ProviderRouter = express.Router();

ProviderRouter.post("/provide-post", auth, async (req, res) => {
  const { name, address, rating, price, available, state, typeofgas } =
    req.body;
  if (
    !name ||
    !address ||
    !rating ||
    !price ||
    !available ||
    !state ||
    !typeofgas
  ) {
    return res.status(404).json({ Message: "fill all fields..." });
  }
  try {
    const provider = new ProviderModel({
      name,
      address,
      rating,
      price,
      available,
      state,
      typeofgas,
    });

    await provider.save();
    res.status(200).json({ message: "Provider added successfully", provider });
  } catch (error) {
    res.status(500).json({ message: "Error adding provider", error });
  }
});

ProviderRouter.get("/providers", auth, async (req, res) => {
  try {
    const providers = await ProviderModel.find();

    if (!providers || providers.length <= 0) {
      return res.status(404).json({ Message: "No providers found..." });
    }

    res.status(200).json({ Message: "Providers are:", Providers: providers });
  } catch (error) {
    console.error("Error fetching providers:", error); // Log the error for debugging
    res.status(500).json({
      Message: "Something went wrong while getting providers",
      Error: error.message,
    });
  }
});

module.exports = { ProviderRouter };

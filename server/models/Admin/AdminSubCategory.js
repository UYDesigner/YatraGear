const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  subcategory: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });


const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
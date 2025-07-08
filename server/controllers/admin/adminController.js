const Brand = require("../../models/Admin/AdminBrand");
const Category = require("../../models/Admin/AdminModels");
const SubCategory = require("../../models/Admin/AdminSubCategory");
const { imageUploadUtils } = require("../helpers/cloudinary");
const Product = require("../../models/Admin/AdminProduct");
const Feature = require('../../models/Admin/features');


const handleImageUpload = async (req, res) => {
    try {

        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64;

        const result = await imageUploadUtils(url)

        if (!result) {
            return res.status(500).json({
                success: false,
                error: true,
                message: "Cloudinary upload failed"
            })
        }

        res.json({
            success: true,
            error: false,
            result: result,
            message: "Image Upload Successfully"
        })



    } catch (error) {
        console.log("image upload me error hai bhai", error)
        res.json({
            success: false,
            error: true,
            message: 'Error in uploading image'
        })
    }
}

const addNewCategory = async (req, res) => {
    const { category, image } = req.body
    try {

        const isExist = await Category.findOne({ category })
        if (isExist) {
            // console.log("that category already exists!")
            return res.json({ success: false, error: true, message: "This Category already exists!" });
        }

        const newCategory = new Category({ image, category })
        await newCategory.save()
        res.status(200).json({
            success: true,
            error: false,
            message: "New Category Added "
        })

    } catch (error) {
        // console.log("category upload karne mein problem", error)
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
}

const fetchAllCategories = async (req, res) => {
    try {

        const listOfAllCategories = await Category.find({})
        res.status(200).json({
            success: true,
            error: false,
            data: listOfAllCategories,
            message: "successfully fetched all categories"
        })

    } catch (error) {
        // console.log("category fetch karne me error hai ", error)
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
}


const fetchCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Category ID is required"
            });
        }
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Category not found"
            });
        }
        res.status(200).json({
            success: true,
            error: false,
            data: category,
            message: "Successfully fetched category"
        });

    } catch (error) {
        // console.log("category fetch karne me error hai ", error)
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
}

const editCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { category, image } = req.body;

        if (!categoryId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Category ID is required"
            });
        }

        const existingCategory = await Category.findById(categoryId);
        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Category not found",
            });
        }

        if (category) existingCategory.category = category;
        if (image) existingCategory.image = image;

        await existingCategory.save();

        res.status(200).json({
            success: true,
            error: false,
            message: "Category updated successfully",
            data: existingCategory,
        });

    } catch (error) {
        // console.log("category edit karne me error hai ", error);
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        });
    }
};


const deleteCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Category ID is required"
            });

        }
        const existingCategory = await Category.findById(categoryId)


        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Category not found",
            });
        }
        await Product.deleteMany({ categoryId: categoryId })
        await SubCategory.deleteMany({ category: categoryId })
        await existingCategory.deleteOne()
        res.status(200).json({
            success: true,
            error: false,
            message: "Category deleted successfully",

        });

    } catch (error) {
        // console.log("category delete karne me error hai ", error)
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
}

const addNewSubCategory = async (req, res) => {
    //console.log(req.body)
    const { subcategory, category, image } = req.body
    try {

        const isExist = await SubCategory.findOne({ subcategory });

        if (isExist) {
            // console.log("that sub category already exists!")
            return res.json({ success: false, error: true, message: "This sub category already exists!" });
        }

        const newSubCategory = new SubCategory({ subcategory, category, image })
        await newSubCategory.save()
        res.status(200).json({
            success: true,
            error: false,
            message: "New Sub Category Added "
        })

    } catch (error) {
        // console.log("sub category upload karne mein problem", error)
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
}

const fetchAllSubCategories = async (req, res) => {
    try {

        const listOfAllSubCategories = await SubCategory.find({})
        res.status(200).json({
            success: true,
            error: false,
            data: listOfAllSubCategories,
            message: "successfully fetched all sub categories"
        })

    } catch (error) {
        // console.log("sub category fetch karne me error hai ", error)
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
}


const fetchSubCategoryById = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        if (!subCategoryId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Sub Category ID is required"
            });
        }
        const subCategory = await SubCategory.findById(subCategoryId);
        if (!SubCategory) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Sub Category not found"
            });
        }
        res.status(200).json({
            success: true,
            error: false,
            data: subCategory,
            message: "Successfully fetched sub category"
        });

    } catch (error) {
        // console.log("sub category fetch karne me error hai ", error)
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
}

const editSubCategoryById = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        const { subcategory, category, image } = req.body;

        if (!subCategoryId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Sub category ID is required"
            });
        }

        const existingSubCategory = await SubCategory.findById(subCategoryId);
        if (!existingSubCategory) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Sub category not found",
            });
        }

        if (subcategory) existingSubCategory.subcategory = subcategory;
        if (category) existingSubCategory.category = category;
        if (image) existingSubCategory.image = image;

        await existingSubCategory.save();

        res.status(200).json({
            success: true,
            error: false,
            message: "Sub category updated successfully",
            data: existingSubCategory,
        });

    } catch (error) {
        // console.log("sub category edit karne me error hai ", error);
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        });
    }
};


const deleteSubCategoryById = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        if (!subCategoryId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Sub Category ID is required"
            });

        }
        const existingSubCategory = await SubCategory.findById(subCategoryId)


        if (!existingSubCategory) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Sub Category not found",
            });
        }
        await Product.deleteMany({ subcategoryId: subCategoryId })
        await existingSubCategory.deleteOne()
        res.status(200).json({
            success: true,
            error: false,
            message: "Sub category deleted successfully",

        });

    } catch (error) {
        // console.log("sub category delete karne me error hai ", error)
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
}
const addNewBrand = async (req, res) => {
    try {
        const { brandName, image } = req.body;

        const isExist = await Brand.findOne({ brandName: brandName })
        if (isExist) {
            // console.log("That brand  already exists!")
            return res.json({ success: false, error: true, message: "This brand already exists!" });
        }


        const brand = new Brand({ brandName, image });
        await brand.save();

        res.status(201).json({ success: true, error: 'false', message: "Brand created" });
    } catch (err) {
        console.error("Add brand error:", err);
        res.status(500).json({ success: false, error: 'true', message: "Something went wrong" });
    }
};

const fetchAllBrands = async (req, res) => {
    try {

        const listOfAllBrands = await Brand.find({})
        res.status(200).json({
            success: true,
            error: false,
            data: listOfAllBrands,
            message: "successfully fetched all brands"
        })

    } catch (error) {
        // console.log(" brand fetch karne me error hai ", error)
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
};

const fetchBrandById = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        if (!subCategoryId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Sub Category ID is required"
            });
        }
        const subCategory = await SubCategory.findById(subCategoryId);
        if (!SubCategory) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Sub Category not found"
            });
        }
        res.status(200).json({
            success: true,
            error: false,
            data: subCategory,
            message: "Successfully fetched sub category"
        });

    } catch (error) {
        // console.log("sub category fetch karne me error hai ", error)
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
}

const editBrandById = async (req, res) => {
    try {
        const { brandId } = req.params;
        const { brandName, image } = req.body;

        if (!brandId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "brand ID is required"
            });
        }

        const existingBrand = await Brand.findById(brandId);
        if (!existingBrand) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Brand not found",
            });
        }

        if (brandName) existingBrand.brandName = brandName;

        if (image) existingBrand.image = image;

        await existingBrand.save();

        res.status(200).json({
            success: true,
            error: false,
            message: "Brand updated successfully",
            data: existingBrand,
        });

    } catch (error) {
        // console.log("brand edit karne me error hai ", error);
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        });
    }
};

const deleteBrandById = async (req, res) => {
    try {
        const { brandId } = req.params;
        if (!brandId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "brand ID is required"
            });

        }
        const existingBrand = await Brand.findById(brandId)


        if (!existingBrand) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "BRAND not found",
            });
        }
        await Product.deleteMany({ brandId: brandId })
        await existingBrand.deleteOne()
        res.status(200).json({
            success: true,
            error: false,
            message: "brand deleted successfully",

        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Delete failed" });
    }
};

const addNewProduct = async (req, res) => {
    try {
        const {
            categoryId,
            subcategoryId,
            brandId,
            productName,
            featuredDescription,
            Description,
            type,
            weight,
            weightType,
            qty,
            price,
            offerPrice,
            offerType,
            featuredImage,
            images,
            tags,
            isNewArrival,
            ratings,
            review
        } = req.body;

        // console.log(req.body)


        const newProduct = new Product({
            categoryId,
            subcategoryId,
            brandId,
            productName,
            featuredDescription,
            Description,
            type,
            weight,
            weightType,
            qty,
            price,
            offerPrice,
            offerType,
            featuredImage,
            images,
            tags,
            isNewArrival,
            ratings,
            review
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({
            success: true,
            error: false,
            message: "Product added successfully",
            product: savedProduct,
        });
    } catch (error) {
        console.error("Error adding product:", error.message);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
        });
    }
};

const fetchAllProducts = async (req, res) => {
    try {

        const listOfAllProducts = await Product.find({})
        res.status(200).json({
            success: true,
            error: false,
            data: listOfAllProducts,
            message: "successfully fetched all products"
        })

    } catch (error) {
        // console.log(" product fetch karne me error hai ", error)
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
};

const editProductById = async (req, res) => {
    try {
        const {
            categoryId,
            subcategoryId,
            brandId,
            productName,
            featuredDescription,
            Description,
            type,
            weight,
            weightType,
            qty,
            price,
            offerPrice,
            offerType,
            featuredImage,
            images,
            tags,
            isNewArrival,
            ratings,
            review
        } = req.body;

        // console.log(req.body)

        const { productId } = req.params;
        if (!productId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Product ID is required"
            });
        }

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Product not found",
            });
        }

        if (categoryId) existingProduct.categoryId = categoryId;
        if (subcategoryId) existingProduct.subcategoryId = subcategoryId;
        if (brandId) existingProduct.brandId = brandId;
        if (productName) existingProduct.productName = productName;
        if (featuredDescription) existingProduct.featuredDescription = featuredDescription;
        if (Description) existingProduct.Description = Description;
        if (type) existingProduct.type = type;
        if (weight) existingProduct.weight = weight;
        if (weightType) existingProduct.weightType = weightType;
        if (qty) existingProduct.qty = qty;
        if (price) existingProduct.price = price;
        if (offerPrice) existingProduct.offerPrice = offerPrice;
        if (offerType) existingProduct.offerType = offerType;
        if (featuredImage) existingProduct.featuredImage = featuredImage;
        if (images) existingProduct.images = images;
        if (tags) existingProduct.tags = tags;
        if (isNewArrival) existingProduct.isNewArrival = isNewArrival;
        if (ratings) existingProduct.ratings = ratings;
        if (review) existingProduct.review = review;

        await existingProduct.save();

        res.status(200).json({
            success: true,
            error: false,
            message: "Product updated successfully",
            data: existingProduct,
        });

    } catch (error) {
        // console.log("product edit karne me error hai ", error);
        res.json({
            success: false,
            error: true,
            message: 'Something went wrong'
        });
    }
};

const deleteProductById = async (req, res) => {
    // console.log(req.body)
    try {
        const { productId } = req.params;
        if (!productId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "product ID is required"
            });

        }
        const existingProduct = await Product.findById(productId)


        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "product not found",
            });
        }
        //  await SubCategory.deleteMany({category : categoryId})
        await existingProduct.deleteOne()
        res.status(200).json({
            success: true,
            error: false,
            message: "product deleted successfully",

        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Delete failed" });
    }
};
// Create new feature
const createFeature = async (req, res) => {
    try {
        const { image } = req.body;
        const feature = await Feature.create({ image });
        res.status(201).json({ success: true, data: feature, message: "Feature created" });
    } catch (error) {
        console.error("Create feature error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get all features
const getAllFeatures = async (req, res) => {
    try {
        const features = await Feature.find().sort({ createdAt: -1 });
        res.json({ success: true, data: features });
    } catch (error) {
        console.error("Get features error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update feature by ID
const updateFeature = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Feature.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ success: true, data: updated, message: "Feature updated" });
    } catch (error) {
        console.error("Update feature error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete feature by ID
const deleteFeature = async (req, res) => {
    try {
        const { id } = req.params;
        await Feature.findByIdAndDelete(id);
        res.json({ success: true, message: "Feature deleted" });
    } catch (error) {
        console.error("Delete feature error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};




module.exports = {
    createFeature, getAllFeatures, updateFeature, deleteFeature,
    addNewCategory, handleImageUpload, fetchCategoryById,
    fetchAllCategories, deleteCategoryById,
    editCategoryById, addNewSubCategory, fetchAllSubCategories, fetchSubCategoryById, editSubCategoryById, deleteSubCategoryById, deleteBrandById, addNewBrand, fetchAllBrands, editBrandById, fetchBrandById, addNewProduct,
    fetchAllProducts, deleteProductById, editProductById

}

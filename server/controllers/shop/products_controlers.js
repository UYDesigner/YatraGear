const Product = require("../../models/Admin/AdminProduct");

const getFilteredProducts = async (req, res) => {

    const { category = [], subcategory = [], brand = [], sortby = "price-LowToHigh", search = "" } = req.query

    let filters = {}

    if (category.length) {
        filters.categoryId = { $in: category.split(',') }
    }
    if (subcategory.length) {
        filters.subcategoryId = { $in: subcategory.split(',') }
    }
    if (brand.length) {
        filters.brandId = { $in: brand.split(",") }
    }

    // 🔍 Full text search (by productName or tags)
    if (search.trim()) {
        filters.$or = [
            { productName: { $regex: search, $options: 'i' } },  // case-insensitive
            { tags: { $regex: search, $options: 'i' } }
        ];
    }

    let sort = {}

    switch (sortby) {
        case 'price-LowToHigh':
            sort.price = 1
            break;

        case 'price-HighToLow':
            sort.price = -1
            break;


        case 'name-ZToA':
            sort.productName = -1
            break;

        case 'name-AToZ':
            sort.productName = 1
            break;

        default:
            sort.price = 1
            break;

    }



    try {
        const products = await Product.find(filters).sort(sort)


        res.status(200).json({
            success: true,
            error: false,
            data: products,
            message: "Successfully fetch all filtered Products"
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            error: true,
            message: 'Some error occured'
        })
    }
}

const getProductDetailsById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Product not found!'
            });
        }

        res.status(200).json({
            success: true,
            error: false,
            message: 'Product Details Fetched',
            product: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: 'Some error occurred',
            errorMessage: error.message
        });
    }
};

// getProductDetailBy






module.exports = { getFilteredProducts, getProductDetailsById }
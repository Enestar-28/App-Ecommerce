const ProductModel = require("../models/product.model");
const CategoriesModel = require("../models/category.model");
const {ObjectId } = require('mongodb');
const ProductService = {
    //GET ALL PRODUCTS
    async getProducts(req, res) {
        try {
            const products = await ProductModel.find();
            return products;
        } catch (error) {
            res.status(500).json({ message: "Không lấy được sản phẩm" });
        }
    },

    //ADD PRODUCT
    async addProducts(payload) {
        const { title, Price, image, color, size, carouselImages, offer, category_id } = payload
        try {
            const newProduct = await ProductModel.create({
                title,
                Price,
                image,
                carouselImages,
                color,
                size,
                offer,
                category_id: new ObjectId(category_id)
            });
            console.log("newProduct", newProduct);  
        } catch (error) {
            console.log("error adding product", error);
            throw new Error(error);
        }

    },
    //GET PRODUCT BY CATEGORY
    async getProductsbycate(payload) {
        const { category_id } = payload
        try {
            const products = await ProductModel.find({ category_id: new ObjectId(category_id) })
            return products;
        } catch (error) {
            throw new Error(error);
        }
    },



    // ------------------category----------------------

    //ADD CATEGORY
    async addCategory(payload) {
        const { name,image } = payload
        try {
            const newCategory = await CategoriesModel.create({
                name,image
            });
            console.log("newCategory", newCategory);
        } catch (error) {
            console.log("error adding category", error);
            throw new Error(error);
        }

    },
    async getCategory() {
        try {
            const category = await CategoriesModel.find();
            return category;
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = ProductService;




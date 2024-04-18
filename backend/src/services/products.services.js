const ProductModel = require("../models/product.model");
const CategoriesModel = require("../models/category.model");
const usersModel = require("../models/user.model");
const OrderModel = require("../models/order.model");
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
    },

    // Get orders 
    async getOrders(user_id) {
        try {
            const orders = await OrderModel.find({ user: user_id }).populate("user")
            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: "Orders not found" });
            }

            return orders
        } catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    },






    //UPDATE PRODUCT
    async addOrder(payload) {
       
        const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =payload
        try {
            const user = await usersModel.findById(userId);
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
           
            //create an array of product objects from the cart Items
            const products = cartItems.map((item) => ({
              name: item?.title,
              quantity: item.quantity,
              price: item.price,
              image: item?.image,
            }));

            //create a new Order
            const order = new OrderModel({
              user: userId,
              products: products,
              totalPrice: totalPrice,
              shippingAddress: shippingAddress,
              paymentMethod: paymentMethod,
            });
            await order.save();
        
          } catch (error) {
            console.log("error creating orders", error);
            throw new Error(error);
          }
        },

    
}

module.exports = ProductService;




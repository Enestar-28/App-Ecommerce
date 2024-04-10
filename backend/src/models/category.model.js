const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Category'    
const COLLECTION_NAME = 'Categories'



var CategoriesSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    image:{
        type:String,
    },
    
},{
    timestamps:true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, CategoriesSchema);
// {
//     id: "0",
//     image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
//     name: "Home",
// },
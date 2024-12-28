const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    source:{
        type: String,
        required: true
    },
    authorName:{
        type: String,
    },
    authorObject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    coverImageURL:{
        type: String,
        default: './images/cover.jpg'
    }
},{timestamps:true})

const Blog = mongoose.model('blog',blogSchema);

module.exports = Blog;
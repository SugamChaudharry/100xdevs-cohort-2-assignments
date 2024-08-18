const { type } = require('express/lib/response');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(`mongodb+srv://sugam:bobbyji123@cluster0.gmbl6b3.mongodb.net/test`);

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchaseCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description:String,
    price: Number,
    imageLink:String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken")
const jwtPassword = require("../index")
// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const {username,password} = req.body
    if(!username || !password) return res.status(500).json({message: "username and password is requried"});
    const existedAdmin = await Admin.findOne({username})
    if(existedAdmin) return res.status(500).json({message: "username alrady exist"});
    const createdAdmin = await Admin.create({
        username,
        password
    })
    if(!createdAdmin) return res.status(404).json({message: "failed to create Admin try again"});
    return res.status(200).json({message: "Admin created successfully"});
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const {username,password} = req.body
    const admin = await Admin.find({
        username,
        password
    })
    if (!admin) return res.status(411).send("admin not found")
    const token = jwt.sigh({
        username
    },jwtPassword)
    res.send(token)
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink} = req.body
    const createdCourse = await Course.create({ title, description, price, imageLink})
    res.status(200).json({ message: 'Course created successfully', courseId: createdCourse._id })
});
router.get('/courses', adminMiddleware, async(req, res) => {
    const courses = await Course.find({})
    res.status(200).json({courses})
});

module.exports = router;
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwtPassword = require("../index")
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const {username,password} = req.body
    console.log(username);
    if(!username || !password) return res.status(500).json({message: "username and password is requried"});
    const existedUser = await User.findOne({username})
    if(existedUser) return res.status(500).json({message: "username alrady exist"});
    const createdUser = await User.create({
        username,
        password
    })
    if(!createdUser) return res.status(404).json({message: "failed to create User try again"});
    return res.status(200).json({message: "User created successfully"});
});

router.post('/signin', async(req, res) => {
    const {username,password} = req.body
    const user = await User.find({
        username,
        password
    })
    if (!user) return res.status(411).send("user not found")
    const token = jwt.sigh({
        username
    },jwtPassword)
    res.send(token)
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({})
    res.status(200).json({courses})
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.pramas.courseId
    const {username,password} = req.harders
    await User.updateOne({
        username
    },{
        "$push":{
            purchaseCourses: courseId
        }
    })
    res.json({message: "Course purchased successfully"})
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const {username,password} = req.headers
    const user = User.findOne({username})
    console.log(user.purchasedCourses);
    const purchaseCourses = Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })
    res.json({
        courses: courses
    })
});

module.exports = router
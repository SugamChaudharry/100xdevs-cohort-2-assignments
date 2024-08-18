const { User } = require("../db");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { username, password} = req.headers
    if (!username || !password) {
        return res.status(500);
    }
    User.findOne({username}).then((response)=>{
        if(response){
            next();
        }else{
            res.status(403).json({
                msg: "User doesnt exist"
            })
        }
    })
}

module.exports = userMiddleware;
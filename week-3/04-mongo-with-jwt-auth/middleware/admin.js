const jwt = require("jsonwebtoken");
const { Admin } = require("../db/index");
const secret = require("../index")

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization.split(" ")[1]
    const validToken = jwt.decode(token)
    if (!validToken) return res.status(500).json({message:"invalid token"})
    const data = jwt.verify(token,secret)
    if(data.username){
        next();
    }else{
        res.status(403).json({
            msg: "User doesnt exist"
        })
    }
}

module.exports = adminMiddleware;
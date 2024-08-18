const { Admin } = require("../db/index");

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const { username, password} = req.headers
    if (!username || !password) {
        return res.status(500);
    }
    Admin.findOne({username}).then((response)=>{
        if(response){
            next();
        }else{
            res.status(403).json({
                msg: "Admin doesnt exist"
            })
        }
    })
}

module.exports = adminMiddleware;
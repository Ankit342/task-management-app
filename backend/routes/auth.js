const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next)=>{
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if(token===null){
        return res.status(400).json({message:"Authentication token required"});
    }
    jwt.verify(token,"tcmTMA",(err,user)=>{
        if(err){
            return res.status(403).json(err);
        }
        req.user=user;
        next();
    });
    
};
module.exports = {authenticateToken};
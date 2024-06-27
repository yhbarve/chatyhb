const jwt = require("jsonwebtoken");
const JWT_SECRET = "ForzaFerrari#2024";

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(403).json({
            msg: "You are not logged in"
        });
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (e){
        return res.status(403).json({msg: "Error!"});
    }
};

module.exports = authMiddleware;
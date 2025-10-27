const jwt = require("jsonwebtoken");

function authMiddleware (req, res, next){

    const authHeader = req.headers["authorization"];
    //const token = authHeader && authHeader.split("")[1];

    const token = authHeader;

    if(!token){
        return res.status(401).json({ message: "Token não fornecido" });
    }

    try{
        const decoded = jwt.verify(token.replace(['Bearer '], ""), process.env.JWT_SECRET);
        req.user = decoded;
        next()
    }catch(err){
        res.status(403).json({ message: "Token inválido ou expirado" });
    }
}

module.exports = authMiddleware;
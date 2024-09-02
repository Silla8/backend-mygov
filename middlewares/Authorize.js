const JwtVerifier = require('../utils/JwtVerifier');
const pool = require('../database');


const Authorize = async (req, res, next)=>{
    
    try {
        const token = req.header("mygovToken");
    
        const verified = JwtVerifier(token);

        if(!verified){
            return res.status(403).json("Access Denied for Unauthorized User");
        }

        const result = await pool.query("select pin from users where user_id = $1", [verified.user_id]);

        req.pin = result.rows[0].pin;
        req.user_id= verified.user_id;

       next();
    } catch (error) {

        return res.status(500).json("Internal Server Error");
    }
}

module.exports=Authorize;
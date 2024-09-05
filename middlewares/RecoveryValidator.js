const pool =require('../database');


const RecoveryValidator= async(req, res, next)=>{

    try {
        
        const { pin, email }= req.body;

        const result = await pool.query('select pin, email from users where pin = $1 and email = $2', [pin, email]);

        if(result.rowCount===0){
            return res.status(404).json("Pin or Email incorrect")
        }

        next();
        
    } catch (error) {
        return res.status(404).json("Pin or Email incorrect");
    }
}

module.exports= RecoveryValidator;
const pool =require('../database');
const bcrypt = require('bcrypt');


const CheckPassword= async(req, res) =>{
    try {

        const { password }= req.body;
        const user_id = req.user_id;

        const result = await pool.query('select password from users where user_id = $1', [user_id]);
        
        if(result.rows.length===0){
            return res.status(404).json(false);
        }

        const verifyPassword = await bcrypt.compare(password, result.rows[0].password);

        if(!verifyPassword){
            return res.status(404).json(false);
        }
        
        res.status(200).json(true);
        
    } catch (error) {
        return res.status(500).json('Internal Server Error');
    }
}

module.exports= CheckPassword;
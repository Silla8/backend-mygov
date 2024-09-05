const pool = require('../database');
const bcrypt = require('bcrypt');
const JwtGenerator = require('../utils/JwtGenerator');
const RecoveryMailer = require('../utils/RecoveryMailer');

exports.signIn = async (req, res) =>{
    
    try {
        const { pin , password }= req.body;
       
        const result = await pool.query("select * from users where pin = $1", [pin]);
        
        if(result.rows.length===0){
            return res.status(401).json("Invalid Credentials");
        }
        else if(result.rows.length===1)
        {
            const verifyPassword = await bcrypt.compare(password, result.rows[0].password);

            if(!verifyPassword){
                return res.status(401).json("Invalid Credentials");
            }

            const token = JwtGenerator(result.rows[0].user_id);
            
            res.status(200).json({token});

        }
    } catch (error) {
        
        return res.status(500).json("Server side Error");
    }
    
}


exports.singUp = async(req, res) =>{
    
    try {
        const { pin, password, email }= req.body;
        
        const exitPin = await pool.query("select user_id from users where pin= $1", [pin]);

        const exitEmail = await pool.query("select user_id from users where email = $1", [email]);

        if(exitPin.rows.length!==0){
            return res.status(401).json("Provided pin already exists");
        }

        if(exitEmail.rows.length!==0){
            return res.status(401).json("Provided Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
       
        const result = await pool.query("insert into users (pin, password, email) values($1, $2, $3) RETURNING *", [pin, hashedPassword, email]);

        const token = JwtGenerator(result.rows[0].user_id);
        
        
        return res.status(200).json({token});

    } catch (error) {
        return res.status(500).json("Server side Error");
    }
}

exports.ChangePassword = async(req, res)=>{

    try {
        const { newPassword }= req.body;
        const user_id = req.user_id;

        if(newPassword.length<7){
            return res.status(400).json('Bad Request: Password length issue');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const result = await pool.query('update users set password = $1 where user_id = $2', [hashedPassword, user_id]);
        
        if(result.rowCount===1){
            return res.status(200).json("Password Changed Successfully");
        } 

        res.status(500).json("Password change unsuccessful");

    } catch (error) {
        return res.status(500).json('Internal Server Error');
    }
}

exports.Recovery = async(req, res)=>{
    try {
        
        const { pin , email }= req.body;

        const tempPass = pin + Math.floor(Math.random()*1000);

        const hashedPassword = await bcrypt.hash(tempPass, 10);
        
        const result = await pool.query('update users set password = $1 where pin = $2 and email = $3', [hashedPassword, pin, email]);

        if(result.rowCount===1){
           await RecoveryMailer(email, tempPass);
           return res.status(200).json(true);
        }

        return res.status(500).json("Internal Server Error");

    } catch (error) {
        return res.status(400).json("Bad Request")
    }
}
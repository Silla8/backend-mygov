const pool = require('../database');
const dotenv = require('dotenv');
const FilterAttr = require('../utils/FilterAttr');

dotenv.config();




exports.getFinancialInfo = async(req, res) =>{
    try {
        
        const { options } = req.body;
        const apiUrl = req.apiUrl;
        const allowedAttr = req.allowedAttr;
        const pin = req.pin;
        
        if(options.length===0){
            return res.status(400).json("No options Provided");
        }

        await fetch(apiUrl, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                 apiKey: process.env.apiKey,
            },
            body: JSON.stringify({ pin, allowedAttr })
        }).then(response => response.json()).then(data => {
            
            if(typeof data === "string"){
                return res.status(400).json(data);
            }

            if(options.length===1 && options[0]==="all"){
                return res.status(200).json(data);
            }
            const response = FilterAttr(options, data)
            res.status(200).json(response);
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json("Server Error");
    }
};
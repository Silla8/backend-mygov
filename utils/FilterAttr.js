


const FilterAttr = (optionsArray, response) =>{

    try {

        let responses = {};
        Object.entries(response).map((value)=>{ 

        if(optionsArray.length===0){
            return responses;
        }
        
        if(optionsArray.includes(value[0])){  

            let index = optionsArray.indexOf(value[0]);

            optionsArray.splice(index, 1);

            let obj = {[value[0]] : value[1]}; 

            responses = {...responses, ...obj};
            
        }
        });

   
        if(optionsArray.length>0){
            optionsArray.map(value=> {
                let obj = {[value] : null};
                responses = {...responses, ...obj};
            });
        }
    
         return responses;

    } catch (error) {
        console.log(error);
    }
    
}

module.exports =FilterAttr;


const MergeResponses = (responses)=>{
    let finalResponses ={};

    responses.map(value => {
        finalResponses={...finalResponses, ...value}
    });

    return finalResponses;
}

module.exports= MergeResponses;
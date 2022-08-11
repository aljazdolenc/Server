    exports.ObjectValidationMiddleware= (dataInRequest ,schema)=>{
        
        return (req,res,next)=>{

            reqData= eval(dataInRequest);
              
            const objectKeys = Object.keys(reqData);
            const schemaKeys = Object.keys(schema);
            
            if(objectKeys.length !== schemaKeys.length){
                return res.status(400).json({ error : `objects do not match`})
            }

            for(let i=0; i < schemaKeys.length; i++){

                let objectKey = objectKeys[i];
                
                if(!(objectKey in schema)){
                    return res.status(400).json({ error : `property: ${objectKey} is not in schema`})
                 }

                 if(schema[objectKey].type !== (typeof reqData[objectKey])){
                     return res.status(400).json({ error : `property: ${objectKey} type ${typeof reqData[objectKey]} should be type ${schema[objectKey].type}  `});
                 }
         
                 if(schemaKeys.length === (i+1) ){
                   return next();
                 }
            }
        }
    }

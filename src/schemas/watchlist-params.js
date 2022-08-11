exports.watchlistParametersSchema ={
    name: { type: 'string' },
    minPrice: {type:'number'},
    maxPrice: {type:'number'},
    location: {type:'string', enum:["all", "eu", "germany"]},
    offerType: {type: 'string', enum:["all", "new", "used"]}
}
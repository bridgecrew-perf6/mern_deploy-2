const Quote = require('../models/quote.model');

module.exports.addQuote = ((req,res)=>{  
    console.log('adding Quote');
    Quote.create(req.body)
    .then(addedQuote=>{
        res.json({result:addedQuote});
    })
    .catch(err=>res.json({message:'controller error adding Quotes',error:err}))

})

module.exports.getQuotes =((req,res)=>{
    console.log("Getting Quotes");
    Quote.find()
    .populate('auth_id')
    .then(allQuote=>{
        res.json({result:allQuote});
    })
    .catch(err=>res.json({message:'controller error getting all Quotes',error:err}))

})

module.exports.getQuotesByAuth =((req,res)=>{
    console.log("Getting Quotes by an Author");
    Quote.find({auth_id:req.params.id})
    .populate('auth_id')
    .then(allQuote=>{
        res.json({result:allQuote});
    })
    .catch(err=>res.json({message:'controller error getting all Quotes',error:err}))

})

module.exports.getOneQuote =((req,res)=>{
    console.log("Getting One Quote");
    Quote.findOne({_id:req.params.id})
    .then(aQuote=>{
        res.json({result:aQuote});
    })
    .catch(err=>{res.json({message:'controller faild to find by ID',error:err})})
})

module.exports.addNewQuotes = ((req,res)=>{
    console.log("Adding new Quotes");
    let objsChanged=[];
    let num = req.body.length;
    let count = 1;       
        req.body.forEach(async element =>{ 
            try { 
                changedQuote = await Quote.create(element)
                objsChanged.push(changedQuote);
                if(num==count){
                    res.json({results:objsChanged})
                }
                else{
                    count++;
                }
            }
            catch (err) {
                res.json({message:"controller faild to update",error:err})
            }
        })
})



module.exports.updateQuote = ((req,res)=>{
    console.log("Updating Quote");
    let objsChanged=[];
    let num = req.body.length;
    let count = 1;       
        req.body.forEach(async element =>{ 
            try { 
                changedQuote = await Quote.findOneAndUpdate({_id:element._id},{message:element.message},{new:true,runValidators:true})
                objsChanged.push(changedQuote);
                if(num==count){
                    res.json({result:objsChanged})
                }
                else{
                    count++;
                }
            }
            catch (err) {
                res.json({message:"controller faild to update",error:err})
            }
        })
})

module.exports.deleteQuote = ((req,res)=>{
    console.log("Deleting Quote");
    Quote.findOneAndDelete({_id:req.params.id})
    .then(delQuote=>{
        res.json({result:delQuote})
    })
    .catch(err=>{res.json({message:"controller faild to delete",error:err})})
})

module.exports.deleteAllQuotes = ((req,res)=>{
    console.log("Deleting All Quotes");
    Quote.deleteMany({auth_id:req.params.id})
    .then(delQuote=>{
        res.json({result:delQuote})
    })
    .catch(err=>{res.json({message:"controller faild to delete",error:err})})
})
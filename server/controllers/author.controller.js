const Author = require('../models/author.model');

module.exports.addAuthor = ((req,res)=>{  
    console.log('adding Author');
    Author.create(req.body)
    .then(addedAuthor=>{
        res.json({result:addedAuthor});
    })
    .catch(err=>res.json({message:'controller error adding Authors',error:err}))

})

module.exports.getAuthors =((req,res)=>{
    console.log("Getting Authors");
    Author.find()
    .then(allAuthor=>{
        res.json({result:allAuthor});
    })
    .catch(err=>res.json({message:'controller error getting all Authors',error:err}))

})

module.exports.getOneAuthor =((req,res)=>{
    console.log("Getting One Author");
    Author.findOne({_id:req.params.id})
    .then(aAuthor=>{
        res.json({result:aAuthor});
    })
    .catch(err=>{res.json({message:'controller faild to find by ID',error:err})})
})

module.exports.updateAuthor = ((req,res)=>{
    console.log("Updating Author");
    Author.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
    .then(changedAuthor=>{
       res.json({result:changedAuthor});
    })
    .catch(err=>{res.json({message:"controller faild to update",error:err})})
})

module.exports.deleteAuthor = ((req,res)=>{
    console.log("Deleting Author");
    Author.findOneAndDelete({_id:req.params.id})
    .then(delAuthor=>{
        res.json({result:delAuthor})
    })
    .catch(err=>{res.json({message:"controller faild to delete",error:err})})
})
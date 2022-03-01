const mongoose=  require('mongoose');
//********************************************************************** */
//update below as need for project chanig schema name , creation and export
//********************************************************************** */


const QuoteSchema = new mongoose.Schema({
    message:{
        type:String,
        required:[true,'Quote is Required'],
        minlength:[3,"Quote must be at least 3 characters"]
    },
    auth_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Author",
        required:[true,'valid author ref required']
    }
})

const Quote =  mongoose.model('Quote',QuoteSchema)

module.exports = Quote;
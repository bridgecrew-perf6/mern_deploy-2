const mongoose=  require('mongoose');
//********************************************************************** */
//update below as need for project chanig schema name , creation and export
//********************************************************************** */


const AuthorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Required'],
        minlength:[3,"Name must be at least 3 characters"]
    },
    hometown:{
        type:String,
        required:[true,'Where did they growup'],
        minlength:[3,"Name must be at least 3 characters"]

    },
    birthday:{
        type:Date,
        required:[true,'When were they born']
    },
    death:{
        type:Date
    }
})

const Author =  mongoose.model('Author',AuthorSchema)

module.exports = Author;
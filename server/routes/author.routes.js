const AuthorController = require('../controllers/author.controller')


module.exports=(app)=>{
    console.log('looking for route');
    //add a Author to the database
    app.post('/api/authors',AuthorController.addAuthor)
    //get all Authors from the database
    app.get('/api/authors',   AuthorController.getAuthors)
    //get one Author by ID
    app.get('/api/authors/:id',AuthorController.getOneAuthor)
    //update the Author by ID
    app.put('/api/authors/:id',AuthorController.updateAuthor)
    //delete by an id
    app.delete('/api/authors/:id',AuthorController.deleteAuthor)
}
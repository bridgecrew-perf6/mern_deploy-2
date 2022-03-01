const QuoteController = require('../controllers/quote.controller')


module.exports=(app)=>{
    console.log('looking for route');
    //add a Quote to the database
    app.post('/api/quotes',QuoteController.addQuote)
    //add one or more quotes
    app.post('/api/nquotes',QuoteController.addNewQuotes)
    //get all Quotes from the database
    app.get('/api/quotes',   QuoteController.getQuotes)
    //get one Quote by ID
    app.get('/api/quotes/:id',QuoteController.getOneQuote)
    //update the Quote by ID
    app.put('/api/quotes/:id',QuoteController.updateQuote)
    //delete by an id
    app.delete('/api/quotes/:id',QuoteController.deleteQuote)
    //delete all of the quotes from an author
    app.delete('/api/quotes/delall/:id',QuoteController.deleteAllQuotes)
    //get all quotes for an author
    app.get('/api/quotes/auth/:id',QuoteController.getQuotesByAuth)
}
const express = require('express'); // import express module
const app = express();   //create instance of express
app.use(express.json())  // provide it json functionality
app.use(express.urlencoded({extended:true})) //provide it read abilty of url encoding to get form data
const cors = require('cors');  // import cors module
app.use(cors())  // provide app with function of cors featuers
const port = 8000;  //establish port to listen for axios calls


//this will run the code to connect to our database which was written in our config file
require('./server/config/config');

//*************************************************************** */
// uncomment below and  update the RouteLocation as needed 
//*************************************************************** */
require('./server/routes/author.routes')(app);
require('./server/routes/quote.routes')(app);

app.listen(port,()=> console.log('app is listening on port: ',port));
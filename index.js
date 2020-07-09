const express = require('express');
const logger = require('./Logger')("APP") ;;
// const logger =  getLogger
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(  (req , res  , next  ) =>    {
    // console.log("Body" , req.body)
    logger.setLogData(req.body)
    next();
})
app.get('/login' , (req , res) => {
    res.send("Login")
})
 
app.listen(3000, () => { 
    const obj = { name: 'abdul rehman ', age: '23' }
    logger.info(  logger.getFunName() ,  "  "    );

});  
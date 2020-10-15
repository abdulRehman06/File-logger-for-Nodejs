const express = require('express');
const logger = require('./logger')("index") ;;
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
 
 
app.listen(3000, () => { 
    const obj = { name: 'abdul rehman ', age: '23' }
    logger.info( 'listen' ,  "  "    );
});  
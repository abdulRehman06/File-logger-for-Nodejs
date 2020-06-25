const winston = require('winston')
dateFormat = () => {
    let formatDate =  new Date(Date.now()).toUTCString()
    formatDate =   formatDate.split(' ').join('')
    return formatDate.slice(4, -3 )
}
let  newdate =  dateFormat().slice(0,5)
class LoggerService {
    constructor(fileName) {
        this.log_data = null 
        this.fileName = fileName
        this.funName =  ""
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: `./logs/server-Logs${newdate}.log` // logs path
                })
            ],
            format: winston.format.printf((info) => {
                let message = `${dateFormat()} | ${info.level.toUpperCase().padEnd(6, ' ')} | ${fileName.padStart(15, ' ')}::${this.funName.padEnd(15, ' ')} | ${info.message} |`
                message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
                message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
                return message
            })
        });
        this.logger = logger
    }
    setLogData(log_data) {
        this.log_data = log_data
    }
    async info(message) {
        this.logger.log('info', message);
    }
    async info(message, obj) {
        this.logger.log('info', message, {
            obj
        })
    }
    async info( funName ,  message, obj) {
        this.funName =  funName ;
        this.logger.log('info' ,  message , {  obj })
    }
    async debug(message) {
        this.logger.log('debug', message);
    }
    async debug(message, obj) {
        this.logger.log('debug', message, {
            obj
        })
    }
    async debug( funName ,  message, obj) {
        this.funName =  funName ;
        this.logger.log('debug' ,  message , {  obj })
    }
    async error(message) {
        this.logger.log('error', message);
    }
    async error(message, obj) {
        this.logger.log('error', message, {
            obj
        })
    }
    async error( funName ,  message, obj) {
        this.funName =  funName ;
        this.logger.log('error' ,  message , {  obj })
    }
}

LoggerService.prototype.printFunName = function(){
    
   return arguments.callee.caller.name ;
}


function getInstance(fileName){   // pass the file name in which yor are logging eg : App.js
  return  new LoggerService(fileName)
}

module.exports = getInstance

//const getInstance = require('./util/Logger')
//const logger =  getInstance( "App")
//  let obj  =   {name : "abdul" , age : 23 }  ;
//  logger.info( logger.getFunName() , "Request recieved at /test", obj)
//  logger.error( logger.getFunName() , "Request recieved at /test", obj)

//output 
//21Jun202013:47:44 | INFO   | App::                | Request recieved at /test |data:{"name":"abdul","age":23} | 
//21Jun202013:47:44 | ERROR  | App::                | Request recieved at /test |data:{"name":"abdul","age":23} | 

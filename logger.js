const winston = require('winston')
const path = require('path')
const { format, transports } = winston
require('winston-daily-rotate-file');

// let  newdate =   new Date().toISOString().slice(0,7)
class Logger {
    constructor(fileName) {
        this.log_data;
        this.log_data2;
        this.fileName = fileName
        this.funName = "";
        const logFormat = format.printf(info => {
            let message = `${info.timestamp} |${info.level.toUpperCase().padEnd(6, ' ')}|${info.label.padStart(20, ' ')} :: ${this.funName.padEnd(25, ' ')}| ${info.message} `
            if (this.log_data) {
                message = message + `log_data:${JSON.stringify(this.log_data)} | `
            }

            return message;
            // console.log( JSON.stringify(info)  )

        })



        const logger = winston.createLogger({
            format: format.combine(
                // format.splat(),
                format.label({ label: this.fileName }),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                // Format the metadata object
                format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
            ),

            transports: [


                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        logFormat
                    )
                }),
                // new transports.File({
                //     filename:  `logs/combined-${newdate}.log`,
                //     format: format.combine(
                //         // Render in one line in your log file.
                //         // If you use prettyPrint() here it will be really
                //         // difficult to exploit your logs files afterwards.
                //         // format.json()
                //         logFormat
                //     )
                // }),
                new winston.transports.DailyRotateFile({
                    filename: `../Logs/${path.basename(__dirname)}-%DATE%.log`,
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '500m',
                    maxFiles: '14d',
                    format: format.combine(
                        // Render in one line in your log file.
                        // If you use prettyPrint() here it will be really
                        // difficult to exploit your logs files afterwards.
                        // format.json()
                        logFormat
                    )

                })


            ],
            exitOnError: false
        });
        this.logger = logger
    }
    async setLogData(log_data) {
        this.log_data2 = log_data;
    }
    async info() {
        let argArr = [...arguments];
        this.funName = argArr[0];
        let message = this.parseMessage(argArr);
        this.logger.log('info', message)
    }
    async debug() {
        let argArr = [...arguments];
        this.funName = argArr[0];
        let message = this.parseMessage(argArr);
        this.logger.log('debug', message)
    }
    async error() {
        let argArr = [...arguments];
        this.funName = argArr[0];
        let message = this.parseMessage(argArr);
        this.logger.log('error', message)
    }
    async verbose() {
        let argArr = [...arguments];
        this.funName = argArr[0];
        let message = this.parseMessage(argArr);
        this.logger.log('verbose', message)
    }


    parseMessage(argArr) {
        let message = "";

        argArr.slice(1).map(value => {
            // console.log("value :", value)
            if (value instanceof Object) {
                message += JSON.stringify(value)
            }
            else {
                message += value;
            }
        })
        return message;
    }

}



function logger(fileName) {   // pass the file name in which yor are logging eg : App.js
    return new Logger(fileName)
}

module.exports = logger;


//output 
//21Jun202013:47:44 | INFO   | App::                | Request recieved at /test |data:{"name":"abdul","age":23} | 
//21Jun202013:47:44 | ERROR  | App::                | Request recieved at /test |data:{"name":"abdul","age":23} | 

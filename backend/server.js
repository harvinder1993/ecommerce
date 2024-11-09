const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//Handling Uncaught Exceptions

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Uncaught Exceptions`);
    process.exit(1);
})
dotenv.config({path:"backend/config/config.env"});

connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port  ${process.env.PORT}`);
});

// Unhandled Promise Rejections

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejections`);
    server.close(()=>{
        process.exit(1);
    })
})
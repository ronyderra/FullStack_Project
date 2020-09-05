global.config = require("./config.json");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const socketIO = require("socket.io");
const authController = require("./controllers/auth-controller");
const vacationController = require("./controllers/vacation-controller");;
const fr = require("fs")
const fileUpload = require("multer") 


const server = express();

server.use(cors({
    origin: "http://localhost:3000 ",
    credentials: true
}));


server.use(session({
    name: "VacationSession", // Name of the Cookie
    secret: "CuteKittens", // Encryption key for the session id
    resave: true, // Start counting session time on each request.
    saveUninitialized: false, // Don't create session automatically.
}));

//server.use(fileUpload({}).any())


if (!fr.existsSync("./uploads")) { //if there is no file upload 
    fr.mkdirSync("./uploads")//then create one
}

server.use(express.json());
server.use("/api/auth", authController);
server.use("/api/vacation", vacationController);

const listener = server.listen(3000, () => console.log("Listening on http://localhost:3000"));
global.socketServer = socketIO(listener);


global.socketServer.on('connection', s => {
    console.log('connected')
})




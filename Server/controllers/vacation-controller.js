const express = require("express");
const vacationLogic = require("../business-logic/vacation-logic")
const User = require("../models/user");
const { request, response } = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/is-logged-in");
const isAdmin = require("../middleware/is-admin");
const fr = require("fs")
const multer = require("multer");

const uuid = require("uuid");

const fileDir = './uploads/'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, fileDir);
    },
    filename: (req, image, cb) => {
        const extension = image.originalname.substr(image.originalname.lastIndexOf("."));
        const newFileName = uuid.v4() + extension;
        cb(null, newFileName)
    }
});
const upload = multer({ storage })



router.get("/allVacations", async (request, response) => {
    try {
        const allVacations = await vacationLogic.getAllVacations();
        response.send(allVacations);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



//gets a boolien add or delets follow
router.post("/follow/:id", isLoggedIn, async (request, response) => {
    try {
        const addOrDelete = request.body.bool;
        const id = +request.params.id;
        const followersCount = await vacationLogic.addFollowToVacation(id, addOrDelete);
        response.send(followersCount);

    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

//ads full vacation
router.post("/addVacation",isAdmin, upload.single('image'), async (request, response) => {
    try {

        const image = request.file;

        

        const values = request.body;
        const addedVacation = await vacationLogic.addVacation(values);
        response.send(addedVacation);

        // את כל המידע בחזרה ללקוח socket.io בכל שינוי שביצע האדמין - דיווח ע"י
        global.socketServer.sockets.emit("admin-change-add", addedVacation);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

//update parcial vacation
router.put("/updateVac/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const { update } = request.body;
    
        const addedVacation = await vacationLogic.updateVacation(update, id);
        global.socketServer.sockets.emit("admin-change-update", { id, update });
        response.json(addedVacation)



    } catch (err) {
        response.send(err.message)
    }
})

//deletes full vacation
router.delete("/delete/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        await vacationLogic.deleteVacation(id);

        // את כל המידע בחזרה ללקוח socket.io בכל שינוי שביצע האדמין - דיווח ע"י
        global.socketServer.sockets.emit("admin-change-delete", id);

        response.json(id)

    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



module.exports = router;
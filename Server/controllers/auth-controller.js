const express = require("express");
const authLogic = require("../business-logic/auth-logic");
const User = require("../models/user");
const router = express.Router();


router.post("/register", async (request, response) => {
    try {

        const user = new User(
            0, // userId
            request.body.firstName,
            request.body.lastName,
            request.body.userName,
            request.body.password,
            0); // isAdmin

        // Validate user data: 
        const errors = await user.validatePost();


        if (errors) {
            response.send({ err: errors });
            return;
        }
        else {
            // if username already exist - return some error (400) to the client...

            const addedUser = await authLogic.register(user);

            // Save that user in the session: 
            request.session.user = addedUser;
            response.status(201).json(addedUser);
        }

    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/login", async (request, response) => {
    try {
        const credentials = request.body;

        const user = await authLogic.login(credentials);


        if (!user) {
            response.send("Illegal username or password");
            return;
        }

        request.session.user = user;


        response.status(201).json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/logout", (request, response) => {
    try {
        request.session.destroy();
        response.end();
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
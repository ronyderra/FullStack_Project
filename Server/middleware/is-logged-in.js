function isLoggedIn(request, response, next) {

    if (!request.session.user) {
        response.send("You are not logged in!");
        return;
    }

    next();
}

module.exports = isLoggedIn;
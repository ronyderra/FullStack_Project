const Joi = require("joi");

class User {
    constructor(userId, firstName, lastName, userName, password, isAdmin) {
        this.userId = userId;
        if (firstName !== undefined) this.firstName = firstName;
        if (lastName !== undefined) this.lastName = lastName;
        if (userName !== undefined) this.userName = userName;
        if (password !== undefined) this.password = password;
        this.isAdmin = isAdmin;
    }
    validatePost() {
        const schema = Joi.object({
            userId: Joi.optional(),
            firstName: Joi.string().regex(/^[a-zA-Z]*$/).required().min(3).max(30),
            lastName: Joi.string().regex(/^[a-zA-Z]*$/).required().min(3).max(30),
            userName: Joi.string().regex(/^[a-zA-Z]*$/).token().required().min(0).max(30),
            password: Joi.string().regex(/[0-9]/).token().required().min(0).max(10000),
            isAdmin: Joi.optional(),
        });
        const result = schema.validate(this);   // { abortEarly: false } = Return all errors
        return result.error ? result.error.details.map(err => err.message) : null; // null = no errors
    }
}

module.exports = User;
const userQueries = require('../db/queries.users.js');
const passport = require('passport');

module.exports = {
    create(req, res, next) {
        if(req.body.password !== req.body.passwordConfirmation) {
            res.send('Error: password confirmation must match password');
        } else {
            let newUser = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            }
            userQueries.createUser(newUser, (err, user) => {
                if(err) {
                    res.send('Error: ' + err.errors[0].message);
                } else {
                    passport.authenticate('local')(req, res, () => {
                        res.send('Account Created!');
                    });
                }
            });
        }
    }
}
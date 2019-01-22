const User = require('./models').User;
const List = require('./models').List;
const Member = require('./models').Member;

module.exports = {
    addMember(newMember, callback) {
        return User.findOne({
            where: {
                username: newMember.username
            }
        })
        .then((user) => {
            if(!user) {
                let err = {
                    errors: [
                        'Cannot find user with that username'
                    ]
                }
                callback(err);
            } else {
                List.findById(newMember.listId)
                .then((list) => {
                    if(!list) {
                        let err = {
                            errors: [
                                'Cannot find list with that listId'
                            ]
                        }
                        callback(err);
                    } else {
                        Member.create({
                            userId: user.id,
                            listId: newMember.listId,
                        })
                        .then((member) => {
                            callback(null, member);
                        })
                        .catch((err) => {
                            callback(err);
                        })
                    }
                })
                .catch((err) => {
                    callback(err);
                })
            }
        })
        .catch((err) => {
            callback(err);
        })
    },

    deleteMember(req, callback) {
        return Member.findById(req.params.id)
        .then((member) => {
            member.destroy()
            .then((res) => {
                callback(null);
            })
            .catch((err) => {
                callback(err);
            })
        })
        .catch((err) => {
            callback(err);
        });
    }
}
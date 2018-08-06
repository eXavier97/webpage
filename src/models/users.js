const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const User = new mongoose.Schema({
    local: {
        username: String,
        password: String,
        admin: {
            type: Boolean,
            default: false
        }
    }
});

User.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', User);
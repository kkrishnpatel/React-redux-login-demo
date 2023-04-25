const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    token: { type: String },
}, { usePushEach: true });

UserSchema.methods.toJSON = function () {
    const { _id, email, name, token } = this.toObject();
    return { _id, email, name, token }
};

UserSchema.statics.findByCredentials = function (email, password) {
    const User = this;
    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign(
        { name: user.name, email: user.email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }).toString();
    user.token = token;
    return user.save().then(() => {
        return token;
    });
};

module.exports = model("user", UserSchema);

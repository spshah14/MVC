const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is inValid");
            }
        }
    },
    contact: {
        type: Number,
        required: true,
        unique: true
    }
})

// create Collection

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;
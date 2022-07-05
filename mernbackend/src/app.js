const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/register");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path)

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/register", (req, res) => {
    res.render("register");
})
// app.get("/display", (req, res) => {
//     res.render("display");
// Register.find(function (err, Registers) {
//     if (err) return console.error(err);
//     // console.log(Registers);
//     // res.status(200).send(Registers);
//     res.status(201).render("display");
// })
// })

// app.get('/display', async (req, res) => {
//     await register.find({});
// });
// app.get('/display', (req, res) => {
//     Register.find((err, docs) => {
//         if (!err) {
//             res.render("views/display", {
//                 display: docs
//             });
//         }
//         else {
//             console.log('Failed to retrieve the data: ' + err);
//         }
//     });
// });



// create a new user in our database
app.post("/register", async (req, res) => {
    try {

        const registerEmployee = new Register({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact
        })

        const registered = await registerEmployee.save();
        res.status(201).render("display");
        Register.find(function (err, Registers) {
            if (err) return console.error(err);
            // console.log(Registers);
            // res.status(200).send(Registers);
            res.status(201).render("display", { layout: 'Registers' });
        })

    } catch (error) {
        res.status(400).send(error);
    }
})
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})
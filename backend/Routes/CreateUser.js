const express = require('express')
const router = express.Router()
const User = require("../models/User")
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');


router.post("/createuser",
    // username must be an email
    body('email').isEmail(),
    // name must be at least 5 chars long
    body('name').isLength({ min: 5 }),
    // password must be at least 5 chars long
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                location: req.body.location,
            }).then(res.json({ success: true }))


        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

// for checking the user if he/she exists in db or not
router.post("/loginuser", [body('email').isEmail(),
body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }
            if (req.body.password !== userData.password) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }
            return res.json({ success: true })

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router;
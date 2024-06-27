const { Router } = require("express");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const JWT_SECRET = "ForzaFerrari#2024";
const { ObjectId } = require("mongodb");
const cors = require("cors");

const router = Router();

router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const response = await User.findOne({
        email: email
    });

    if (!response){
        const newUser = await User.create({
            email,
            password,
            username
        });
        try{
            const token = jwt.sign({
                email,
            }, JWT_SECRET);

            res.json({
                msg: "User created successfully",
                id: newUser._id,
                token
            });
        } catch (e){
            res.json({
                msg: "Error!"
            });
        };
    } else {
        res.json({
            msg: "Invalid username, try again!"
        });
    };
});

router.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log("EMAIL IS " + email);
    console.log("PASSWORD IS " + password);

    const response = await User.findOne({
        email,
        password,
    });

    if (response){
        try {
            const token = jwt.sign({
                email,
            }, JWT_SECRET);
            res.json({
                msg: "Login successful",
                id: response.id,
                token
            });
        } catch (e){
            res.json({
                msg: "Error",
            });
        }
    } else {
        res.status(411).json({
            msg: "Invalid email or password",
        });
    };
});

router.get('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const response = await User.findById(id);
    res.json({
        username: response.username,
    });
});

module.exports = router;
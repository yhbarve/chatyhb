const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { markdownToTxt } = require('markdown-to-txt');

const requestRouter = require('./routes/request');
const userRouter = require('./routes/user')

const API_KEY="AIzaSyD4K3T0_ueHCKUixzmtwDmV5QbviSN-uAQ";

const app = express();
app.use(express.json()); // Built-in middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // Built-in middleware to parse URL-encoded data
app.use(cors({
    origin: ["https://chatyhb.vercel.app"],
    method: ["POST", "GET", "DELETE", "OPTIONS"],
    credentials: true,
    }
));

app.options('*', cors());

app.use("/request", requestRouter);
app.use("/user", userRouter);

app.get('/', async (req, res) => {
    res.json({
        msg: "Hello"
    })
});

app.listen(3000);
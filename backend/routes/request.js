const { Router } = require("express");
const cors = require("cors");

const router = Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { markdownToTxt } = require('markdown-to-txt');
const authMiddleware = require("../middleware/authMiddleware");
const { Chat } = require("../db");

const API_KEY="AIzaSyD4K3T0_ueHCKUixzmtwDmV5QbviSN-uAQ";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
router.use(cors({
    origin: ["https://chatyhb.vercel.app"],
    method: ["POST", "GET", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
    }
));

async function run(prompt) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const textWithoutMD = markdownToTxt(text);
    return text;
}

router.post('/', cors(), authMiddleware, async (req, res) => {
    const prompt = req.body.prompt;
    const userId = req.body.userId;
    const answer = await run(prompt);
    res.json({
        answer,
        msg: "Command was executed successfully"
    });
    Chat.create({
        userId,
        prompt,
        response: answer
    });
});

router.get('/bloglist/:userId', cors(), authMiddleware, async (req, res) => {
    const userId = req.params.userId;
    const response = await Chat.find({
        userId
    });
    res.json({
        msg: "Data found successfully",
        response: response.reverse(),
    });
});

router.delete('/bloglist/:userId', cors(), authMiddleware, async (req, res) => {
    const userId = req.params.userId;

    try {
        const response = await Chat.deleteMany({ userId });
        if (response.deletedCount > 0) {
            res.json({ msg: "Data deleted successfully" });
        } else {
            res.status(404).json({ msg: "No data found for this user" });
        }
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
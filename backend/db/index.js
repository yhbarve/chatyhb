const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:nI4PpT3NUtTjIdML@cluster0.s1bp51g.mongodb.net/chatyhb');

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
});

const chatSchema = new mongoose.Schema({
    userId: String,
    prompt: String,
    response: String,
});

const User = mongoose.model('User', userSchema);
const Chat = mongoose.model('Chat', chatSchema);

module.exports = {
    User,
    Chat,
};
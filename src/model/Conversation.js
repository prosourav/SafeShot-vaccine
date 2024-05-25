const { Schema, model } = require('mongoose');


const ConversationSchema = new Schema({
    members: {
        type: Array
    },
    message: {
        type: String
    }},
    {
        timestamps: true
    }
);

const Conversation = model('Conversation', ConversationSchema);

module.exports = Conversation;
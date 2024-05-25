const { Schema, model } = require('mongoose');


const MessageSchema = new Schema({
    conversationId: {
        type: String
    },
    senderId: {
        type: String
    },
    receiverId: {
        type: String
    },
    text: {
        type: String
    },
    type: {
        type: String
    }
},
{ 
    timestamps: true
});

const Message = model('Message', MessageSchema);

module.exports = Message;
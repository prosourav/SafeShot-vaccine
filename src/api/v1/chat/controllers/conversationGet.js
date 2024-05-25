const Conversation = require("../../../../model/Conversation");


const getConversation = async (request, response) => {

    try {
      const conversation = await Conversation.findOne({
        members: { $all: [request.body.senderId, request.body.receiverId] },
      });
      response.status(200).json(conversation);
    } catch (error) {
      response.status(500).json(error);
    }
  };

  module.exports =  getConversation;
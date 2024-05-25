const Conversation = require("../../../../model/Conversation");
const userService = require("../../../../lib/user");

const newConversation = async (request, response) => {

  let senderId = request.body.senderId;
  let receiverId = request.body.receiverId;

  if(request.user.role !== "admin"){
     const {id} = await userService.getAdmin();
     receiverId = id;
  }

  const exist = await Conversation.findOne({
    members: { $all: [receiverId, senderId] },
  });

  if (exist) {
    response.status(200).json("conversation already exists");
    return;
  }
  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    response.status(200).json(savedConversation);
  } catch (error) {
    response.status(500).json(error);
  }
};



module.exports =  newConversation;

const Conversation = require("../../../../model/Conversation");
const userService = require("../../../../lib/user");

const adminId = async (request, response) => {

  try {
    if(request.user.role !== "admin"){
        const data = await userService.getAdmin();
    const modifiedData = {
        ...data._doc, // Copy all properties from data
        id: data._id, // Modify id property
    };
    delete modifiedData._id; // Delete _id property

    return response.status(200).json(modifiedData);
    }
    throw createHttpError.NotFound('Not found') 
    
  } catch (error) {
    response.status(500).json(error);
  }
};



module.exports =  adminId;

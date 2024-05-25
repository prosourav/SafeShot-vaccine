const generateSignedUrl = require("../../../../utils/s3");


 const getImageUrl = async (request, response) => {
    const type = request.query.type;

    const url = await generateSignedUrl({ key:type, contentType:type });
    response.status(200).json({ url })
};

module.exports = getImageUrl;
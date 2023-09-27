const generateResponse = ({ data, pagination = '', code = '', msg = '', links = '' }) => {
  let response = {};
  code && response.code;
  msg && response.msg;
  data && response.data;
  links && response.links;
  pagination && response.pagination;

  return response;
};

module.exports = generateResponse;
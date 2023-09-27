
// const { badRequest } = require('../../utils/error');
// const { generateHash } = require('../../utils/hashing');
// const { createUser } = require('./createUser');
// const { itemExist } = require('./itemExist');

// // create by admin
// const create = async ({ name, email, password }) => {

//   email = email.toLowerCase();

//   const hasUser = await itemExist(email);

//   if (hasUser) {
//     throw badRequest('User already exist');
//   }

//   password = await generateHash(password);
//   const user = await createUser({ name, email, password });

//   console.log('done', user);

//   return user;
// };

// module.exports = create;
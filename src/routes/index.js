const router = require('express').Router();
const { authValidator, } = require('../validators');
const { controllers: authController } = require('../api/v1/auth');
const { controllers: appointmentController } = require('../api/v1/appointment');
const { requestValidator } = require('../middleware/requestValidator');
const authorize = require('../middleware/authorize');
// const { controllers: userController } = require('../api/v1/user');
// const { controllers: reviewController } = require('../api/v1/review');
// const authenticate = require('../middleware/authenticate');
// const setFilterByRole = require('../middleware/setFilterByRole');
// const ownership = require('../middleware/ownerShip');
// const haspPermission = require('../middleware/hasPermission');


router
  .get('/api/v1/availability', appointmentController.availability);

// verify user email while registration
router
  .get('/api/v1/verify/:token', authValidator.verifyTokenRequestValidator, requestValidator, authController.verifyUserToken);

// Auth routes
router
  .post('/api/v1/auth/register', authValidator.registerRequestValidator, requestValidator, authController.register)
  .post('/api/v1/auth/login', authValidator.loginRequestValidator, requestValidator, authController.login)
  .post('/api/v1/auth/refresh', authValidator.refreshRequestValidator, requestValidator, authController.refresh)
  .delete('/api/v1/auth/logout', authValidator.logoutRequestValidator, requestValidator, authController.logout)


router
  .route('/api/v1/appointments')
  .get(authenticate, authorize, setFilterByRole, appointmentController.findAllItem)
  .post(authenticate, authorize, appointmentController.create)

// router
//   .route('/api/v1/appointments/:id')
//   .get(authenticate, authorize(['user', 'admin', 'doctor']), haspPermission('Appointment'), appointmentController.findSingleItem)
//   .patch(authenticate, authorize(['user', 'admin', 'doctor']), haspPermission('Appointment'), appointmentController.updateItem)
//   .delete(authenticate, authorize(['user']), ownership('Appointment'), appointmentController.deleteItem);

// router
//   .route('/api/v1/users/profile')
//   .get(authenticate, userController.getProfile)
//   .patch(authenticate, userController.updateProfile);

// router
//   .route('/api/v1/reviews')
//   .get(authenticate, authorize(['user', 'admin', 'doctor']), setFilterByRole, reviewController.findAllItem)
//   .post(authenticate, authorize(['user']), reviewController.create)


// router
//   .route('/api/v1/reviews/:id')
//   .patch(authenticate, authorize(['user', 'admin']), haspPermission('Review'), reviewController.updateItem)
//   .delete(authenticate, authorize(['user', 'admin']), haspPermission('Review'), reviewController.deleteItem);

// router
//   .route('/api/v1/users/:id')
//   .get(authenticate, authorize(['admin', 'user', 'doctor']), haspPermission('User'), userController.findSingleItem)
//   .patch(authenticate, authorize(['admin', 'doctor']), userController.updateItem)
//   .delete(authenticate, authorize(['admin', 'doctor']), userController.deleteItem);

// router
//   .route('/api/v1/users')
//   .get(authenticate, authorize(['admin']), userController.findAllItem)
//   .post(authenticate, authorize(['admin']), userController.create)

// router
//   .route('/api/v1/change_admin/:id')
//   .patch(authenticate, authorize(['admin']), userController.changeAdmin);



module.exports = router;
const router = require('express').Router();
const { authValidator, appointmentValidator, vaccinevalidator, userValidator, reviewValidator } = require('../validators');
const { controllers: authController } = require('../api/v1/auth');
const { controllers: appointmentController } = require('../api/v1/appointment');
const { requestValidator } = require('../middleware/requestValidator');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const setFilterByRole = require('../middleware/setFilterByRole');
const ownership = require('../middleware/ownerShip');
const { controllers: userController } = require('../api/v1/user');
const { controllers: vaccineController } = require('../api/v1/vaccine');
const hasPermission = require('../middleware/hasPermission');
const { controllers: reviewController } = require('../api/v1/review');

// get all available dates for appointment
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
  .post('/api/v1/auth/logout', authenticate, authValidator.logoutRequestValidator, requestValidator, authController.logout)

router
  .route('/api/v1/appointments')
  .get(authenticate, setFilterByRole, appointmentValidator.allappointmentsValidator, requestValidator, appointmentController.findAllItem)
  .post(authenticate, authorize(['user', 'admin']), appointmentValidator.appointmentCreateValidator, requestValidator, appointmentController.create)

router
  .route('/api/v1/appointments/:id')
  .get(authenticate, hasPermission('Appointment'), appointmentValidator.appointmentSpecificValidator, requestValidator, appointmentController.findSingleItem)
  .patch(authenticate, authorize(['admin']), appointmentValidator.appointmentSpecificValidator, requestValidator, appointmentController.updateItem)
  .delete(authenticate, authorize(['user', 'admin']), hasPermission('Appointment'), appointmentValidator.appointmentSpecificValidator, requestValidator, ownership('Appointment'), appointmentController.deleteItem);

router
  .route('/api/v1/appointments/complete/:appointmentId')
  .patch(authenticate, authorize(['doctor', 'admin']), appointmentValidator.completeAppointmentValidator, requestValidator, appointmentController.completeProcedure);

router
  .route('/api/v1/users/profile')
  .get(authenticate, userController.getProfile)
  .patch(authenticate, userController.updateProfile);

router
  .route('/api/v1/reviews')
  .get(authenticate, authorize(['user', 'admin', 'doctor']), reviewController.findAllItem)
  .post(authenticate, authorize(['user']), reviewValidator.createValidator, requestValidator, reviewController.create)

router
   .route('/api/v1/reviews/:id')
   .patch(authenticate, authorize(['user', 'admin']), hasPermission('Review'), reviewValidator.findSingleItemValidator, requestValidator, reviewController.updateItem)
   .delete(authenticate, authorize(['user', 'admin']), hasPermission('Review'), reviewValidator.findSingleItemValidator, requestValidator, reviewController.deleteItem);

 // TODO: 
// router
//   .route('/api/v1/users')
//   .get(authenticate, authorize(['admin']), userController.findAllItem)
//   .post(authenticate, authorize(['admin']), userValidator.createValidator, requestValidator, userController.create)

// router
//   .route('/api/v1/users/:id')
//   .get(authenticate, authorize(['admin', 'doctor']), userValidator.findSingleItemValidator, requestValidator, userController.findSingleItem)
//   .patch(authenticate, authorize(['admin', 'doctor']), userValidator.findSingleItemValidator, requestValidator, userController.updateItem)
//   .delete(authenticate, authorize(['admin', 'doctor']), userValidator.findSingleItemValidator, requestValidator, userController.deleteItem);

// router
//   .route('/api/v1/change_admin/:id')
//   .patch(authenticate, authorize(['admin']), userValidator.adminChangeValidator, requestValidator, userController.changeAdmin);

// router
//   .route('/api/v1/vaccines')
//   .post(authenticate, authorize(['admin']), vaccinevalidator.vaccineAddRequestValidator, requestValidator, vaccineController.create)
//   .get(authenticate, authorize(['admin', 'doctor']), vaccineController.findAllItem);

module.exports = router;

//TODO:
// swagger update
// doc update
// clean and optimise code
// github update

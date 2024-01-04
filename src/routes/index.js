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

// Auth routes
router
  .post('/api/v1/auth/register', authValidator.registerRequestValidator, requestValidator, authController.register)
  .get('/api/v1/auth/verify/:token', authValidator.verifyTokenRequestValidator, requestValidator, authController.verifyUserToken)
  .post('/api/v1/auth/login', authValidator.loginRequestValidator, requestValidator, authController.login)
  .post('/api/v1/auth/refresh', authValidator.refreshRequestValidator, requestValidator, authController.refresh)
  .post('/api/v1/auth/logout', authenticate, authValidator.logoutRequestValidator, requestValidator, authController.logout)
// take appointment and get all appointment
router
  .route('/api/v1/appointments')
  .get(authenticate, setFilterByRole, appointmentValidator.allappointmentsValidator, requestValidator, appointmentController.findAllItem)
  .post(authenticate, authorize(['user', 'admin']), appointmentValidator.appointmentCreateValidator, requestValidator, appointmentController.create)
// get a singe appointment details or update/delete 
router
  .route('/api/v1/appointments/:id')
  .get(authenticate, hasPermission('Appointment'), appointmentValidator.appointmentSpecificValidator, requestValidator, appointmentController.findSingleItem)
  .patch(authenticate, authorize(['admin']), appointmentValidator.appointmentSpecificValidator, requestValidator, appointmentController.updateItem)
  .delete(authenticate, authorize(['user', 'admin']), hasPermission('Appointment'), appointmentValidator.appointmentSpecificValidator, requestValidator, ownership('Appointment'), appointmentController.deleteItem);
// mark a appointment as completed
router
  .route('/api/v1/appointments/complete/:appointmentId')
  .patch(authenticate, authorize(['doctor', 'admin']), appointmentValidator.completeAppointmentValidator, requestValidator, appointmentController.completeProcedure);
// get your profile details
router
  .route('/api/v1/users/profile')
  .get(authenticate, userController.getProfile)
  .patch(authenticate, userController.updateProfile);
// get all reviews or create one
router
  .route('/api/v1/reviews')
  .get(authenticate, authorize(['user', 'admin', 'doctor']), reviewValidator.allreviewValidator, requestValidator, reviewController.findAllItem)
  .post(authenticate, authorize(['user']), reviewValidator.createValidator, requestValidator, reviewController.create)
// update or delete review
router
   .route('/api/v1/reviews/:id')
   .patch(authenticate, authorize(['user', 'admin']), hasPermission('Review'), reviewValidator.findSingleItemValidator, requestValidator, reviewController.updateItem)
   .delete(authenticate, authorize(['user', 'admin']), hasPermission('Review'), reviewValidator.findSingleItemValidator, requestValidator, reviewController.deleteItem);
// get or create a new user
router
  .route('/api/v1/users')
  .get(authenticate, authorize(['admin']), userValidator.alluserValidator, requestValidator, userController.findAllItem)
  .post(authenticate, authorize(['admin']), userValidator.createValidator, requestValidator, userController.create)
// get a single user details, update/delete a user
router
  .route('/api/v1/users/:id')
  .get(authenticate, authorize(['admin', 'doctor']), userValidator.findSingleItemValidator, requestValidator, userController.findSingleItem)
  .patch(authenticate, authorize(['admin', 'doctor']), userValidator.findSingleItemValidator, requestValidator, userController.updateItem)
  .delete(authenticate, authorize(['admin', 'doctor']), userValidator.findSingleItemValidator, requestValidator, userController.deleteItem);
// change admin
router
  .route('/api/v1/change_admin/:id')
  .patch(authenticate, authorize(['admin']), userValidator.adminChangeValidator, requestValidator, userController.changeAdmin);
// get all vaccines or add a new one
router
  .route('/api/v1/vaccines')
  .post(authenticate, authorize(['admin']), vaccinevalidator.vaccineAddRequestValidator, requestValidator, vaccineController.create)
  .get(authenticate, authorize(['admin', 'doctor']), vaccinevalidator.allvaccineValidator, requestValidator, vaccineController.findAllItem);

module.exports = router;

//TODO:
// doc update
// clean and optimise code
// github update

// ### v3
// 1. Create a proviton for unverified user to verify later on
// 2. Forgot password
// 3. Review Search by user name
// 4. Find all appointments by a date

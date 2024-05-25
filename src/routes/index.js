const router = require('express').Router();
const { authValidator, appointmentValidator, vaccinevalidator, userValidator, reviewValidator } = require('../validators');
const { controllers: authController } = require('../api/v1/auth');
const { controllers: appointmentController } = require('../api/v1/appointment');
const { controllers: reviewController } = require('../api/v1/review');
const { controllers: chatController } = require('../api/v1/chat');
const { controllers: imageController } = require('../api/v1/image');
const { controllers: userController } = require('../api/v1/user');
const { controllers: vaccineController } = require('../api/v1/vaccine');
const { controllers: pdfController } = require('../api/v1/pdf');
const { requestValidator } = require('../middleware/requestValidator');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const setFilterByRole = require('../middleware/setFilterByRole');
const ownership = require('../middleware/ownerShip');
const hasPermission = require('../middleware/hasPermission');

// get all available dates for appointment
router
  .get('/api/v1/availability', authenticate, appointmentController.availability);

// Auth routes
router
  .post('/api/v1/auth/register', authValidator.registerRequestValidator, requestValidator, authController.register)
  .get('/api/v1/auth/verify/:token', authValidator.verifyTokenRequestValidator, requestValidator, authController.verifyUserToken)
  .post('/api/v1/auth/login', authValidator.loginRequestValidator, requestValidator, authController.login)
  .post('/api/v1/auth/refresh', authValidator.refreshRequestValidator, requestValidator, authController.refresh)
  .delete('/api/v1/auth/logout', authenticate, authValidator.logoutRequestValidator, requestValidator, authController.logout)
// take appointment and get all appointment
router
  .route('/api/v1/appointments')
  .get(authenticate, setFilterByRole, appointmentValidator.allappointmentsValidator, requestValidator, appointmentController.findAllItem)
  .post(authenticate, authorize(['user', 'admin']), appointmentController.create)
// get a singe appointment details or update/delete 
router
  .route('/api/v1/appointments/:id')
  .get(authenticate, appointmentValidator.appointmentSpecificValidator, requestValidator, hasPermission('Appointment'), appointmentController.findSingleItem)
  .patch(authenticate, authorize(['admin']), appointmentValidator.appointmentSpecificValidator, requestValidator, appointmentController.updateItem)
  .delete(authenticate, authorize(['user', 'admin']), appointmentValidator.appointmentSpecificValidator, requestValidator, hasPermission('Appointment'), ownership('Appointment'), appointmentController.deleteItem);
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
   .patch(authenticate, authorize(['user', 'admin']), reviewValidator.findSingleItemValidator, requestValidator, hasPermission('Review'), reviewController.updateItem)
   .delete(authenticate, authorize(['user', 'admin']), reviewValidator.findSingleItemValidator, requestValidator, hasPermission('Review'), reviewController.deleteItem);
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



  router.post('/api/v1/generate_certificate', pdfController.generatePDF);
  router.get("/api/v1/image_url", authenticate, authorize(['admin', 'doctor', 'user']),imageController.getImageUrl);

  router.get("/api/v1/admin/details",authenticate, authorize(['doctor', 'user']),chatController.getAdmin);


  router.post("/api/v1/conversations/add",authenticate, authorize(['admin', 'doctor', 'user']),chatController.conversationAdd);
  router.post("/api/v1/conversations/get",authenticate, authorize(['admin', 'doctor', 'user']),chatController.conversationGet);
  
  router.post('/api/v1/messages',authenticate, authorize(['admin', 'doctor', 'user']), chatController.messageAdd);
  router.get('/api/v1/messages/:id',authenticate, authorize(['admin', 'doctor', 'user']), chatController.messageGet);


module.exports = router;


// doc update
// clean and optimise code

// v2.0
// review
// 3. Create a proviton for unverified user to verify later on**
// 4. Forgot password**
// 5. Find all appointments by a date





// Done
// implement limited slots for a day & create slots multiple-slot for a specific day (allready implemented 3vaccines max a day)
// removed holidays
// implement search with id in appointment (already implemented in old file)
// (WIP chat and photo)
// Fix bug in table sorting infinite scrolling(Problem Found in Table need to show loading instead odf table)



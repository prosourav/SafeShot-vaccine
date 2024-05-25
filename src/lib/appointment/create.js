const createHttpError = require("http-errors");
const Appointment = require("../../model/Appointment");
const availability = require("./availability");
const { format } = require("date-fns");
const findSingleItemByProperty = require("./findISingletemByProperty");

const create = async ({
  vaccine, date, user
}) => {

  if (!vaccine || !date || !user) {
    throw createHttpError.BadRequest();
  };

  appointMentDate = format(new Date(date), 'yyyy-MM-dd');
  const availableDates = await availability();

  // checking is the appointment date available in this week 
  if (!availableDates.find((item) => item === appointMentDate)) {
    const err = new Error(`Booking is not available for the date: ${date}`);
    err.status = 200;
    throw err;
  };

  const isAlreadyHaveAppointment = await findSingleItemByProperty({ date, user });
  if (isAlreadyHaveAppointment) {
    throw createHttpError.BadRequest('You already have an appointment for the date: ' + date);
  }


  const appointment = new Appointment({
    status: 'pending',
    date: date,
    vaccine: vaccine,
    user: user._id,
    name: user.name
  });

  await appointment.save();
  return {
    id: appointment.id,
    ...appointment._doc,
  };
};

module.exports = create;
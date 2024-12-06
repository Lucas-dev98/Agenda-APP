const Appointment = require('../models/appointmentModel');

exports.createAppointment = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newAppointment = new Appointment({ title, description, date });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
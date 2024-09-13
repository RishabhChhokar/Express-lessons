import Appointment from "../models/Appointment.js";

export async function createAppointment(req, res) {
  try {
    const { name, age, date, time } = req.body;
    const appointment = await Appointment.create({ name, age, date, time });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment" });
  }
}

export async function getAppointments(req, res) {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
}


export async function updateAppointment(req, res) {
  try {
    const { id } = req.params;
    const { name, age, date, time } = req.body;
    await Appointment.update({ name, age, date, time }, { where: { id } });
    res.status(200).json({ message: "Appointment updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
}

export async function deleteAppointment(req, res) {
  try {
    const { id } = req.params;
    await Appointment.destroy({ where: { id } });
    res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
}

export const getAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching appointment" });
  }
};
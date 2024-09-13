import { Router } from "express";
const router = Router();
import { createAppointment, getAppointments, updateAppointment, deleteAppointment, getAppointmentById} from "../controllers/appointmentController.js";

router.post("/appointments", createAppointment);
router.get("/appointments", getAppointments);
router.put("/appointments/:id", updateAppointment);
router.delete("/appointments/:id", deleteAppointment);
router.get("/appointments/:id", getAppointmentById);


export default router;

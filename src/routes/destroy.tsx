import { redirect } from "react-router-dom";
import { deleteAppointment } from "../api/appointments";

export async function action({ params }: any) {
  await deleteAppointment(params.appointmentId);
  return redirect("/");
}

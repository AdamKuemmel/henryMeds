import React from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { updateAppointment } from "../api/appointments";

export async function action({ request, params }: any) {
  const formData = await request.formData();
  const updates: Record<string, string> = {};

  formData.forEach((value: any, key: any) => {
    updates[key] = value.toString();
  });

  await updateAppointment(params.appointmentId, updates);
  return redirect(`/appointments/${params.appointmentId}`);
}

export default function EditAppointment() {
  const { appointment }: any = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="appointment-form">
      <p>
        <span>Title</span>
        <input
          placeholder="Appointment Title"
          aria-label="Appointment Title"
          type="text"
          name="title"
          defaultValue={appointment.title}
        />
      </p>
      <p>
        <span>Time</span>
        <input
          placeholder="Appointment Time"
          aria-label="Appointment Time"
          type="time"
          name="time" // Add a new input field for the time
          defaultValue={appointment.time}
        />
      </p>
      {/* Add other fields based on your appointment properties */}
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={appointment.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={appointment.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}

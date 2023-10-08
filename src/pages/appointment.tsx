import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getAppointment, updateAppointment } from "../api/appointments"; // Import the modified functions for appointments

export async function action({ request, params }: any) {
  let formData = await request.formData();
  return updateAppointment(params.appointmentId, {
    favorite: formData.get("favorite") === "true",
  });
}

export async function loader({ params }: any) {
  const appointment = await getAppointment(params.appointmentId); // Use the getAppointment function
  if (!appointment) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { appointment };
}

export default function Appointment() {
  const { appointment }: any = useLoaderData();

  return (
    <div id="appointment">
      <div>
        {/* Assuming your appointment has an "avatar" property */}
        <img key={appointment.avatar} src={appointment.avatar || null} />
      </div>

      <div>
        <h1>
          {appointment.title || "No Title"}{" "}
          {/* Adjust based on your appointment properties */}
          <Favorite appointment={appointment} />
        </h1>

        {/* Assuming your appointment has a "notes" property */}
        {appointment.notes && <p>{appointment.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            // Add confirmation logic if needed
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ appointment }: any) {
  const fetcher = useFetcher();
  let favorite = appointment.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}

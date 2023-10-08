import { useState } from "react";
import { useAuth } from "../auth";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createAvailability } from "../api/availability";

type Props = {};

export default function CreateAvailability({}: Props) {
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const auth = useAuth();
  const navigate = useNavigate();

  const handleCreateAvailability = async () => {
    try {
      await createAvailability(
        auth.user?.username,
        title,
        startDateTime,
        endDateTime
      );
      navigate("/availability");
    } catch (error) {
      console.error("Error creating availability:", error);
    }
  };

  return (
    <div>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <br />
      <TextField
        label="Start Date and Time"
        type="datetime-local"
        value={startDateTime.toISOString().split(".")[0]}
        onChange={(e: any) => setStartDateTime(new Date(e.target.value))}
        variant="outlined"
        margin="normal"
      />
      <br />
      <TextField
        label="End Date and Time"
        type="datetime-local"
        value={endDateTime.toISOString().split(".")[0]}
        onChange={(e: any) => setEndDateTime(new Date(e.target.value))}
        variant="outlined"
        margin="normal"
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateAvailability}
      >
        Create Availability
      </Button>
    </div>
  );
}

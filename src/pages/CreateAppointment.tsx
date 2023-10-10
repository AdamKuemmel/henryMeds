import React, { useEffect, useState } from "react";
import { createAppointment } from "../api/appointments";
import { Box, Button, Checkbox, TextField } from "@mui/material";
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";
import { getAvailabilities } from "../api/availability";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {};

export default function CreateAppointment({}: Props) {
  const [reason, setReason] = useState("");
  const [startDateTime, setStartDateTime] = useState<Date>();
  const [scheduleID, setScheduleID] = useState<string>();
  const [providerID, setProviderID] = useState<string>();
  const [providers, setProviders] = useState<any>([]);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleCreateAppointment = async () => {
    try {
      await createAppointment(
        auth.user?.username,
        reason,
        startDateTime,
        providerID
      );
      navigate("/appointments");
    } catch (error) {
      console.error("Error creating availability:", error);
    }
  };
  const handleGetAvailability = async () => {
    try {
      const providers = await getAvailabilities();
      setProviders(getProviderIdsWithDuplicates(providers));
    } catch (error) {
      console.error("Error fetching providers", error);
    }
  };
  useEffect(() => {
    handleGetAvailability();
  }, []);
  function getProviderIdsWithDuplicates(objectsArray: any[]): any[] {
    const providerIdMap: { [providerId: string]: any[] } = {};

    objectsArray.forEach((obj) => {
      const providerId = obj.providerID; // Assuming the property is named providerID

      if (!providerIdMap[providerId]) {
        providerIdMap[providerId] = [obj];
      } else {
        providerIdMap[providerId].push(obj);
      }
    });

    // Convert the object values (arrays of objects) into a flat array
    const providerIdsWithDuplicates = Object.values(providerIdMap);

    return providerIdsWithDuplicates;
  }

  return (
    <div>
      <div>
        {providers.map((provider: any) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{provider[0].providerID}</Typography>
            </AccordionSummary>
            {provider?.map((availability: any) => (
              <Box sx={{ display: "flex", p: 2, borderTop: 1 }}>
                <Box sx={{ display: "flex", px: 2 }}>
                  <Checkbox checked={availability?.available} />
                </Box>
                <Typography sx={{ my: "auto" }}>
                  {availability?.startDate.toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Typography>
                <Button
                  sx={{ px: 2 }}
                  onClick={() => {
                    setStartDateTime(availability?.startDate);
                    setScheduleID(availability.id);
                    setProviderID(availability.providerID);
                  }}
                >
                  select time slot
                </Button>
              </Box>
            ))}
          </Accordion>
        ))}
      </div>
      <TextField
        label="Reason for Visit"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <br />
      {scheduleID && (
        <Typography>
          You are booking an appointment with {providerID} for{" "}
          {startDateTime?.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateAppointment}
      >
        Create Appointment
      </Button>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { getAppointments } from "../api/appointments";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {};

export default function ProviderAppointments({}: Props) {
  const [appointments, setAppointments] = useState([]);
  const auth = useAuth();

  const handleGetClientAppointments = async () => {
    try {
      const res = await getAppointments(auth.user?.username);
      setAppointments(res);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  useEffect(() => {
    handleGetClientAppointments();
  }, []);
  console.log(appointments);

  const columns: GridColDef[] = [
    {
      field: "clientName",
      headerName: "Client Name",
      width: 200,
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 200,
    },
    {
      field: "startDateTime",
      headerName: "Date/time",
      width: 200,

      valueGetter: (params: any) => {
        const startDate = params.row.startDateTime;

        if (startDate instanceof Date) {
          return startDate.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        }

        return "Invalid Date";
      },
    },
    {
      field: "scheduleID",
      headerName: "Provider",
      type: "number",
      width: 200,
    },
  ];
  return (
    <div>
      My Upcoming Apppointments
      <Box sx={{ height: 400, width: "100%", m: 5 }}>
        <DataGrid
          rows={appointments.map((appointment: any, index) => ({
            ...appointment,
            clientName: appointment.id,
            id: index.toString(),
          }))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

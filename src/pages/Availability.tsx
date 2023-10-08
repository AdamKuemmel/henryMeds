//api function that adds avail - needs id(username) -

import { useEffect, useState } from "react";
import { getAvailabilities } from "../api/availability";
import { useAuth } from "../auth";

import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";

type Props = {};

export default function Availability({}: Props) {
  const [schedules, setSchedules] = useState([]);
  const auth = useAuth();

  const handleGetAvailability = async () => {
    try {
      const res = await getAvailabilities(auth.user?.username);
      setSchedules(res);
    } catch (error) {
      console.error("Error creating availability:", error);
    }
  };
  useEffect(() => {
    handleGetAvailability();
  }, []);
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Notes",
      width: 200,
    },
    {
      field: "startDate",
      headerName: "Start",
      width: 200,

      valueGetter: (params) => {
        const startDate = params.row.startDate;

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
      field: "endDate",
      headerName: "End",
      width: 200,

      valueGetter: (params) => {
        const endDate = params.row.endDate;

        if (endDate instanceof Date) {
          return endDate.toLocaleString("en-US", {
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
  ];

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
        <Typography sx={{ p: 2, fontSize: 20 }}>
          My Available Schedules
        </Typography>
        <Button variant="contained">
          <NavLink to="/availability/create">New Avaialability</NavLink>
        </Button>
      </Box>

      <Box sx={{ height: 400, width: "100%", m: 5 }}>
        <DataGrid
          rows={schedules}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

type Props = {};
interface Route {
  route: string;
  label: string;
}
const routes: Route[] = [
  {
    route: "/overview",
    label: "Overview",
  },
  {
    route: "/appointments",
    label: "My Apointments",
  },
  {
    route: "/appointments/create",
    label: "Create Apointment",
  },
];

export default function ClientSidebar({}: Props) {
  return (
    <Box sx={{ width: "300px", height: "100vh", bgcolor: "lightgrey" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {routes.map((route, i) => (
          <NavLink to={route.route} key={i}>
            <Typography sx={{ p: 2 }}>{route.label}</Typography>
          </NavLink>
        ))}
      </Box>
    </Box>
  );
}

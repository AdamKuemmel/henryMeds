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
    route: "/availability",
    label: "My Availability",
  },
  {
    route: "/availability/create",
    label: "Create Availability",
  },
  {
    route: "/myAppointments",
    label: "View Schedule",
  },
];

export default function ProviderSidebar({}: Props) {
  return (
    <Box sx={{ width: "300px", height: "100vh", bgcolor: "lightgrey" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {routes.map((route, i) => (
          <NavLink to={route.route}>
            <Typography sx={{ p: 2 }}>{route.label}</Typography>
          </NavLink>
        ))}
      </Box>
    </Box>
  );
}

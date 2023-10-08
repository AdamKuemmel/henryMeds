import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContextType } from "../auth";
import { Button } from "@mui/material";

type Props = { Auth: AuthContextType };

export default function Layout({ Auth }: Props) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {Auth.user?.provider ? "Provider" : "Client"}
            </Typography>
            <Button color="inherit" onClick={() => Auth.signout()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

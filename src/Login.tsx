import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    let provider = formData.get("provider") as string;
    let isProvider = provider === "on" ? true : false;
    auth.signin({ username: username, provider: isProvider }, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <Box
      sx={{
        my: "20vh",
        textAlign: "center",
      }}
    >
      <Typography sx={{ mb: 2 }}>
        You must log in. Please Select provider if you are a provider.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box>
          <TextField
            name="username"
            required
            id="outlined-required"
            label="Required"
          />
          <FormControlLabel
            control={<Checkbox name="provider" sx={{ ml: 2 }} />}
            label="Provider"
          />

          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
export { LoginPage };

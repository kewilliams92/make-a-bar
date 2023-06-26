import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  ThemeProvider,
} from "@suid/material";
import theme from "../utils/theme";
import useLogout from "../../hooks/useLogout";
import { Show  } from "solid-js";
import { useAuthState } from "../../context/auth";

const Navbar = () => {
  const authState = useAuthState()!;
  const { logoutUser } = useLogout();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Make A bar!
            </Typography>
            <Show
              when={authState.isAuthenticated}
              fallback={
                <>
                  <Button color="inherit" href="/auth/login">
                    Login
                  </Button>
                  <Button color="inherit" href="/auth/register">
                    Register
                  </Button>
                </>
              }
            >
              <Button color="inherit" onClick={logoutUser}>
                Logout
              </Button>
            </Show>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
};

export default Navbar;

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  ThemeProvider
} from "@suid/material";
import theme from "../utils/theme";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={theme}>
      <AppBar position="static"  color="secondary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Make A bar!
          </Typography>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/register">Register</Button>
        </Toolbar>
      </AppBar>
        </ThemeProvider>
    </Box>
  );
}


export default Navbar;

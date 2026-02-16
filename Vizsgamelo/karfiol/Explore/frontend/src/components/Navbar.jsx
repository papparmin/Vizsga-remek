import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./Navbar.css";
import logo from "../assets/logonk.png";

export default function Navbar({ onLoginClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" className="nav-root" elevation={0}>
      <Toolbar className="nav-toolbar">

        {/* ✅ LOGO - katt = kezdőlap */}
        <Link to="/" className="nav-logo" aria-label="EXPLORE - Kezdőlap">
          <img src={logo} alt="Explore logo" />
          <span>EXPLORE.</span>
        </Link>

        {/* MENÜ */}
        <Box className="nav-links">
          <Button component={Link} to="/turak">Túrák</Button>
          <Button component={Link} to="/berles">Bérlés</Button>
          <Button component={Link} to="/galeria">Galéria</Button>

          <Button onClick={handleOpen} endIcon={<KeyboardArrowDownIcon />}>
            Továbbiak
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{ className: "nav-menu" }}
          >
            <MenuItem onClick={handleClose}>Miért EXPLORE</MenuItem>
            <MenuItem onClick={handleClose}>Rólunk</MenuItem>
            <MenuItem onClick={handleClose}>Kapcsolat</MenuItem>
          </Menu>

          {/* ✅ Belépés gomb nyissa a dialogot (ne route) */}
          <Button
            onClick={() => {
              handleClose();
              if (onLoginClick) onLoginClick();
            }}
          >
            Belépés
          </Button>

          <Button component={Link} to="/foglalas" className="nav-cta">
            Foglalás
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

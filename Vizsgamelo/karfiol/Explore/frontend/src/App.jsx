import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Turak from "./pages/Turak";
import TuraReszletek from "./pages/TuraReszletek";
import AuthDialog from "./components/AuthDialog";

import Berles from "./pages/Berles";

const Fiok = () => <div style={{ padding: 24 }}>Fiók oldal (placeholder)</div>;

function App() {
  const [authOpen, setAuthOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar onLoginClick={() => setAuthOpen(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/turak" element={<Turak />} />
          <Route path="/turak/:slug" element={<TuraReszletek />} />
          <Route path="/berles" element={<Berles />} />
          <Route path="/fiok" element={<Fiok />} />
        </Routes>

        <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
      </Router>
    </ThemeProvider>
  );
}

export default App;

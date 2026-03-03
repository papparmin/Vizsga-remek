import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "./components/Navbar/Navbar";

// Pages
import Home from "./pages/Home";
import Turak from "./pages/Turak";
import Foglalas from "./pages/Foglalas";
import Berles from "./pages/Berles";

// Legal
import Aszf from "./pages/Aszf";
import Adatvedelem from "./pages/Adatvedelem";
import Impresszum from "./pages/Impresszum";

// Auth
import AuthModal from "./components/AuthModal";

const LS_TOKEN = "auth_token";
const LS_USER = "auth_user";

// ✅ FIX: backend port (nálad 8100)
const API_BASE = "http://localhost:8100";

function safeParse(v) {
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
}

async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const msg =
      data?.error ||
      data?.message ||
      data?.raw ||
      `HTTP ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  return data;
}

// Route védelem külön file nélkül
function RequireAuth({ authed, onNeedAuth, children }) {
  const loc = useLocation();

  if (!authed) {
    onNeedAuth?.(loc.pathname);
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [afterLoginPath, setAfterLoginPath] = useState("");

  const [token, setToken] = useState(() => localStorage.getItem(LS_TOKEN) || "");
  const [user, setUser] = useState(
    () => safeParse(localStorage.getItem(LS_USER)) || null
  );

  const authed = !!token && !!user;

  // ✅ FIX HTML TOAST (mindig látszik)
  const [toastOpen, setToastOpen] = useState(false);
  const [toastData, setToastData] = useState({
    title: "Siker",
    message: "Kész.",
    duration: 2200,
  });

  const showToast = ({ title, message, duration = 2200 }) => {
    setToastData({ title, message, duration });
    setToastOpen(true);
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => setToastOpen(false), duration);
  };

  // Token mentése
  useEffect(() => {
    if (token) localStorage.setItem(LS_TOKEN, token);
    else localStorage.removeItem(LS_TOKEN);
  }, [token]);

  // User mentése
  useEffect(() => {
    if (user) localStorage.setItem(LS_USER, JSON.stringify(user));
    else localStorage.removeItem(LS_USER);
  }, [user]);

  const openAuth = (redirectTo = "") => {
    setAfterLoginPath(redirectTo);
    setAuthOpen(true);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    showToast({
      title: "Kijelentkezve",
      message: "Sikeresen kijelentkeztél.",
      duration: 1800,
    });
  };

  // ✅ IGAZI LOGIN (backend)
  const handleLogin = async ({ email, password }) => {
    if (!email) throw new Error("Add meg az email címet.");
    if (!password) throw new Error("Add meg a jelszót.");

    const data = await apiFetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email: String(email).trim(), password }),
    });

    const tok = data?.token || data?.accessToken || "";
    const usr = data?.user || data?.profile || null;

    if (!tok) throw new Error("A backend nem küldött tokent (token).");
    if (!usr) throw new Error("A backend nem küldött user-t (user).");

    setToken(tok);
    setUser(usr);

    showToast({
      title: "Sikeres belépés",
      message: `Üdv, ${usr?.name || usr?.email || "felhasználó"}!`,
      duration: 2200,
    });

    return true;
  };

  // ✅ IGAZI REGISTER (backend)
  const handleRegister = async (reg) => {
    const payload = {
      firstName: reg?.firstName,
      lastName: reg?.lastName,
      email: reg?.email,
      password: reg?.password,
      phone: reg?.phone,
      birthDate: reg?.birthDate,
      gender: reg?.gender,
      country: reg?.country,
      city: reg?.city,
      zip: reg?.zip,
      address: reg?.address,
      address2: reg?.address2,
      billingName: reg?.billingName,
    };

    const data = await apiFetch("/api/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (data?.token && (data?.user || data?.profile)) {
      setToken(data.token);
      setUser(data.user || data.profile);
      showToast({
        title: "Sikeres regisztráció",
        message: "Fiók létrehozva és beléptetve.",
        duration: 2400,
      });
      return true;
    }

    showToast({
      title: "Sikeres regisztráció",
      message: "Most már beléphetsz.",
      duration: 2400,
    });

    return true;
  };

  return (
    <BrowserRouter>
      {/* ✅ toast mindig a modal fölött */}
      {toastOpen && (
        <div
          style={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999999,
            background: "rgba(0,0,0,.85)",
            color: "white",
            padding: "12px 16px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,.2)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 18px 60px rgba(0,0,0,.55)",
            fontWeight: 900,
            fontSize: 14,
            maxWidth: "92vw",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          ✅ {toastData.title} — {toastData.message}
        </div>
      )}

      <Navbar
        onOpenAuth={() => openAuth("")}
        authed={authed}
        user={user}
        onLogout={logout}
      />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onDone={() => setAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        afterLoginPath={afterLoginPath}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/turak" element={<Turak />} />
        <Route path="/berles" element={<Berles />} />

        <Route
          path="/foglalas/:tourId"
          element={
            <RequireAuth authed={authed} onNeedAuth={(path) => openAuth(path)}>
              <Foglalas />
            </RequireAuth>
          }
        />

        <Route path="/aszf" element={<Aszf />} />
        <Route path="/adatvedelem" element={<Adatvedelem />} />
        <Route path="/impresszum" element={<Impresszum />} />
      </Routes>
    </BrowserRouter>
  );
}
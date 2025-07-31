import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./ApiStore/useThemeStore";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AdminPanel from "./pages/AdminPanel";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Signup from "./pages/Signup";
import SingleProfile from "./pages/SingleProfile";
import Test from "./pages/Test";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserStore } from "./ApiStore/UserStore";
import Legal from "./pages/Legal";
import NotificationPage from "./components/NotificationPage";

const App = () => {
  const GID = import.meta.env.VITE_GID;
  const { theme } = useThemeStore();
  const { setuser, checkAuth } = UserStore();

  useEffect(() => {
    checkAuth();
    setuser;
  }, []);

  // console.log(setuser.is_Admin);

  return (
    <div data-theme={theme}>
      {/* Common in all Pages Navbar */}

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/singleProfile/:id" element={<SingleProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<Test />} />
        <Route path="/legal" element={<Legal />} />

        {/* Default 404 page */}
        <Route path="*" element={<Test />} />
        {/* When Logged in cannot Visit */}
        <Route
          path="/signup"
          element={
            !setuser ? (
              <GoogleOAuthProvider clientId={GID}>
                <Signup />
              </GoogleOAuthProvider>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !setuser ? (
              <GoogleOAuthProvider clientId={GID}>
                <Login />
              </GoogleOAuthProvider>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* When Logged out cannot visit */}

        <Route
          path="/dashboard/:id"
          element={setuser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={setuser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={
            setuser?.is_Admin ? <AdminPanel /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/notifications"
          element={setuser ? <NotificationPage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;

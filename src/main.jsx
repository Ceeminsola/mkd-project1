import React, { useContext } from "react";
import { AuthContext } from "./authContext";
import { Routes, Route, Navigate } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import Preloader from "./components/Preloader";

function renderRoutes(isAuthenticated, role) {
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />}></Route>
        <Route path="*" element={<Navigate to="/admin/login" />}></Route>
      </Routes>
    );
  }

  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />}></Route>
          <Route path="/" element={<Navigate to="/admin/dashboard" />}></Route>
          <Route path="/admin/login" element={<Navigate to="/admin/dashboard" />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      );
      break;
    default:
      return (
        <Routes>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route path="*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );
      break;
  }
}

function Main() {
  const { state } = useContext(AuthContext);
  console.log("state", state)

  if (state.loading) {
    return <Preloader />;
  }

  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="page-wrapper w-full py-10 px-5">
            {renderRoutes(state.isAuthenticated, state.role)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
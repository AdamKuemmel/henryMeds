import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";

import ErrorPage from "./pages/error-page";
import Appointment, {
  loader as appointmentLoader,
  action as appointmentAction,
} from "./pages/appointment";
import EditAppointment, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Home from "./pages/home";
import { AuthProvider, RequireAuth } from "./auth";
import { LoginPage } from "./Login";
import App from "./App";
import ClientAppointments from "./pages/ClientAppointments";
import CreateAppointment from "./pages/CreateAppointment";
import Availability from "./pages/Availability";
import CreateAvailability from "./pages/CreateAvailability";
import ProviderAppointments from "./pages/ProviderAppointments";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth />}>
        <Route element={<App />}>
          <Route index element={<Navigate to="overview" />} />
          <Route path="overview" element={<Home />} />
          <Route path="appointments" element={<ClientAppointments />} />
          <Route path="appointments/create" element={<CreateAppointment />} />
          <Route path="availability" element={<Availability />} />
          <Route path="availability/create" element={<CreateAvailability />} />
          <Route path="myAppointments" element={<ProviderAppointments />} />
        </Route>
      </Route>
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </BrowserRouter>
);

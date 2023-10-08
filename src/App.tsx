import React from "react";
import Layout from "./pages/layout";
import { useAuth } from "./auth";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import ClientSidebar from "./components/ClientSidebar";
import ProviderSidebar from "./components/ProviderSidebar";

type Props = {};

export default function App({}: Props) {
  const auth = useAuth();
  return (
    <div>
      <Layout Auth={auth} />
      <Box sx={{ display: "flex" }}>
        {!auth.user?.provider && <ClientSidebar />}
        {auth.user?.provider && <ProviderSidebar />}
        <Outlet />
      </Box>
    </div>
  );
}

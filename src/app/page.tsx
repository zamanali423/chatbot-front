"use client";
import React from "react";
import Cookies from "js-cookie";
import Introduction from "./components/Introduction";
// import AddWebsite from "./pages/add-website/page";
import Dashboard from "./user-dashboard/page";
// import CenteredCards from "./pages/main/page";

export default function Home() {
  const isLoggedIn = Boolean(Cookies.get("token"));
  return <div>{isLoggedIn ? <Dashboard /> : <Introduction />}</div>;
}

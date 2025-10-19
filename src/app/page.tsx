"use client";
import React from "react";
import Cookies from "js-cookie";
import Dashboard from "./user-dashboard/page";
import Introduction  from "./pages/Home";


export default function Home() {
  const isLoggedIn = Boolean(Cookies.get("token"));
  return <div>{isLoggedIn ? <Dashboard /> : <Introduction />}</div>;
}

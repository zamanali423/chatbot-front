"use client";
import React from "react";
import Cookies from "js-cookie";
import Introduction from "@/components/Introduction";
// import AddWebsite from "./pages/add-website/page";
// import Dashboard from "./user-dashboard/page";
// import CenteredCards from "./pages/main/page";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const Dashboard = dynamic(() => import("./user-dashboard/page"));

export default function Home() {
  const isLoggedIn = Boolean(Cookies.get("token"));
  return (
    <div>
      {isLoggedIn ? (
        <Suspense fallback={<Loader2 className="animate-spin" size={40} />}>
          <Dashboard />
        </Suspense>
      ) : (
        <Introduction />
      )}
    </div>
  );
}

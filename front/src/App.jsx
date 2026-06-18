import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header"

export default function App() {
  return (
    <div className="bg-blue-900 min-h-screen text-black-400">
      <Header />

      <Outlet />
    </div>
  );
}

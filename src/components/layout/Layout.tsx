import { Header } from "../header/Header";
import { Outlet } from "react-router-dom";
import React from "react";

export function Layout() {
  return (
    <div className="main">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
}

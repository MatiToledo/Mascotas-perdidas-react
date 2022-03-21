import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";
import css from "./layout.css";

export function Layout() {
  return (
    <div className="main">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
}

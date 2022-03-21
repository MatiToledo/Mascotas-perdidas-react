import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { EditPet } from "../pages/editpet/Edit-pet";
import { Home } from "../pages/home/Home";
import { Ingresar } from "../pages/ingresar/Ingresar";
import { MyData } from "../pages/mydata/My-data";
import { MyPets } from "../pages/mypets/My-pets";
import { Registrarse } from "../pages/registrarse/Registrarse";
import { ReportPet } from "../pages/reportpet/Report-pet";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="ingresar" element={<Ingresar></Ingresar>}></Route>
        <Route path="registrarse" element={<Registrarse></Registrarse>}></Route>
        <Route path="mydata" element={<MyData></MyData>}></Route>
        <Route path="reportpet" element={<ReportPet></ReportPet>}></Route>
        <Route path="mypets" element={<MyPets></MyPets>}></Route>
        <Route path="editpet/:id" element={<EditPet></EditPet>}></Route>
      </Route>
    </Routes>
  );
}

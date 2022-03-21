import React, { useState } from "react";
import { ReportPetComp } from "../../components/report-pet/Report-pet";
import { useAuth } from "../../hooks";
import css from "./report-pet.css";

export function ReportPet() {
  const [ubic, setUbic] = useState(false);
  useAuth();

  return <ReportPetComp></ReportPetComp>;
}

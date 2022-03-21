import React, { useState } from "react";

import { ReportPetComp } from "../../components/report-pet/Report-pet";
import { useAuth } from "../../hooks";

export function ReportPet() {
  const [ubic, setUbic] = useState(false);
  useAuth();

  return <ReportPetComp></ReportPetComp>;
}

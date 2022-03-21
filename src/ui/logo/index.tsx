import React from "react";
import css from "./index.css";
import img from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/", { replace: true });
  }
  return <img src={img} onClick={handleClick} className={css.root} />;
}

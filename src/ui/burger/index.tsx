import React from "react";
import css from "./index.css";
import img from "../../images/burguer.png";

export function Burger({ onClick }) {
  return <img src={img} className={css.root} onClick={onClick} />;
}

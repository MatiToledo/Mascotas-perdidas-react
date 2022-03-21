import React from "react";
import css from "./index.css";

export function MyText({ children, variant }) {
  return <span className={css[variant]}>{children}</span>;
}

import React from "react";
import { Logo } from "../../ui/logo";
import { Menu } from "../menu/Menu";
import css from "./header.css";

export function Header() {
  return (
    <div className={css.root}>
      <Logo></Logo>
      <Menu></Menu>
    </div>
  );
}

import React, { useRef } from "react";
import css from "./index.css";

type ButtonsProps = {
  children: string;
  onClick?: (any) => any;
  onChange?: (any) => any;
};

export function ButtonPrim(props: ButtonsProps) {
  const spinner = useRef(undefined);
  const button = useRef(undefined);
  const waiting = useRef(undefined);
  function activate() {
    waiting.current.className = css.waiting;
    button.current.className = css.none;
    spinner.current.className = css.spinner;
  }
  return (
    <div onClick={activate} ref={waiting}>
      <button ref={button} className={css.primary} onClick={props.onClick}>
        {props.children}
      </button>
      <div ref={spinner}></div>
    </div>
  );
}
export function ButtonSec(props: ButtonsProps) {
  return (
    <button onClick={props.onClick} className={css.secondary}>
      {props.children}
    </button>
  );
}

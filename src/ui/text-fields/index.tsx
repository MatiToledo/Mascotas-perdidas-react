import React from "react";
import css from "./index.css";

type InputProps = {
  defaultValue?: string;
  placeholder?: string;
  onChange?: (any) => any;
  label: string;
  name: string;
  value?: string;
  type: string;
};

export function MyInput(props: InputProps) {
  return (
    <div className={css.root}>
      <label className={css.label}>{props.label}</label>
      <input
        placeholder={props.placeholder}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        className={css.input}
        defaultValue={props.defaultValue}
      />
    </div>
  );
}

type TextAreaProps = {
  label: string;
  name: string;
  defaultValue?: string;
};

export function MyTextArea(props: TextAreaProps) {
  return (
    <div className={css.root}>
      <label className={css.label}>{props.label}</label>
      <textarea
        name={props.name}
        defaultValue={props.defaultValue}
        className={css.textarea}
      ></textarea>
    </div>
  );
}

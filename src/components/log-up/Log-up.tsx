import { ButtonPrim } from "../../ui/buttons";
import { MyInput } from "../../ui/text-fields";
import { MyText } from "../../ui/text";
import React from "react";
import { auth } from "../../../lib/api";
import css from "./log-up.css";
import { useNavigate } from "react-router-dom";

export function LogUp() {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const userName = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmpassword = e.target.confirmpassword.value;
    auth({ userName, email, password, confirmpassword }).then(() => {
      navigate("/ingresar", { replace: true });
    });
  }

  return (
    <div className={css.root}>
      <MyText variant={"title"}>Registrarse</MyText>
      <form onSubmit={handleSubmit} className={css.form}>
        <MyInput
          type={"text"}
          name={"username"}
          label={"Nombre de usuario"}
        ></MyInput>
        <MyInput type={"email"} name={"email"} label={"Email"}></MyInput>
        <MyInput
          type={"password"}
          name={"password"}
          label={"Contraseña"}
        ></MyInput>
        <MyInput
          type={"password"}
          name={"confirmpassword"}
          label={"Repetir contraseña"}
        ></MyInput>
        <ButtonPrim>Registrarse</ButtonPrim>
      </form>
    </div>
  );
}

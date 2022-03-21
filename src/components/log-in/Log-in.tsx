import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { authToken, checkEmail } from "../../../lib/api";

import { ButtonPrim } from "../../ui/buttons";
import { MyInput } from "../../ui/text-fields";
import { MyText } from "../../ui/text";
import css from "./log-in.css";
import { useLogIn } from "../../hooks";

export function LogIn() {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState(undefined);
  useLogIn(authData);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const exist = await checkEmail(email);
    if (exist) {
      const auth = await authToken({ email, password });
      if (auth.token) {
        await setAuthData({
          userName: auth.user.userName,
          email: auth.user.email,
          token: auth.token,
        });
        window.alert("Inicio de sesion realizado con exito");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1);
      } else {
        window.alert("Contraseña o email incorrecto");
        location.reload();
      }
    } else {
      window.alert("No existe un usuario con ese email");
      location.reload();
    }
  }

  return (
    <div className={css.root}>
      <MyText variant={"title"}>Ingresar</MyText>
      <form onSubmit={handleSubmit} className={css.form}>
        <MyInput type={"text"} name={"email"} label={"Email"}></MyInput>
        <MyInput
          type={"password"}
          name={"password"}
          label={"Contraseña"}
        ></MyInput>
        <ButtonPrim>Ingresar</ButtonPrim>
        <Link className={css.link} to={"/registrarse"}>
          Registrarse
        </Link>
      </form>
    </div>
  );
}

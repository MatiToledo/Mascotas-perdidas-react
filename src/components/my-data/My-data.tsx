import React from "react";
import { ButtonPrim } from "../../ui/buttons";
import { MyText } from "../../ui/text";
import { MyInput } from "../../ui/text-fields";
import css from "./my-data.css";
import { modifyData } from "../../../lib/api";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";

export function MyDataComp() {
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = auth.email;
    const token = auth.token;
    const userName = e.target.username.value;
    const newEmail = e.target.email.value;
    const password = e.target.password.value;
    const confirmpassword = e.target.confirmpassword.value;
    modifyData(
      {
        email,
        userName,
        newEmail,
        password,
        confirmpassword,
      },
      token
    ).then(() => {
      navigate("/", { replace: true });
    });
  }

  return (
    <div className={css.root}>
      <MyText variant={"title"}>Modificar datos</MyText>
      <form onSubmit={handleSubmit} className={css.form}>
        <MyInput
          type={"text"}
          name={"username"}
          label={"Nombre de usuario"}
          defaultValue={auth.userName}
        ></MyInput>
        <MyInput
          type={"email"}
          name={"email"}
          label={"Email"}
          defaultValue={auth.email}
        ></MyInput>
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
        <ButtonPrim>Modificar</ButtonPrim>
      </form>
    </div>
  );
}

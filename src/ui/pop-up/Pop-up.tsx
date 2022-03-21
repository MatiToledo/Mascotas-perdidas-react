import React, { useState } from "react";
import { ButtonPrim } from "../buttons";
import { MyText } from "../text";
import { MyInput, MyTextArea } from "../text-fields";
import css from "./pop-up.css";
import img from "../../images/close.png";
import { parentPort } from "worker_threads";
import { infoAboutPet, sendNotification } from "../../../lib/api";

type PopUpProps = {
  petName: string;
  PetId: number;
  petOwnerEmail: string;
  setPopUp: (any) => void;
};

export function PopUp(props: PopUpProps) {
  const [close, setClose] = useState(false);
  function handleClose() {
    props.setPopUp(false);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const PetId = props.PetId;
    const petName = props.petName;
    const petOwnerEmail = props.petOwnerEmail;
    const reporterName = e.target.reporterName.value;
    const reporterPhoneNumber = e.target.reporterPhoneNumber.value;
    const seenIn = e.target.seenIn.value;
    infoAboutPet({ PetId, reporterName, reporterPhoneNumber, seenIn });
    const notification = await sendNotification({
      petOwnerEmail,
      petName,
      reporterName,
      seenIn,
      reporterPhoneNumber,
    });
    if (notification == true) {
      window.alert("reporte realizado con exito ");
    } else {
      window.alert("error al realizar el reporte");
    }
    props.setPopUp(false);
  }
  return (
    <div className={css.root}>
      {close ? null : (
        <div className={css.root}>
          <MyText variant={"title"}>Reportar info sobre {props.petName}</MyText>
          <img src={img} className={css.img} onClick={handleClose} />
          <form onSubmit={handleSubmit} className={css.form}>
            <MyInput
              name={"reporterName"}
              type={"text"}
              label={"Tu nombre"}
            ></MyInput>
            <MyInput
              name={"reporterPhoneNumber"}
              type={"text"}
              label={"Tu telefono"}
            ></MyInput>
            <MyTextArea name={"seenIn"} label={"Donde lo viste?"}></MyTextArea>
            <ButtonPrim>Enviar información</ButtonPrim>
          </form>
        </div>
      )}
    </div>
  );
}

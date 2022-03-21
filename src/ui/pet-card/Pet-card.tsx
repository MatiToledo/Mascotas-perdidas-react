import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parentPort } from "worker_threads";
import { MyText } from "../../ui/text";
import { PopUp } from "../pop-up/Pop-up";
import css from "./pet-card.css";

type PetProps = {
  petPhoto: any;
  petName: string;
  PetId: number;
  petDescription: string;
  petUbication: string;
  petOwnerEmail: string;
};

export function PetCard(props: PetProps) {
  const [popUp, setPopUp] = useState(false);
  function handleClick(data) {
    setPopUp(data);
  }
  return (
    <div className={css.root}>
      <img src={props.petPhoto} className={css.img} />
      <div className={css.container}>
        <MyText variant={"subtitle"}>{props.petName}</MyText>
        <MyText variant={"body"}>{props.petDescription}</MyText>
        <div className={css.location}>
          <MyText variant={"body"}>Perdido en: {props.petUbication} </MyText>
        </div>
      </div>
      <span onClick={handleClick} className={css.report}>
        Reportar informacion
      </span>
      {popUp ? (
        <PopUp
          setPopUp={(data) => handleClick(data)}
          PetId={props.PetId}
          petOwnerEmail={props.petOwnerEmail}
          petName={props.petName}
        ></PopUp>
      ) : null}
    </div>
  );
}

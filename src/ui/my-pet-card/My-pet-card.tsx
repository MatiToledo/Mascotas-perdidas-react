import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, deletePetReport } from "../../../lib/api";
import { useAuth, useToEditPet } from "../../hooks";
import { MyText } from "../../ui/text";
import css from "./my-pet-card.css";

type PetProps = {
  img: any;
  petName: string;
  id: number;
};

export function MyPetCard(props: PetProps) {
  const navigate = useNavigate();
  const auth = useAuth();
  const [petToEdit, setPetToEdit] = useState(undefined);
  useToEditPet(petToEdit);

  function editClick() {
    setPetToEdit(props.id);
    setTimeout(() => {
      navigate("/editpet/" + props.id, { replace: true });
    }, 500);
  }

  function deleteClick() {
    deletePetReport({ id: props.id }, auth.token).then(() => {
      location.reload();
    });
  }

  return (
    <div className={css.root}>
      <img src={props.img} className={css.img} />
      <div className={css.name}>
        <MyText variant={"subtitle"}>{props.petName}</MyText>
      </div>
      <div className={css.container}>
        <span className={css.report} onClick={editClick}>
          Editar
        </span>
        <span className={css.report} onClick={deleteClick}>
          Eliminar
        </span>
      </div>
    </div>
  );
}

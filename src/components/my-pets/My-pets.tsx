import { useAuth, useGetMyPets } from "../../hooks";

import { MyPetCard } from "../../ui/my-pet-card/My-pet-card";
import { MyText } from "../../ui/text";
import React from "react";
import css from "./my-pets.css";

export function MyPetsComp() {
  const auth = useAuth();
  const results = useGetMyPets();

  return (
    <div className={css.root}>
      <MyText variant={"title"}>Mis mascotas reportadas</MyText>
      {results.length == 0 ? (
        <div className={css.inexist}>
          <MyText variant="subtitle">No tienes mascotas reportadas</MyText>
        </div>
      ) : (
        <div className={css.pets_container}>
          {results.map((p) => (
            <MyPetCard
              key={p.id}
              id={p.id}
              img={p.petPhoto}
              petName={p.petName}
            ></MyPetCard>
          ))}
        </div>
      )}
    </div>
  );
}

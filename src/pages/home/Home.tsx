import React, { useState } from "react";

import { HomeComp } from "../../components/home/Home";
import { MyText } from "../../ui/text";
import { PetCard } from "../../ui/pet-card/Pet-card";
import css from "./home.css";
import { useAuth } from "../../hooks";

export function Home() {
  const [cards, setCards] = useState([] as any);
  async function handleClick(data) {
    setCards(data);
  }
  useAuth();

  return (
    <div className={css.root}>
      <MyText variant={"title"}>Mascotas perdidas cerca tuyo</MyText>
      {cards.length == 0 ? (
        <HomeComp ubicationHandler={(data) => handleClick(data)}></HomeComp>
      ) : (
        <div className={css.pets_container}>
          {cards.map((p) => {
            return (
              <PetCard
                key={p.objectID}
                petName={p.petName}
                petDescription={p.petDescription}
                petUbication={p.petUbication}
                petPhoto={p.petPhoto}
                PetId={p.objectID}
                petOwnerEmail={p.petOwnerEmail}
              ></PetCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

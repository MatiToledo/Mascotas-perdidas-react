import React from "react";
import { parentPort } from "worker_threads";
import { petsAround } from "../../../lib/api";
import { ButtonPrim } from "../../ui/buttons";
import { MyText } from "../../ui/text";
import css from "./home.css";

interface myOnClick {
  ubicationHandler: (any) => void;
}

export function HomeComp(props: myOnClick) {
  function handleClick() {
    async function success(pos) {
      var crd = pos.coords;
      const petsFound = await petsAround(crd.latitude, crd.longitude);
      if (petsFound.length == 0) {
        props.ubicationHandler({});
        window.alert("No hay mascotas perdidas cerca tuyo");
        location.reload();
      } else {
        props.ubicationHandler(petsFound);
      }
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 30000,
    };

    function error(err) {
      console.warn("ERROR(" + err.code + "): " + err.message);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return (
    <div className={css.root}>
      <div className={css.container}>
        <MyText variant={"body"}>
          Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
          conocer tu ubicación.
        </MyText>
        <ButtonPrim onClick={handleClick}>Dar mi ubicacion</ButtonPrim>
      </div>
    </div>
  );
}

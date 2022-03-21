import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { Burger } from "../../ui/burger";
import css from "./menu.css";
import img from "../../images/close.png";
import { useAuth } from "../../hooks";

export function Menu() {
  const [active, setActive] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  function openClick() {
    setActive(true);
  }
  function closeClick() {
    setActive(false);
  }
  function logOutClick() {
    localStorage.removeItem("recoil-persist");
    navigate("/", { replace: true });
    location.reload();
  }
  function logInClick() {
    navigate("/ingresar", { replace: true });
    location.reload();
  }

  return (
    <div>
      {active ? (
        <div className={css.root}>
          <img src={img} className={css.img} onClick={closeClick} />
          <div className={css.container}>
            <Link
              className={css.link}
              onClick={closeClick}
              to={auth ? "/mydata" : "/ingresar"}
            >
              Mis datos
            </Link>
            <Link
              className={css.link}
              onClick={closeClick}
              to={auth ? "/mypets" : "/ingresar"}
            >
              Mis mascotas reportadas
            </Link>
            <Link
              className={css.link}
              onClick={closeClick}
              to={auth ? "/reportpet" : "/ingresar"}
            >
              Reportar Mascota
            </Link>
            {auth ? (
              <span className={css.log} onClick={logOutClick}>
                Cerrar sesion
              </span>
            ) : (
              <span className={css.log} onClick={logInClick}>
                Iniciar sesion
              </span>
            )}
          </div>
        </div>
      ) : (
        <Burger onClick={openClick}></Burger>
      )}
    </div>
  );
}

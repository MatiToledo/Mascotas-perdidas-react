import "mapbox-gl/dist/mapbox-gl.css";

import { ButtonPrim, ButtonSec } from "../../ui/buttons";
import { MyInput, MyTextArea } from "../../ui/text-fields";
import React, { useEffect, useRef, useState } from "react";

import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";
import { MyText } from "../../ui/text";
import { createPetReport } from "../../../lib/api";
import css from "./report-pet.css";
import dropImg from "../../images/dropzone.jpeg";
import mapboxgl from "mapbox-gl";
import { useAuth } from "../../hooks";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

export function ReportPetComp() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState([] as any);

  const [getRootProps, getInputProps] = dropzoneFileManager();
  const dropImage = photo?.preview ? photo.preview : dropImg;

  function dropzoneFileManager(): [any, any] {
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      maxSize: 20000000,
      onDrop: (acceptedFiles) => {
        const img = acceptedFiles[0];
        //save the photo as a data64 file.
        const reader = new FileReader();

        reader.onload = (event) => {
          setPhoto(
            Object.assign(img, {
              preview: event.target.result,
            })
          );
        };
        reader.readAsDataURL(acceptedFiles[0]);
      },
    });
    return [getRootProps, getInputProps];
  }

  const MAPBOX_TOKEN =
    "pk.eyJ1IjoibWF0aS10b2xlZG8iLCJhIjoiY2t1cG1qam83MDJsaTMxbWc3eHVyenVkeiJ9.HkGvX59y8Azu1LzbFDoemw";

  mapboxgl.accessToken = MAPBOX_TOKEN;

  const geocoder = GeocoderService({
    accessToken: MAPBOX_TOKEN,
  });

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [search, setSearch] = useState(null);
  const [lng, setLng] = useState(-64.187988);
  const [lat, setLat] = useState(-31.407916);
  const [zoom, setZoom] = useState(10.5);
  const [query, setQuery] = useState("");

  function inputChangeHandler(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  function handleClick(e) {
    e.preventDefault();

    geocoder
      .forwardGeocode({
        query: query,
        limit: 1,
        countries: ["ar"],
      })
      .send()
      .then((res) => {
        const firstResult = res.body.features[0];
        const [lng, lat] = firstResult.geometry.coordinates;

        setLat(lat);
        setLng(lng);
        setZoom(14.5);
        setSearch({
          lastlocationLat: lat,
          lastlocationLng: lng,
          petUbication: query,
        });
      });
  }

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    if (search != null) {
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
    }
  }, [search]);

  function handleSubmit(e) {
    e.preventDefault();
    const petName = e.target.petName.value;
    const petPhoto = dropImage;
    const petDescription = e.target.petDescription.value;
    const petOwnerEmail = auth.email;
    const { lastlocationLat, lastlocationLng, petUbication } = search;
    const data = {
      petName,
      petPhoto,
      petDescription,
      petOwnerEmail,
      lastlocationLat,
      lastlocationLng,
      petUbication,
    };
    createPetReport(data, auth.token).then(() =>
      navigate("/", { replace: true })
    );
  }

  return (
    <div className={css.root}>
      <MyText variant={"title"}>Reportar mascota perdida</MyText>
      <form onSubmit={handleSubmit} className={css.form}>
        <MyInput type={"text"} name={"petName"} label={"Nombre"}></MyInput>
        <MyTextArea name={"petDescription"} label={"Descripcion"}></MyTextArea>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <img className={css.img} src={dropImage} />
        </div>

        <div className={css.mapbox}>
          <div className={css.item}>
            <MyInput
              placeholder={"Donde se perdio?"}
              type={"text"}
              onChange={inputChangeHandler}
              label={"Ubicación"}
              name={"query"}
            ></MyInput>
          </div>
          <ButtonSec onClick={handleClick}>Buscar</ButtonSec>
        </div>

        <MyText variant={"body"}>
          Buscá un punto de referencia para reportar a tu mascota. Puede ser una
          dirección, un barrio o una ciudad.
        </MyText>
        <div ref={mapContainer} className={css.map} />

        <ButtonPrim>Reportar mascota</ButtonPrim>
      </form>
    </div>
  );
}

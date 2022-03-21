import React, { useState, useEffect, useRef } from "react";
import { ButtonPrim, ButtonSec } from "../../ui/buttons";
import { MyInput, MyTextArea } from "../../ui/text-fields";
import { MyText } from "../../ui/text";
import { useAuth, useGetToEditPet, useToEditPet } from "../../hooks";
import css from "./edit-pet.css";

import { useDropzone } from "react-dropzone";
import dropImg from "../../images/dropzone.jpeg";

import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { editPetReport, toEditPetReport } from "../../../lib/api";
import { useNavigate, useParams } from "react-router-dom";

export function EditPetComp() {
  const auth = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const pet = useGetToEditPet();

  const [photo, setPhoto] = useState([] as any);

  const [getRootProps, getInputProps] = dropzoneFileManager();
  const dropImage = photo?.preview ? photo.preview : pet.petPhoto;

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
  const [lng, setLng] = useState(pet.lastlocationLng);
  const [lat, setLat] = useState(pet.lastlocationLat);
  const [zoom, setZoom] = useState(14.5);
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
    const petDescription = e.target.petDescription.value;
    const petPhoto = dropImage;

    const lastlocationLat = search
      ? search.lastlocationLat
      : pet.lastlocationLat;

    const lastlocationLng = search
      ? search.lastlocationLng
      : pet.lastlocationLng;
    const petUbication = search ? search.petUbication : pet.petUbication;

    const data = {
      id: pet.id,
      petName,
      petPhoto,
      petDescription,
      petUbication,
      lastlocationLat,
      lastlocationLng,
    };

    editPetReport(data, auth.token).then(() =>
      navigate("/", { replace: true })
    );
  }

  return (
    <div className={css.root}>
      <MyText variant={"title"}>Editar mascota perdida</MyText>
      <form onSubmit={handleSubmit} className={css.form}>
        <MyInput
          type={"text"}
          name={"petName"}
          label={"Nombre"}
          defaultValue={pet.petName}
        ></MyInput>

        <MyTextArea
          name={"petDescription"}
          label={"Descripcion"}
          defaultValue={pet.petDescription}
        ></MyTextArea>

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <img className={css.img} src={dropImage} />
        </div>

        <div className={css.mapbox}>
          <div className={css.item}>
            <MyInput
              defaultValue={pet.petUbication}
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

        <ButtonPrim>Editar reporte</ButtonPrim>
      </form>
    </div>
  );
}

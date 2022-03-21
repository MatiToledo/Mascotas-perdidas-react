import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { myPets, toEditPetReport } from "../../lib/api";

import { recoilPersist } from "recoil-persist";
import { useEffect } from "react";

const { persistAtom } = recoilPersist();

const authAtom = atom({
  key: "authAtom",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export function useLogIn(authData) {
  const authState = useRecoilValue(authAtom);
  const setRecoilAuth = useSetRecoilState(authAtom);
  useEffect(() => {
    setRecoilAuth(authData);
  }, [authData]);
}

export function useAuth() {
  const authState = useRecoilValue(authAtom);
  if (authState !== undefined) {
    return authState;
  } else {
    return false;
  }
}

export const getUserPets = selector({
  key: "userPets",
  get: async ({ get }) => {
    const token = get(authAtom).token;
    const petsData = await myPets(token);
    return petsData;
  },
});

export function useGetMyPets() {
  return useRecoilValue(getUserPets);
}

const petAtom = atom({
  key: "petID",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export function useToEditPet(id) {
  const petIdState = useRecoilValue(petAtom);
  const setRecoilPetId = useSetRecoilState(petAtom);
  useEffect(() => {
    setRecoilPetId(id);
  }, [id]);
}

export const getToEditPet = selector({
  key: "PetToEdit",
  get: async ({ get }) => {
    const id = get(petAtom);

    const token = get(authAtom).token;

    const petFound = await toEditPetReport(id, token);
    return petFound;
  },
});

export function useGetToEditPet() {
  return useRecoilValue(getToEditPet);
}

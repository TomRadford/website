"use server";

import { requestInfo } from "rwsdk/worker";
import { ColoCode, COLOS } from "../constants/colos";

export const getLocation = () => {
  const cfRequest = requestInfo.request.cf;

  const colo = COLOS[cfRequest?.colo as ColoCode];
  return {
    city: cfRequest?.city as string,
    country: cfRequest?.country as string,
    colo: colo.city,
  };
};

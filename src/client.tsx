import { initClient, initClientNavigation } from "rwsdk/client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const { handleResponse } = initClientNavigation();
initClient({
  handleResponse,
});

import sanityClient from "@sanity/client";
export const client = sanityClient({
  projectId: "0fpabtv7",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token:
    "skSYs1GXLrKd54hkUIWSgsvzdLLJTMGL48ld4PvVeYTaztCP1A7zTywy77GYiv4c7Qrj8QBSsblDADZ0Jekn6ABm6vetxw9l14mFQpH5cnWCaEfEaL0vgJaypUl1KOkZjnnku9mwaQs7V70pxo54mWkPZrCapsx67P9h8bbMFhyOCno0q5nQ", // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});

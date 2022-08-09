import { authentication } from "./firebase-config";
import { GoogleAuthProvider,FacebookAuthProvider,signInWithPopup } from "firebase/auth";
const socialMediaAuth = async (params) => {
  let provider;
  if (params == "Facebook") {
    provider = new FacebookAuthProvider();
  } else if (params == "Google") {
    provider = new GoogleAuthProvider();
  }
  console.log(params,provider)
  let data;
  await signInWithPopup(authentication, provider)
    .then((res) => {
      data = res._tokenResponse;
    })
    .then((data) => {
      return data;
    })
    .catch((er) => console.log(er.error));
  return data;
};
export default socialMediaAuth;

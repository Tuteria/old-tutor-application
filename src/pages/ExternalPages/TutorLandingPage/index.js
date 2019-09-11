import React from "react";
import Loadable from "react-loadable";

const Loading = () => null;
const TutorLandingPage = Loadable({
  loading: Loading,
  loader: () => import("./Preloaded")
});

export default TutorLandingPage;

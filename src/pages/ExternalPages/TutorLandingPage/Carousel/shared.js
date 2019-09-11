import React from "react";
import Loadable from "react-loadable";
const Loading = () => null;

export const DefaultCarousel = Loadable({
  loader: () => import("./index"),
  loading: Loading
});

export const ScrollLogicContainer = Loadable({
  loader: () => import("./ScrollableCarousel"),
  loading: Loading
});

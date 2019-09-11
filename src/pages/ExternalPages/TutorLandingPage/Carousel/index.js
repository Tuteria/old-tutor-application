import React from "react";
import Loadable from "react-loadable";

const Loading = () => <div />;
export const CarouselBootstrap = Loadable({
  loader: () => import("./ScrollableCarousel"),
  loading: Loading,
  render(loaded, props) {
    let CB = loaded.namedExport;
    return <CB {...props} />;
  }
});

export default CarouselBootstrap;

import React from "react";
import { IndexStyle } from "../IndexStyle";
import { Div } from "../../../../primitives/index";

export const DefaultCarousel = ({ children, image }) => (
  <Div
    css={`
      color: white;
      .mobile-only {
        display: none;
      }
    `}
  >
    <IndexStyle image={image} />
    {children}
  </Div>
);

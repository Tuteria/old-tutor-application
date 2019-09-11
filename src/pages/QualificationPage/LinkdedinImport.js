import React from "react";
import styled from "styled-components";
import { xs, Div } from "../components";
import { ApplicationTooltip as Tooltip } from "../../simple/Tooltip";
export { ApplicationTooltip } from "../components";
export const Div2 = ({ children, newWidth = xs, css }) => (
  <Div
    css={`
      position: absolute;
      right: 0;
      top: 0;
      width: 300px;
      svg {
        margin-top: 19px;
      }
      @media (max-width: ${newWidth}px) {
        display: none;
      }
      ${css};
    `}
  >
    {children}
  </Div>
);
const LinkedinImport = ({ newWidth = xs }) => (
  // <Div2 hidenewWidth={width}>
  //   <Tooltip heading="Have a LinkedIn Account?" hasLinkedinButton>
  //     <span>
  //       Let’s save you the stress! We can get most of these information from
  //       LinkedIn if you have an account.
  //     </span>
  //     <br />
  //   </Tooltip>
  // </Div2>
  <Div
    css={`
      position: absolute;
      right: 0;
      top: 0;
      width: 300px;
      svg {
        margin-top: 19px;
      }
      // @media (max-width: ${newWidth || xs}px) {
      //   display: none;
      // }
      @media (max-width: ${newWidth}px) {
        display: none;
      }
    `}
  >
    <Tooltip heading="Have a LinkedIn Account?" hasLinkedinButton>
      <span>
        Let’s save you the stress! We can get most of these information from
        LinkedIn if you have an account.
      </span>
      <br />
    </Tooltip>
  </Div>
);

export default LinkedinImport;

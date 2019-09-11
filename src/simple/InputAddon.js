import React from "react";
import Flag from "./CountryFlag";
import styled, { css } from "styled-components";
import {
  spacing,
  form_field_styling,
  form_field,
  color,
  border
} from "../siteStyle";
import {
  SelectHoverFocus,
  StyledWrapper,
  StyledButton,
  borderColor
} from "./Select";

const InputAddonStyle = styled.div`
  display: flex;
  ${form_field.normal} &:focus, &:active {
    ${form_field.active};
  }
  &:hover {
    ${form_field.hover};
    & ${StyledButton} {
      &:hover {
      }
    }
    & Flag {
      &:hover {
        border: none !important;
      }
    }
    &input,
    textarea {
      &:hover {
        border-top: none;
        border-bottom: none;
        border-right: none;
      }
    }
    
  
  }

  ${props => (props.error ? form_field.error : "")};
  & ${Flag} {
    ${form_field_styling} border-radius: 0;
    border-right: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border: 0;
    &:hover {
      cursor: pointer;
      border: none;
    }
    ${props => (props.error ? `border: none;` : "")};
  }
  & input,
  textarea {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top: none;
    border-right: none;
    border-bottom: none;
    &:hover {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top: none;
      border-bottom: none;
      border-right: none;
      & ~ ${Flag} {
        &:hover {
          border: none;
        }
      }
    }
    ${props =>
      props.error
        ? `border-top: none;
      border-bottom: none;
      border-right: none;
      border-left-color: ${border.color.normal};`
        : ""};
  }
  & ${StyledWrapper} {
    height: auto;
    ${props => (props.error ? `border:none;` : "")} & ${StyledButton} {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top: 0;
      border-right: 0;
      border-bottom: 0;
      padding: 13px 16px;
      &:hover {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      // border-left: none;
      // padding-bottom: 13px;
      // &:hover,
      // &:focus {
      //   border-left: none;
      // }
    }
    &:focus,
    &:active {
      border: none;
    }
    &:hover {
    }
    border: none;
    ${props => (props.error ? `border: none` : "")};
  }
  & svg {
    // position: absolute;
  }
  & .InputAddon {
    background-color: #fafafa;
    &:first-child + input{
      width: 70%;
    }
    &:last-child {
      color: #484848;
      text-align: center;
      padding: 12px 16px;
    }
  }
  ${props =>
    css`
      ${props.css};
    `}
`;
// export const InputAddon = ({ children }) =>
//   <Row>
//     <Column md={12}>
//       <InputAddonStyle>
//         {children}
//       </InputAddonStyle>
//     </Column>
//   </Row>;
export const InputAddon = ({
  children,
  addonContent,
  addonProps = {},
  ...rest
}) => {
  return (
    <InputAddonStyle {...rest}>
      <Flag {...addonProps}>{addonContent}</Flag>
      {children}
    </InputAddonStyle>
  );
};

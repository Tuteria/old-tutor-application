import { css } from "styled-components";
import {
  button_styles as BStyles,
  color,
  brand_color,
  text_color,
  form_field
} from "./design-systems";

export {
  border,
  font_family,
  font_size,
  font_used,
  elements,
  color,
  resetStyling,
  font_weight,
  button,
  spacing,
  brand_color,
  text_color,
  font_face,
  form_label_text,
  form_field_styling,
  form_field
} from "./design-systems";
import { spacing as Spacing } from "./design-systems";

import { spacing } from "./design-systems/spacing";

const placeholderColor = "#999999";
const siteTextColor = "#777777";
const formTextPaddingLeft = 13;
export const xs = 768;
export const tablet = 1024;

const siteText = css`
  font-weight: 300;
  line-height: 21px;
  color: ${siteTextColor};
  font-size: 16px;
`;
const formComponentBase = css`
  ${siteText} color: #47525D;
  background-color: #ffffff;
  // border: 1px solid #cacaca;
  height: ${spacing.l};
`;
const formComponentStyle = css`
  ${formComponentBase} padding: ${props =>
  props.noPadding ? "none" : "11px " + formTextPaddingLeft + "px"};
  border-radius: 2px;
  &:focus {
    border: 2px solid #629fee;
    outline: none;
  }
`;

//This function consumes the buttonColorProperties() and uses it to create the button states
function buttonColorProperties({ borderColor, bgColor, textColor }) {
  return css`
    border-color: ${borderColor};
    background-color: ${bgColor};
    color: ${textColor};
  `;
}

export function generateButtonState({ normal, active, hover, disabled }) {
  return css`
    ${buttonColorProperties(normal)} transition: all 0.2s ease-in-out;
    :hover {
      ${buttonColorProperties(hover)};
    }
    :active {
      ${buttonColorProperties(active)};
    }
    :disabled {
      ${buttonColorProperties(disabled)};
    }
  `;
}

function generateButtonStyle(
  normalColor,
  activeColor,
  hoverColor,
  disabledColor
) {
  return {
    normal: {
      bgColor: normalColor,
      borderColor: normalColor,
      textColor: color.white
    },
    active: {
      bgColor: activeColor,
      borderColor: activeColor,
      textColor: color.white
    },
    hover: {
      bgColor: hoverColor,
      borderColor: hoverColor,
      textColor: color.white
    },
    disabled: {
      bgColor: disabledColor,
      borderColor: disabledColor,
      textColor: color.gray.ui_02
    }
  };
}

export const button_styles = {
  primary: { regular: BStyles.primary, outline: BStyles.outline },
  secondary: { regular: BStyles.secondary, outline: BStyles.outline },
  facebook: {
    outline: BStyles.outline,
    regular: generateButtonStyle("#4568b1", "#2f4f91", "#607cb7", "#6288d6")
  },
  google: { outline: BStyles.outline, regular: BStyles.outline }
};
export const spacingExtensions = props => {
  let options = {
    mb: "margin-bottom",
    mt: "margin-top",
    ml: "margin-left",
    mr: "margin-right",
    pt: "padding-top",
    pb: "padding-bottom",
    pl: "padding-left",
    pr: "padding-right"
  };
  let transform = Object.keys(props)
    .map(x => {
      return `${props[x] ? `${options[x]}: ${spacing[props[x]]};` : ""}`;
    })
    .join("");
  return Boolean(transform) ? transform : "";
};
export default {
  siteColor: "#337AB7",
  siteText,
  siteTextColor,
  placeholderColor,
  formTextPaddingLeft,
  formComponentStyle,
  formComponentBase,
  xs: 768
};

///////// BORDER AND INPUT FIELD TOKENS ///////////

import { css } from "styled-components";

import { color } from "./color";
import { font_weight, font_size } from "./font";
import { spacing } from "./spacing";

//Border Tokens
export const border = {
  radius: {
    s: "2px",
    m: "4px",
    l: "10px"
  },
  thickness: {
    s: "1px",
    m: "2px"
  },
  color: {
    normal: color.gray.ui_03,
    error: color.red.primary,
    success: color.green.primary,
    warning: color.orange.primary,
    hover: color.gray.lighter,
    active: color.blue.primary
  }
};

//Styling the Form Fields

export const form_field_styling = css`
  padding: ${spacing.form_field.normal};
  font-size: ${font_size.form_label};
`;

export const text_area_styling = css`
  ${form_field_styling} overflow:auto;
  vertical-align: top;
  resize: vertical;
`;

export const form_label_text = css`
  font-size: ${font_size.form_label};
  font-weight: ${font_weight.medium};
  color: ${color.gray.primary};
  margin-bottom: ${spacing.s};
`;

//A function to print out the various states of the form field
function form_state(bg_color, border_color, extra_styles) {
  return css`
    background-color: ${bg_color};
    border: 1px solid ${border_color};
    border-radius: 4px;
    ${extra_styles};
  `;
}

//Defining the Form Input Field States
export const form_field = {
  normal: form_state(color.white, border.color.normal),
  hover: form_state(color.white, border.color.hover, "cursor:pointer;"),
  active: form_state(color.white, border.color.active),
  error: form_state(color.white, border.color.error),
  disabled: form_state(
    color.gray.ui_02,
    border.color.normal,
    "cursor:not-allowed;"
  )
};

///////// BUTTON TOKENS ///////////

//This is where we define the button states and their respective colors

export let button_styles = {
  primary: {
    normal: {
      bgColor: color.blue.primary,
      borderColor: color.blue.primary,
      textColor: color.white
    },
    active: {
      bgColor: color.blue.darker,
      borderColor: color.blue.darker,
      textColor: color.white
    },
    hover: {
      bgColor: color.blue.lighter,
      borderColor: color.blue.lighter,
      textColor: color.white
    },
    disabled: {
      bgColor: color.blue.disabled,
      borderColor: color.blue.disabled,
      textColor: color.gray.ui_02
    }
  },
  secondary: {
    normal: {
      bgColor: color.green.primary,
      borderColor: color.green.primary,
      textColor: color.white
    },
    active: {
      bgColor: color.green.primary,
      borderColor: color.green.darker,
      textColor: color.white
    },
    hover: {
      bgColor: color.green.lighter,
      borderColor: color.green.lighter,
      textColor: color.white
    },
    disabled: {
      bgColor: color.green.disabled,
      borderColor: color.green.disabled,
      textColor: color.gray.ui_02
    }
  },
  outline: {
    normal: {
      bgColor: color.white,
      borderColor: color.gray.ui_03,
      textColor: color.gray.primary
    },
    active: {
      bgColor: color.gray.ui_01,
      borderColor: color.gray.ui_03,
      textColor: color.gray.primary
    },
    hover: {
      bgColor: color.white,
      borderColor: color.gray.lighter,
      textColor: color.gray.primary
    },
    disabled: {
      bgColor: color.gray.ui_02,
      borderColor: color.gray.ui_02,
      textColor: color.gray.lighter
    }
  }
};

//Basic button css style that is common to all buttons
let basic_button_style = css`
  display: inline-block;
  border-radius: ${border.radius.m};
  border-width: ${border.thickness.s};
  border-style: solid;
  text-align: center;
  vertical-align: middle;
  font-weight: ${font_weight.bold};
  user-select: none;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
`;

//Add the spacing, height and font-size to determine the size of the button
export let button = {
  small: css`
    ${basic_button_style} font-size: ${font_size.xs};
    padding-left: ${spacing.button.small.normal};
    height: 40px;
  `,
  regular: css`
    ${basic_button_style} font-size: ${font_size.form_label};
    padding: ${spacing.button.regular.normal};
    height: 48px;
  `,
  big: css`
    ${basic_button_style} font-size: ${font_size.m};
    padding: ${spacing.button.regular.normal};
    height: 56px;
  `
};

//Define text links
export let text_link = `
    background: transparent;
    color: ${color.blue.primary};
    text-decoration: none;
}
& :focus {
    outline: 5px auto 0;
}

& :active {
    outline: 0;
}
}
`;

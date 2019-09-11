// Tuteria Design System v1.0 - Created by SAGE

//Enable the Use of CSS in the design system
import { css } from "styled-components";
import { font_size, letter_spacing, line_height, font_weight } from "./font";
import { color } from "./color";

//Reset Browser Styling
export let resetStyling = {
  h2: css`
    margin-top: 0;
    margin-bottom: 10px;
  `,
  p: css`
    margin-bottom: 0;
    margin-top: 0;
  `
};
export let elements = resetStyling;

///////// COLOR TOKENS ///////////

//Using the Font Tokens in a CSS in JS Style

export const _font_used = {
  //Heading Fonts carry the font-weight
  xxxl: `
    font-size: ${font_size.hero_heading};
    letter-spacing: -0.8px;
    line-height: 56px;
    font-weight: bold;

    @media(max-width: 420px) {
      font-size: ${font_size.big_heading};
      line-height: 40px;
    }
  `,
  xxl: `
    font-size: ${font_size.big_heading};
    letter-spacing: -0.6px;
    line-height: 40px;
    font-weight: bold;
  `,
  xl: `
    font-size: ${font_size.regular_heading};
    letter-spacing: -0.4px;
    line-height: 36px;
    font-weight: bold;
  `,
  l: `
    font-size: ${font_size.small_heading};
    letter-spacing: -0.2px;
    line-height: 28px;
    font-weight: bold;
  `,
  //Text Fonts can be either regular or bold. Hence, no need to carry font-weight
  m: `
        font-size: ${font_size.big_body};
        letter-spacing: 0px;
        line-height: 28px;
    `,
  s: `
    font-size: ${font_size.form_label};
    letter-spacing: 0px;
    line-height: 24px;
  `,
  xs: `
    font-size: ${font_size.regular_body};
    letter-spacing: 0px;
    line-height: 24px;
  `,
  xxs: `
        font-size: ${font_size.small_body};
        letter-spacing: 0px;
        line-height: 20px;
    `,
  xxxs: `
        font-size: ${font_size.caption};
        letter-spacing: 0px;
        line-height: 16px;
    `
};

export const font_used = {
  ..._font_used,
  hero_heading: _font_used.xxxl,
  big_heading: _font_used.xxl,
  regular_heading: _font_used.xl,
  small_heading: _font_used.l,
  form_label: _font_used.s,
  big_body: _font_used.m,
  regular_body: _font_used.xs,
  small_body: _font_used.xxs,
  caption: _font_used.xxxs
};

///////// ICON SIZE TOKENS ///////////

export const icon_size = {
  large: {
    width: "64px",
    height: "64px"
  },
  medium: {
    width: "32px",
    height: "32px"
  },
  normal: {
    width: "24px",
    height: "24px"
  },
  small: {
    width: "16px",
    height: "16px"
  }
};

///Replace this guy with 1120px

export const device_style = {
  mobile: 544,
  mobile_landscape: 768,
  tablet: 992,
  tablet_landscape: 1200,
  big_desktop: 1600
};
export const responsive_design = {
  mobile: `@media(max-width: ${device_style.mobile}px)`,
  mobile_landscape: `@media(min-width: ${device_style.mobile +
    1}px) and (max-width:${device_style.mobile_landscape}px)`,
  mobile_only: `@media(max-width: ${device_style.mobile_landscape}px)`,
  tablet: `@media(min-width: ${device_style.tablet}px) and (max-width:${
    device_style.tablet_landscape
  }px)`,
  tablet_only: `@media(min-width: ${device_style.tablet}px)`,
  desktop: `@media(min-width: ${device_style.tablet_landscape}px)`
};
///////// BUTTON TOKENS ///////////

//Function that defines the fundamental color properties of the buttons.
//It is consumed by generateButtonState() function so don't worry about this

export { color, brand_color, text_color } from "./color";
export { font_weight, font_face, font_family, font_size } from "./font";
export {
  button_styles,
  border,
  form_field,
  button,
  form_field_styling,
  form_label_text
} from "./form-elements";
export { spacing } from "./spacing";

///////// FONT AND TYPOGRAPHY TOKENS ///////////

//Base Path for the @font-face ->> ${BASE_PATH}/fonts/circular/circularstd-medium
export const BASE_PATH = "/static";

//Defining Font Weights
export const font_weight = {
  regular: 500,
  medium: 600,
  bold: 800
};

//Specifying all the custom fonts
const custom_fonts = {
  circular: "Circular Std"
};

//Defining the Font Family
export const font_family = `'${
  custom_fonts.circular
}',-apple-system, system-ui, sans-serif !important`;

//Defining the Line Height Tokens
export const line_height = {
  xxxl: "56px",
  xxl: "40px",
  xl: "36px",
  l: "28px",
  m: "24px",
  s: "22px;",
  xs: "16px;",
  xxs: "8px"
};

//Defining all the font sizes to be used throughout the Design System
const _font_size = {
  xxxl: "48px",
  xxl: "36px",
  xl: "28px",
  l: "22px",
  m: "19px",
  s: "17px",
  xs: "16px;",
  xxs: "14px;",
  xxxs: "12px"
};

//Renamed Version of _font_size.
//PLEASE DELETE _font_size once you've updated your code
export const font_size = {
  ..._font_size,
  //Heading Fonts
  hero_heading: _font_size.xxxl,
  big_heading: _font_size.xxl,
  regular_heading: _font_size.xl,
  small_heading: _font_size.l,
  //Form Label Font
  form_label: _font_size.s,
  //Body Font
  big_body: _font_size.m,
  regular_body: _font_size.xs,
  small_body: _font_size.xxs,
  caption: _font_size.xxxs
};

//Defining all the letter spacing tokens
export const letter_spacing = {
  xxxs: "-0.8px",
  xxs: "-0.6px",
  xs: "-0.4px",
  s: "-0.2px",
  base: "0px",
  m: "0.2px",
  l: "0.4px",
  xl: "0.6px",
  xxl: "0.8px",
  xxxl: "1.0px"
};

//@font-face definition
export let font_face = `
  @font-face {
      font-family: ${custom_fonts.circular};
      font-display: swap;
      src: url(${BASE_PATH}/fonts/circular/circularstd-bold.eot?#iefix);
      src: url(${BASE_PATH}/fonts/circular/circularstd-bold.eot?#iefix)
          format("embedded-opentype"),
        url(${BASE_PATH}/fonts/circular/circularstd-bold.woff) format("woff"),
        url(${BASE_PATH}/fonts/circular/circularstd-bold.ttf) format("truetype"),
        url(${BASE_PATH}/fonts/circular/circularstd-bold.svg#@{icon-font-svg-id})
          format("svg");
      font-weight: ${font_weight.bold};
    }

    @font-face {
      font-family: ${custom_fonts.circular};
      font-display: swap;
      src: url(${BASE_PATH}/fonts/circular/circularstd-book.eot?#iefix);
      src: url(${BASE_PATH}/fonts/circular/circularstd-book.eot?#iefix)
          format("embedded-opentype"),
        url(${BASE_PATH}/fonts/circular/circularstd-book.woff) format("woff"),
        url(${BASE_PATH}/fonts/circular/circularstd-book.ttf) format("truetype"),
        url(${BASE_PATH}/fonts/circular/circularstd-book.svg#@{icon-font-svg-id})
          format("svg");
      font-weight: ${font_weight.regular};
    }

    @font-face {
      font-family: ${custom_fonts.circular};
      font-display: swap;
      src: url(${BASE_PATH}/fonts/circular/circularstd-medium.eot?#iefix);
      src: url(${BASE_PATH}/fonts/circular/circularstd-medium.eot?#iefix)
          format("embedded-opentype"),
        url(${BASE_PATH}/fonts/circular/circularstd-medium.woff) format("woff"),
        url(${BASE_PATH}/fonts/circular/circularstd-medium.ttf) format("truetype"),
        url(${BASE_PATH}/fonts/circular/circularstd-medium.svg#@{icon-font-svg-id})
          format("svg");
      font-weight: ${font_weight.medium};
    }
  `;

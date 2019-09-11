///////// COLOR TOKENS ///////////

export const color = {
  gray: {
    darker: "#3B3B3B",
    primary: "#484848",
    lighter: "#9B9B9B",
    ui_03: "#DDDDDD",
    ui_02: "#F2F2F2",
    ui_01: "#F7F7F7"
  },
  blue: {
    darker: "#0052BD",
    primary: "#0064E6",
    lighter: "#2E80EA",
    faint: "#94BDF2",
    disabled: "#79ACED"
  },
  green: {
    darker: "#2D9368",
    primary: "#36B37E", // the primary and the lighter needs to be inverted
    lighter: "#5AC095",
    faint: "#E7F4EF",
    disabled: "#95D5BB"
  },
  red: {
    darker: "#E9411B",
    primary: "#ED6344",
    lighter: "#F1866D",
    faint: "#F0E0DC"
  },
  orange: {
    darker: "#E59B06",
    primary: "#FFAB00",
    lighter: "#F9CF79",
    faint: "#F5E4C2"
  },
  white: "#FFFFFF"
};

//Defining the Brand Color for Tuteria
export const brand_color = {
  tuteria_blue: color.blue.primary,
  tuteria_green: color.green.primary
};

//Defining main Text colors
export const text_color = {
  primary: color.gray.primary,
  secondary: color.gray.primary
};

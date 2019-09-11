///////// SPACING TOKENS ///////////
const _spacing = {
  min: "2px",
  xs: "4px",
  s: "8px",
  sm: "12px",
  m: "16px",
  ml: "18px",
  l: "24px",
  xl: "32px",
  xxl: "48px",
  xxxl: "64px",
  max: "72px"
};

export const spacing = {
  ..._spacing,

  button: {
    regular: {
      normal: "0 24px",
      left_icon: "0 24px 0 12px",
      right_icon: "0 12px 0 24px",
      icon_padding: "8px",
      link: "16px 24px"
    },
    small: {
      normal: "0 16px",
      left_icon: "0 16px 0 12px",
      right_icon: "0 12px 0 16px",
      icon_padding: "8px"
    }
  },
  form_field: {
    normal: "12px 16px",
    left_icon: "12px 16px 12px 44px",
    right_icon: "12px 44px 12px 16px",
    icon_padding: "8px"
  },
  inset: {
    square: {
      min: "2px 2px 2px 2px",
      xs: "4px 4px 4px 4px",
      s: "8px 8px 8px 8px",
      m: "16px 16px 16px 16px",
      l: "24px 24px 24px 24px",
      xl: "32px 32px 32px 32px",
      xxl: "48px 48px 48px 48px",
      max: "64px 64px 64px 64px"
    }
  }
};

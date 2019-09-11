import React from "react";
import styled, { css } from "styled-components";
import Icon from "./Icon";
import { generateButtonState, button_styles, spacing } from "../siteStyle";
import { button, responsive_design } from "../design-systems";
import { darken } from "polished";

const siteTextColor = "#777777";

function getButtonType(props, kind = "mobile") {
  if (!!props.small) {
    return button.small;
  }
  if (!!props.big) {
    return button.big;
  }
  return button.regular;
}

/**
 *
 * @param {boolean} props
 * @param {string} kind
 *
 */
function getButtonStyle(props, kind = "primary") {
  if (!!props.outline) {
    return button_styles[kind].outline;
  }
  return button_styles[kind].regular;
}

const Button = styled.button`
  ${props => getButtonType(props, "desktop")};
  ${responsive_design.mobile_only} {
    ${props => getButtonType(props)};
    width: 100%;
  }
  ${props => (props.full_width ? "width: 100%;" : "")};
  ${props =>
    css`
      ${props.css || ""};
    `};
`;
const generateLink = node => Button.withComponent(node).extend`
box-sizing: border-box;
padding: ${spacing.button.regular.link};
${props =>
  css`
    ${props.css || ""};
  `}`;
const A = styled.a`
  &:hover {
    text-decoration: none;
  }
`;
export const LinkButton = generateLink(A);
//  Button.withComponent("a").extend`
// box-sizing: border-box;
// padding: ${spacing.button.regular.link};
// ${props =>
//   css`
//     ${props.css || ""};
//   `}`;
export const DefaultButton = styled(Button)`
  border: 1px solid #c9cacd;
`;
export const PrimaryButton = styled(Button)`
  ${props => {
    let result = getButtonStyle(props, "primary");
    result = generateButtonState(result);
    return result;
  }};
`;
export const PrimaryLinkButton = styled(LinkButton)`
  ${props => {
    let result = getButtonStyle(props, "primary");
    result = generateButtonState(result);
    return result;
  }};
  ${props =>
    css`
      ${props.css || ""};
    `};
`;
const genericStylingFunction = (props, type = "primary") =>
  generateButtonState(getButtonStyle(props, type));
export const generateLinkComponent = (node, kind = "primary") => {
  const Link = generateLink(node);
  return styled(Link)`
    ${props => genericStylingFunction(props, kind)};
    ${props => props.css};
  `;
};
export const SecondaryButton = styled(Button)`
  ${props => generateButtonState(getButtonStyle(props, "secondary"))};
`;
export const SecondaryLinkButton = styled(LinkButton)`
  ${props => genericStylingFunction(props, "secondary")};
`;
const PLinkButton = styled(LinkButton)`
  ${props => genericStylingFunction(props, "primary")};
`;
export const getLinkButton = key => {
  return styled(LinkButton)`
    ${props => genericStylingFunction(props, key)};
  `;
};
export const SuccessButton = styled(Button).attrs({
  bgColor: "#36B37E",
  textColor: "#ffffff",
  hoverBgColor: "#36C98E",
  activeBgColor: "#36C98E"
})`
  border: 1px solid #36b37e;
`;
const IconDirection = props => {
  let size = "regular";
  if (props.small) {
    size = "small";
  }
  if (props.big) {
    size = "regular"; // to change to big
  }
  const kind = props.primary ? "primary" : props.primary_text || "secondary";
  const buttonValue = spacing.button[size];
  let stylings = `
    left: ${props.full_width ? "16px" : "0"};
     //top: ${props.full_width ? "16px" : "0"};
     ${props.top ? `top:${props.top}` : ""};
    padding-left: ${!props.full_width ? buttonValue.icon_padding : "0"}
 `;
  let buttonStylings = `padding: ${buttonValue.right_icon};`;
  if (props.right) {
    stylings = `right: 0;padding-right:${buttonValue.icon_padding}`;
  }
  return css`
    ${props => {
      let result = getButtonStyle(props, kind);
      result = generateButtonState(result);
      return result;
    }};

    ${buttonStylings} svg, i {
      position: absolute;

      ${stylings};
    }
  `;
};
export const IconButton = styled(Button)`
  ${props =>
    css`
      ${props.buttonStyle || ""};
    `};
  position: relative;
  ${props => IconDirection(props)};
`;

export const DeleteButton = styled(Button).attrs({
  bgColor: "rgba(233,65,27,0.1)",
  textColor: "#E9411B"
})`
  border: 0;
`;

const Linkedin = styled(IconButton).attrs({
  bgColor: "#0077B5",
  textColor: "#ffffff",
  hoverBgColor: "#007ec2",
  activeBgColor: "#0074b3"
})`
  & i {
    border-right: 2px solid #07689b;
  }
`;
export const ButtonWithIcon = ({
  children,
  name,
  icon,
  top,
  spanStyle,
  iconStyle = {},
  ...rest
}) => (
  <IconButton name={name} top={top} {...rest}>
    {icon ? <Icon name={icon} primary={rest.primary} {...iconStyle} /> : null}
    <span style={spanStyle}>{children}</span>
  </IconButton>
);

export const SocialIconButton = styled(ButtonWithIcon)`
 ${props => {
   let result = getButtonStyle(props, props.kind);
   result = generateButtonState(result);
   return result;
 }};
  ${props => css`
    ${props.css || ""};
  `};
  /* display: flex;
  align-content: center; */
  &:disabled {
    border-color: ${props => (props.connectColor ? props.connectColor : null)};
    color: ${props =>
      props.connectColor ? props.connectColor : null}!important;
    cursor: not-allowed;
  }
  & rect {
    fill: ${props => (props.connectColor ? props.connectColor : null)};
    /* &:hover {
      fill: ${props =>
        props.connectHoverColor ? props.connectHoverColor : null};
    } */
  }
  /* & span {
    margin-top: 0;
    padding: 0 12px;
    padding-top: 2px;
    display: flex;
    & span {
      display: inline-block;
      padding-left: 5px !important;
      padding-top: 0 !important;
    }
  } */
`;

export const LinkedinButton = ({ children, ...rest }) => (
  <Linkedin {...rest}>
    <Icon name="lindedin" />
    <span>{children}</span>
  </Linkedin>
);

export const SwitchBetweenButtonAndLink = ({
  isLoggedIn,
  loggedInText,
  text,
  onClick,
  href,
  linkCss,
  buttonCss,
  small,
  big
}) => {
  return isLoggedIn ? (
    <PrimaryLinkButton small={small} big={big} href={href} css={linkCss}>
      {loggedInText}
    </PrimaryLinkButton>
  ) : (
    <PrimaryButton small={small} big={big} css={buttonCss} onClick={onClick}>
      {text}
    </PrimaryButton>
  );
};

export default Button;

export class LoadingButton extends React.Component {
  state = {
    loading: false
  };

  onClick = () => {
    const { onClick } = this.props;
    this.setState({ loading: true });
    let result = onClick();
    if (Boolean(result) && Boolean(result.then)) {
      result.then(
        () => this.setState({ loading: false }),
        () => this.setState({ loading: false })
      );
    }
  };
  render() {
    const {
      kind,
      onClick,
      render,
      disabled = false,
      children,
      controlled = false,
      loading = false,
      controlledOnClick = this.onClick,
      ...rest
    } = this.props;
    const Component = kind;
    const isLoading = controlled ? loading : this.state.loading;
    return Component ? (
      <Component
        {...rest}
        disabled={disabled || isLoading}
        onClick={controlled ? controlledOnClick : this.onClick}
      >
        {isLoading ? "Loading..." : children}
      </Component>
    ) : (
      render(this.state, this.onClick)
    );
  }
}

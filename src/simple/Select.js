import React from "react";
import find from "lodash/find";
import { Wrapper, Button, Menu, MenuItem } from "react-aria-menubutton";
import styled, { css } from "styled-components";
import includes from "lodash/includes";
import globals, {
  xs,
  spacing,
  form_field,
  form_field_styling
} from "../siteStyle";
import Icon from "./Icon";
const { formComponentBase, formTextPaddingLeft, siteColor } = globals;

export const borderColor = (props, state) => {
  const options = {
    focus: {
      disabled: "none",
      def: `1px solid ${siteColor}`,
      error: `1px solid ${siteColor}`
    },
    hover: {
      disabled: "none",
      def: `1px solid #B2B2B2`,
      error: `1px solid #B2B2B2`
    },
    raw: {
      disabled: "",
      def: "1px solid #CACACA",
      error: "2px solid #E9411B"
    }
  };
  if (state) {
    let value = options[state];
    if (props.disabled) {
      return value.disabled;
    }
    if (props.error) {
      return value.error;
    }
    return value.def;
  }
};

export const SelectHoverFocus = css`
  &:focus {
    outline: none;
   
    // border: ${props => borderColor(props, "focus")};
  }
  &:hover {
    
    // border: ${props => borderColor(props, "hover")};
    // background-color: #f6f6f6;
  }
  &:active,
  &:visited {
    background-color: ${props => (props.disabled ? "#F6F6F6" : "#E3EDF8")};
    color: ${props => (props.disabled ? "inherit" : "#0064E6")};
  }
`;

export const StyledWrapper = styled(Wrapper)`
  width: ${props => (props.width ? props.width : 100)}%;
  ${formComponentBase} line-height: 18px;
  height: 44px;
  margin-left: ${props => (props.first ? 14 : 0)}px;
  position: relative;

  background-color: ${props => (props.disabled ? "#F6F6F6" : "#FFF")};
`;
export const StyledButton = styled(Button)`
  display: inline-block;
  padding: 12px ${formTextPaddingLeft}px;
  height: ${props => (props.height ? props.height : "")};
  box-sizing: border-box;
  
    ${form_field_styling}
  ${form_field.normal}
  // border: ${props => borderColor(props, "raw")};
  width: 100%;
  width: -webkit-fill-available;
  ${props => props.css}
  @media (max-width: ${xs}px) {
    width: 91%;
    width: -webkit-fill-available;
  }
  cursor: pointer;
  /* position: relative; */
  ${SelectHoverFocus} 
  &:focus,&:active{
    ${form_field.active}
  }
  &:hover{
${form_field.hover}
  }
  
  ${props => (props.error ? form_field.error : "")}
  & i,
  svg {
    font-size: 10px;
    bottom: 0;
    margin-bottom: 5px;
    padding: ${spacing.inset.right_icon};
    position: absolute;
    right: 0;
  }
`;
export const UlStyle = css`
  background: #fff;
  border: 1px solid #dce0e0;
  list-style-type: none;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 99;
  padding-left: 0;
  border-radius: 2px;
  margin: 7px 0 0 0;
  width: calc(100%);
  box-shadow: 0 4px 6px 0 rgba(170, 170, 170, 0.21);
  & li:first-of-type {
    border-radius: 1px 1px 0 0;
    margin-top: 8px;
  }
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const StyledMenu = styled(Menu)`
  ${formComponentBase} border-width: 0;
  height: 0;
  & ul {
    ${UlStyle};
    ${props => (props.direction === "up" ? `top: ${props.top};` : "")};
  }
`;
export const LiStyle = css`
  cursor: pointer;
  padding-top: 11px;
  border-bottom: 1px solid #eee;
  padding-bottom: 11px;
  padding-left: 18px;
  &:hover,
  &:focus {
    background-color: #ebf4fd;
  }
`;
export const StyledMenuItem = styled(MenuItem)`
  ${LiStyle};
`;

export const Option = ({ value, ...rest }) => {
  const text = typeof rest.children === "string" ? rest.children : rest.text;
  return <StyledMenuItem tag="li" value={value} text={text} {...rest} />;
};

export class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: Boolean(this.props.multiple)
        ? this.props.values || []
        : this.props.value || "",
      isOpen: false,
      multiple: Boolean(this.props.multiple)
    };
  }
  componentWillReceiveProps(nextProps) {
    if (Boolean(nextProps.multiple)) {
      if (
        Array.isArray(nextProps.values) &&
        Array.isArray(this.state.selected)
      ) {
        if (nextProps.values.every(x => includes(this.state.selected, x))) {
          this.setState({ selected: nextProps.values });
        }
      }
    } else {
      if (
        nextProps.value !== this.state.selected &&
        nextProps.uncontrolled === false
      ) {
        this.setState({ selected: nextProps.value });
      }
    }
  }
  handleSelection(value) {
    const { getText = x => x, onChange } = this.props;
    if (Boolean(this.props.multiple)) {
      let values = [...this.state.selected];
      values = includes(values, value)
        ? values.filter(x => x !== value)
        : [...values, value];
      onChange(values);
      this.setState({ selected: [...values] });
    } else {
      onChange(value);
      this.setState({ selected: getText(value) });
    }
  }
  displayFunc = () => {
    const {
      output = e => e,
      defaultText = "Select",
      uncontrolled = false
    } = this.props;
    if (Boolean(this.props.multiple)) {
      const displayVal = uncontrolled ? this.props.values : this.state.selected;
      let result = output(defaultText, displayVal);
      return result;
    } else {
      const displayVal = uncontrolled ? this.props.value : this.state.selected;
      return output(displayVal) || defaultText;
    }
  };
  onKeyDown = e => {
    let props = this.props.children.props.options;
    // let props = this.props.children.map(x => {
    //   if (!!x.props) {
    //     return x.props;
    //   }
    //   return x.map(x => x.props);
    // });
    props = [].concat(...props);
    if (e.keyCode === 13) {
      const selectedValue = find(
        props,
        x => x.children === e.target.textContent
      );
      if (!!selectedValue) {
        this.handleSelection(selectedValue.value || selectedValue.children);
      }
    }
  };
  onKeyDownMultiple = e => {};
  render() {
    const {
      disabled = false,
      // value,
      md = 12,
      sm,
      xs,
      children,
      error = false,
      direction = "down",
      noColumn = false,
      SelectMenu = StyledMenu,
      output,
      height,
      top,
      openAction = () => {},
      defaultText,
      getText,
      styledButtonCss,
      ...rest2
    } = this.props;
    const { ...rest } = rest2;
    const result = (
      <StyledWrapper
        id={this.props.id}
        disabled={disabled}
        onMenuToggle={({ isOpen }) => {
          this.setState({ isOpen });
          openAction(isOpen);
        }}
        onSelection={this.handleSelection.bind(this)}
        {...rest}
      >
        <StyledButton
          error={error}
          disabled={disabled}
          height={height}
          aria-disabled={disabled}
          css={styledButtonCss}
          tabIndex={disabled ? -1 : 0}
        >
          <span>{this.displayFunc()}</span>
          <Icon
            name={`chevron-${this.state.isOpen ? "up" : "down"}`}
            aria-hidden="true"
          />
        </StyledButton>
        <SelectMenu
          direction={direction}
          top={top}
          onKeyDown={
            Boolean(this.props.multiple)
              ? this.onKeyDownMultiple
              : this.onKeyDown
          }
        >
          <ul id="style-1">{children}</ul>
        </SelectMenu>
      </StyledWrapper>
    );
    return noColumn ? (
      result
    ) : (
      <Column md={md} sm={sm} xs={xs}>
        {result}
      </Column>
    );
  }
}

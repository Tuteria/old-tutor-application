import React, { Children, Component } from "react";
import styled, { css } from "styled-components";
import Icon from "./Icon";
import { Popover } from "./Popover";
// import { Col as Column } from "react-grid-system";
import { Div } from "../primitives";
import {
  spacing,
  font_used,
  form_field,
  form_field_styling,
  form_label_text
} from "../siteStyle";
import { Notification } from "./Notification";

function getColor(props) {
  if (props.error) {
    return "#E9411B";
  }
  if (props.success) {
    return "#36B37E";
  }
  return "inherit";
}
const FormGroup = styled.div`
  position: relative;
  & input + i,
  input + svg,
  * div + svg,
  * div + i {
    position: absolute;
    right: 10px;
    margin-bottom: 0px;
    bottom: 15px;
    color: ${props => getColor(props)};
    top: 0;
    margin-top: 42px;
  }
  & div + i,
  div + svg {
    right: 9px;
  }
  & ${Popover} {
  }
  & label {
    display: block;
    ${form_label_text}
  }
  & input,textarea {
    ${form_field_styling}
    ${form_field.normal}
    :hover{
      ${form_field.hover}
    }
    :focus{
      ${form_field.active}
    }
    :disabled{
      ${form_field.disabled}
    }
    ${props => (props.error ? form_field.error : "")}
    ${props => {
      let result = `
      ${props.showIcon ? `padding: ${spacing.form_field.right_icon};` : ""}
      `;
      return css`
        ${result};
      `;
    }}
    /* ${spacing.inset.form_field}; */
  }
    ${Notification}{
      margin-top: 12px;
    }
`;

class NewFormGroup extends Component {
  constructor(props) {
    super(props);
    this.node = null;
    this.state = {
      open: false
    };
  }
  focus() {
    this.setState({ open: true });
  }
  blur() {
    this.setState({ open: false });
  }

  render() {
    const {
      error = false,
      popover,
      success = false,
      children,
      noColumn = false,
      showIcon = true,
      innerStyle = {},
      RootComponent = Div,
      ...rest
    } = this.props;
    let children2 = children;
    if (children.length) {
      children2 = children.filter(x => x);
      children2 = Children.map(
        children2,
        child => (child ? React.cloneElement(child, { error, success }) : child)
      );
    } else {
      children2 = React.cloneElement(children, { error, success });
    }
    const newChildren = (
      <Div
        css={`
          label {
            ${form_label_text};
          }
          ${this.props.css || ``};
        `}
        style={{ position: "relative", ...innerStyle }}
      >
        {children2}
        {error && showIcon ? <Icon name="info-circle" /> : null}
        {success && showIcon ? <Icon name="check-circle" /> : null}
      </Div>
    );
    const renderComponent = (
      <FormGroup
        ref={input => (this.node = input)}
        error={error}
        success={success}
        showIcon={showIcon}
        {...rest}
      >
        {newChildren}
      </FormGroup>
    );
    return noColumn ? (
      renderComponent
    ) : (
      <RootComponent css={``} {...rest}>
        {renderComponent}
      </RootComponent>
    );
  }
}
export default NewFormGroup;

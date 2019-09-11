import React from "react";
import styled from "styled-components";
import FormComponent from "../simple/FormComponent";
import globals from "../siteStyle";
import ErrorBoundary from "./ErrorBoundary";
import Media from "react-media";
const { xs } = globals;
const WordCount = styled.div`
  display: flex;
  color: #848484;
  font-size: 12px;
  font-style: italic;
  line-height: 15px;
  justify-content: ${props => (props.left ? "flex-start" : "flex-end")};
  text-align: ${props => (props.left ? "left" : "right")};
  margin-top: 8px;
  @media (max-width: ${xs}px) {
    margin-top: 3px;
  }
  &:before {
    visibility: hidden;
    display: block;
    height: 0;
    width: 0;
    content: "";
    clear: both;
  }
  &:after {
    visibility: hidden;
    display: block;
    height: 0;
    width: 0;
    content: "";
    clear: both;
  }
`;
class WordCountFormElement extends React.Component {
  state = {
    text: this.props.text || this.props.value || "",
    displayTooltip: false
  };

  isMax = text => {
    return text.length <= this.props.maxValue;
  };
  componentWillReceiveProps(nextProps) {
    if (this.state.text !== nextProps.value) {
      this.setState({ text: nextProps.value });
    }
  }
  onChange = e => {
    const text = e.target.value;
    if (!!this.props.maxValue) {
      if (text.length <= this.props.maxValue) {
        this.setState(state => {
          return { ...state, text };
        });
      }
    } else {
      this.setState(state => {
        return { ...state, text };
      });
    }
  };
  onFocus = e => {
    this.setState(state => ({ ...state, displayTooltip: true }));
  };
  onBlur = e => {
    const { updateText, onChange = () => {} } = this.props;
    const updateText2 = !!updateText ? updateText : onChange;
    if (!!updateText2) {
      updateText2(this.state.text);
    } else {
      onChange(e, e.target.value);
    }
    setTimeout(() => {
      this.setState(state => ({ ...state, displayTooltip: false }));
    }, 200);
  };
  render() {
    const {
      updateText,
      value,
      maxValue,
      minValue,
      displayMinValue = true,
      tooltip,
      defaultValue,
      ...rest
    } = this.props;
    let remaining = {};
    if (!!defaultValue) {
      remaining.defaultValue = defaultValue;
    }
    let tootlTipDisplay = (
      <Media query={`(max-width: ${xs}px)`}>
        {matches => (matches ? null : this.state.displayTooltip && tooltip)}
      </Media>
    );
    return (
      <ErrorBoundary>
        <FormComponent errorMarginTop={25} {...rest}>
          {this.props.children({
            value: this.state.text,
            onChange: this.onChange,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            isMax: this.isMax,
            ...remaining
          })}
          {Boolean(tooltip) ? tootlTipDisplay : null}
          {displayMinValue &&
            minValue && <WordCount left>min. {minValue}</WordCount>}
          {maxValue &&
            !!this.state.text && (
              <WordCount>
                <span>
                  {this.state.text.length} / {maxValue} max
                </span>
              </WordCount>
            )}
        </FormComponent>
      </ErrorBoundary>
    );
  }
}

export default WordCountFormElement;

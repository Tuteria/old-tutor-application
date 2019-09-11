import React from "react";
import styled from "styled-components";
import Icon from "../simple/Icon";
import AutoSelect from "../simple/AutoSelect";
import global from "../siteStyle";
import includes from "lodash/includes";
const { xs } = global;
export { AutoSelect, Icon, xs };
const Div = styled.div`
  ${props => props.css};
`;
export const SearchContainer = ({
  Component = Div,
  icon,
  children,
  onChange,
  values,
  ...rest
}) => (
  <Component {...rest}>
    {children(values, onChange)}
    {icon ? <Icon name={icon} /> : null}
  </Component>
);

export class StandaloneSearchInput extends React.Component {
  state = {
    result: this.props.defaultValue || []
  };

  onChange = value => {
    this.setState(state => {
      let result = state.result;
      let index = result.findIndex(x => x === value);
      if (index > -1) {
        result = result.filter(x => x !== value);
      } else {
        result.push(value);
      }
      if (!!this.props.onUpdate) {
        this.props.onUpdate(result);
      }
      return { ...state, result };
    });
  };
  render() {
    const {
      inputRender,
      render,
      values,
      onChange,
      error = false,
      ...rest
    } = this.props;
    let result = this.state.result;
    let NewOnChange = this.onChange;
    if (result.length === 0) {
      result = rest.defaultValue;
      NewOnChange = onChange;
    }
    return (
      <div>
        <SearchContainer
          values={values.filter(x => !includes(this.state.result, x))}
          onChange={NewOnChange}
          {...rest}
        >
          {(values, onChangeF) => {
            return inputRender(values, onChangeF, error);
          }}
        </SearchContainer>
        {render(result, NewOnChange)}
      </div>
    );
  }
}
export default StandaloneSearchInput;

import React from "react";
import styled, { css } from "styled-components";
import { Checkbox } from "../simple/CheckInput";
import FormComponent from "../simple/FormComponent";
import { RadioButtonContainer } from "./RadioComponent";
import globals from "../siteStyle";
import includes from "lodash/includes";
const { xs } = globals;
// const CheckboxGridContainer = styled(RadioButtonContainer)`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   grid-column-gap: 15px;
//   grid-row-gap: 15px;
//   @media (max-width: ${xs}px) {
//     grid-template-columns: repeat(1, 1fr);
//   }
// `;
const CheckboxContainer = styled(RadioButtonContainer)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => props.direction};
  /* justify-content: space-between; */
  @media (max-width: ${xs}px) {
    //flex-direction: column;
    & > a {
      margin-left: 0 !important;
      margin-right: 0 !important;
      margin-bottom: 10px;
    }
  }
  & > a {
    margin-left: 5px;
    margin-right: 5px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;

const A = styled.a`
  ${props => props.css};
`;
class SpecialCheckbox extends React.Component {
  state = {
    checked: false
  };
  onClick = () => {
    this.onChecked(!this.state.checked);
  };
  onChecked = checked => {
    const { onChange } = this.props;
    this.setState(state => {
      onChange(checked);
      return { ...state, checked };
    });
  };
  onChange = e => {
    const checked = e.target.checked;
    this.onChecked(checked);
  };
  componentDidMount() {
    this.setState({ checked: this.props.checked });
  }
  render() {
    const { label, description, value, text, ...rest } = this.props;
    return (
      <A
        onClick={this.onClick}
        css={css`
          display: flex;
          /* width: 215px; */
          border: 1px solid #dce0e0;
          border-radius: 2px;
          padding: 14px;
          cursor: pointer;
          flex: 1 33%;
          @media (max-width: ${xs}px) {
            flex: 1;
          }
          &:hover {
            text-decoration: none;
          }
          & label {
            margin-right: 0;
          }
          & h3 {
            font-size: 16px;
            color: #484848;
            line-height: 20px;
            margin-top: 0;
            margin-bottom: 3px;
          }
          & p {
            color: #767676;
            font-size: 14px;
            line-height: 20px;
          }
        `}
      >
        <Checkbox
          onChange={this.onChange}
          checked={this.state.checked}
          value={value.text}
          {...rest}
        />
        <div>
          <h3>{text}</h3>
          <p>{description}</p>
        </div>
      </A>
    );
  }
}
const checkProps = {
  innerColor: "#36B37E",
  border: "transparent",
  checkSize: `height: 20px; width: 20px;`,
  checkStyle: `left: 6px; top: 2px; width: 5px; height: 9px;`,
  textStyle: `color:#484848;font-size: 17px; padding-top: 0;`
};
const formatOption = (x, key = "value") => (!!x[key] ? x[key] : x);

class MultiselectComponentUncontrolled extends React.Component {
  getValues = () => {
    const { options } = this.props;
    return options.map(x => (!!x.value ? x.value : x));
  };
  onChange = val => {
    const key = !!val.description ? "text" : "value";
    const value = formatOption(val, key);
    const { onChange } = this.props;
    let r = this.props.value || [];
    if (includes(r, value)) {
      r = r.filter(x => x !== value);
    } else {
      r.push(value);
    }
    onChange(r, val);
  };

  isChecked = val => {
    const key = !!val.description || !!val.level ? "text" : "value";
    let values = this.props.value || [];
    // console.log(val)
    if (!!val.level) {
    }
    // console.log(values)
    // return values.findIndex(x=>x[key]=== val[key]) > -1
    return includes(
      values.map(x => formatOption(x, key)),
      formatOption(val, key)
    );
    // return values.includes(formatOption(val, key));
  };
  render() {
    const {
      options,
      isChecked,
      onChange,
      direction = "row",
      ...rest
    } = this.props;
    const UseGrid = CheckboxContainer;
    return (
      <FormComponent {...rest}>
        <UseGrid direction={direction} className="multi-select">
          {options.map((option, index) => {
            const description = option.description;
            const Component = !!description ? SpecialCheckbox : Checkbox;
            return (
              <Component
                key={"online_experience" + index}
                {...checkProps}
                onChange={() => this.onChange(option)}
                text={formatOption(option, "text")}
                name="online_experience"
                value={formatOption(option)}
                checked={this.isChecked(option)}
                description={description}
              />
            );
          })}
        </UseGrid>
      </FormComponent>
    );
  }
}
export const MultiselectComponent = MultiselectComponentUncontrolled;
// export class MultiselectComponent extends React.Component {
//   state = {
//     values: this.props.value || []
//   };
//   componentDidMount(){
//     this.setState({values:this.props.value||[]})
//   }
//   getValues = () => {
//     const { options } = this.props;
//     return options.map(x => (!!x.value ? x.value : x));
//   };
//   onChange = val => {
//     const key = !!val.description ? "text" : "value";
//     const value = formatOption(val, key);
//     const { onChange } = this.props;
//     this.setState(state => {
//       let r = state.values;
//       if (r.includes(value)) {
//         r = r.filter(x => x !== value);
//       } else {
//         r.push(value);
//       }
//       onChange(r, val);
//       return { ...state, values: r };
//     });
//   };
//   isChecked = val => {
//     const key = !!val.description ? "text" : "value";
//     let values = this.state.values;

//     return values.includes(formatOption(val, key));
//   };
//   render() {
//     const {
//       options,
//       isChecked,
//       onChange,
//       direction = "row",
//       ...rest
//     } = this.props;
//     const UseGrid = CheckboxContainer;
//     return (
//       <FormComponent {...rest}>
//         <UseGrid direction={direction}>
//           {options.map((option, index) => {
//             const description = option.description;
//             const Component = !!description ? SpecialCheckbox : Checkbox;
//             return (
//               <Component
//                 key={"online_experience" + index}
//                 {...checkProps}
//                 onChange={() => this.onChange(option)}
//                 text={formatOption(option, "text")}
//                 name="online_experience"
//                 value={formatOption(option)}
//                 checked={this.isChecked(option)}
//                 description={description}
//               />
//             );
//           })}
//         </UseGrid>
//       </FormComponent>
//     );
//   }
// }

import React from "react";
import styled from "styled-components";
import Downshift from "downshift";
import Input, { InputWithIcon } from "./Input";
import { UlStyle, LiStyle } from "./Select";
// import { graphql } from "react-apollo";
// import gql from "graphql-tag";
import includes from "lodash/includes";
import FormComponent from "./FormComponent";
import { FormValidationContext } from "../form";

const StyledMenu = styled.ul`
  ${UlStyle};
`;
const StyledMenuItem = styled.li`
  ${LiStyle};
`;
class TypeAhead extends React.Component {
  state = {
    inputValue: "",
    resultSet: []
  };
  updateState = props => {
    this.setState({ inputValue: props.value });
  };
  updateResultSet = val => {
    if (!!val) {
      if (
        val.length !== this.state.resultSet.length &&
        val.length > 0 &&
        JSON.stringify(this.state.resultSet.slice().sort()) !==
          val.slice().sort()
      ) {
        this.setState({ resultSet: val });
      }
    }
  };
  componentDidMount() {
    this.updateState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.updateState(nextProps);
    }
  }
  render() {
    const {
      onSelect = () => {},
      autoFocus = false,
      displayIcon = false
    } = this.props;
    const onClear = () => {
      this.setState({ inputValue: "" });
    };
    return (
      <div>
        <Downshift
          onStateChange={param => {
            param.inputValue && this.setState({ inputValue: param.inputValue });
            this.props.onChange(param.inputValue, this.state.resultSet);
            onSelect(param, onClear);
          }}
          selectedItem={this.state.inputValue}
          onChange={this.props.onChange}
          ref={this.props.ref}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
          }) => {
            // const filteredItems = this.props.items.filter(
            //   i =>
            //     !inputValue ||
            //     i.toLowerCase().includes(inputValue.toLowerCase())
            // );
            const itemDisplay = (item, index) => (
              <StyledMenuItem
                {...getItemProps({
                  key: item,
                  index,
                  item,
                  style: {
                    backgroundColor:
                      highlightedIndex === index ? "lightgray" : "white",
                    fontWeight: selectedItem === item ? "bold" : "normal"
                  }
                })}
              >
                {item}
              </StyledMenuItem>
            );
            const InputComponent = displayIcon ? InputWithIcon : Input;
            return (
              <div style={{ position: "relative" }}>
                <InputComponent
                  icon_name={isOpen ? "chevron-up" : "chevron-down"}
                  placeholder={this.props.placeholder}
                  disabled={this.props.disabled}
                  autoFocus={autoFocus}
                  {...getInputProps()}
                />
                {this.props.render(
                  { isOpen, inputValue, itemDisplay },
                  this.updateResultSet
                )}
              </div>
            );
          }}
        </Downshift>
      </div>
    );
  }
}

const NewTypeAhead = ({
  items,
  label,
  errorStyle = "",
  field_name = "",
  css = "",
  ...rest
}) => (
  <FormValidationContext.Consumer>
    {({ onError, onSuccess, errors, updateField }) => {
      return (
        <FormComponent
          errorStyle={errorStyle}
          label={label}
          css={css}
          error={onError(field_name) || rest.error}
          success={onSuccess(field_name)}
          error_message={errors[field_name]}
          noColumn
        >
          <TypeAhead
            {...rest}
            render={({ isOpen, itemDisplay, inputValue }) => {
              const filteredItems = items.filter(
                i =>
                  !inputValue ||
                  includes(i.toLowerCase(), inputValue.toLowerCase())
              );
              return (
                <AutoSuggestList
                  isOpen={isOpen}
                  filteredItems={filteredItems}
                  inputValue={inputValue}
                  itemDisplay={itemDisplay}
                />
              );
            }}
          />
        </FormComponent>
      );
    }}
  </FormValidationContext.Consumer>
);

class LoadData extends React.Component {
  state = {
    loading: false,
    data: []
  };
  onChange = newValue => {
    this.setState({ loading: true });
    this.props
      .getData(newValue)
      .then(data => this.setState({ loading: false, data }))
      .catch(err => this.setState({ loading: false, data: [] }));
  };
  render() {
    return this.props.render(this.state, this.onChange);
  }
}

type GraphqlAutoSuggestType = {
  query: string,
  graphqlKey: string,
  transformation: Function,
  extraParams: Function
};

// export const GraphqlAutoSuggest = ({
//   query,
//   graphqlKey,
//   transformation = (r = []) => r,
//   extraParams = e => ({ e }),
//   ...rest
// }: GraphqlAutoSuggestType) => (
//   <TypeAhead
//     {...rest}
//     render={({ isOpen, itemDisplay, inputValue }, updateResultSet) => {
//       const Component = graphql(gql(query), {
//         options: ({ inputValue }) => ({
//           variables: { ...extraParams(inputValue) }
//         }),
//         props: ({ ownProps, data }) => {
//           return {
//             isOpen: !data.loading && isOpen,
//             filteredItems: transformation(data[graphqlKey]),
//             graphqlItems: data[graphqlKey]
//           };
//         }
//       })(AutoSuggestList);
//       return (
//         <Component
//           {...{ inputValue }}
//           itemDisplay={itemDisplay}
//           runFunc={true}
//           resultListCallback={updateResultSet}
//         />
//       );
//     }}
//   />
// );

export default NewTypeAhead;

export class AsyncAutoSelect extends React.Component {
  state = {
    data: this.props.data || []
  };
  onChange = (result, value) => {
    if (this.props.getData) {
      this.props.getData(result).then(data => this.setState({ data }));
    }
    this.props.onChange(result, value);
  };
  render() {
    const {
      data,
      controlled = true,
      options = [],
      getData,
      onChange,
      ...rest
    } = this.props;
    return (
      <NewTypeAhead
        {...rest}
        onChange={this.onChange}
        items={controlled ? this.state.data : options}
      />
    );
  }
}

type AutoSuggestListType = {
  filteredItems: Array<any>,
  inputValue: string,
  itemDisplay: Function,
  isOpen: boolean,
  resultListCallback: Function
};

const AutoSuggestList = ({
  filteredItems,
  inputValue,
  itemDisplay,
  isOpen,
  runFunc = false,
  resultListCallback = () => {},
  graphqlItems
}: AutoSuggestListType) => {
  if (runFunc && !!graphqlItems) {
    if (graphqlItems.length > 0) {
      resultListCallback(graphqlItems);
    }
  }
  return isOpen ? (
    <StyledMenu
      id="style-1"
      style={{
        display:
          filteredItems.length > 0 && inputValue.trim().length > 0 ? "" : "none"
      }}
    >
      {filteredItems.map((item, index) => itemDisplay(item, index))}
    </StyledMenu>
  ) : null;
};

// @flow
import React from "react";
import AutoSelect from "../../simple/AutoSelect";
import styled from "styled-components";
import globals from "../../siteStyle";
import Media from "react-media";
import Input from "../../simple/Input";
import StandaloneSearchInput from "../../form/SearchInputComponent";
const { xs } = globals;

export const Search = styled.div`
  position: relative;
  margin-bottom: 22px;
  margin-top: 20px;

  @media (max-width: ${xs}px) {
    margin-top: 14px;
  }
  &::placeholder {
  }
  & ${Input} {
    height: 64px;
    font-size: 19px;
    padding: 8px 0 8px 24px;
    line-height: 21px;
    &::placeholder {
      color: #b2b2b2;
    }
    @media (max-width: ${xs}px) {
      height: 40px;
      font-size: 15px;
      padding: 9px 0 10px 16px;
    }
  }
  & i,
  svg {
    position: absolute;
    right: 7px;
    top: -10px;
    font-size: 1.5em;
    color: #c9cacd;
    @media (min-width: ${xs + 1}px) {
      top: 25%;
      right: 2%;
    }
    @media (max-width: ${xs}px) {
      right: 11px;
      top: 11px;
      font-size: 1.1em;
    }
  }
  & ul {
    text-align: left;
  }
`;
class SearchText extends React.Component {
  state = {
    value: ""
  };
  render() {
    const {
      placeholder,
      subjects = [],
      onSelect,
      mapFunc = x => x.name
    } = this.props;
    return (
      <AutoSelect
        value={this.state.value}
        promptText={placeholder}
        placeholder={placeholder}
        autoFocus={true}
        onChange={value => {}}
        onSelect={(params, onClear) => {
          if (params.selectedItem) {
            onSelect(params.selectedItem);
            onClear();
          }
        }}
        items={subjects.map(mapFunc)}
      />
    );
  }
}
type SubjectO = {
  name: string,
  slug: string
};
export function reusableSelectedSubject(
  subject: SubjectO,
  selectedSubjects: Array<SubjectO>,
  callback: Function
) {
  let result = [];
  let index = selectedSubjects.findIndex(x => x.name === subject.name);
  if (index > -1) {
    result = selectedSubjects.filter(x => x.name !== subject.name);
  } else {
    result = [
      ...new Set([
        ...selectedSubjects,
        // { name: subject.text, slug: subject.slug }
        subject
      ])
    ];
  }
  callback(result);
}

const SearchBar = ({
  selectedSubjects,
  onSelect,
  dispatch,
  addSingleSubject,
  afterClick = () => {},
  allSubjects,
  ...rest
}) => {
  const subjects = allSubjects(selectedSubjects);
  const newOnSelect = onSelect || addSingleSubject;
  const onChange = subject => {
    const fullSubject = subjects.find(x => x.name === subject);
    reusableSelectedSubject(
      // { text: fullSubject.name, slug: fullSubject.slug },
      fullSubject,
      selectedSubjects,
      newOnSelect
    );
    afterClick();
  };
  const mapFunc = x => x;
  return (
    <StandaloneSearchInput
      inputRender={values => (
        <Media query={`(max-width: ${xs}px)`}>
          {matches =>
            matches ? (
              <SearchText
                mapFunc={mapFunc}
                subjects={values}
                onSelect={onChange}
                placeholder="Search for subjects here "
              />
            ) : (
              <SearchText
                mapFunc={mapFunc}
                onSelect={onChange}
                subjects={values}
                placeholder="Type here to search for what you want to teach "
              />
            )
          }
        </Media>
      )}
      onChange={onChange}
      Component={Search}
      icon="search"
      values={subjects.map(x => x.name)}
      defaultValue={selectedSubjects.map(x => x.name)}
      render={values => {}}
    />
  );
};

export default SearchBar;

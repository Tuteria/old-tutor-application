import React from "react";
import styled from "styled-components";
import SkillIcon from "./Icons";
import Media from "react-media";
import globals, { spacing } from "../../siteStyle";
import Icon from "../../simple/Icon";
import { Div } from "../../primitives";
import { CheckboxComponent } from "../../form";
import { Text } from "../../simple/Text";
import { reusableSelectedSubject } from "./SearchBar";
import includes from "lodash/includes";
const { xs } = globals;
const DropdownContainter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: ${props => props.paddingBottom || "20px"};
  padding-top: ${props => props.paddingBottom || "20px"};
  border-bottom: 1px solid #f0f0f0;
  border-top: ${props => (props.borderTop ? "2px solid #f0f0f0" : "")};
  opacity: ${props => (props.opened ? 1 : 0)};
  transition: opacity 0.25s ease-in-out;
  & > svg {
    margin-right: ${spacing.m};
  }
  & > label {
    padding-left: 46px;
  }
  & .text {
    position: relative;
    width: 100%;
    & > p {
      font-size: 19px;
      margin-bottom: 0;
    }

    & > i {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  @media (max-width: ${xs}px) {
    border-bottom: 0;
  }
`;
const DropdownItem = styled.div`
  cursor: pointer;
  background-color: ${props => (props.active ? "#E3EDF8" : "#ffffff")};
`;
class DropdownChildren extends React.Component {
  componentDidMount() {
    this.props.updateHeight(this.node.offsetHeight);
  }
  render() {
    return (
      <Div
        innerRef={node => {
          this.node = node;
        }}
      >
        {this.props.children}
      </Div>
    );
  }
}

const BaseStyle = styled.div`
  height: ${props =>
    props.height ? props.dimensions.open : props.dimensions.closed};
  border: ${props => (props.noDisplay ? "none" : "1px solid #dce0e0")};
  margin-bottom: 15px;
  width: 100%;
  overflow: hidden;
  transition: height 0.25s linear;
  @media (max-width: ${xs}px) {
    // height: 100%;
    margin-bottom: 0;
    border-top: 0;
  }
`;
const InnerBaseStyle = styled.div`
  ${props => "height: " + props.open};
  width: 100%;
  opacity: 1;
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: ${xs}px) {
    overflow-y: hidden;
    height: auto;
  }
`;
const CategoryItem = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  padding: 26px;
  border: 1px solid #e6e8eb;
  cursor: pointer;
  background-color: ${props => (props.active ? "#E3EDF8" : "#fff")};
  @media (max-width: ${xs}px) {
    padding: 10px 14px;
    align-items: center;
    margin-bottom: 0;
  }
  .svg-inline--fa.fa-w-10 {
    width: ${spacing.m};
  }

  & .category_text {
    margin-left: 28px;
    position: relative;
    width: 100%;
    @media (max-width: ${xs}px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    & h3 {
      font-size: 17px;
      color: ${props => (props.active ? "#0064E6" : "#484848")};
      margin-top: 0;
      text-transform: uppercase;

      @media (max-width: ${xs}px) {
        margin-bottom: 0;
      }
    }
    & p {
      max-width: 500px;
      color: ${props => (props.active ? "#484848" : "")};
      font-size: 17px;

      @media (max-width: ${xs}px) {
        display: none;
      }
    }
    & i {
      position: absolute;
      right: 0;
      top: 50%;

      @media (max-width: ${xs}px) {
        top: 0;
      }
    }
  }
`;
class HeightHelper extends React.Component {
  state = {
    height: 0
  };
  componentDidMount() {
    this.setState({ height: this.node.clientHeight });
  }
  render() {
    return <Div innerRef={i => (this.node = i)}>{this.props.children}</Div>;
  }
}
class ReusableDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.node = null;
  }
  componentDidMount() {
    this.loadState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== undefined) {
      if (!this.state.opened || !nextProps.active) {
        this.loadState(nextProps);
      }
    }
  }
  loadState(props) {
    const { active = false } = props;
    this.setState({ opened: active });
  }
  toggleState = () => {
    const { updateParent = () => {}, disableClick = false } = this.props;
    if (!disableClick) {
      this.setState({ opened: !this.state.opened });
      updateParent();
    }
  };
  render() {
    const height = this.node ? this.node.offsetHeight : "322px";
    const { closed = "64px", open, noDisplay = false } = this.props;
    const dimensions = { open: open || height, closed };
    return (
      <BaseStyle
        noDisplay={noDisplay}
        innerRef={i => (this.node = i)}
        id="style-1"
        height={this.state.opened}
        dimensions={dimensions}
      >
        <InnerBaseStyle open={open || height}>
          <DropdownItem active={false} onClick={this.toggleState}>
            {this.props.head}
          </DropdownItem>
          {this.state.opened ? this.props.children(this.state.opened) : null}
        </InnerBaseStyle>
      </BaseStyle>
    );
  }
}

export class SelectDropdown extends React.Component {
  state = { height: 320 };
  updateSelectedSubjects = subject => {
    const { updateSubjects, selectedSubjects } = this.props;
    let exclude = selectedSubjects
      .filter(x => !!x.taken || !!x.detail)
      .map(x => x.name);
    if (!includes(exclude, subject.name)) {
      reusableSelectedSubject(subject, selectedSubjects, updateSubjects);
    }
  };
  updateHeight = height => {
    this.setState({ height });
    console.log(height);
    this.props.updateHeight(height);
  };
  selectedIndex = subject => {
    return this.props.selectedSubjects.findIndex(x => x.name === subject.name);
  };
  renderChildren(height = "320px", closed = "64px") {
    const { subjects = [] } = this.props;
    return (
      <ReusableDropdown
        active={this.props.active}
        updateParent={this.props.updateParent}
        disableClick={this.props.disableClick}
        open={height}
        closed={closed}
        head={
          <DropdownContainter paddingBottom="5px" opened={true} remove>
            <SkillIcon icon={this.props.icon} height={30} />
            <div className="text">
              <Text
                css={`
                  font-weight: bold;
                `}
              >
                {this.props.subcategory}
              </Text>
            </div>
            <Div
              css={`
                @media (max-width: ${xs}px) {
                  display: none;
                }
              `}
            >
              <Icon width="48" strokeWidth="1.5" name="chevron-down" />
            </Div>
          </DropdownContainter>
        }
      >
        {opened => (
          <DropdownChildren updateHeight={this.updateHeight} opened={opened}>
            {subjects.map((subject, index) => (
              <Div
                key={index}
                css={`
                  cursor: pointer;
                `}
              >
                <DropdownContainter borderTop={index === 0} opened={opened}>
                  <CheckboxComponent
                    key={index}
                    big
                    checkboxCss={`margin-left:${spacing.m};`}
                    onChange={() => {
                      this.updateSelectedSubjects(subject);
                    }}
                    checked={this.selectedIndex(subject) > -1}
                    text={subject.name}
                  />
                </DropdownContainter>
              </Div>
            ))}
          </DropdownChildren>
        )}
      </ReusableDropdown>
    );
  }
  render() {
    return (
      <Media query={`(max-width: ${xs}px)`}>
        {matches =>
          matches
            ? this.renderChildren(`${this.state.height}px`, "68px")
            : this.renderChildren()
        }
      </Media>
    );
  }
}

export class SubCategories extends React.Component {
  state = {
    currentIndex: -1,
    subcategories: [],
    height: 0
  };
  loadSubCategories(props) {
    const subcategories = props.getSubCategories(props.category);
    let height = 68 * subcategories.length;
    this.setState({ subcategories, height });
    if (!!props.updateHeight) {
      props.updateHeight(height);
    }
  }
  updateHeight = newHeight => {
    let height = newHeight * this.state.subcategories.length;
    this.setState({ height });
    if (!!this.props.updateHeight) {
      this.props.updateHeight(height);
    }
  };
  componentDidMount() {
    this.loadSubCategories(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.category.name !== nextProps.category.name) {
      this.loadSubCategories(nextProps);
    }
  }
  onClick = (index, active) => {
    this.setState({ currentIndex: index });
  };
  renderSubCategory(x, i, active = true) {
    return (
      <SelectDropdown
        updateParent={() => this.onClick(i, active)}
        active={active ? this.state.currentIndex === i : true}
        key={i}
        updateHeight={this.updateHeight}
        disableClick={this.props.disableClick}
        icon={x.icon}
        subjects={this.props.getSubjects(x)}
        subcategory={x.subcategory}
        updateSubjects={this.props.updateSubjects}
        selectedSubjects={this.props.selectedSubjects}
      />
    );
  }
  render() {
    return (
      <div>
        {this.state.subcategories.map((x, i) => {
          return (
            <Media key={i} query={`(max-width: ${xs}px)`}>
              {matches =>
                matches
                  ? this.renderSubCategory(x, i, false)
                  : this.renderSubCategory(x, i)
              }
            </Media>
          );
        })}
      </div>
    );
  }
}
function getIcon(name) {
  let options = {};
}
export class Category extends React.Component {
  state = { height: 70, opened: false };
  updateHeight = height => {
    this.setState({ height });
  };
  onClick = matches => {
    this.props.onClick(this.props.index, matches);
    this.setState({ opened: !this.state.opened });
  };
  render() {
    const { icon = "volleyball", name, text, active, canShow } = this.props;
    const rendered = [
      <Media key={1} query={`(max-width: ${xs}px)`}>
        {matches =>
          matches ? (
            <SkillIcon width="32px" height="32px" icon={icon} />
          ) : (
            <SkillIcon icon={icon} />
          )
        }
      </Media>,
      <div key={2} className="category_text">
        <h3>{name}</h3>
        <p>{text}</p>
      </div>,
      <Media query={`(max-width: ${xs}px)`}>
        {matches =>
          matches ? (
            <Icon
              width="48"
              strokeWidth="1.5"
              name={this.state.opened ? "chevron-up" : "chevron-down"}
            />
          ) : (
            <Icon name="chevron-right" />
          )
        }
      </Media>
    ];

    return (
      <Media query={`(max-width: ${xs}px)`}>
        {matches =>
          matches ? (
            <ReusableDropdown
              ref={i => (this.node = i)}
              open={
                active
                  ? this.state.height > 0
                    ? `${this.state.height + 70}px`
                    : `auto`
                  : "70px"
              }
              // open={active ? `${this.state.height}px` : "99px"}
              noDisplay={true}
              closed="70px"
              head={
                <CategoryItem
                  active={active}
                  onClick={() => this.onClick(matches)}
                >
                  {rendered}
                </CategoryItem>
              }
            >
              {opened => (
                <Media query={`(max-width: ${xs}px)`}>
                  {matches =>
                    matches ? (
                      <div>
                        {canShow ? (
                          <div>
                            <SubCategories
                              getSubCategories={this.props.getSubCategories}
                              ref={subNode => {
                                this.subNode = subNode;
                              }}
                              getSubjects={this.props.getSubjects}
                              category={name}
                              disableClick
                              updateHeight={this.updateHeight}
                              updateSubjects={this.props.updateSubjects}
                              selectedSubjects={this.props.selectedSubjects}
                            />
                          </div>
                        ) : null}
                      </div>
                    ) : null
                  }
                </Media>
              )}
            </ReusableDropdown>
          ) : (
            <CategoryItem active={active} onClick={() => this.onClick(false)}>
              {rendered}
            </CategoryItem>
          )
        }
      </Media>
    );
  }
}

export default Category;

class DivHeight extends React.Component {
  componentDidMount() {
    this.props.updateHeight(this.node.offsetHeight);
  }
  render() {
    return <div ref={node => (this.node = node)}>{this.props.children}</div>;
  }
}

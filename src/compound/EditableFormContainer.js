import React from "react";
import styled, { css } from "styled-components";
import globals, { spacing } from "../siteStyle";
import { DefaultButton, SecondaryButton } from "../simple/Button";
import Icon from "../simple/Icon";

import Media from "react-media";
import { Div } from "../primitives";
import { Heading, Text } from "../simple/Text";
import { font_size } from "../design-systems";
const { siteText, xs } = globals;

const textFont = "17px";
const leadingColor = "#0064e6";

export const BoardWrap = styled.div`
  background-color: #f7f9fa;
  position: relative;
  display: flex;
  justify-content: ${props => props.expForm || "space-between"};

  align-items: center;
  @media (max-width: ${xs}px) {
    background-color: rgba(227, 237, 248, 0.5);
    border: ${props => (props.expForm ? "1px solid #cfe0f6" : 0)};
    height: auto;
    margin-bottom: ${props => props.expForm || 0};

    & .board-icons {
      width: 6% !important;
    }
  }
  & .board-drag {
    color: #96bded;
    margin-right: ${props => (props.expForm ? "16px" : "")};
  }

  & .board-details__wrap {
    width: 70%;
    display: flex;
    flex-direction: column;
    & h2 {
      font-size: ${textFont};
      margin-bottom: 0;
      color: ${leadingColor};
    }
    & p {
      font-size: 15px;
      font-weight: bold;
      @media (max-width: ${xs}px) {
        color: #47525d;
        font-size: 12px;
      }
    }
    & .board-details {
    }

    & .board-details:first-child {
    }
    @media (max-width: ${xs}px) {
      width: 100%;
      padding: ${spacing.m};
    }
  }

  & .board-icons {
    color: ${leadingColor};
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      cursor: pointer;
    }
    ${props => (props.expForm ? "display:none;" : "")};
    @media (max-width: ${xs}px) {
      display: block;
      position: absolute;
      right: 0;
      padding-right: ${spacing.m};
    }
    & svg .nc-icon-wrapper polyline {
      stroke: #0064e6;
    }
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  margin-top: ${spacing.m};
  & button {
    &:first-child {
      margin-right: ${spacing.s};
    }
    &:last-child {
      margin-left: ${spacing.s};
    }
  }
  @media (max-width: ${xs}px) {
    justify-content: space-between;
    & .inner-wrap {
      justify-content: space-between;
      display: flex;
    }
  }
`;
const BoardWrapper = ({ children, expForm, onClick }) => (
  <Media query={`(max-width: ${xs}px)`}>
    {matches =>
      matches ? (
        <BoardWrap onClick={onClick} expForm={expForm}>
          {children}
        </BoardWrap>
      ) : (
        <BoardWrap expForm={expForm}>{children}</BoardWrap>
      )
    }
  </Media>
);
export const EditFormWrap = styled.div`
  border: 1px solid #94bdf2;
  background-color: #f7f9fa;
  border-radius: 2px;
  margin-bottom: 24px;
  ${props =>
    Boolean(props.image)
      ? `padding: ${props.isOpen ? spacing.m : 0};
      `
      : `
    padding: ${spacing.l};
  `} & .containingElement {
    @media (max-width: ${xs}px) {
      padding: ${props => (props.isOpen ? spacing.m : 0)};
    }
  }
  @media (max-width: ${xs}px) {
    padding: 0;
    background: #fff;
    border: 1px solid #cfe0f6;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;
const ClickOnMobile = ({ onClick, children }) => {
  return (
    <Media query={`(max-width: ${xs}px`}>
      {matches =>
        matches ? <Div onClick={onClick}>{children}</Div> : children
      }
    </Media>
  );
};
export const RenderImageHeading = ({ image, children }) => (
  <React.Fragment>
    {Boolean(image) && (
      <Div
        css={`
          max-width: 200px;
          img {
            width: 100%;
          }
          @media (max-width: ${xs}px) {
            max-width: 150px;
          }
        `}
      >
        <img src={image} alt="background-1" />
      </Div>
    )}
    {children}
  </React.Fragment>
);
export const ImageBoardWrapper = ({
  isOpen,
  heading,
  subtitle,
  image,
  renderHeading,
  handleEdit,
  handleDelete
}) => {
  return (
    <ClickOnMobile onClick={handleEdit}>
      {
        <Div
          css={`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <Div
            css={`
              display: flex;
              width: 70%;
              align-items: center;
              & > div:last-child {
                padding: ${spacing.l};
                @media (max-width: ${xs}px) {
                  padding: ${spacing.s};
                  ${isOpen
                    ? ""
                    : `
                    padding-top: 0;
                    padding-bottom: 0;
                    `};
                }
              }
              @media (max-width: ${xs}px) {
                width: 100%;
                h1 {
                  font-size: ${font_size.m};
                }
              }
            `}
            className="board-details__wrap"
          >
            {isOpen ? null : heading && subtitle ? (
              <RenderImageHeading {...{ image }}>
                <Div>
                  <Heading className="">{heading}</Heading>
                  <Text>{subtitle}</Text>
                </Div>
              </RenderImageHeading>
            ) : (
              renderHeading()
            )}
          </Div>
          <Div
            css={`
              width: 30%;
              justify-content: space-around;
              align-items: center;
              display: ${isOpen ? "none" : "flex"};
              @media (max-width: ${xs}px) {
                display: none;
              }
              svg {
                cursor: pointer;
              }
            `}
            className="board-icons"
          >
            <Icon
              onClick={handleEdit}
              fill="#0064e6"
              name="pencil"
              className="fa-lg"
            />
            <Icon
              onClick={handleDelete}
              fill="#0064e6"
              name="delete"
              className="fa-lg"
            />
          </Div>
        </Div>
      }
    </ClickOnMobile>
  );
};
export class EditableFormContainer extends React.Component {
  render() {
    const {
      heading,
      subtitle,
      handleEdit = () => {},
      handleDelete,
      image,
      handleSubmit,
      handleCancel,
      children,
      renderHeading = () => {},
      icon,
      isOpen = false
    } = this.props;
    return (
      <EditFormWrap image={image} isOpen={isOpen}>
        {image ? (
          <ImageBoardWrapper
            {...{
              renderHeading,
              icon,
              isOpen,
              heading,
              subtitle,
              image,
              handleEdit,
              handleDelete
            }}
          />
        ) : (
          <BoardWrapper
            expForm={isOpen}
            onClick={isOpen ? handleCancel : handleEdit}
          >
            {icon && <Icon name="arrows-v" className="board-drag fa-2x" />}
            <div className="board-details__wrap">
              {isOpen ? null : heading && subtitle ? (
                <React.Fragment>
                  <h2 className="">{heading}</h2>
                  <p className="">{subtitle}</p>
                </React.Fragment>
              ) : (
                renderHeading()
              )}
            </div>
            <Media query={`(max-width: ${xs}px)`}>
              {matches =>
                matches ? (
                  <div className="board-icons">
                    <Icon name="chevron-down" />
                  </div>
                ) : (
                  <div className="board-icons">
                    <Icon
                      onClick={handleEdit}
                      fill="#0064e6"
                      name="pencil"
                      className="fa-lg"
                    />
                    <Icon
                      onClick={handleDelete}
                      fill="#0064e6"
                      name="delete"
                      className="fa-lg"
                    />
                  </div>
                )
              }
            </Media>
          </BoardWrapper>
        )}
        <div className="containingElement">
          {children}
          {isOpen ? (
            <React.Fragment>
              <ButtonWrap>
                <SecondaryButton onClick={handleSubmit} bgColor="#36B37E">
                  Save Changes
                </SecondaryButton>
                <SecondaryButton outline onClick={handleCancel}>
                  Cancel
                </SecondaryButton>
              </ButtonWrap>
            </React.Fragment>
          ) : null}
        </div>
      </EditFormWrap>
    );
  }
}

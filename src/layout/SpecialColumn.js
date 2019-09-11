import React from "react";
import styled, { css } from "styled-components";
import globals from "../siteStyle";
import ErrorBlock from "../simple/ErrorBlock";
import { Div } from "../primitives/index";
import { FormValidationContext } from "../form";
export const xs = globals.xs;
const shared = css`
  box-sizing: border-box;
  display: flex;
  float: left;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  @media (max-width: ${globals.xs}px) {
    flex-direction: column;
  }
`;

// const SpecialColumn = styled(Column) `
const SpecialColumn = styled.div`
  ${shared} & > div {
    @media (min-width: ${globals.xs}px) {
      // flex-grow: 1;
      width: ${props => props.childWidth || 49}%;
      // border: 15px solid transparent;
      border-bottom: 0;
      border-top: 0;
      position: relative;
      //   &::before {
      //   content: "";
      //   border: 1px solid transparent;
      //   display: block;
      //   width: 100%;
      //   height: 100%;
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   z-index: -1;
      // }
      & div.error {
        display: none;
      }
    }
  }
  & + div.c-errmessage {
    margin-top: -30px;
    margin-bottom: 10px;
    @media (max-width: ${globals.xs}px) {
      display: none;
    }
  }
  & input {
    width: 91%;
    width: -webkit-fill-available;
    @media (max-width: ${xs}px) {
      width: 92.5%;

      width: -webkit-fill-available;
    }
  }
  ${props =>
    css`
      ${props.css};
    `};
`;

export const Special3Column = styled.div`
  /* padding-left: 15px;
  padding-right: 15px; */
  & .db-container {
    display: flex;
    & .select {
      position: relative;
      border: 16px solid #fbf9fb;
      &: last - child {
        border: 0px;
      }
      &:: before {
        content: "";
        border: 1px solid #fbf9fb;
        display: block;
        width: 100 %;
        height: 100 %;
        position: absolute;
        top: 0;
        left: 0;
        z: -1;
      }
    }
    & + .error {
      margin: 10px;
    }
  }
`;
export default SpecialColumn;

export const FormFieldsContainer = ({
  children,
  cssProps = "",
  field_name = "",
  condition = false,
  custom_error_message = "",
  extraCss = "",
  ...rest
}) => (
  <FormValidationContext.Consumer>
    {({ onError, errors }) => {
      return (
        <React.Fragment>
          <SpecialColumn
            css={`
              float: none;
              + div.c-errmessage {
                margin-top: 0px;
                margin-bottom: ${cssProps};
              }
              @media (max-width: ${xs}px) {
                .error {
                  margin-bottom: 10px;
                }
              }
              ${!!cssProps
                ? `
                  margin-bottom: ${cssProps};
                  @media(max-width: ${xs}px){
                    margin-bottom: 0;
                    & > div, > .select{
                      margin-bottom: ${cssProps};
                    }
                  }`
                : ""};
              ${extraCss};
            `}
            {...rest}
          >
            {children}
          </SpecialColumn>
          {onError(field_name) || !!condition ? (
            <div className="c-errmessage">
              <ErrorBlock>
                {errors[field_name] || custom_error_message}
              </ErrorBlock>
            </div>
          ) : null}
        </React.Fragment>
      );
    }}
  </FormValidationContext.Consumer>
);

import React from "react";
import styled from "styled-components";

const CheckBoxStyle = styled.div`
  display: flex;
  align-items: center;

  & .checkbox-input {
    position: absolute;
    opacity: 0;

    & + label {
      position: relative;
      padding: 0;
      color: #47525d;
      font-size: 17px;
      font-weight: 300;
      line-height: 21px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    & + label:before {
      content: "";
      margin-right: 10px;
      margin-bottom: 0;
      display: inline-block;
      vertical-align: text-top;
      width: 24px;
      height: 24px;
      background: #fff;
      border: 1px solid #eee;
    }

    &:hover + label:before {
      outline: 1px solid #36b37e;
    }

    &:focus + label:before {
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
    }

    &:checked + label:before {
      background: #36b37e;
    }

    &:checked + label:after {
      content: "";
      position: absolute;
      left: 6px;
      top: 11px;
      background: white;
      width: 3px;
      height: 3px;
      box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white,
        4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
      transform: rotate(45deg);
    }
  }
`;

export const CheckBox = ({ children }) => (
  <CheckBoxStyle>
    <input id="checkbox-input" type="checkbox" className="checkbox-input" />
    <label htmlFor="checkbox-input">{children}</label>
  </CheckBoxStyle>
);

import styled, { css } from "styled-components";
import { PrimaryButton } from "../simple/Button";
import globals from "../siteStyle";
import Content from "./Content";
const { xs } = globals;
export const genericStyle = css`
  border: 2px solid #dce0e0;
  width: 65%;
  margin-right: auto;
  margin-left: auto;
  padding: 60px 67px 67px;
  margin-bottom: 64px;
  margin-top: 64px;
  color: #47525d;
  background: #fff;
  & p {
    color: #767676;
    margin-bottom: 0;
    margin-top: 0;
  }
  @media (max-width: ${xs}px) {
    width: 100%;
    padding: 44px 10px 42px;
    margin-top: 0;
    border: none;
    margin-bottom: 0;
    padding-left: 24px;
    padding-right: 16px;
  }
`;

const ContentStyle = styled(Content)`
  ${genericStyle};
`;
export const genericTestStyle = css`
  ${genericStyle} display: flex;
  flex-direction: column;
  align-items: center;
  padding: 43px 67px 43px;
  width: 90%;

  @media (max-width: ${xs}px) {
    width: 100%;
    padding: 0;
    background: initial;
  }
  ${props =>
    props.customH2
      ? ""
      : `
  & h2 {
    color: #47525d;
    font-size: 16px;
    line-height: 20px;
    text-transform: uppercase;
    margin-top: 0;

    @media (max-width: ${xs}px) {
      width: 100%;
      border: 1px solid red;
      background-color: #f0f0f0;
      border: 1px solid #f0f0f0;
      padding: 13px 0;
      font-size: 12px;
      text-align: center;
    }
  }
  `} & .test-wrap {
    display: flex;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 51px;

    @media (max-width: ${xs}px) {
      flex-direction: column;
      width: 85%;
    }
    & > div {
      //   border: 1px solid blue;
    }

    &__right {
      padding-left: 56px;

      & h4 {
        margin-top: 0;
      }

      @media (max-width: ${xs}px) {
        padding: 0;
        margin-top: 20px;
      }
    }
  }

  & .test-wrap__right {
    @media (max-width: ${xs}px) {
      display: none;
    }
  }

  & .test-bottom {
    display: flex;
    align-items: center;
    width: 100%;
    width: 90%;
    align-self: flex-start;

    @media (max-width: ${xs}px) {
      width: 100%;
    }

    & .icon-wrap {
      @media (max-width: ${xs}px) {
        display: none;
      }
    }
  }

  & hr {
    border: 1px solid #ebebeb;
    height: 260px;
    margin: 0;
    margin-left: 56px;

    @media (max-width: ${xs}px) {
      display: none;
    }
  }

  & ${PrimaryButton} {
    @media (max-width: ${xs}px) {
      width: 90%;
      margin-bottom: 17px;
    }
  }
`;
export const TestContentStyle = styled(ContentStyle)`
  ${genericTestStyle};
  margin-bottom: 0;
  margin-top: 0;
  padding: 43px 40px 43px;
  @media (max-width: ${xs}px) {
    border: 0;
    background: initial;
    margin-top: 0;
    padding: 0;
    padding-top: 20px;
  }
`;
export default ContentStyle;

import React from "react";
import styled from "styled-components";
import { PrimaryButton } from "../simple/Button";

const ReferralAlert = styled.div`
  font-family: "Circular Std", sans-serif;
  display: flex;
  padding: 24px 24px 24px;
  font-size: 15px;
  background-color: #dcf3f7;
  position: relative;

  & p {
    margin: 0;
    line-height: 24px;
    color: #7b8994;
    font-weight: 300;
    margin-bottom: 16px;
  }
  & button {
    font-size: 17px;
    line-height: 22px;
  }
  & ${PrimaryButton} {
    margin-right: 10px;
    background-color: #219eac;
    border: solid 2px #219eac;
    &:hover {
      background-color: #25afbf;
      border-color: #25afbf;
    }
    &:disabled {
    }
    &:active {
      background-color: #1a7f8b;
    }
  }
`;

const ReferralAlertBadge = styled.span`
  display: inline-block;
  padding: 0;
  font-size: 40px;
  font-weight: 500;
  line-height: 50px;
  color: #219eac;
  text-align: center;
  border: solid 4px #219eac;
  border-radius: 50%;
  height: 50px;
  padding: 2px 10px;
  margin-right: 30px;
`;

export const AlertTitle = styled.h3`
  margin: 0;
  color: #47525d;
  line-height: 24px;
  font-size: 19px;
`;

export const AlertBody = styled.p``;

export default ({ currency, children }) => (
  <ReferralAlert>
    {currency ? <ReferralAlertBadge>{currency}</ReferralAlertBadge> : null}
    <div>{children}</div>
  </ReferralAlert>
);

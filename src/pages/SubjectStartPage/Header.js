import React from "react";
import styled from "styled-components";

const xs = 1024;

export const Heading = styled.div`
  text-align: center;
  margin-bottom: ${props => props.mb || "43px"};

  @media (max-width: ${xs}px) {
    width: 100%;
    margin-bottom: 30px;
  }

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: ${xs}px) {
      flex-direction: column-reverse;
    }
  }
  & h3 {
    display: inline-block;
    font-size: 36px;
    margin-top: 0;
    margin-bottom: 0;
    color: #484848;
    @media (max-width: ${xs}px) {
      font-size: 28px;
      margin-bottom: 8px;
    }
  }
  & b {
    color: #0064e6;
  }
  & img {
    margin-left: 20.5px;
    width: 54px;
    @media (max-width: ${xs}px) {
      margin-left: 0;
      margin-bottom: 8px;
    }
  }
  & p {
    font-size: 24px;
    margin-top: 20px;

    @media (max-width: ${xs}px) {
      font-size: 18px;
    }
  }

  .sub-header {
    color: #484848;
    font-weight: 500;
  }
`;

export default ({ heading, caption, children, icon }) => (
  <div>
    <Heading>
      <div>
        {heading && <h3>{heading}</h3>}
        <img src={`/static/img/skills/${icon}.png`} alt="" />
      </div>
      <p>{caption || children}</p>
    </Heading>
  </div>
);

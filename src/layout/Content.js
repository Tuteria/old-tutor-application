import styled from "styled-components";
import globals from "../siteStyle";
export const xs = 1024;

const { siteText } = globals;

export const Div = styled.div`
  ${siteText};
  margin-bottom: 40px;
  @media (max-width: ${xs}px) {
    margin-bottom: 31px;
  }
  & h2 {
    color: #484848;
    font-size: 28px;
    @media (max-width: ${xs}px) {
      font-size: 20px;
      line-height: 36px;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  & p {
    font-size: 17px !important;
    line-height: 27px !important;
    color: #767676 !important;
    @media (max-width: ${xs}px) {
      font-size: 14px !important;
      line-height: 22px !important;
    }
  }
`;
export default styled.div`
  margin-top: 64px;
  @media (max-width: ${xs}px) {
    margin-top: 25px;
  }
  // display: flex;
  ${siteText} & h2 {
    color: #484848;
    margin-top: 0;
    margin-bottom: 0;
  }
  & p {
    font-size: 15px;
    line-height: 22px;
    margin-top: 0;
    margin-bottom: 13px;
  }
  ${props => props.extraStyle};
`;

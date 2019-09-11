import styled from "styled-components";
const xs = 768;

export const IndexStyle = styled("div")`
  position: absolute;
  width: 100%;
  background-image: url(${props => props.image});
  display: block;
  max-width: 100%;
  background-size: cover;
  height: 110vh;
  max-height: 110vh;
  background-repeat: no-repeat;
  /* margin-top: -104px; Height of the navigation bar */
  z-index: -1;
  @media (max-width: ${xs}px) {
    background-position: 45% 0;
    zoom: 65%;
    height: calc(110vh + 60px);
    max-height: calc(110vh + 60px);
    /* max-height: 700px;
    height: 700px; */
    /* margin-top: -10rem; */
  }
`;

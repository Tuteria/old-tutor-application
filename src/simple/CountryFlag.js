import styled from "styled-components";

const Flag = styled.div`
  width: ${props => props.w}%;
  border: 1px solid #cacaca;
  border-radius: 2px 0 0 2px;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    color: #777777;
    font-size: 16px;
    font-weight: 300;
    line-height: 18px;
  }
  & .country {
    background-image: ${props => `url(${props.image})`};
    height: 20px;
    background-repeat: no-repeat;
  }
`;
// export default SFlag;
export default Flag;

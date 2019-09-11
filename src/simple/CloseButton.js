import styled from "styled-components";

export default styled.button`
  position: absolute;
  right: 16.23px;
  top: 17px;
  border: none;
  background-color: transparent;
  padding: 0;
  & i {
    font-size: 12px;
    font-weight: 300;
    color: #bec5cb;
    line-height: 12px;
    transform: scale(1.5);
  }
  &:hover {
    cursor: pointer;
  }
`;

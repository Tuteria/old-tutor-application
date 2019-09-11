import styled from "styled-components";
const textFont = "17px";
const leadingColor = "#0064e6";

export default styled.div`
  height: 80px;
  border: ${props =>
    props.expForm ? "1px solid transparent" : "1px solid #94bdf2"};
  border-radius: 2px;
  background-color: #f7f9fa;
  display: flex;
  justify-content: ${props => props.expForm || "space-between"};

  align-items: center;
  margin-bottom: 24px;
  padding: ${props => (props.expForm ? "" : "11px 23px")};

  & .board-drag {
    color: #96bded;
    margin-right: ${props => (props.expForm ? "16px" : "")};
  }

  & .board-details__wrap {
    width: 70%;
    display: flex;
    flex-direction: column;

    & .board-details {
      font-size: ${textFont};
      font-weight: bold;
      line-height: 21px;
    }

    & .board-details:first-child {
      color: ${leadingColor};
    }
  }

  & .board-icons {
    color: ${leadingColor};
    width: 15%;
    display: flex;
    justify-content: space-between;

    &:hover {
      cursor: pointer;
    }
  }
`;

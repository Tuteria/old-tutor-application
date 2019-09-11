import styled from "styled-components";
import globals from "../siteStyle";
const { placeholderColor, formComponentStyle } = globals;
// export default styled.textarea`
// ${formComponentStyle}
// width: ${props => (props.width ? props.width : 100)}%;
// height: inherit;
// &::placeholder{
//   color: ${placeholderColor};
// }
// `;
function getBorder(props) {
  if (props.error) {
    return "2px solid #E9411B";
  }
  return "1px solid #C9CACD";
}

const TextArea = styled.textarea`
  ${formComponentStyle} border: ${props => getBorder(props)};
  box-sizing: border-box;
  width: ${props => (props.width ? props.width : 100)}%;
  width: -webkit-fill-available;
  resize: none;
  text-align: initial;
  line-height: 25px;
  height: auto;
  &::placeholder {
    color: ${placeholderColor};
  }
  &:disabled,
  &:hover {
    background-color: #f6f6f6;
    cursor: pointer;
  }
`;

export default TextArea;

import styled from "styled-components";

const Badge = styled.div`
  display: inline-block;
  font-size: 10px;
  font-weight: bold;
  margin-right: 5px;
  border-radius: 2px;
  padding: 2px 5px;
  font-family: "Circular Std", sans-serif;
  color: ${props =>
    props.inverse ? "#fff" : "rgba(" + props.bgColor + ", 1)"};
  background-color: rgba(
    ${props => props.bgColor},
    ${props => (props.inverse ? 1 : 0.1)}
  );
`;

export const DefaultBadge = styled(Badge).attrs({
  bgColor: "71, 82, 93"
})``;
export const PrimaryBadge = styled(Badge).attrs({
  bgColor: "0, 100, 230"
})`
  & span {
    margin: 5px 13px 5px 16px;
    color: #484848;
    font-size: 14px;
    font-weight: 300;
  }
`;

export const DangerBadge = styled(Badge).attrs({
  bgColor: "233, 65, 27"
})``;

export const SuccessBadge = styled(Badge).attrs({
  bgColor: "54, 179, 126"
})``;

export default Badge;

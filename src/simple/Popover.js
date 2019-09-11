import React from "react";
import styled from "styled-components";
import Icon from "./Icon";
import CloseButton from "./CloseButton";
import Badge from "./Badge";
export const PopoverTitle = styled.h3`
  margin: 0;
  display: inline-block;
  color: #47525d;
  line-height: 19px;
  font-size: 15px;
  margin-bottom: 8px;
  & ${Badge} {
    margin-right: 12.5px;
  }
`;
const PopoverLinkBody = styled.div`
  font-size: 15px;
  font-weight: 300;
  vertical-align: middle;
  line-height: 19px;
  & a {
    color: #0064e6;
    font-family: "Circular Std", sans-serif;
    text-decoration: none;
    padding-left: 5px;
    padding-right: 5px;
  }
`;
const Div = styled.div`
  & ${CloseButton} {
    //position: relative;
    display: inline-block;
    float: right;
    margin-bottom: 10px;
  }
  display: inline-block;
`;
export const Popover = styled.div`
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  border: 1px solid #e6e8eb;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(99, 114, 130, 0.15);
  padding: 16px 24px 24px 21.5px;
  font-family: "Circular Std", sans-serif;
  font-size: 15px;
  font-weight: 500;
  width: ${props => props.width || "220px"};
  & p {
    color: #7b8994;
    font-weight: 300;
    line-height: 24px;
    display: inline;
    margin: 0;

    & + a {
      color: #0064e6;
      text-decoration: none;
    }
  }
  & > .fa {
    margin-right: 21px;
    font-size: 18px;
    color: #36b37e;
    vertical-align: top;
  }
  & .arrow {
    ${props => props.direction}:0;
  }
`;
export const PopoverBody = ({ children, link }) => (
  <div>
    <p>{children}</p> {link ? <a href={link.url}>{link.text}</a> : null}
  </div>
);
export const PopoverLinks = ({ children }) => (
  <PopoverLinkBody>{children}</PopoverLinkBody>
);
export default ({
  children,
  onClose,
  icon,
  announcement = false,
  direction,
  ...rest
}) => (
  <Popover {...rest}>
    {icon ? <Icon name={icon} /> : null}
    {announcement ? <div class="arrow" /> : null}
    <Div>
      {onClose ? (
        <CloseButton aria-label="Close">
          <Icon name="times" />
        </CloseButton>
      ) : null}
      {children}
    </Div>
  </Popover>
);

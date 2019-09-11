import React from "react";
import styled from "styled-components";
import logo from "../compound/icons/logo-combined.svg";
import { TabItem } from "../compound/Tabs";
export const NavigationItem = styled(TabItem)`
  font-weight: ${props => (props.active ? "bold" : 500)};
  color: ${props => (props.active ? "#1B2733" : "#8A8A8A")};
  background-color: ${props => (props.active ? "#E3EDF8" : "inherit")};
  padding-top: 15px;
`;
const Navigation = styled.div`
height: 59px;
// transform: scaleY(-1);	
background-color: #FFFFFF;}`;
const Logo = styled.img`
  // height: 20px;
  width: 89px;
  margin-left: 624px;
  margin-top: 20px;
`;

export const NavBar = () => (
  <Navigation>
    <Logo src={logo} />
  </Navigation>
);

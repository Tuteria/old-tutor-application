import React from "react";
import styled from "styled-components";

export default ({ children }) => {
  const Div = styled.div`
    display: flex;
  `;
  const width = 100 / children.length;
  const newChildren = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      width,
      first: index !== 0 && children.length > 1
    })
  );
  return <Div>{newChildren}</Div>;
};

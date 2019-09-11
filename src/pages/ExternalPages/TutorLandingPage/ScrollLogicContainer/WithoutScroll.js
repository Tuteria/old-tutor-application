import React from "react";

export const WithoutScroll = props => {
  const { render = () => {}, children } = props;
  return (
    <div>
      {render(false)}
      {children}
    </div>
  );
};

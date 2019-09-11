import React from "react";
import { InputAddon } from "../simple/InputAddon";

export const InputAddonWrapper = ({
  addonComponent,
  afterText,
  component = InputAddon,
  addOnProps = {},
  ...rest
}) => {
  const Wrapper = !!addonComponent ? component : React.Fragment;
  const { error, success, children, ...others } = rest;
  let wrapperProps = !!addonComponent
    ? {
        addonContent: addonComponent,
        error,
        success
      }
    : {};
  wrapperProps = { ...wrapperProps, ...addOnProps };
  return (
    <Wrapper {...wrapperProps} {...others}>
      {children}
      {!!afterText ? <span className="InputAddon">{afterText}</span> : null}
    </Wrapper>
  );
};

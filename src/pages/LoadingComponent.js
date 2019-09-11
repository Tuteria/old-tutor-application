import React from "react";
export function MyLoadingComponent(props) {
  if (props.pastDelay) {
    return <div> Loading... </div>;
  }
  return null;
}

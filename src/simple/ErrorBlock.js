import React from "react";
import Notification from "./Notification";

export default ({ style, overide = "", ...rest }) => (
  <Notification
    className="error"
    styling={`background-color: transparent;margin-top: -8px !important; padding: 0;${overide}`}
    style={{
      fontSize: 14,
      textAlign: "left",
      // paddingLeft: 16,
      ...style
    }}
    {...rest}
  />
);

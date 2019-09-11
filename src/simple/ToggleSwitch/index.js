import React from "react";
import Toggle from "react-toggle";
import "./style.css";
export default ({ small = false, ...rest }) => <Toggle {...rest} />;

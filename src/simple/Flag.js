import React from "react";
const Flag = ({ name, ...rest }) => <i className={`${name} flag`} {...rest} />;
export default Flag;

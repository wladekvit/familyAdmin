/* eslint-disable no-unused-vars */
import React from "react";
import IconConfig from "./IconConfig";

const Icon = ({ name, ...props }) => {
  const IConfig = IconConfig[name];
  return <IConfig {...props} />
};

export default Icon
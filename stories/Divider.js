import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Divider from "../src/simple/Divider";
storiesOf("Divider", module).add("default", () => (
  <Divider>
    <p>or</p>
  </Divider>
));

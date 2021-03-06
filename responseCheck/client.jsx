import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

import ResponseCheck from "./ResponseCheck";
import ResponseCheckHooks from "./ResponseCheckHooks";

const Hot = hot(ResponseCheckHooks);

ReactDOM.render(<Hot />, document.querySelector("#root"));

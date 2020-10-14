import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import _ from "underscore";

import "../styles/popup.css";

export default function Popup(): JSX.Element {
  return (
  <div>
      <a href="https://www.hoverb.io" target="_blank">Landing page in progress!</a>
  </div>
  );
}

// --------------

ReactDOM.render(<Popup />, document.getElementById("root"));

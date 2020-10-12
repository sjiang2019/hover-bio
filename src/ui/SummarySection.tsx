import { css } from "aphrodite";
import * as React from "react";

import { summarySectionStyle as style } from "./styles";
import { BioInfo } from "./constants";

export default function SummarySection(props: {
  bioInfo: BioInfo;
}): JSX.Element {
  return (
    <>
      <div className={css(style.header)}>{props.bioInfo.name}</div>
      <div className={css(style.bioText)}>
        <span dangerouslySetInnerHTML={{ __html: props.bioInfo.snippet }} />
        ...(
        <a href={props.bioInfo.wikiUrl} className={css(style.link)}>
          continue reading
        </a>
        )
      </div>
    </>
  );
}

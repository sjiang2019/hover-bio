import { css } from "aphrodite";
import * as React from "react";

import { summarySectionStyle as style } from "./styles";
import { BioInfo } from "./constants";

export default function SummarySection(props: {
  bioInfo: BioInfo;
}): JSX.Element {
  const googleUrl = `https://www.google.com/search?q=${props.bioInfo.name}`
  return (
    <>
      <div className={css(style.header)}><a href={googleUrl} target="_blank" className={css(style.headerLink)}>{props.bioInfo.name}</a></div>
      <div className={css(style.bioText)}>
        <span dangerouslySetInnerHTML={{ __html: props.bioInfo.snippet }} />
        ...(
        <a href={props.bioInfo.wikiUrl} target="_blank" className={css(style.link)}>
          continue reading
        </a>
        )
      </div>
    </>
  );
}

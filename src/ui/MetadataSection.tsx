import _ from "underscore";
import { css } from "aphrodite";
import * as React from "react";

import { metadataSectionStyle as style } from "./styles";

export interface MetadataSectionProps {
  metadata: { [key: string]: string };
}

export default function MetadataSection(
  props: MetadataSectionProps
): JSX.Element {
  return (
    <>
      {props.metadata && !_.isEmpty(props.metadata) && (
          <>
          <hr />
        <div className={css(style.metadataSection)}>
          {Object.keys(props.metadata).map((key: string) => {
            return (
              <div className={css(style.text)}>
                <span className={css(style.boldText)}>{key}: </span>
                {props.metadata[key]}
              </div>
            );
          })}
        </div>
        </>
      )}
    </>
  );
}

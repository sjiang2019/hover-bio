import _ from "underscore";
import { css } from "aphrodite";
import * as React from "react";

import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";

import { BioInfo, Social, Article } from "./constants";
import { hoverCardStyle as style } from "./styles";
import SummarySection from "./SummarySection";
import AdditionalInfoSection from "./AdditionalInfoSection";
import { setFromCacheOrQuery } from "../app/util";

interface BioInfoCardProps {
  bioInfo: BioInfo;
  social: Social;
  articles: Array<Article>;
  metadata: { [key: string]: string };
}

function BioInfoCard({
  bioInfo,
  social,
  articles,
  metadata,
}: BioInfoCardProps) {
  return (
    <div className={css(style.bioCard)}>
      <SummarySection bioInfo={bioInfo} />
      <AdditionalInfoSection
        social={social}
        metadata={metadata}
        articles={articles}
      />
    </div>
  );
}

export default function HoverCard(props: {
  text: string;
  bioInfo: BioInfo;
}): JSX.Element {
  const [showPopover, setShowPopover] = React.useState(false);
  const [social, setSocial] = React.useState(null);
  const [articles, setArticles] = React.useState([]);
  const [metadata, setMetadata] = React.useState(null);
  const [hasOpenedBefore, setHasOpenedBefore] = React.useState(false);
  const name = props.bioInfo.name;

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
      var storageChange = changes[key];
      if (key === name) {
        setSocial(storageChange.newValue.social);
        setArticles(storageChange.newValue.articles);
        setMetadata(storageChange.newValue.metadata);
      }
    }
  });

  React.useEffect(() => {
    if (showPopover && !hasOpenedBefore) {
      setFromCacheOrQuery(
        name,
        setSocial,
        setArticles,
        setMetadata,
      );
      setHasOpenedBefore(true);
    }
  }, [showPopover]);

  const target = React.useRef(null);
  const popover = (
    <div>
      <Popover
        id="popover-basic"
        className={css(style.popover)}
        onMouseOver={() => setShowPopover(true)}
        onMouseOut={() => setShowPopover(false)}
      >
        {props.bioInfo.imageUrl && (
          <div>
            <img className={css(style.image)} src={props.bioInfo.imageUrl} />
          </div>
        )}
        <BioInfoCard
          bioInfo={props.bioInfo}
          social={social}
          articles={articles}
          metadata={metadata}
        />
      </Popover>
    </div>
  );
  return (
    <>
      <span
        onMouseOver={() => setShowPopover(true)}
        onMouseOut={() => setShowPopover(false)}
        ref={target}
      >
        {props.text}
      </span>
      <Overlay
        show={showPopover}
        onHide={() => setShowPopover(false)}
        target={target.current}
        placement="auto"
        transition={true}
        flip={true}
      >
        {popover}
      </Overlay>
    </>
  );
}

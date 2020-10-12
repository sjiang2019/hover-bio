import _ from "underscore";
import { css } from "aphrodite";
import * as React from "react";

import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";

import { BioInfo, Social, Article } from "./constants";
import { hoverCardStyle as style } from "./styles";
import SocialSection from "./SocialSection";
import SummarySection from "./SummarySection";
import NewsSection from "./NewsSection";
import { queryAdditionalInfo } from "../app/message";

function BioInfoCard({
  bioInfo,
  social,
  articles,
}: {
  bioInfo: BioInfo;
  social: Social;
  articles: Array<Article>;
}) {
  return (
    <div className={css(style.bioCard)}>
      <SummarySection bioInfo={bioInfo} />
      <SocialSection social={social} />
      <hr />
      <NewsSection articles={articles} />
    </div>
  );
}

function setFromCacheOrQuery(
  name: string,
  setSocial: (social: Social) => void,
  setArticles: (articles: Array<Article>) => void
): void {
  chrome.storage.sync.get([name], function (items) {
    if (_.isEmpty(items)) {
      queryAdditionalInfo(name);
    } else {
      setSocial(items[name].additionalInfo.social);
      setArticles(items[name].additionalInfo.articles);
    }
  });
}

export default function HoverCard(props: {
  text: string;
  bioInfo: BioInfo;
}): JSX.Element {
  const [showPopover, setShowPopover] = React.useState(false);
  const [social, setSocial] = React.useState(null);
  const [articles, setArticles] = React.useState([]);
  const [hasOpenedBefore, setHasOpenedBefore] = React.useState(false);
  const name = props.bioInfo.name;

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
      var storageChange = changes[key];
      if (key === name) {
        setSocial(storageChange.newValue.social)
        setArticles(storageChange.newValue.articles)
      }
    }
  });

  React.useEffect(() => {
    if (showPopover && !hasOpenedBefore) {
      setFromCacheOrQuery(name, setSocial, setArticles);
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
      >
        {popover}
      </Overlay>
    </>
  );
}

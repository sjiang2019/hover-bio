import _ from "underscore";
import * as React from "react";

import MetadataSection, { MetadataSectionProps } from "./MetadataSection";
import NewsSection, { NewsSectionProps } from "./NewsSection";
import SocialSection, { SocialSectionProps } from "./SocialSection";

type AdditionalInfoProps = MetadataSectionProps &
  NewsSectionProps &
  SocialSectionProps;

export default function AdditionalInfoSection(
  props: AdditionalInfoProps
): JSX.Element {
  const shouldShow =
    props.metadata != null || props.articles.length || props.social != null;
  return (
    <>
      {shouldShow ? (
        <>
          <SocialSection social={props.social} />
          <MetadataSection
            metadata={props.metadata}
          />
          <NewsSection articles={props.articles} />
        </>
      ) : (
        <div className="bioLoader"></div>
      )}
    </>
  );
}

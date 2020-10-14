import _ from "underscore";
import { css } from "aphrodite";
import * as React from "react";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

import { socialSectionStyle as style } from "./styles";
import { Social } from "./constants";

export interface SocialSectionProps {
  social: Social;
}

export default function SocialSection(props: SocialSectionProps): JSX.Element {
  return (
    <>
      {props.social && !_.isEmpty(props.social) && (
        <div className={css(style.socialSection)}>
          {props.social.Twitter && (
            <a href={props.social.Twitter}>
              <TwitterIcon
                className={css(style.socialMedia)}
                fontSize="large"
              />
            </a>
          )}
          {props.social.Instagram && (
            <a href={props.social.Instagram}>
              <InstagramIcon
                className={css(style.socialMedia)}
                fontSize="large"
              />
            </a>
          )}
          {props.social.LinkedIn && (
            <a href={props.social.LinkedIn}>
              <LinkedInIcon
                className={css(style.socialMedia)}
                fontSize="large"
              />
            </a>
          )}
          {props.social.Facebook && (
            <a href={props.social.Facebook}>
              <FacebookIcon
                className={css(style.socialMedia)}
                fontSize="large"
              />
            </a>
          )}
        </div>
      )}
    </>
  );
}

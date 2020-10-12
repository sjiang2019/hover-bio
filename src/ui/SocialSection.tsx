import { css } from "aphrodite";
import * as React from "react";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

import { socialSectionStyle as style } from "./styles";
import { Social } from "./constants";

export default function SocialSection(props: { social: Social }): JSX.Element {
  return (
    <>
      {props.social ? (
        <div>
          {props.social.twitter && (
            <a href={props.social.twitter}>
              <TwitterIcon
                className={css(style.socialMedia)}
                fontSize="large"
              />
            </a>
          )}
          {props.social.instagram && (
            <a href={props.social.instagram}>
              <InstagramIcon
                className={css(style.socialMedia)}
                fontSize="large"
              />
            </a>
          )}
          {props.social.linkedin && (
            <a href={props.social.linkedin}>
              <LinkedInIcon
                className={css(style.socialMedia)}
                fontSize="large"
              />
            </a>
          )}
          {props.social.facebook && (
            <a href={props.social.facebook}>
              <FacebookIcon
                className={css(style.socialMedia)}
                fontSize="large"
              />
            </a>
          )}
        </div>
      ) : (
        <div className="bioLoader"></div>
      )}
    </>
  );
}

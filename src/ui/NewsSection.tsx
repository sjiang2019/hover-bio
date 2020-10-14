import { css } from "aphrodite";
import * as React from "react";

import { Article } from "./constants";
import { newsSectionStyle as style } from "./styles";

export interface NewsSectionProps {
  articles: Array<Article>;
}

export default function NewsSection(props: NewsSectionProps): JSX.Element {
  return (
    <>
      {props.articles.length && (
        <div className={css(style.newsSection)}>
          <hr />
          <div className={css(style.newsHeader)}>In the News</div>
          <>
            {props.articles.map((article, i) => (
              <div key={i} className={css(style.linkSection)}>
                <a href={article.link} className={css(style.link)}>
                  {article.title}
                </a>
              </div>
            ))}
          </>
        </div>
      )}
    </>
  );
}

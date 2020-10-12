import { css } from "aphrodite";
import * as React from "react";

import { Article } from "./constants";
import { newsSectionStyle as style } from "./styles";

export default function NewsSection(props: {
  articles: Array<Article>;
}): JSX.Element {
  return (
    <div className={css(style.newsSection)}>
      <div className={css(style.newsHeader)}>In the News</div>
      {props.articles.length ? (
        <>
          {props.articles.map((article, i) => (
            <div key={i} className={css(style.linkSection)}>
              <a href={article.link} className={css(style.link)}>
                {article.title}
              </a>
            </div>
          ))}
        </>
      ) : (
        <div className="bioLoader"></div>
      )}
    </div>
  );
}

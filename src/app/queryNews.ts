import _ from "underscore";
const axios = require("axios");
var convert = require("xml-js");

import { Article } from "../ui/constants";

const NEWS_URL = "https://news.google.com/rss/search?q=";
const NUM_ARTICLES = 8;

export async function queryGoogleNews(name: string): Promise<Array<Article>> {
  const url = NEWS_URL + name;
  let articles = []
  try {
    const { data } = await axios.get(url);
    const jsonData = JSON.parse(
        convert.xml2json(data, { compact: true, spaces: 4 })
    );
    articles = jsonData.rss.channel.item.slice(0, NUM_ARTICLES);
  } catch (e) {
    console.error(e.message);
  }
  return articles.map((article) => ({
    title: article.title._text,
    link: article.link._text,
    date: article.pubDate._text,
  }));
}

export async function getNews(
  names: Array<string>
): Promise<{ [name: string]: Array<Article> }> {
  const articlePromises = names.map(
    async (name) => await queryGoogleNews(name)
  );
  const articles = await Promise.all(articlePromises);
  const nameToArticles = _.object(names, articles);
  return nameToArticles;
}

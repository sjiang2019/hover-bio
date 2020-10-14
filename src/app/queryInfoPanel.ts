import _ from "underscore";
const axios = require("axios");
const cheerio = require("cheerio");

import { Social, SOCIAL_MEDIA_KEYS, InfoPanel } from "../ui/constants";

const QUERY_URL = "https://www.google.com/search?q=";

function parseInfoPanel(data): InfoPanel {
  const $ = cheerio.load(data);
  const tab = $("#kp-wp-tab-overview");
  var social = {};
  $(tab)
    .find("a")
    .each((i, link) => {
      const linkText = $(link).text();
      if (SOCIAL_MEDIA_KEYS.includes(linkText)) {
        social[linkText] = $(link).attr("href");
      }
    });

  let metadata = {};
  const section = $(tab).find("div").first();
  let key = null;
  $(section)
    .find("span")
    .each((i, span) => {
      const spanText = $(span).text().trim();
      if (key != null) {
        metadata[key.slice()] = spanText;
        key = null;
      } else if (spanText.slice(-1) === ":") {
        key = spanText.slice(0, -1);
      }
    });

  return {
    social: social as Social,
    metadata: metadata,
  };
}

export async function queryInfoPanel(name: string): Promise<InfoPanel> {
  const url = QUERY_URL + name;
  try {
    const { data } = await axios.get(url);
    return parseInfoPanel(data);
  } catch (e) {
    console.error(e.message);
  }
}

export async function getInfoPanel(
  names: Array<string>
): Promise<{ [name: string]: Social }> {
  const socialPromises = names.map(async (name) => await queryInfoPanel(name));
  const socials = await Promise.all(socialPromises);
  const nameToSocial = _.object(names, socials);
  return nameToSocial;
}

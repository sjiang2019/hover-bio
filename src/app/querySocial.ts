import _ from "underscore";
const axios = require("axios");
const cheerio = require("cheerio");

import { Social } from "../ui/constants";

const SOCIAL_URL = "https://www.google.com/search?q=";

export async function queryGoogleSocial(name: string): Promise<Social> {
  const url = SOCIAL_URL + name;
  var social: Social = {
    facebook: null,
    twitter: null,
    instagram: null,
    linkedin: null,
  };
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const divs = $("div");
    const profileDiv = divs.filter((i, div) => $(div).text() == "Profiles")[0];
    const links = $(profileDiv).parent().find("a");
    links.each((i, link) => {
        const socialLink = $(link).attr("href");
        if (socialLink.includes("instagram")) {
        social["instagram"] = socialLink;
        } else if (socialLink.includes("facebook")) {
        social["facebook"] = socialLink;
        } else if (socialLink.includes("twitter")) {
        social["twitter"] = socialLink;
        } else if (socialLink.includes("linkedin")) {
        social["linkedin"] = socialLink;
        }
    });
  } catch (e) {
    console.error(e.message);
  }
  return social;
}

export async function getSocial(
  names: Array<string>
): Promise<{ [name: string]: Social }> {
  const socialPromises = names.map(
    async (name) => await queryGoogleSocial(name)
  );
  const socials = await Promise.all(socialPromises);
  const nameToSocial = _.object(names, socials);
  return nameToSocial;
}
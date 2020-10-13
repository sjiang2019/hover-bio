import _ from "underscore";
const axios = require("axios");

const REGEX_BATCH_SIZE = 6;
const WIKI_URL =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=intitle:/";
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function constructNameRegex(names: Array<string>): string {
  return names.map((name) => '"' + name + '"').join("|");
}

export interface WikiInfo {
  title: string;
  pageId: number;
  snippet: string;
}

async function queryWiki(names: Array<string>): Promise<Array<WikiInfo>> {
  const url = WIKI_URL + constructNameRegex(names) + "/i";
  try {
    const { data } = await axios.get(url);
    if (data?.query?.search != null) {
      const results = data.query.search;
      const filteredResults = results.filter(
        (result) =>
          names.includes(result.title) &&
          // Hacky way of checking if the returned article is a person
          MONTHS.some((month) => result.snippet.includes(month))
      );
      return filteredResults.map((filteredResult) => ({
        title: filteredResult.title,
        pageId: filteredResult.pageid,
        snippet: filteredResult.snippet,
      }));
    } else {
      console.log(`Querying for ${names.join(",")} gave invalid result:`);
      console.log(data);
    }
  } catch (e) {
    console.error(e.message);
    return [];
  }
}

export async function getBios(names: Array<string>): Promise<Array<WikiInfo>> {
  // TODO: Batch queries so that we're not making a bunch of API requests at once
  const chunks = _.chunk(names, REGEX_BATCH_SIZE);
  const resultsArray = chunks.map(
    async (nameChunk) => await queryWiki(nameChunk)
  );
  const awaitedResults: Array<Array<WikiInfo>> = await Promise.all(
    resultsArray
  );
  const filteredResults: Array<Array<WikiInfo>> = awaitedResults.filter(
    (res: Array<WikiInfo>) => res && res.length > 0
  );
  const flattened = [].concat.apply([], filteredResults);
  return flattened;
}

const IMAGE_QUERY_URL =
  "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpslimit=1&gpssearch=";

async function queryWikiThumbnail(name: string): Promise<string> {
  const url = IMAGE_QUERY_URL + name;
  try {
    const { data } = await axios.get(url);
    if (data?.query?.pages[0]?.thumbnail?.source != null) {
      return data.query.pages[0].thumbnail.source;
    } else {
      console.log(`Could not find image for ${name}:`);
      console.log(data);
    }
  } catch (e) {
    console.error(e.message);
  }
}

export async function getImages(
  names: Array<string>
): Promise<{ [name: string]: string }> {
  const imagePromises = names.map(
    async (name) => await queryWikiThumbnail(name)
  );
  const images = await Promise.all(imagePromises);
  return _.object(names, images);
}

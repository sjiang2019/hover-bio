import _ from "underscore";
import {
  GET_BIO_INFO,
  postBioInfo,
  GET_ADDITIONAL_INFO,
  postAdditionalInfo,
} from "./message";
import { getBios, getImages } from "./queryBio";
import { queryGoogleNews } from "./queryNews";
import { queryGoogleSocial } from "./querySocial";
import { injectMarkCSS, getNames, delay } from "./util";

const QUERY_BATCH_SIZE = 12;

async function batchQueries(names: Array<string>): Promise<void> {
  const queryChunks = _.chunk(names, QUERY_BATCH_SIZE);
  var promise = Promise.resolve();
  queryChunks.forEach(async (queryChunk, i) => {
    promise = promise.then(
      async (): Promise<void> => {
        const wikiInfos = await getBios(queryChunk);
        const filteredNames = wikiInfos.map((wikiInfo) => wikiInfo.title);
        const nameToImages = await getImages(filteredNames);
        const bioInfos = wikiInfos.map((wikiInfo) => ({
          name: wikiInfo.title,
          snippet: wikiInfo.snippet,
          wikiUrl: `http://en.wikipedia.org/?curid=${wikiInfo.pageId}`,
          imageUrl: nameToImages[wikiInfo.title],
        }));
        postBioInfo(bioInfos);
        return new Promise(function (resolve) {
          setTimeout(resolve, delay(i));
        });
      }
    );
  });
}

async function handleBioInfoRequest(text: string): Promise<void> {
  const names = getNames(text);
  console.log(
    "querying wikipedia for the following names: " + names.join(", ")
  );
  await batchQueries(names);
}

async function handleAdditionalInfoRequest(name: string): Promise<void> {
  const articles = await queryGoogleNews(name);
  const social = await queryGoogleSocial(name);
  postAdditionalInfo({
    name: name,
    articles: articles,
    social: social,
  });
}

async function onRequest(request, sender, sendResponse) {
  injectMarkCSS();
  switch (request.action) {
    case GET_BIO_INFO:
      handleBioInfoRequest(request.text);
      return true;
    case GET_ADDITIONAL_INFO:
      handleAdditionalInfoRequest(request.name);
      return true;
    default:
      return true;
  }
}

chrome.runtime.onMessage.addListener(onRequest);

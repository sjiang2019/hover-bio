import _ from "underscore";
import {
  GET_BIO_INFO,
  postBioInfo,
  GET_ADDITIONAL_INFO,
  postAdditionalInfo,
} from "./message";
import { getBios, getImages } from "./queryBio";
import { queryGoogleNews } from "./queryNews";
import { queryInfoPanel } from "./queryInfoPanel";
import { injectMarkCSS, getNames } from "./util";

const QUERY_BATCH_SIZE = 12;
const DELAY_MS = 3000;

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
          setTimeout(resolve, DELAY_MS);
        });
      }
    );
  });
}

async function handleBioInfoRequest(text: string): Promise<void> {
  const names = getNames(text);
  await batchQueries(names);
}

async function handleAdditionalInfoRequest(name: string): Promise<void> {
  const articles = await queryGoogleNews(name);
  const infoPanelData = await queryInfoPanel(name);
  postAdditionalInfo({
    name: name,
    articles: articles,
    ...infoPanelData
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

import _ from "underscore";
import nlp from "compromise";
import { Social, Article } from "../ui/constants";
import { queryAdditionalInfo } from "./message";

export function injectMarkCSS(): void {
  chrome.tabs.insertCSS({ 
      code: ".hoverBioNode{font-weight: bold;}" 
    });
}

export function getNames(text: string): Array<string> {
  let names = nlp(text).people().out("array");
  const filteredNames = names.reduce((namesList, name) => {
    const splitName = name.split(" ");
    if (splitName.length > 1 && splitName.length < 4) {
      // Remove beginning and trailing non-alphanumeric characters
      const cleanName = name.replace(/^[^a-z\d]*|[^a-z\d]*$/gi, "");
      // Check for disallowed characters in middle of string
      if (!cleanName.match(/[|&;$%@"<>()+\/,\\]/g)) {
        namesList.push(cleanName);
      }
    }
    return namesList;
  }, []);
  return _.uniq(filteredNames);
}

export function setFromCacheOrQuery(
  name: string,
  setSocial: (social: Social) => void,
  setArticles: (articles: Array<Article>) => void,
  setMetadata: (metadata: { [key: string]: string }) => void,
): void {
  chrome.storage.sync.get([name], function (items) {
    if (_.isEmpty(items)) {
      queryAdditionalInfo(name);
    } else {
      setSocial(items[name].additionalInfo.social);
      setArticles(items[name].additionalInfo.articles);
      setMetadata(items[name].additionalInfo.metadata);
    }
  });
}

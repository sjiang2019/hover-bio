import _ from "underscore";
import nlp from "compromise";

export function injectMarkCSS(): void {
  chrome.tabs.insertCSS({ code: ".hoverBioNode{background: #FFFFE0;}" });
}

export function delay(index: number): number {
  return (3 + index * 2) * 1000;
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

import _ from "underscore";
import * as ReactDOM from "react-dom";
import * as React from "react";

import { BioInfo } from "../ui/constants";
import HoverCard from "../ui/HoverCard";
import Mark from "mark.js";
import findAndReplaceDOMText from 'findandreplacedomtext'

export function markDocument(bioInfos: Array<BioInfo>): void {
  const names = bioInfos.map((bioInfo) => bioInfo.name);
  names.forEach((name) => {
    findAndReplaceDOMText(document.documentElement, {
        find: name,
        wrap: 'span',
        wrapClass: 'hoverBioNode'
    })
  })
  appendPopovers(bioInfos);
}

function appendPopovers(bioInfos: Array<BioInfo>): void {
  const nameToBioInfo = bioInfos.reduce((bioInfoByName, bioInfo) => {
    bioInfoByName[bioInfo.name] = bioInfo;
    return bioInfoByName;
  }, {});
  const highlightedElements = document.getElementsByClassName("hoverBioNode");
  var i;
  for (i = 0; i < highlightedElements.length; i++) {
    const element = highlightedElements[i];
    const bioInfo = nameToBioInfo[element.textContent];
    if (bioInfo != null) {
      ReactDOM.render(
        <HoverCard text={element.textContent} bioInfo={bioInfo} />,
        element
      );
    }
  }
}

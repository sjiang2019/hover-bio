import { markDocument } from './markDocument'
import { queryBioInfo, POST_BIO_INFO, POST_ADDITIONAL_INFO } from './message'

window.onload=function(){
    chrome.storage.sync.clear()
    queryBioInfo(document.documentElement.innerText)
}

async function onRequest(request, sender, sendResponse) {
    if (request.action === POST_BIO_INFO) {
        markDocument(request.bioInfos)
    } else if (request.action === POST_ADDITIONAL_INFO) {
      let obj = {};
      obj[request.additionalInfo.name] = request.additionalInfo;
      chrome.storage.sync.set(obj, function () {});
    }
    return true;
}

chrome.runtime.onMessage.addListener(onRequest);
import { MovieInfo, BioInfo, AdditionalInfo } from "../ui/constants";

export const GET_BIO_INFO = 'get-bio-info';
export const POST_BIO_INFO = 'post-bio-info'
export const GET_ADDITIONAL_INFO = 'get-additional-info';
export const POST_ADDITIONAL_INFO = 'post-additional-info'

export function queryBioInfo(text: string) {
    chrome.runtime.sendMessage({ action: GET_BIO_INFO , text: text });
}

export function postBioInfo(bioInfos: Array<BioInfo>) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: POST_BIO_INFO, bioInfos: bioInfos });
    });
}

export function queryAdditionalInfo(name: string) {
    chrome.runtime.sendMessage({ action: GET_ADDITIONAL_INFO , name: name });
}

export function postAdditionalInfo(additionalInfo: AdditionalInfo) {
    console.log("sending back additional info", additionalInfo)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: POST_ADDITIONAL_INFO, additionalInfo: additionalInfo });
    });
}
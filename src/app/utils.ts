import nlp from 'compromise'
import _ from 'underscore'

function getProperNounPhrases(tokenizedText: Array<string>, properNouns: Array<string>): Array<string> {
    var properNounSet = new Set(properNouns)
    let properNounPhrase = []
    let phrasesToReturn = []
    tokenizedText.forEach((term) => {
        if (properNounSet.has(term)) {
            properNounPhrase.push(term)
            if (properNounPhrase.length > 1) {
                phrasesToReturn.push(properNounPhrase.join(" "))
            }
        } else {
            properNounPhrase = []
        }
    })
    return _.uniq(phrasesToReturn)
}

export function getProperNouns(text: string): Array<string> {
    let doc = nlp(text)
    const json = doc.json()
    const singularProperNouns = _.uniq(json.flatMap((phrase) => (phrase.terms.filter((term) => term.tags.includes("ProperNoun")).map((term) => term.text))))
    const tokenizedText = json.flatMap((phrase) => (phrase.terms.map((term) => term.text)))
    const properNounPhrases = getProperNounPhrases(tokenizedText, singularProperNouns)
    const allProperNouns = _.uniq([...singularProperNouns, ...properNounPhrases])
    return allProperNouns
}

export function makeTextBlocks(words: Array<string>, blockSize: number): Array<string> {
    const textBlocks = []
    let currentTextBlock = []
    let currentTextBlockLength = 0
    words.forEach((word) => {
        if (currentTextBlockLength + word.length > blockSize) {
            textBlocks.push(currentTextBlock.join(" "))
            currentTextBlock = []
            currentTextBlockLength = 0
        }
        currentTextBlock.push(word)
        currentTextBlockLength = currentTextBlockLength + word.length
    })
    if (currentTextBlockLength > 0) {
        textBlocks.push(currentTextBlock.join(" "))
    }
    return textBlocks
}

const ACCEPTED_DOMAINS = ["movie"]

export function getMoviesFromWitResponse(responseData): Array<string> {
    return responseData.entities.creative_work.filter(
        (work) => work.hasOwnProperty("resolved")
        ).flatMap(
            (work) => (work.resolved.values)
        ).filter(
            (value) => ACCEPTED_DOMAINS.includes(value.domain)
        ).map(
            (value) => (value.name)
        )
}
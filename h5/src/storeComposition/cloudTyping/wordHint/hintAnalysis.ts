/**
 * @description 词提分类，二简词、二简词、四码成语等等
 */

import { IWordHintRenderSource } from ".";
interface IAnalysisRule {
    reg: RegExp,
    types: {
        2: string,
        3: string,
        4: string,
        default: string
    }
}
const rules: IAnalysisRule[] = [
    {
        reg: /[a-z]{4}/,
        types: {
            2: '四码二字词',
            3: '四码三字词',
            4: '四码四字词',
            default: '四码长词'
        }
    },
    {
        reg: /[a-z]{3}/,
        types: {
            2: '三码二字词',
            3: '三码三字词',
            4: '三码四字词',
            default: '三码长词'
        }
    },
    {
        reg: /[a-z]{2}/,
        types: {
            2: '二码二字词',
            3: '二码三字词',
            4: '二码四字词',
            default: '二码长词'
        }
    },
    {
        reg: /[a-z]{1}/,
        types: {
            2: '一码二字词',
            3: '一码三字词',
            4: '一码四字词',
            default: '一码长词'
        }
    }
]
export interface IHintAnalysis {
    typeName: string;
    words: string[]
}


export default function (hintSource: IWordHintRenderSource[]): IHintAnalysis[] {
    const analysis: IHintAnalysis[] = []

    hintSource.forEach(hintObj => {
        const word = hintObj.val
        if (word.length === 1) {
            insertAnalysisOneCharType(word)
        } else {
            const ruleType = rules.find(r => r.reg.test(hintObj.bm))
            if (ruleType) {
                const typeName =
                    (ruleType.types[word.length] || ruleType.types.default) as string
                insertAnalysisWordType(typeName, word)
            }
        }
    })
    return analysis

    function insertAnalysisWordType(typeName: string, word: string) {
        const analysisObj = findType() || createType()
        analysisObj.words.push(word)

        function findType() {
            return analysis.find(analy => analy.typeName === typeName)
        }
        function createType() {
            analysis.push({
                typeName,
                words: []
            })
            return analysis[analysis.length - 1]
        }
    }
    function insertAnalysisOneCharType(word: string) {
        const analysisObj = findType() || createType()
        const regChinese = /[\u4e00-\u9fa5]/
        regChinese.test(word) && analysisObj.words.push(word)

        function findType() {
            return analysis.find(analy => analy.typeName === '单字')
        }
        function createType() {
            analysis.push({
                typeName: '单字',
                words: []
            })
            return analysis[analysis.length - 1]
        }
    }
}
import { aSingleWord, chinesePhrase } from "@/constants/typing";
import { shuffleArray } from "../utils";

/**
 * @description 生成打字练习内容，例 单字、词组等等
 */



/**
 * 
 * @param type 单字类型
 * @param size 要求字数长度
 * @param chaos 是否混乱，打乱
 * @description 生成单字
 */
function word(type: string, size: number, chaos = true): string {
    let wordContents: string[] = aSingleWord[type].split("");
    // 如若输入的练习字数超过源文件的字数，则将源文件字数进行扩展大于练习字数
    if (size > wordContents.length) {
        const difference =
            ~~((size - wordContents.length) / wordContents.length);
        wordContents = new Array(difference + 1).fill(wordContents).flat(Infinity);
    }
    if (chaos) {
        wordContents = shuffleArray(wordContents)
    }
    return wordContents.join('').substr(0, size)
}

/**
 * 
 * @param type 单字类型
 * @param size 要求字数长度
 * @param chaos 是否混乱，打乱
 * @description 生成词组
 */
function phrase(type: string, size: number, chaos = true): string {
    let phraseContents: any[] = chinesePhrase[type];
    // 如若输入的练习字数超过源文件的字数，则将源文件字数进行扩展大于练习字数
    const phraseContentStr = phraseContents.join("");
    if (size > phraseContentStr.length) {
        const difference =
            ~~((size - phraseContentStr.length) / phraseContentStr.length);
        // 因为词组数组的原因，特殊处理，将相差数进行循环，再加入源文件至目标变量中
        phraseContents = new Array(difference + 1).fill(phraseContents).flat(Infinity);
    }
    if (chaos) {
        phraseContents = shuffleArray(phraseContents)
    }
    return phraseContents.join('').substr(0, size)
}

export default {
    word,
    phrase
}
import { TypingHintStyleTypes } from "@/enums/typingEnum";
import { IContrstCharObj } from "@/interface/ITyping";

/**
 * @description 将词提数据转换为对照区渲染数据格式
 */
export interface IWordHintRenderSource {
    val: string;
    kt: number;
    jw: number;
    bm: string;
}

interface IAllWord {
    type: TypingHintStyleTypes;
    isBold: boolean
}

function handleHintStyleType(source: IWordHintRenderSource): TypingHintStyleTypes {
    const charLength = source.val.length
    const codeLength = source.bm.length
    const lastCode = source.bm[codeLength - 1]
    if (charLength === 1) {
        return TypingHintStyleTypes.ONE_CHAR
    } else if (codeLength === 2) {
        return TypingHintStyleTypes.ONE_CODE_WORD
    } else if (charLength === 4) {
        return TypingHintStyleTypes.FOUR_CHAR_LENGTH_WORD
    } else if (codeLength === 4 && /[\d_]/.test(lastCode)) {
        return TypingHintStyleTypes.THREE_CODE_WORD
    } else if (codeLength >= 4) {
        return TypingHintStyleTypes.FOUR_CODE_WORD
    } else {
        return TypingHintStyleTypes.TOW_CODE_WORD
    }
}
function handleHintWeight(code: string): number {
    const [content] = code.match(/\d+?$/) ?? [0]
    return +content
}
// 处理重复词组的样式
function handleRepeatWord(allWord: IAllWord[]): boolean {
    if (allWord.length !== 1) {
        const reciprocalOne = allWord[allWord.length - 1]
        const reciprocalTwo = allWord[allWord.length - 2]
        if (reciprocalOne.type === TypingHintStyleTypes.ONE_CHAR) {
            return false
        }
        // 倒数第一个与倒数第二个的类型相同，那倒数第一个的文字加粗状态则与倒数第二个相反
        if (reciprocalOne.type === reciprocalTwo.type) {
            return (reciprocalOne.isBold = !reciprocalTwo.isBold)
        }
    }
    return false
}
export default function (source: IWordHintRenderSource[]): IContrstCharObj[] {
    const allWord: IAllWord[] = []
    let uid = 0
    return (source.map(o => {
        const type = handleHintStyleType(o)
        allWord.push({
            type,
            isBold: false
        })
        const _flag_ = Symbol('')
        return o.val.split('').map(_o => {
            uid++
            return {
                text: _o,
                haveInput: false,
                inputCorrect: false,
                hintObj: {
                    // 利用_flag_与uid来实现词提权重防止重复渲染
                    uid: uid++,
                    _flag_,
                    weight: handleHintWeight(o.bm),
                    encode: o.bm,
                    type,
                    // 如果前一个词与后一个词的类型是一样的，则让后一个词的字体加粗状态与前面那个词的相反，区分开来
                    isBold: handleRepeatWord(allWord),
                }
            }
        })
    })).flat(Infinity) as IContrstCharObj[]
}
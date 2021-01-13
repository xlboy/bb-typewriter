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
    if (charLength === 1) {
        return TypingHintStyleTypes.ONE_CHAR
    } else if (charLength >= 4) {
        return TypingHintStyleTypes.FOUR_MAC_LENGTH_WORD
    } else if (charLength === 3) {
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
    return (source.map(o => {
        const type = handleHintStyleType(o)
        allWord.push({
            type,
            isBold: false
        })
        const _flag_ = Symbol('')
        return o.val.split('').map(_o => {

            return {
                text: _o,
                haveInput: false,
                inputCorrect: false,
                hintObj: {
                    encode: o.bm,
                    type,
                    weight: handleHintWeight(o.bm),
                    isBold: handleRepeatWord(allWord),
                    _flag_
                }
            }
        })
    })).flat(Infinity) as IContrstCharObj[]
}
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
function handleHintStyleType(source: IWordHintRenderSource) {
    const charLength = source.val.length
    const codeLength = source.bm.length
    if (charLength === 1) {
        return TypingHintStyleTypes.ONE_CHAR
    }else if (charLength >= 4) {
        return TypingHintStyleTypes.FOUR_CODE_WORD
    } else if (codeLength >= 4) {
        return TypingHintStyleTypes.FOUR_CODE_WORD
    } else if (charLength === 2) {
        return TypingHintStyleTypes.TOW_CODE_WORD
    } else if (charLength === 3) {
        return TypingHintStyleTypes.THREE_CODE_WORD
    }
}
function handleHintWeight(code: string) {
    const [content] = code.match(/\d+?$/) ?? [0]
    return +content
}
export default function (source: IWordHintRenderSource[]): IContrstCharObj[] {
    return (source.map(o => {
        return o.val.split('').map(_o => {
            return {
                text: _o,
                haveInput: false,
                inputCorrect: false,
                hintObj: {
                    encode: o.bm,
                    type: handleHintStyleType(o),
                    weight: handleHintWeight(o.bm)
                }
            }
        })
    })).flat(Infinity) as IContrstCharObj[]
}
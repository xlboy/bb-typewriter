/**
 * @description 跟打成绩合成的函数
 */

import { ITypingResult } from "@/@types/ITyping";

const keyName = {
    // #是占位符
    speed: "速度#",
    keystroke: "击键#",
    yardsLong: "码长#",
    totalTime: "耗时#s",
    backSpace: "退格#",
    backChange: "回改#",
    totalKey: "总键数#",
    totalCharSize: "总字数#",
};

export default function (result: ITypingResult, index: number) {
    let resultStr = `第${index}段 `;
    Object.entries(result).forEach(
        ([k, v]) =>
            keyName[k] && (resultStr += `${keyName[k].replace("#", v)} `)
    );
    resultStr += "@BB打字机";
    return resultStr
}
import { TypingHintStyleTypes } from '@/constants/typing';
import { ComputedRef, UnwrapRef } from 'vue';

export interface ITypingTime {
    start: number; // 开始时间
    tempStart: number; // 当前暂停的时间
    pause: number; // 总暂停时间
    end: number; // 结束时间-用来判断是否结束跟打
    total: number // 总计时间
}

export interface ITypingBasis {
    backSpace: number; // 当前退格
    backChange: number; // 当前回改
    totalKey: number; // 当前总键数
}

export interface ITypingSource {
    content: string; // 文章内容
    index: number; // 文章序号(段号)
}

export interface ITypingState {
    time: ITypingTime; // 计时数据
    basis: ITypingBasis // 基础数据
}

// hooks里useTyping的返回接口定义
export interface IUseTyping {
    refState: UnwrapRef<object>;
    getters: {
        [key: string]: ComputedRef<any>
    };
    mutations: {
        [key: string]: Function
    }
}

// 对照区文字格式
export interface IContrstCharObj {
    text: string; // 单个文字内容
    haveInput: boolean; // 是否已输入
    inputCorrect: boolean; // 是否输入正确
    hintObj?: { // 词提的数据
        uid: number;
        encode: string; // 词/单字编码
        type: TypingHintStyleTypes; // 提示样式类型
        weight: number;
        isBold: boolean;
        _flag_: Symbol;
    }
}
// 打字练习成绩的数据
export interface ITypingResult {
    speed: number; // 速度
    keystroke: number; // 击键
    yardsLong: number; // 码长
    totalTime: number; // 总耗时长
    backSpace: number; // 退格
    backChange: number; // 回改
    totalKey: number; // 总键数
    errorNum: number; // 错误字数
    totalCharSize: number; // 总字数
}

// 练习完成的回调定义
export interface IFinishCallback {
    (results: ITypingResult): void
}















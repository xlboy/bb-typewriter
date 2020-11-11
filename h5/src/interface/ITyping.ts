import { ComputedRef, Ref, UnwrapRef } from 'vue';

export interface ITypingTime {
    start: number, // 开始时间
    tempStart: number, // 当前暂停的时间
    pause: number, // 总暂停时间
    end: number, // 结束时间-用来判断是否结束跟打
    total: number // 总计时间
}

export interface ITypingBasis {
    backSpace: number, // 当前退格
    backChange: number, // 当前回改
    totalKey: number, // 当前总键数
}

export interface ITypingSource {
    content: string, // 文章内容
    index: number, // 文章序号(段号)
}

export interface ITypingState {
    time: ITypingTime, // 计时数据
    basis: ITypingBasis // 基础数据
}

// hooks里useTyping的返回接口定义
export interface IUseTyping {
    refState: UnwrapRef<object>,
    getters: {
        [key: string]: ComputedRef<any>
    },
    mutations: {
        [key: string]: Function
    }
}

// 对照区文字格式
export interface IContrstCharObj {
    text: string; // 单个文字内容
    haveInput: boolean; // 是否已输入
    inputCorrect: boolean; // 是否输入正确
}
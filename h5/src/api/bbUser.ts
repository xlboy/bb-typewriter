import request from "@/utils/request";
import { AxiosPromise } from "axios";


/**
 * 
 * @param userId 用户id
 * @param twoWord 二字词的样式
 * @param threeWord 三字词的样式
 * @param fourWord 四字词的样式
 * @param fourC 超过四字词长度的词语的样式
 * @description 设置用户的词语提示样式
 */
export function saveUserColorWord(
    userId: number,
    twoWord: string,
    threeWord: string,
    fourWord: string,
    fourC: string
): AxiosPromise<any> {
    return request('post', '/savaColorWord', {
        userId, twoWord, threeWord, fourWord, fourC
    })
}

/**
 * 
 * @param userId 用户id
 * @param wordId 词库码表的id
 * @description 设置用户当前选中的词库码表
 */
export function saveUserCurrentWord(userId: number, wordId: number): AxiosPromise<any> {
    return request('post', '/setUserWord', {
        userId, wordId
    })
}
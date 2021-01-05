import request from "@/utils/request";
import { AxiosPromise } from "axios";

/**
 * 
 * @description 获取系统默认词库
 */
export function getDefaultWordHint(): AxiosPromise<any> {
    return request('post', '/getDefaultWord')
}

/**
 * 
 * @param str 要查询词提的字符串
 * @param wordId 码表ID
 * @description 获取词提
 */
export function getQueryWordHint(str: string, wordId: number): AxiosPromise<any> {
    return request('post', '/queryWordHint', {
        str, wordId
    })
}
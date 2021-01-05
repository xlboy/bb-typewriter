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

/**
 * 
 * @param username 用户名
 * @param password 密码
 * @description 用户登录
 */
export function userLogin(username: string, password: string) {
    return request('post', '/login', {
        username, password
    })
}

/**
 * 
 * @param username 用户名
 * @param password 密码
 * @description 用户注册并登录
 */
export function userReg(username: string, password: string) {
    return request('post', '/reg', {
        username, password
    })
}

/**
 * 
 * @param userId 用户ID
 * @description 获取用户的基本信息
 */
export function getReadUserInfo(userId: number) {
    return request('post', '/readUserInfo', {
        userId
    })
}

/**
 * 
 * @param userId 用户ID
 * @param sign 个签字符串
 * @description 保存用户个性签名
 */
export function saveUserSign(userId: number, sign: string) {
    return request('post', '/savaSign', {
        userId, sign
    })
}

/**
 * 
 * @param userId 用户ID
 * @description 获取用户上传的词库
 */
export function getUserWordHint(userId: number) {
    return request('post', '/readWord', {
        userId
    })
}

import request from "@/utils/request";
import { AxiosPromise } from "axios";

/**
 * 
 * @description 获取系统默认词库
 */
export function getDefaultWord(): AxiosPromise<any> {
    return request('post', '/getDefaultWord')
}
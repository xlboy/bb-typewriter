import axios, { AxiosPromise } from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
// 请求拦截器
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            Toast('服务异常…' + response.status)
            return Promise.reject(response)
        }
    },
    // 服务器状态码不是200的情况
    error => {
        Toast('服务异常…' + error)
        return Promise.reject(error.response)
    }
)

axios.defaults.timeout = 10000
/**
 * 
 * @param method 请求方式
 * @param url 请求地址
 * @param data 请求所带参数
 * @param isDefault 请求地址是否为默认，如默认则拼接传过来的接口。（因会外接其他接口，特此处理）
 * @param headers 请求头
 */
export default function request(
    method: 'post' | 'get' | 'put' | 'patch',
    url: string,
    data: object | string = '',
    isDefault = true,
    headers: any = {},
): AxiosPromise<any> {
    const defaultBaseUrl = 'http://xlboy.cn:8988'
    url = isDefault ? `${defaultBaseUrl}${url}` : url

    // headers['Content-Type'] ??= 'application/json'; 在这里会被编译报错，版本没跟上原因吧
    headers['Content-Type'] = headers['Content-Type'] ?? 'application/json'
    switch (headers['Content-Type']) {
        case 'application/x-www-form-urlencoded':
            data = qs.stringify(data)
            break;
    }
    const options: any = {
        method,
        url,
        headers
    }
    if (method === 'get') {
        options.params = data
    } else {
        options.data = data
    }

    return axios(options)
}
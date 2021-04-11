import loading from "@/components/Common/Loading/index";

/**
 * 
 * @param funs 传入的请求方法，可能是单个也可能是多个
 * @param callback 请求完成的回调，不论成功或失败
 * @param isLoading 是否需要显示加载过程
 */
export default function (
  funs: (Promise<any>)[] | Promise<any>,
  callback: Function,
  isLoading = true
): void {
  isLoading && loading.show()
  // 先不理它传入多个还是单个，直接扁平化成一维，再丢给all处理即可
  const tasks = [funs].flat(Infinity)
  Promise.all(tasks).then(result => {
    isLoading && loading.close()
    if (result.length === 1) {
      callback(result[0])
    } else {
      callback(result)
    }
  })
}

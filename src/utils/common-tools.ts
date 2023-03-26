/* eslint-disable */
/**
 * 用于占用进程
 *
 * @export
 * @param {*} duration 占用时长，单位 ms
 * @returns
 */
// export const sleep = (duration: number) =>
//   new Promise((resolve) => void setTimeout(resolve, duration));

// 从 UA 获取设备相关信息并在全局初始化
export const initPlatform = () => {
  const UA = navigator.userAgent;
  const info = UA.match(/\s{1}DSBRIDGE[\w\.]+$/g);
  if (info && info.length > 0) {
    const infoArray = info[0].split('_');
    window.$appVersion = infoArray[1];
    window.$systemVersion = infoArray[2];
    window.$platform = infoArray[3] as Platform;
  } else {
    window.$appVersion = '1.0.0';
    window.$systemVersion = undefined;
    window.$platform = 'browser';
  }
};

/**
 * 节流
 *
 * @export
 * @param {function} fn
 * @param {number} delay
 * @returns
 */

export function debounce(this: any, fn: any, delay: number = 300) {
  let timeout: any;
  const _this: any = this;
  const result = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(_this, arguments);
    }, delay);
  };
  return result;
}

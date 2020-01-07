function getFile(str) {
    return str.substr(1 + str.lastIndexOf('/')).split('?')[0]
}

export const getExtensions = (str) => {
    const filename = getFile(str)
    return filename.split('#')[0].substr(filename.lastIndexOf('.'))
}

export const getFileName = (str) => {
    const filename = getFile(str)
    return filename.split('#')[0].substr(0, filename.lastIndexOf('.'))
}

export const loadAll = (module) => {
    let out = {}
    if (module.keys().length) {
        out = Object.assign(
            ...(r => r.keys().map(key => [getFileName(key), r(key).default]))(module).map(([k, v]) => ({
                [k]: v
            }))
        )
    } else {
        out = {}
    }
    return out
}
/***
 * 获取url参数
 * @param name  参数key
 * @param url   请求url
 */
export const getQueryString = (name, url) => {
  let reg = new RegExp("[?&]" + name + "=(([^&]*)|(&|$))");
  let v = url.match(reg);
  return unescape(v[2]);
}

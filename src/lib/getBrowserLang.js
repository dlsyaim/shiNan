// 获取语言
import Cookies from 'js-cookie'

export default () => {
  let lang
  if (Cookies.get('language')) {
    return Cookies.get('language')
  }
  if (navigator.languages && navigator.languages.length > 0) {
    lang = navigator.languages[0]
  } else {
    lang = (navigator.language || navigator.browserLanguage).toLowerCase()
  }
  lang = lang.toLowerCase()
  if (lang.indexOf('zh') > -1) {
    return 'zh'
  } else if (lang.indexOf('en') > -1) {
    return 'en'
  }
  return 'zh'
}

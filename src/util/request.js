import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'

// let apiUrl = 'http://192.168.0.162:9696/'
// let apiUrl = 'http://47.107.116.88:9696/'/
// let apiUrl = 'http://duchengedu.com:9895/service/'
let apiUrl = 'http://113.246.243.124:9696/'

axios.defaults.baseURL = apiUrl
// 封装axios 请求
axios.interceptors.request.use(
  config => {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    Indicator.close()
    if (response.data.code == 1) {
      Toast({
        message: '操作失败(' + response.data.message + ')',
        duration: 2000
      })
    }
    if (response.data.code == 0) {
      return response.data
    }
  },
  error => {
    Indicator.close()
    return Promise.reject(error)
  })

// 封装axios方法
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params }).then(data => {
      resolve(data.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      resolve(response && response.data)
      Indicator.close()
    }).catch(err => {
      reject(err)
      Indicator.close()
    })
  })
}

export function deletee(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(response => {
      resolve(response.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(response => {
      resolve(response.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 
  时间格式化
*/
export function formData(fmt, date) {
  var o = {
    "M+": date.getMonth() + 1,     //月份 
    "d+": date.getDate(),     //日 
    "h+": date.getHours(),     //小时 
    "m+": date.getMinutes(),     //分 
    "s+": date.getSeconds(),     //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds()    //毫秒 
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt
}

// 时间计算
export function GetDateStr(date, count) {
  let newDate = date
  newDate.setDate(newDate.getDate() + count);
  return newDate
}

export function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }

  return vars;
}

// 判断是否是安卓还是ios
export function isAndroid_ios() {
  var u = navigator.userAgent, app = navigator.appVersion;
  //android终端或者uc浏览器
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  //ios终端 
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  return isAndroid == true ? true : false;
}

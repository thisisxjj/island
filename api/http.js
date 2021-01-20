import {config} from '../config'
const tips = {
  400: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '抱歉，出现了一个错误',
  1004: '禁止访问',
  1006: '服务器内部错误'
}
class HTTP {
  request({url, data={}, method="GET"}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.devUrl + url,
        data,
        method,
        header: {
          contentType: 'application/json'
        },
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          reject()
          this._show_error(1003)
        }
      })
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1003
    }
    const tip = tips[error_code]
    wx.showToast({
        title: tip ? tips[error_code] : tips[1003],
        icon: 'none',
        duration: 2000,
        mask: true
    })
  }
}

export default HTTP


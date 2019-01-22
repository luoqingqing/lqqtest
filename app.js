const app = getApp()
const access_token = null
App({
  onLaunch: function() {
    //获取用户code，提交服务器换取用户token
    let that = this
    wx.showLoading({
      title: '获取用户资料中...',
    })
    wx.login({
      success: function(res) {
        wx.request({
          url: 'https://api.yizongceping.com/i_login',
          method: 'POST',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function(res) {
            wx.hideLoading()
            let response = res.data
            if (response.ret == 0) {
              that.access_token = response.data
            } else {
              wx.showModal({
                content: '服务器发生未知异常，请重新进入！',
                showCancel: 'false',
                confirmText: '我知道了',
                success: function(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              })
            }
          },
          fail: function(res) {
            wx.hideLoading()
            wx.showModal({
              content: '网络异常！请确认您的手机网络正常后再重新进入小程序。',
              showCancel: 'false',
              confirmText: '我知道了',
              success: function(res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
        })
      }
    });
  },
  data: {
    baseUrl: 'https://api.yizongceping.com/', //https://api.yizongceping.com http://47.106.186.203
    avatarUrl: null,
    nickName: null,
    userInfo: null,
    webviewUrl: '',
    companyPhone: '400-999-6590'
  },
})
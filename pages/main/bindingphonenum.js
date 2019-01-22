const app = getApp()
var interval = null; //倒计时函数

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: null,
    verifying_code_prompt: '获取验证码',
    verifyingCode: null,
  },
  getPhoneNum: function(res) {
    this.data.phoneNum = res.detail.value
  },
  getVerifyingCode: function(res) {
    this.data.verifyingCode = res.detail.value
  },
  //获取验证码
  getVerifyingCodeClick: function(res) {
    var that = this;
    if (this.data.phoneNum == null) {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
      return;
    }
    if (that.data.phoneNum.length != 11) {
      wx.showToast({
        title: '手机号码位数错误请重新填写',
        icon: 'none'
      })
      return;
    }
    if (that.data.verifying_code_prompt == '获取验证码' || that.data.verifying_code_prompt == '重新发送') {
      wx.showLoading({
        title: '获取中...',
      })
      wx.request({
        url: app.data.baseUrl + 'getTelVercode',
        method: 'GET',
        data: {
          access_token: app.access_token,
          tel: that.data.phoneNum
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        fail: function(e) {
          wx.hideLoading();
        },
        success: function(ress) {
          let response = ress.data;
          let ret = response.ret;
          wx.hideLoading();
          if (ret == 0) {
            var currentTime = 60;
            interval = setInterval(function() {
              currentTime--;
              that.setData({
                verifying_code_prompt: '还剩' + currentTime + '秒'
              })
              if (currentTime <= 0) {
                clearInterval(interval)
                currentTime = 60;
                that.setData({
                  verifying_code_prompt: '重新发送'
                })
              }
            }, 1000)
          } else {
            wx.showToast({
              title: response.msg,
              icon: 'none'
            })
          }
        }
      })
    }
  },
  submit: function(res) {
    let that = this
    if (that.data.phoneNum == null) {
      wx.showToast({
        title: '电话号码不能为空',
        icon: 'none'
      })
      return
    }
    if (that.data.verifyingCode == null) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return
    }
    //校验完成，上传数据
    wx.showLoading({
      title: '绑定中...',
    })
    wx.request({
      url: app.data.baseUrl + 'bindTel',
      method: 'GET',
      data: {
        access_token: app.access_token,
        tel: that.data.phoneNum,
        telvercode: that.data.verifyingCode
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        let response = res.data
        wx.hideLoading()
        if (response.ret == 0) {
          wx.showModal({
            content: '手机号码绑定成功！',
            confirmColor: '#1F3773',
            confirmText: '我知道了',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                let pages = getCurrentPages(); // 当前页面
                let beforePage = pages[pages.length - 2]; // 前一个页面
                beforePage.onLoad()
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        } else if (response.ret == 806) {
          //还未绑定微信
          wx.showModal({
            content: '您还未绑定微信,无法绑定当前手机号。请先去绑定！',
            confirmText: '去绑定',
            cancelText: '暂不绑定',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../../pages/main/bindingwechat'
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: response.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(res) {
        wx.hideLoading()
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
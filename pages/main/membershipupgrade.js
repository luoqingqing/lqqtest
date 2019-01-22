const app = getApp()
let id = null

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardNum: 0,
    loadingText: '加载中',
    selectedIndex: 0,
    data: [],
    bill_id: null,
    authdata: [],
    membershipProcess: [],
    membershipProcessSize: 0
  },
  getCurrent: function(res) {
    let current = res.detail.current
    this.data.selectedIndex = current
    this.setData({
      authdata: this.data.data[this.data.selectedIndex].auth,
      membershipProcess: this.data.data[this.data.selectedIndex].flow,
      membershipProcessSize: this.data.data[this.data.selectedIndex].flow.length
    })
  },
  phonenumClick: function(res) {
    wx.showModal({
      content: '确认拨打客服电话？',
      confirmColor: '#1F3773',
      success: function(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: app.data.companyPhone
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  purchaseClick: function(res) {
    let that = this
    wx.showModal({
      content: '是否确认购买此套餐？',
      confirmText: '确认购买',
      cancelText: '暂不购买',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '购买中...',
          })
          wx.request({
            url: app.data.baseUrl + 'buycard',
            method: 'GET',
            data: {
              access_token: app.access_token,
              pro_id: that.data.data[that.data.selectedIndex].id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              wx.hideLoading()
              let response = res.data
              if (response.ret == 0) {
                that.data.bill_id = response.data.bill_id
                wx.requestPayment({
                  timeStamp: response.data.timeStamp,
                  nonceStr: response.data.nonceStr,
                  package: response.data.package,
                  signType: response.data.signType,
                  paySign: response.data.paySign,
                  fail: function(res) {
                    wx.showToast({
                      title: '支付失败',
                      icon: 'none'
                    })
                  },
                  success: function(res) {
                    that.paymentStatusQuery()
                  },
                  complete: function(res) {

                  }
                })
              } else {
                wx.showToast({
                  title: response.msg,
                  icon: 'none'
                })
              }
            },
            fail: function(res) {
              wx.hideLoading()
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    id = options.id
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.data.baseUrl + 'prointro',
      method: 'GET',
      data: {
        access_token: app.access_token,
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading()
        let response = res.data
        if (response.ret == 0) {
          if (response.data.length == 0) {
            that.setData({
              cardNum: response.data.length,
              loadingText: '您还未购买任何卡！'
            })
            wx.showModal({
              content: '您还未购买会员卡，请前往首页购买。',
              confirmText: '去购买',
              cancelText: '暂不购买',
              success(res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../../pages/main/homepage'
                  })
                }
              }
            })
          } else {
            that.setData({
              cardNum: response.data.length,
              data: response.data,
              authdata: response.data[that.data.selectedIndex].auth,
              membershipProcess: response.data[that.data.selectedIndex].flow,
              membershipProcessSize: response.data[that.data.selectedIndex].flow.length
            })
          }
        }
      },
      fail: function(res) {
        wx.hideLoading()
      }
    })
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

  },
  paymentStatusQuery: function() {
    let that = this
    wx.showLoading({
      title: '支付结果确认中...',
    })
    wx.request({
      url: app.data.baseUrl + 'check_bill',
      method: 'GET',
      data: {
        access_token: app.access_token,
        bill_id: that.data.bill_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading()
        let response = res.data
        if (response.ret == 0) {
          wx.showToast({
            title: '支付成功',
            icon: 'none'
          })
          //重新拉取数据
          wx.showLoading({
            title: '加载中...',
          })
          wx.request({
            url: app.data.baseUrl + 'prointro',
            method: 'GET',
            data: {
              access_token: app.access_token,
              id: id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              wx.hideLoading()
              let response = res.data
              if (response.ret == 0) {
                if (response.data[that.data.selectedIndex].is_buy == 0) {
                  that.setData({
                    data: response.data,
                    authdata: response.data[that.data.selectedIndex].auth,
                    is_buy: response.data[that.data.selectedIndex].is_buy,
                    membershipProcess: response.data[that.data.selectedIndex].flow,
                    membershipProcessSize: response.data[that.data.selectedIndex].flow.length
                  })
                } else if (response.data[that.data.selectedIndex].is_buy == 1) {
                  that.setData({
                    data: response.data,
                    authdata: response.data[that.data.selectedIndex].auth,
                    is_buy: response.data[that.data.selectedIndex].is_buy,
                    membershipProcess: response.data[that.data.selectedIndex].flow,
                    membershipProcessSize: response.data[that.data.selectedIndex].flow.length
                  })
                }
              }
            },
            fail: function(res) {
              wx.hideLoading()
            }
          })
          let pages = getCurrentPages(); // 当前页面
          let beforePage = pages[pages.length - 2]; // 前一个页面
          beforePage.onLoad()
        } else {
          wx.showToast({
            title: response.msg,
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        wx.hideLoading()
      }
    })
  }

})
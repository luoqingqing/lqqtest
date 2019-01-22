const app = getApp()
const dateUtil = require('../../utils/DateUtil.js')
let flag = 0
Page({
  /**
   * 页面的初始数据
   * 表示预约不需要选择时间
   */
  data: {
    // dialogVisible: false,
    // actions: [{
    //     name: '升级套餐',
    //     color: '#2d8cf0',
    //   },
    //   {
    //     name: '购买课程',
    //     color: '#19be6b'
    //   },
    //   {
    //     name: '取消',
    //     color: '#666666'
    //   }
    // ],
    // selectedNum: -1,
    id: null,
    available: null,
    disabled: true,
    submitText: '加载中',
    lessonImg: '',
    lessonName: '加载中',
    lessonIntroduction: '加载中',
    clazz_isshow:'none',
    start_clazz_time:'加载中',
    start_clazz_duration:'加载中',
    address: '加载中',
    //timetable: [],
    surplus: 0,
    frequencyService: '加载中',
    appointmentIntroduction: '加载中',
    // teacherdata: []

  },
  // selectedClick: function(res) {
  //   let index = res.target.dataset.index
  //   this.setData({
  //     selectedNum: index,
  //     submitText: '免费预约',
  //     disabled: false
  //   })
  // },
  // actionsClick({
  //   detail
  // }) {
  //   let index = detail.index
  //   let that = this
  //   if (index === 0) {
  //     //升级套餐
  //     wx.navigateTo({
  //       url: '../../pages/main/membershipupgrade'
  //     })
  //   } else if (index === 1) {
  //     //购买课程
  //     wx.showLoading({
  //       title: '获取购买信息中...',
  //     })
  //     wx.request({
  //       url: app.data.baseUrl + 'buyclazz',
  //       method: 'GET',
  //       data: {
  //         access_token: app.access_token,
  //         clazz_id: that.data.id,
  //       },
  //       header: {
  //         'content-type': 'application/json' // 默认值
  //       },
  //       success: function(res) {
  //         wx.hideLoading()
  //         let response = res.data
  //         if (response.ret == 0) {
  //           wx.requestPayment({
  //             timeStamp: response.data.timeStamp,
  //             nonceStr: response.data.nonceStr,
  //             package: response.data.package,
  //             signType: response.data.signType,
  //             paySign: response.data.paySign,
  //             fail: function(res) {
  //               wx.showToast({
  //                 title: '支付失败',
  //                 icon: 'none'
  //               })
  //             },
  //             success: function(res) {
  //               that.paymentStatusQuery()
  //             },
  //             complete: function(res) {

  //             }
  //           })
  //         } else {
  //           wx.showToast({
  //             title: response.msg,
  //             icon: 'none'
  //           })
  //         }
  //       },
  //       fail: function(res) {
  //         wx.hideLoading()
  //       }
  //     })
  //   }
  //   this.setData({
  //     dialogVisible: false
  //   });
  // },
  submit: function(res) {
    let that = this
    if (this.data.surplus == 0) {
      wx.showModal({
        content: '您暂时不具有预约该服务的权限。请根据自己需求，去首页选购相应会员卡！',
        confirmText: '首页购买',
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
      //直接预约
      wx.showLoading({
        title: '预约中...',
      })
      wx.request({
        url: app.data.baseUrl + 'appointment',
        method: 'GET',
        data: {
          access_token: app.access_token,
          clazz_id: that.data.id,
          flag: flag,
          timestamp: dateUtil.getTime(new Date())
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          wx.hideLoading()
          let response = res.data
          if (response.ret == 0) {
            wx.showModal({
              content: '预约成功！等待确认中',
              confirmText: '我知道了',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          } else if (response.ret == 805) {
            //用户未绑定手机号
            wx.showModal({
              content: '后期我们将通过手机短信给您发送课程和服务通知，为了保证服务质量，请前去绑定手机号!',
              confirmText: '去绑定',
              cancelText: '暂不绑定',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../../pages/main/bindingphonenum'
                  })
                }
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    flag = options.flag
    if (flag == 17 || flag == 18) {
      this.setData({
        clazz_isshow: 'block'
      })
      wx.setNavigationBarTitle({
        title: '报告解读'
      })
    } else if (flag == 3 || flag == 12) {
      this.setData({
        clazz_isshow:'block'
      })
      wx.setNavigationBarTitle({
        title: '按需咨询'
      })
    } 
    //获取网络请求
    let that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.data.baseUrl + 'clazz',
      method: 'GET',
      data: {
        access_token: app.access_token,
        flag: flag
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading()
        let response = res.data
        if (response.ret == 0) {
          that.data.surplus = response.data.surplus
          if (response.data.surplus == 0) {
            that.setData({
              submitText: '预约',
              disabled: false,
              id: response.data.id,
              available: response.data.available,
              lessonImg: response.data.imgUrl,
              lessonName: response.data.name,
              lessonIntroduction: response.data.intro,
              start_clazz_time: response.data.clazz_time,
              start_clazz_duration: response.data.duration,
              address: response.data.address,
              // timetable: response.data.timetable,
              frequencyService: '您的当前身份暂无预约此服务的权限。',
              appointmentIntroduction: '可点击预约按钮根据提示购买相应会员卡后，再进行预约。'
            })
          } else {
            that.setData({
              submitText: '预约',
              disabled: false,
              id: response.data.id,
              available: response.data.available,
              lessonImg: response.data.imgUrl,
              lessonName: response.data.name,
              lessonIntroduction: response.data.intro,
              start_clazz_time: response.data.clazz_time,
              start_clazz_duration: response.data.duration,
              address: response.data.address,
              // timetable: response.data.timetable,
              frequencyService: '剩余预约次数：' + response.data.surplus + '次。',
              appointmentIntroduction: '预约成功后，我们的客服人员会联系您商量服务事宜。请保持手机畅通！预约详情请到我的-预约中查看'
            })
          }
          //2代表已预约，1代表可以预约，0代表不能预约
          if (that.data.available == 0) {
            that.setData({
              submitText: '预约',
              disabled: false
            })
          } else if (that.data.available == 1) {
            that.setData({
              submitText: '预约',
              disabled: false
            })
          } else if (that.data.available == 2) {
            that.setData({
              submitText: '已预约',
              disabled: true
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
      title: '支付状态查询中...',
    })
    wx.request({
      url: app.data.baseUrl + 'upgrade',
      method: 'GET',
      data: {
        access_token: app.access_token,
        scope: member
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
          that.onLoad()
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
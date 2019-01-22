const app = getApp()
const dateUtil = require('../../utils/DateUtil.js')
const empty = require('../../utils/Empty.js')
let flag = 0
let numberPeriods = 1 //默认拉第一期的数据
let videoContext = null

Page({
  /**
   * 页面的初始数据
   * 表示讲座
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
    id: null,
    available: 0, //2代表已预约，1代表可以预约，0代表不能预约，没购买该课
    disabled: true,
    submitText: '加载中',
    selectedNum: 0,
    videoUrl: '',
    lessonName: '加载中',
    numdata: [],
    collectionState: false,
    lessonIntroduction: '加载中',
    startClassTime: '加载中',
    address: '加载中',
    frequencyService: '',
    appointmentIntroduction: '加载中'
  },
// 视频播放控件
  


  videoTimeUpdate: function(res) {
    let timeUpdate = res.detail.currentTime
    if (timeUpdate >= 300) {
      if (this.data.available == 0) {
        videoContext.pause()
        wx.showModal({
          content: '您暂时不具有观看该视频的权限。若要观看完整视频，请根据自己需求，去首页选购相应会员卡！',
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
      }
    }
  },
  selectedClick: function(res) {
    let index = res.target.dataset.index
    this.data.selectedNum = index
    numberPeriods = this.data.numdata[index].periods
    this.getLessonDetail()
  },
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
  //预约
  submit: function(res) {
    let that = this
    if (that.data.available == 1) { //2代表已预约，1代表可以预约，0代表不能预约，没购买该课
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
              success: function(res) {
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
    } else if (that.data.available == 0) {
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    flag = options.flag
    if (options.type_rank != undefined) {
      numberPeriods = options.type_rank
      this.data.selectedNum = numberPeriods - 1
    } else {
      numberPeriods = 1
      this.data.selectedNum = numberPeriods - 1
    }
    this.getLessonDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    videoContext = wx.createVideoContext('video')
  },
  btnclick:function(){
     flag = options.flag
    if (options.type_rank != undefined) {
      numberPeriods = options.type_rank
      this.data.selectedNum = numberPeriods - 1
    } else {
      numberPeriods = 1
      this.data.selectedNum = numberPeriods - 1
    }
    this.getLessonDetail()
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
  getLessonDetail: function(res) {
    let that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.data.baseUrl + 'clazz',
      method: 'GET',
      data: {
        access_token: app.access_token,
        periods: numberPeriods, //期数
        flag: flag
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading()
        let response = res.data
        if (response.ret == 0) {
          if (empty.isEmpty(response.data.appointment_info)) {
            that.setData({
              id: response.data.id,
              available: response.data.available,
              videoUrl: response.data.videoUrl,
              lessonName: response.data.name,
              selectedNum: that.data.selectedNum,
              numdata: response.data.previous_data,
              lessonIntroduction: response.data.intro,
              startClassTime: response.data.clazz_time,
              address: response.data.address,
              frequencyService: '您的当前身份暂无预约此服务的权限。',
              appointmentIntroduction: '可点击预约按钮根据提示购买相应会员卡后，再进行预约。'
            })
          } else {
            that.setData({
              id: response.data.id,
              available: response.data.available,
              videoUrl: response.data.videoUrl,
              lessonName: response.data.name,
              selectedNum: that.data.selectedNum,
              numdata: response.data.previous_data,
              lessonIntroduction: response.data.intro,
              startClassTime: response.data.clazz_time,
              address: response.data.address,
              frequencyService: '当前用户可预约第' + response.data.appointment_info + '期服务。',
              appointmentIntroduction: '预约成功后，请按时间到指定地点上课。预约详情请到我的-预约中查看。'
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
          that.getLessonDetail()
          wx.showToast({
            title: '支付成功',
            icon: 'none'
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
})
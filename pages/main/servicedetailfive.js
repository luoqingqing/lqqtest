const app = getApp()
const dateUtil = require('../../utils/DateUtil.js')
let flag = 0
Page({
  /**
   * 页面的初始数据
   * 表示基因检测和生涯体验
   */
  data: {
    dialogVisible: false,
    dialogText: '',
    actions: [
      {
        name: '尊享',
        color: '#eac100',
      },{
        name: '高级',
        color: '#2d8cf0',
      },
      {
        name: '基本',
        color: '#19be6b'
      },
      {
        name: '取消',
        color: '#666666'
      }
    ],
    // selectedNum: -1,
    id: null,
    submitText: '加载中',
    available: null,
    basePackagePrice:'0',
    fullPackagePrice:'0',
    enjoyPackagePrice: '0',
    lessonImg: '',
    lessonName: '加载中',
    lessonIntroduction: '加载中',
    // timetable: [],
    appointmentIntroduction: '加载中',
    bill_id: null
    // teacherdata: []
  },
  actionsClick({
    detail
  }) {
    let index = detail.index
    let that = this
    if (index === 0) {
      //尊享套餐
      that.goPay(that.data.enjoyPackagePrice)
    } else if (index === 1) {
      //高级套餐
      that.goPay(that.data.fullPackagePrice)
    }else if(index===2){
      //基本套餐
      that.goPay(that.data.basePackagePrice)
    }
    this.setData({
      dialogVisible: false
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
        }
      }
    })
  },
  submit: function(res) {
    let that = this
    if (that.data.submitText == '已购买') {
      wx.showToast({
        title: '您已购买了该服务',
        icon: 'none'
      })
      return
    }
    that.setData({
      dialogVisible: true,
      dialogText: '请选择你要购买的检测套餐。基因检测尊享套餐¥' + that.data.enjoyPackagePrice +'元,高级套餐￥' + that.data.fullPackagePrice + '元,基本套餐￥' + that.data.basePackagePrice+'元。请根据自己需要选择选择尊享、高级或者基本套餐。'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.flag != 'undefined') {
      flag = options.flag
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
              submitText: '购买',
              id: response.data.id,
              available: response.data.available,
              lessonImg: response.data.imgUrl,
              lessonName: response.data.name,
              lessonIntroduction: response.data.intro,
              basePackagePrice: response.data.opt.gene5.price,
              fullPackagePrice: response.data.opt.gene7.price,
              enjoyPackagePrice: response.data.opt.gene8.price,
              // address: response.data.address,
              //timetable: response.data.timetable,
              // frequencyService: '您的当前身份暂无免费预约此课程的权限。',
              appointmentIntroduction: response.data.tips
            })
          } else {
            that.setData({
              submitText: '购买',
              id: response.data.id,
              available: response.data.available,
              lessonImg: response.data.imgUrl,
              lessonName: response.data.name,
              lessonIntroduction: response.data.intro,
              basePackagePrice: response.data.opt.gene5.price,
              fullPackagePrice: response.data.opt.gene7.price,
              enjoyPackagePrice: response.data.opt.gene8.price,
              // address: response.data.address,
              //timetable: response.data.timetable,
              // frequencyService: '剩余免费预约次数：' + response.data.surplus + '次。',
              appointmentIntroduction: response.data.tips
            })
          }
          //2代表已预约，1代表可以预约，0代表不能预约
          if (that.data.available == 0) {
            that.setData({
              submitText: '购买',
              disabled: false
            })
          } else if (that.data.available == 1) {
            that.setData({
              submitText: '购买',
              disabled: false
            })
          } else if (that.data.available == 2) {
            that.setData({
              submitText: '已购买',
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
  goPay: function(price) {
    let that = this
    //购买课程
    wx.showLoading({
      title: '获取购买信息中...',
    })
    wx.request({
      url: app.data.baseUrl + 'buyclazz',
      method: 'GET',
      data: {
        access_token: app.access_token,
        clazz_id: that.data.id,
        price: price
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
            complete: function(res) {}
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
  },
  paymentStatusQuery: function() {
    let that = this
    wx.showLoading({
      title: '购买结果确认中...',
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
          wx.showModal({
            title: '提示',
            content: '购买成功！请保持手机通话流畅，我们稍后将联系您。',
            showCancel: false,
            confirmText: '我知道了',
            success(res) {
              if (res.confirm) {
                //重新拉取下数据
                wx.navigateBack({
                  delta: 1
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
})
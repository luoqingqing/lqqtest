const app = getApp()
let p_type = 1 //1表示统招；2表示自主招生
let id = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectedIndex: 0,
    data: [],
    authdata: [],
    bill_id: null,
    applicableObject: '',
    purchaseHints: '',
    introduction: [],
    membershipProcess: [],
    membershipProcessSize: 0,
  
  
    dialogVisible: false,
    actions: [{
        name: '我是学生',
        color: '#2d8cf0',
      },
      {
        name: '我是家长',
        color: '#19be6b'
      },
      {
        name: '取消',
        color: '#666666'
      }
    ],
    current: 1
  

  },
  actionsClick1({
    detail
  }) {
    let index = detail.index
    let that = this
    if (index === 0) {
      //我是学生
      wx.navigateTo({
        url: '../../pages/main/evaluationlist?role=1&p_type=' + p_type
      })
    } else if (index === 1) {
      //我是家长
      wx.navigateTo({
        url: '../../pages/main/evaluationlist?role=2&p_type=' + p_type
      })
    }
    this.setData({
      dialogVisible: false
    })
  },
  //tab点击事件
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    })
  },
  //one：表示讲座；two：表示工作坊；three：表示预约不需要选择时间；four：表示自招评估；five：表示基因检测和生涯体验
  psychologialEvaluationClick1: function (res) {
    p_type = 1
    //心理测评
    this.setData({
      dialogVisible: true
    })
  },
  evaluationServiceClick: function (res) {
    //测评服务
    p_type = 2
    this.setData({
      dialogVisible: true
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

  /**
   * 
   * 点击事件监听
   */

  /* 体验卡》》》*/

  jumPage: function (res) {
    let index = res.currentTarget.dataset.index;
    // 判断卡片
    console.log(id);
    switch (id) {
      case "9":
        if (index == 0) {
          wx.navigateTo({
            url: '/pages/main/servicedetail?flag=1'
          })
        } else if (index == 1) {
          // 弹窗
          this.psychologialEvaluationClick1();

        }
        break;
      case "10":
        if (index == 0) { // 点击第1个  2次讲座
          wx.navigateTo({
            url: '/pages/main/servicedetail?flag=1'
          })
        }
        if (index == 1) { //4项评测
          // 弹窗
          this.psychologialEvaluationClick1();
        }
        if (index == 2) { //报告解读
          wx.navigateTo({
            url: '../../pages/main/servicedetailthree?flag=17'
          })
        }
        if (index == 3) { //志愿填报
          wx.navigateTo({
            url: '../../pages/main/servicedetailseven?flag=5'
          })
        }
        break;
      case "11":
        if (index == 0) { // 点击第1个  2次讲座
          wx.navigateTo({
            url: '/pages/main/servicedetail?flag=1'
          })
        }
        if (index == 1) { //教育工坊
          wx.navigateTo({
            url: '../../pages/main/servicedetailtwo?flag=11'
          })
        }
        if (index == 2) { //资质测评
          // 弹窗
          this.psychologialEvaluationClick1();
        }
        if (index == 3) { //报告
          wx.navigateTo({
            url: '../../pages/main/servicedetailthree?flag=18'
          })
        }
        if (index == 4) { //专家咨询
          wx.navigateTo({
            url: '../../pages/main/servicedetailthree?flag=3'
          })
        }
        if (index == 5) { //志愿填报
          wx.navigateTo({
            url: '../../pages/main/servicedetailseven?flag=5'
          })
        }
        break;
      case "12":
        if (index == 0) {
          wx.navigateTo({ //资质评估
            url: '../../pages/main/servicedetailfour?flag=8'
          })
        }
        if (index == 1) { //讲座
          wx.navigateTo({
            url: '/pages/main/servicedetail?flag=1'
          })
        }
        if (index == 2) { //教育工坊
          wx.navigateTo({
            url: '../../pages/main/servicedetailtwo?flag=11'
          })
        }

        if (index == 3) { //全方位评测
          // 弹窗
          this.evaluationServiceClick();
        }
        if (index == 4) { //报告解读
          wx.navigateTo({
            url: '../../pages/main/servicedetailthree?flag=18'
          })
        }
        if (index == 5) { //专家咨询
          wx.navigateTo({
            url: '../../pages/main/servicedetailthree?flag=12'
          })
        }
        if (index == 6) { //报名辅导
          wx.navigateTo({
            url: '../../pages/main/servicedetailseven?flag=13'
          })
        }
        if (index == 7) { //应试指导
          wx.navigateTo({
            url: '../../pages/main/servicedetailseven?flag=14'
          })
        }
        if (index == 8) { //志愿填报
          wx.navigateTo({
            url: '../../pages/main/servicedetailseven?flag=5'
          })
        }
    }
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
              pro_id: that.data.data.id
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
                  content: '为确保购卡成功后的正常使用，请先去绑定个人手机号码!',
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
    if (options.id != 'undefined') {
      id = options.id
    }
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
          that.setData({
            data: response.data[that.data.selectedIndex],
            authdata: response.data[that.data.selectedIndex].auth,
            membershipProcess: response.data[that.data.selectedIndex].flow,
            membershipProcessSize: response.data[that.data.selectedIndex].flow.length,
            applicableObject: '适用对象：' + response.data[that.data.selectedIndex].face_to,
            purchaseHints: response.data[that.data.selectedIndex].tips,
            introduction: response.data[that.data.selectedIndex].intro
          })
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
                that.setData({
                  data: response.data[that.data.selectedIndex],
                  authdata: response.data[that.data.selectedIndex].auth,
                  membershipProcess: response.data[that.data.selectedIndex].flow,
                  membershipProcessSize: response.data[that.data.selectedIndex].flow.length,
                  applicableObject: '适用对象：' + response.data[that.data.selectedIndex].face_to,
                  purchaseHints: response.data[that.data.selectedIndex].tips,
                  introduction: response.data[that.data.selectedIndex].intro
                })
              }
            },
            fail: function(res) {
              wx.hideLoading()
            }
          })
          // let pages = getCurrentPages(); // 当前页面
          // let beforePage = pages[pages.length - 2]; // 前一个页面
          // beforePage.onLoad()
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
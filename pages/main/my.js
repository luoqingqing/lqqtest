const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../resources/head_portrait.png',
    name: '未绑定',
    bindedPhoneNum: '',
    collectionNum: 0,
    appointmentNum: 0,
    purchaseNum: 0,
    evaluationNum: 0
  },
  headPortraitClick: function(res) {
    if (app.access_token != null) {
      wx.navigateTo({
        url: '../../pages/main/personalinformation'
      })
    }
  },
  //我的收藏
  // collectionClick: function(res) {
  //   if (app.access_token != null) {
  //     wx.navigateTo({
  //       url: '../../pages/main/collection'
  //     })
  //   }
  // },
  //我的预约
  appointmentClick: function(res) {
    if (app.access_token != null) {
      wx.navigateTo({
        url: '../../pages/main/appointment'
      })
    }

  },
  //我的购买
  purchaseClick: function(res) {
    if (app.access_token != null) {
      wx.navigateTo({
        url: '../../pages/main/purchase'
      })
    }
  },
  //我的测评
  evaluationClick: function(res) {
    if (app.access_token != null) {
      wx.navigateTo({
        url: '../../pages/main/evaluation'
      })
    }
  },
  membershipUpgradeClick: function(res) {
    if (app.data.userInfo != null) {
      wx.navigateTo({
        url: '../../pages/main/membershipupgrade?id=0'
      })
    }

  },
  bindingPhoneNumClick: function(res) {
    if (app.access_token != null) {
      wx.navigateTo({
        url: '../../pages/main/bindingphonenum'
      })
    }
  },
  systemNotificationClick: function(res) {
    if (app.access_token != null) {
      wx.navigateTo({
        url: '../../pages/main/systemnotification'
      })
    }
  },
  contactCustomerServiceClick: function(res) {
    wx.showModal({
      content: '确认拨打客服电话？',
      confirmColor: '#1F3773',
      success: function(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '400-999-6590'
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  aboutUsClick: function(res) {
    if (app.access_token != null) {
      wx.navigateTo({
        url: '../../pages/main/aboutus'
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    if (app.data.userInfo == null) {
      //查看是否授权以及获取用户微信名称和微信头像
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            //没有权限，让用户去绑定开启权限
            wx.showModal({
              content: '您还未绑定微信或者绑定已失效,请重新绑定！',
              confirmText: '去绑定',
              cancelText: '暂不绑定',
              success: function(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../../pages/main/bindingwechat'
                  })
                } else if (res.cancel) {
                  //that.getUserInfo()
                }
              }
            })
          } else {
            //已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                app.data.avatarUrl = res.userInfo.avatarUrl
                app.data.nickName = res.userInfo.nickName
                that.getUserInfo()
              }
            })
          }
        }
      })
    } else {
      that.getUserInfo()
    }
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
    let that = this
    wx.request({
      url: app.data.baseUrl + 'getUserInfo',
      method: 'GET',
      data: {
        access_token: app.access_token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        let response = res.data
        wx.stopPullDownRefresh()
        if (response.ret == 0) {
          app.data.userInfo = response.data
          if (app.data.userInfo.head_img == null) {
            //未绑定
            wx.showModal({
              content: '您还未绑定微信号，部分服务暂时无法使用！是否前去绑定微信号',
              confirmText: '去绑定',
              cancelText: '暂不绑定',
              success: function(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../../pages/main/bindingwechat'
                  })
                } else if (res.cancel) {

                }
              }
            })
          } else {
            //已绑定
            if (app.data.userInfo.tel != null) {
              that.setData({
                avatarUrl: app.data.avatarUrl,
                name: app.data.nickName,
                identity: app.data.userInfo.member,
                appointmentNum: app.data.userInfo.a_num,
                bindedPhoneNum: app.data.userInfo.tel,
                purchaseNum: app.data.userInfo.buy_num,
                evaluationNum: app.data.userInfo.e_num
              })
            } else {
              that.setData({
                avatarUrl: app.data.avatarUrl,
                name: app.data.nickName,
                identity: app.data.userInfo.member,
                appointmentNum: app.data.userInfo.a_num,
                purchaseNum: app.data.userInfo.buy_num,
                evaluationNum: app.data.userInfo.e_num
              })
            }
          }
        } else {
          //ret非0
          wx.showToast({
            title: response.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function(res) {
        wx.stopPullDownRefresh()
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })

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
  //获取用户code和其他个人信息
  getUserInfo: function() {
    let that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.data.baseUrl + 'getUserInfo',
      method: 'GET',
      data: {
        access_token: app.access_token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        let response = res.data
        wx.hideLoading()
        if (response.ret == 0) {
          app.data.userInfo = response.data
          /*
          "id": 5,
		      "name": "任河洲",
		      "usertype": null,
		      "create_time": "1970-01-01 08:00:00",
		      "state": null,
		      "sex": 0,
		      "birthday": "1990-01-01",
		      "email": "577119371@qq.com",
		      "school": "中和中学",
		      "idcard": null,
		      "tel": "15928818892",
		      "wechat_accesstoken": "653583bd-cbcc-90f2-1494-5ba1bda54c19",
		      "wechat_accesstoken_duetime": "2018-09-26 11:05:51",
		      "login_time": "2018-09-18 23:03:51",
		      "open_id": "oDv0Y41vMzLV4hWuI_uK9K0PuaaE",
		      "head_img":   "https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTI8F5SHGzc3AQhu4yx8bZbbt1vU2Cyc3EKa3HYN2jduCViaUubfLIZC517ZibxIBiauGzJsicicuptkL1w\/132",
		     "scope": "1"
          */
          if (app.data.userInfo.head_img == null) {
            //未绑定
            wx.showModal({
              content: '您还未绑定微信号，部分服务暂时无法使用！是否前去绑定微信号',
              confirmText: '去绑定',
              cancelText: '暂不绑定',
              success: function(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../../pages/main/bindingwechat'
                  })
                } else if (res.cancel) {

                }
              }
            })
          } else {
            //已绑定
            if (app.data.userInfo.tel != null) {
              that.setData({
                avatarUrl: app.data.avatarUrl,
                name: app.data.nickName,
                identity: app.data.userInfo.member,
                appointmentNum: app.data.userInfo.a_num,
                bindedPhoneNum: app.data.userInfo.tel,
                purchaseNum: app.data.userInfo.buy_num,
                evaluationNum: app.data.userInfo.e_num
              })
            } else {
              that.setData({
                avatarUrl: app.data.avatarUrl,
                name: app.data.nickName,
                identity: app.data.userInfo.member,
                appointmentNum: app.data.userInfo.a_num,
                purchaseNum: app.data.userInfo.buy_num,
                evaluationNum: app.data.userInfo.e_num
              })
            }
          }
        } else {
          //ret非0
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
  }

})
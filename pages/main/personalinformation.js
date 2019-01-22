const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    account: '加载中',
    realName: null,
    sex: '男',
    array: ['男', '女'],
    birthdaydate: '1990-01-01',
    region: '请选择学校所在区域',
    schoolName: null
  },
  getRealName: function(res) {
    this.data.realName = res.detail.value
  },
  bindSexChange: function(res) {
    this.setData({
      sex: this.data.array[res.detail.value]
    })
  },
  bindDateChange: function(res) {
    this.setData({
      birthdaydate: res.detail.value
    })
  },
  bindRegionChange: function(res) {
    this.setData({
      region: res.detail.value[0] + res.detail.value[1] + res.detail.value[2]
    })
  },
  getSchoolName: function(res) {
    this.data.schoolName = res.detail.value
  },
  submit: function(res) {
    let that = this
    if (that.data.realName == null) {
      wx.showToast({
        title: '真实姓名不能为空',
        icon: 'none'
      })
      return
    }
    if (that.data.sex == null) {
      wx.showToast({
        title: '性别不能为空',
        icon: 'none'
      })
      return
    }
    if (that.data.region == '请选择学校所在区域') {
      wx.showToast({
        title: '学校所在区域不能为空',
        icon: 'none'
      })
      return
    }
    if (that.data.schoolName == null) {
      wx.showToast({
        title: '孩子所在学校名称不能为空',
        icon: 'none'
      })
      return
    }
    //校验完成，上传数据
    wx.showLoading({
      title: '上传用户资料中...',
    })
    wx.request({
      url: app.data.baseUrl + 'completeInfo',
      method: 'GET',
      data: {
        access_token: app.access_token,
        name: that.data.realName,
        sex: that.data.sex,
        birthday: that.data.birthdaydate,
        region: that.data.region,
        school: that.data.schoolName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        let response = res.data
        wx.hideLoading()
        if (response.ret == 0) {
          wx.showToast({
            title: '个人信息提交成功！',
            icon: 'none',
            duration: 2000
          })
          let pages = getCurrentPages(); // 当前页面
          let beforePage = pages[pages.length - 2]; // 前一个页面
          beforePage.onLoad() // 执行前一个页面的onLoad方法，刷新数据
          wx.navigateBack({
            delta: 1
          })
        } else if (response.ret == 806) {
          //还未绑定微信
          wx.showModal({
            content: '您还未绑定微信,无法上传个人信息。请先去绑定！',
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
   * realName: null,
    sex: '男',
    index: 0,
    array: ['男', '女'],
    email: null,
    birthdaydate: '1990-01-01',
    phoneNum: null,
    verifying_code_prompt: '获取验证码',
    verifyingCode: null,
    schoolName: null
   * 生命周期函数--监听页面加载
   * "sex": null,
		"email": null,
		"brithday": null,
		"tel": null,
		"school": null,
   */
  onLoad: function(options) {
    if (app.data.userInfo != null) {
      if (app.data.userInfo.sex != null) {
        this.data.sex = app.data.userInfo.sex
      }
      if (app.data.userInfo.birthday != null) {
        this.data.birthdaydate = app.data.userInfo.birthday
      }
      if (app.data.userInfo.region != null) {
        this.data.region = app.data.userInfo.region
      }
      this.setData({
        account: app.data.nickName,
        realName: app.data.userInfo.realname,
        sex: this.data.sex,
        birthdaydate: this.data.birthdaydate,
        phoneNum: app.data.userInfo.tel,
        region: this.data.region,
        schoolName: app.data.userInfo.school
      })
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
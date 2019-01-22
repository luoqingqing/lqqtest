const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prompt_display: 'none',
    current: '1',
    data: []
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    })
    wx.startPullDownRefresh()
  },
  itemClick: function(res) {
    let that = this
    let clazz_id = res.currentTarget.dataset.clazzid
    let a_id = res.currentTarget.dataset.aid
    wx.showModal({
      content: '是否确认取消此次预约？',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '取消预约中...',
          })
          wx.request({
            url: app.data.baseUrl + 'cancel_a',
            method: 'GET',
            data: {
              access_token: app.access_token,
              clazz_id: clazz_id,
              a_id: a_id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              wx.hideLoading()
              let response = res.data
              if (response.ret == 0) {
                wx.showToast({
                  title: '预约取消成功',
                  icon: 'none'
                })
                let pages = getCurrentPages(); // 当前页面
                let beforePage = pages[pages.length - 2]; // 前一个页面
                beforePage.onLoad()
                that.getAppointmentDetail()
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
    wx.startPullDownRefresh()
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
    this.getAppointmentDetail()
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
  getAppointmentDetail: function(res) {
    let that = this
    wx.request({
      url: app.data.baseUrl + 'myAppointment',
      method: 'GET',
      data: {
        access_token: app.access_token,
        state: that.data.current //1代表待确认，2代表预约成功，3代表已完成,4代表已取消
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.stopPullDownRefresh()
        let response = res.data
        if (response.ret == 0) {
          if (response.data.length == 0) {
            that.setData({
              prompt_display: 'block',
              data: response.data
            })
          } else {
            that.setData({
              prompt_display: 'none',
              data: response.data
            })
          }
        }
      },
      fail: function(res) {
        wx.stopPullDownRefresh()
      }
    })
  }
})
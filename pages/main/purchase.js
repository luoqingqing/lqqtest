const app = getApp()
let flag = 1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    prompt_display: 'none',
    current: '1',
    data: []
  },
  // handleChange({
  //   detail
  // }) {
  //   flag = detail.key
  //   this.setData({
  //     current: detail.key
  //   })
  //   wx.startPullDownRefresh()
  // },
  itemClick: function(res) {
    let index = res.currentTarget.dataset.index
    if (this.data.data[index].flag ==''||this.data.data[index].flag==null) {
      wx.navigateTo({
        url: '../../pages/main/membershipupgrade?id=' + this.data.data[index].id
      })
    } else {
      wx.navigateTo({
        url: '../../pages/main/servicedetailfive?flag=' + this.data.data[index].flag
      })
    }
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
      url: app.data.baseUrl + 'buy_list',
      method: 'GET',
      data: {
        access_token: app.access_token
        // flag: flag
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
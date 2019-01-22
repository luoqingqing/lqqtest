const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.major
    })
    let college_no = options.college_no
    let major_no = options.major_no
    let that = this
    wx.request({
      url: app.data.baseUrl + 'score_info',
      method: 'GET',
      data: {
        college_id: college_no,
        major_no: major_no
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.stopPullDownRefresh()
        let response = res.data
        if (response.ret == 0) {
          that.setData({
            data: response.data
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
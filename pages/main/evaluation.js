const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    prompt_display: 'none',
    data: []
  },
  itemClick: function(res) {
    let that = this
    let index = res.currentTarget.dataset.index
    wx.navigateTo({
      url: '../../pages/main/webview?flag=3&url=' + that.data.data[index].url + "&t=" + that.data.data[index].t + "&r=" + that.data.data[index].r + "&s=" + that.data.data[index].s + "&chan=" + that.data.data[index].chan + "&uid=" + that.data.data[index].uid + "&uname=" + that.data.data[index].uname +
        "&tid=" + that.data.data[index].tid + "&cid=" + that.data.data[index].cid + "&cname=" + that.data.data[index].cname
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
    let that = this
    wx.request({
      url: app.data.baseUrl + 'a_myeva',
      method: 'GET',
      data: {
        access_token: app.access_token
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
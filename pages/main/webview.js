const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let flag = options.flag
    if (flag == 0) {
      //来自于测评列表点击
      let url = options.url + "?t=" + options.t + "&r=" + options.r + "&s=" + options.s + "&chan=" + options.chan + "&uid=" + options.uid + "&uname=" + encodeURI(options.uname) +
        "&tid=" + options.tid + "&cid=" + options.cid + "&cname=" + options.cname
      wx.setNavigationBarTitle({
        title: '测评',
      })
      that.setData({
        url: url
      })
    } else if (flag == 1) {
      //来自于首页
      wx.setNavigationBarTitle({
        title: '高考资讯',
      })
      that.setData({
        url: app.data.webviewUrl
      })
    } else if (flag == 2) {
      //来自于首页
      wx.setNavigationBarTitle({
        title: '产品介绍',
      })
      that.setData({
        url: app.data.webviewUrl
      })
    } else if (flag == 3) {
      //来自于我的测评
      let url = options.url + "?t=" + options.t + "&r=" + options.r + "&s=" + options.s + "&chan=" + options.chan + "&uid=" + options.uid + "&uname=" + encodeURI(options.uname) +
        "&tid=" + options.tid + "&cid=" + options.cid + "&cname=" + options.cname
      wx.setNavigationBarTitle({
        title: '测评结果',
      })
      that.setData({
        url: url
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
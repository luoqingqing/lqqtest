const app = getApp()
var i=0;
var array=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyProfile: '加载中',
    companyStrength: '加载中',
    contactInformation: '加载中',
    contacts: '加载中',
    address: '加载中'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.data.baseUrl + 'aboutus',
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
          that.setData({
            companyProfile: response.data[0].intro,
            companyStrength: response.data[0].intro2,
            contactInformation: response.data[0].tel,
            contacts: response.data[0].linkman,
            address: response.data[0].address
          })
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
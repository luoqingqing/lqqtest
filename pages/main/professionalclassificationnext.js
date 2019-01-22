const app = getApp()
let id = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prompt_display: 'none',
    data: []
  },
  itemClick: function(res) {
    let majorno = res.currentTarget.dataset.majorno
    wx.navigateTo({
      url: '../../pages/main/universityinformation?search=null&majorno=' + majorno
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    id = options.id
    let title = options.title
    wx.setNavigationBarTitle({
      title: title
    })
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
      url: app.data.baseUrl + 'major_list',
      method: 'GET',
      data: {
        major_no: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        let response = res.data
        wx.stopPullDownRefresh()
        if (response.ret == 0) {
          if (response.data.data == 0) {
            that.setData({
              prompt_display: 'block',
              data: response.data.data
            })
          } else {
            that.setData({
              prompt_display: 'none',
              data: response.data.data
            })
          }
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

  }
})
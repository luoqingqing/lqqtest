const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: '1',
    info: null,
    professionalData: []
  },

  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    })
  },
  itemClick: function(res) {
    let major_no = res.currentTarget.dataset.majorno
    let major = res.currentTarget.dataset.major
    wx.navigateTo({
      url: '../../pages/main/schoolprofessionalscore?college_no=' + this.data.info.id + "&major_no=" + major_no +"&major="+major
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let college_id = options.college_id
    let that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.data.baseUrl + 'college_info',
      method: 'GET',
      data: {
        college_id: college_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading()
        let response = res.data
        if (response.ret == 0) {
          wx.setNavigationBarTitle({
            title: response.data.info.college
          })
          that.setData({
            info: response.data.info,
            professionalData: response.data.set_major
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
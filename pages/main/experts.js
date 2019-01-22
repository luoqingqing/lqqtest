const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    prompt_display: 'none',
    current: '1',
    imgUrls: [],
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
    // let id = res.currentTarget.dataset.id
    // wx.navigateTo({
    //   url: '../../pages/main/teacherintroduction?id=' + id
    // })
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
      url: app.data.baseUrl + 'expert_team',
      method: 'GET',
      data: {
        degree: that.data.current //1代表创人团队，2代表教授，3代表副教授，4代表讲师
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.stopPullDownRefresh()
        let response = res.data
        if (response.ret == 0) {
          if (response.data.team.length == 0) {
            that.setData({
              prompt_display: 'block',
              data: response.data.team,
              imgUrls: response.data.banner
            })
          } else {
            that.setData({
              prompt_display: 'none',
              data: response.data.team,
              imgUrls: response.data.banner
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
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: null,
    name: '加载中',
    birthday: '加载中',
    education: '加载中',
    school: '加载中',
    personalProfile: '加载中',
    lessonIntroduction: '加载中',
    classVideo: []
  },
  itemClick: function(res) {
    let that = this
    let index = res.currentTarget.dataset.index
    if (this.data.classVideo[index].flag == 1) {
      //代表讲座和工作坊
      wx.navigateTo({
        url: '../../pages/main/servicedetail?flag=' + that.data.classVideo[index].type + '&type_rank=' + that.data.classVideo[index].type_rank
      })
    } else if (this.data.classVideo[index].flag == 2) {
      //其它
      wx.navigateTo({
        url: '../../pages/main/servicedetailtwo?flag=' + that.data.classVideo[index].type
      })
    }
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
      url: app.data.baseUrl + 'tea_detail',
      method: 'GET',
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.hideLoading()
        let response = res.data
        if (response.ret == 0) {
          that.setData({
            imgUrl: response.data.tea_info.img_url,
            name: response.data.tea_info.name,
            birthday: '暂无数据',
            education: response.data.tea_info.degree,
            school: '暂无数据',
            personalProfile: response.data.tea_info.intro
          })
        }
      },
      fail: function(res) {
        wx.hideLoading()
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
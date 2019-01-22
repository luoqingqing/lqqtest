const app = getApp()
let page = 1
let majorno = null
let search = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    prompt_display: 'none',
    data: []
  },
  itemClick: function(res) {
    let college_id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/main/universitydetail?college_id=' + college_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    majorno = options.majorno
    search = options.search
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
    page = 1
    this.getInfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    page++
    this.getInfo()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getInfo: function() {
    let that = this
    wx.request({
      url: app.data.baseUrl + 'college_list',
      method: 'GET',
      data: {
        major_no: majorno,
        search: search,
        page: page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        let response = res.data
        wx.stopPullDownRefresh()
        if (response.ret == 0) {
          if (response.data == 0) {
            if (page == 1) {
              that.setData({
                prompt_display: 'block',
                data: response.data
              })
            }
          } else {
            that.setData({
              prompt_display: 'none',
              data: that.data.data.concat(response.data)
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
  }
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    prompt_display: 'none',
    inputtext: null,
    searchdata: []
  },
  getInput: function(res) {
    this.data.inputtext = res.detail.value
  },
  searchClick: function(res) {
    let that = this
    if (this.data.inputtext != null) {
      let search = new Object()
      search.title = that.data.inputtext
      that.data.searchdata.push(search)
      wx.setStorage({
        key: "searchdata",
        data: that.data.searchdata
      })
      wx.redirectTo({
        url: '../../pages/main/universityinformation?majorno=null&search=' + that.data.inputtext
      })
    } else {
      wx.showToast({
        title: '请输入搜索信息!',
        icon: 'none',
        duration: 2000
      })
    }
  },
  itemClick: function(res) {
    let that = this
    let index = res.currentTarget.dataset.index
    wx.redirectTo({
      url: '../../pages/main/universityinformation?majorno=null&search=' + that.data.searchdata[index].title
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getStorage({
      key: 'searchdata',
      success(res) {
        that.setData({
          searchdata: res.data
        })
      }
    })
    // let that = this
    // wx.showLoading({
    //   title: '加载中...',
    // })
    // wx.request({
    //   url: app.data.baseUrl + 'getUserInfo',
    //   method: 'GET',
    //   data: {
    //     access_token: app.access_token
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function(res) {
    //     wx.hideLoading()
    //     let response = res.data
    //     if (response.ret == 0) {

    //     } else {
    //       //ret非0
    //       wx.showToast({
    //         title: response.msg,
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   },
    //   fail: function(res) {
    //     wx.hideLoading()
    //     wx.showToast({
    //       title: res.errMsg,
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })

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
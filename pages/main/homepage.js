const app = getApp()
Page({
  /**
   * 页面的初始数据
   * 高考资讯，高校搜索，专家库，产品特色
   */
  data: {
    newstext: '加载中',
    universitySearchText: '加载中',
    expertstext: '加载中',
    productFeaturestext: '加载中',
    newsurl: null,
    productFeaturesurl: null,
    imgUrls: [],
    product: []
  },
  /**
   * 点击事件监听
   */
  banner_onclick: function(event) {

  },
  newsClick: function(res) {
    if (this.data.newsurl == null) {
      return
    }
    app.data.webviewUrl = this.data.newsurl
    wx.navigateTo({
      url: '../../pages/main/webview?flag=1'
    })
  },
  universitySearchClick: function(res) {
    wx.navigateTo({
      url: '../../pages/main/professionalclassification'
    })
  },
  expertsClick: function(res) {
    wx.navigateTo({
      url: '../../pages/main/experts'
    })
  },
  productFeaturesClick: function(res) {
    if (this.data.productFeaturesurl == null) {
      return
    }
    app.data.webviewUrl = this.data.productFeaturesurl
    wx.navigateTo({
      url: '../../pages/main/webview?flag=2'
    })
    // wx.navigateTo({
    //   url: '../../pages/main/productfeatures',
    // })
  },
  memcardClick: function(res) {
    let index = res.currentTarget.dataset.index
    wx.navigateTo({
      url: '../../pages/main/memberdetail?id=' + this.data.product[index].id
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
    var that = this
    wx.request({
      url: app.data.baseUrl + 'i_index',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      fail: function(e) {
        wx.stopPullDownRefresh()
      },
      success: function(res) {
        wx.stopPullDownRefresh()
        let response = res.data
        if (response.ret == 0) {
          that.setData({
            newstext: response.data.link1.title,
            universitySearchText: '高校搜索',
            expertstext: '专家库',
            productFeaturestext: response.data.link2.title,
            newsurl: response.data.link1.url,
            productFeaturesurl: response.data.link2.url,
            imgUrls: response.data.banner,
            product: response.data.product
          })
        }
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
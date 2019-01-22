const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    schoolSystem: '本科',
    schoolSystemData: ['本科'],
    selectedPosition: 0,
    alldata: [], // 1本科 2专科
    typedata: [],
    detaildata: []
  },
  bindschoolSystemChange: function(res) {
    let that = this
    this.setData({
      schoolSystem: this.data.schoolSystemData[res.detail.value]
    })
    if (this.data.schoolSystem == '本科') {
      for (let i = 0; i < that.data.alldata.length; i++) {
        if (that.data.alldata[i].flag == 1) {
          //本科
          that.setData({
            typedata: that.data.alldata[i].data,
            detaildata: that.data.alldata[i].data[0].content,
            selectedPosition: 0
          })
        }
      }
    } else if (this.data.schoolSystem == '专科') {
      for (let i = 0; i < that.data.alldata.length; i++) {
        if (that.data.alldata[i].flag == 2) {
          //专科
          that.setData({
            typedata: that.data.alldata[i].data,
            detaildata: that.data.alldata[i].data[0].content,
            selectedPosition: 0
          })
        }
      }
    }
  },

  itemClick: function(res) {
    wx.navigateTo({
      url: '../../pages/main/universityinformation'
    })
  },
  searchClick: function(res) {
    wx.navigateTo({
      url: '../../pages/main/searchuniversity'
    })
  },
  typedataClick: function(res) {
    let index = res.currentTarget.dataset.index
    this.setData({
      selectedPosition: index,
      detaildata: this.data.typedata[index].content
    })
  },
  detaildataClick: function(res) {
    let id = res.currentTarget.dataset.id
    let title = res.currentTarget.dataset.title
    wx.navigateTo({
      url: '../../pages/main/professionalclassificationnext?id=' + id + '&title=' + title
    })
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
      url: app.data.baseUrl + 'major_query',
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
          that.data.alldata = response.data
          for (let i = 0; i < that.data.alldata.length; i++) {
            if (that.data.alldata[i].flag == 1) {
              //本科
              that.setData({
                typedata: that.data.alldata[i].data,
                detaildata: that.data.alldata[i].data[0].content
              })
            }
          }
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
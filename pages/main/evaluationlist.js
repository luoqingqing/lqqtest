const app = getApp()
let role = null //1:学生；2：家长
let p_type = null //1:高考；2：自主招生

Page({
  /**
   * 页面的初始数据
   * //available：2代表已预约，1代表可以预约，0代表不能预约，没购买该课
   */
  data: {
    prompt_display: 'none',
    bgcolordata: [],
    data: []
  },
  itemClick: function(res) {
    let index = res.currentTarget.dataset.index
    let that = this
    if (that.data.data[index].available == 0) {
      wx.showToast({
        title: '套餐权限不足！',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: app.data.baseUrl + 'e_url',
      method: 'GET',
      data: {
        access_token: app.access_token,
        role: role,
        id: that.data.data[index].id,
        t_id: that.data.data[index].t_id,
        role_name: that.data.data[index].role_name
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.stopPullDownRefresh()
        let response = res.data
        if (response.ret == 0) {
          wx.navigateTo({
            url: '../../pages/main/webview?flag=0&url=' + response.data.url + "&t=" + response.data.t + "&r=" + response.data.r + "&s=" + response.data.s + "&chan=" + response.data.chan + "&uid=" + response.data.uid + "&uname=" + response.data.uname +
              "&tid=" + response.data.tid + "&cid=" + response.data.cid + "&cname=" + response.data.cname
          })
        } else if (response.ret == -2014) {
          //用户资料未完善时调用
          wx.showModal({
            content: '为了更好地了解您和孩子，需要填写个人信息后才能进行测评，请前去完善个人资料！',
            cancelText: '暂不测评',
            confirmText: '去完善',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../../pages/main/personalinformation'
                })
              } else {

              }
            }
          })
        } else {
          wx.showToast({
            title: response.msg,
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        wx.stopPullDownRefresh()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options != null) {
      role = options.role
      p_type = options.p_type
    }
    //1:学生；2：家长
    if (role == 1) {
      wx.setNavigationBarTitle({
        title: '学生测评',
      })
    } else if (role == 2) {
      wx.setNavigationBarTitle({
        title: '家长测评',
      })
    }
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
      url: app.data.baseUrl + 'e_list',
      method: 'GET',
      data: {
        access_token: app.access_token,
        role: role,
        p_type: p_type
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.stopPullDownRefresh()
        let response = res.data
        if (response.ret == 0) {
          that.setData({
            data: response.data
          })
        } else {
          wx.showToast({
            title: response.msg,
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        wx.stopPullDownRefresh()
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
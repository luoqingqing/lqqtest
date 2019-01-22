
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prompt_display: 'none',
    data:[
      {
        id:'16954645',
        img:'http:\/\/182.131.1.6:8172\/Book\/auto_lib\/9787563383856\/9776227afe50bdf3acf53e77fa1b60aa.jpg',
        title:'一对一心理咨询',
        teacher:'RicherRen',
        classTime:'2018-9-9 17:00:00',
        address:'四川省成都市远大都是风机'
      },
      {
        id: '16954645',
        img: 'http:\/\/182.131.1.6:8172\/Book\/auto_lib\/9787563383856\/9776227afe50bdf3acf53e77fa1b60aa.jpg',
        title: '一对一心理咨询',
        teacher: 'RicherRen',
        classTime: '2018-9-9 17:00:00',
        address: '四川省成都市远大都是风机'
      },
      {
        id: '16954645',
        img: 'http:\/\/182.131.1.6:8172\/Book\/auto_lib\/9787563383856\/9776227afe50bdf3acf53e77fa1b60aa.jpg',
        title: '一对一心理咨询',
        teacher: 'RicherRen',
        classTime: '2018-9-9 17:00:00',
        address: '四川省成都市远大都是风机'
      },
      {
        id: '16954645',
        img: 'http:\/\/182.131.1.6:8172\/Book\/auto_lib\/9787563383856\/9776227afe50bdf3acf53e77fa1b60aa.jpg',
        title: '一对一心理咨询',
        teacher: 'RicherRen',
        classTime: '2018-9-9 17:00:00',
        address: '四川省成都市远大都是风机'
      },
      {
        id: '16954645',
        img: 'http:\/\/182.131.1.6:8172\/Book\/auto_lib\/9787563383856\/9776227afe50bdf3acf53e77fa1b60aa.jpg',
        title: '一对一心理咨询',
        teacher: 'RicherRen',
        classTime: '2018-9-9 17:00:00',
        address: '四川省成都市远大都是风机'
      },
      {
        id: '16954645',
        img: 'http:\/\/182.131.1.6:8172\/Book\/auto_lib\/9787563383856\/9776227afe50bdf3acf53e77fa1b60aa.jpg',
        title: '一对一心理咨询',
        teacher: 'RicherRen',
        classTime: '2018-9-9 17:00:00',
        address: '四川省成都市远大都是风机'
      }
    ]
  },
  itemClick:function(res){
    let id = res.currentTarget.id
    wx.navigateTo({
      url: '../../pages/main/servicedetail'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
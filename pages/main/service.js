const app = getApp()
let p_type = 1 //1表示统招；2表示自主招生

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dialogVisible: false,
    actions: [{
        name: '我是学生',
        color: '#2d8cf0',
      },
      {
        name: '我是家长',
        color: '#19be6b'
      },
      {
        name: '取消',
        color: '#666666'
      }
    ],
    current: 1
  },
  actionsClick({
    detail
  }) {
    let index = detail.index
    let that = this
    if (index === 0) {
      //我是学生
      wx.navigateTo({
        url: '../../pages/main/evaluationlist?role=1&p_type=' + p_type
      })
    } else if (index === 1) {
      //我是家长
      wx.navigateTo({
       url: '../../pages/main/evaluationlist?role=2&p_type=' + p_type
      })
    }
    this.setData({
      dialogVisible: false
    })
  },
  //tab点击事件
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    })
  },
  //one：表示讲座；two：表示工作坊；three：表示预约不需要选择时间；four：表示自招评估；five：表示基因检测和生涯体验
  psychologialEvaluationClick: function(res) {
    //心理测评
    p_type = 1
    this.setData({
      dialogVisible: true
    })
  },
  lectureClick: function(res) {
    //讲座
    wx.navigateTo({
      url: '../../pages/main/servicedetail?flag=1'
    })
  },
  zkLectureClick: function(res) {
    //讲座
    wx.navigateTo({
      url: '../../pages/main/servicedetail?flag=10'
    })
  },
  examinatioAndInterpretationClick: function(res) {
    //报告解读
    wx.navigateTo({
      url: '../../pages/main/servicedetailthree?flag=17'
    })
  },
  zkExaminatioAndInterpretationClick: function(res) {
    //报告解读
    wx.navigateTo({
      url: '../../pages/main/servicedetailthree?flag=18'
    })
  },
  consultationClick: function(res) {
    //按需咨询
    wx.navigateTo({
      url: '../../pages/main/servicedetailthree?flag=3'
    })
  },
  zkConsultationClick: function(res) {
    //按需咨询
    wx.navigateTo({
      url: '../../pages/main/servicedetailthree?flag=12'
    })
  },
  workshopsClick: function(res) {
    //教育工坊
    wx.navigateTo({
      url: '../../pages/main/servicedetailtwo?flag=4'
    })
  },
  zkWorkshopsClick: function(res) {
    //教育工坊
    wx.navigateTo({
      url: '../../pages/main/servicedetailtwo?flag=11'
    })
  },
  careerExperienceCampClick: function(res) {
    //志愿填报
    wx.navigateTo({
      url: '../../pages/main/servicedetailseven?flag=5'
    })
  },
  zkcareerExperienceCampClick:function(res){
    //志愿填报
    wx.navigateTo({
      url: '../../pages/main/servicedetailseven?flag=20'
    })
  },
  geneDetectionClick: function(res) {
    //基因检测
    wx.navigateTo({
      url: '../../pages/main/servicedetailfive?flag=6'
    })
  },
  zkGeneDetectionClick: function(res) {
    //基因检测
    wx.navigateTo({
      url: '../../pages/main/servicedetailfive?flag=15'
    })
  },
  careerExperienceClick: function(res) {
    //生涯体验
    wx.navigateTo({
      url: '../../pages/main/servicedetailsix?flag=7'
    })
  },
  zkCareerExperienceClick: function(res) {
    //生涯体验
    wx.navigateTo({
      url: '../../pages/main/servicedetailsix?flag=16'
    })
  },
  evaluationServiceClick: function(res) {
    //测评服务
    p_type = 2
    this.setData({
      dialogVisible: true
    })
  },
  selfRecruitmentEvaluationClick: function(res) {
    //自招评估
    wx.navigateTo({
      url: '../../pages/main/servicedetailfour?flag=8'
    })
  },
  volunteerServiceClick: function(res) {
    //报名辅导
    wx.navigateTo({
      url: '../../pages/main/servicedetailseven?flag=13'
    })
  },
  // parentalServiceClick: function(res) {
  //   //家长服务
  //   wx.navigateTo({
  //     url: '../../pages/main/servicedetailthree?flag=10'
  //   })
  // },
  // registrationServiceClick: function(res) {
  //   //报名服务
  //   wx.navigateTo({
  //     url: '../../pages/main/servicedetailthree?flag=11'
  //   })
  // },
  examinationServiceClick: function(res) {
    //应试指导
    wx.navigateTo({
      url: '../../pages/main/servicedetailseven?flag=14'
    })
  },
  // disciplineExperienceCampClick: function(res) {
  //   //学科体验
  //   wx.navigateTo({
  //     url: '../../pages/main/servicedetailtwo?flag=13'
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
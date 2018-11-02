Page({

  /**
   * 页面的初始数据
   */
  data: {
    date0:"2018-01-01",
    date1:"2018-01-01",
    date2:"2018-01-01",
    province:"北京市",
    city:"北京市",
    area:"东城区",
    date3:"2018-01-01 00:00",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  click:function(){
    var that = this;
    var pickerdate = this.selectComponent("#pickerdate");
    pickerdate.shows(function (datestring) {
      that.setData({
        date0: datestring,
      })
    });
  },

  clickMore:function(){
    var  that = this;
    var pickerdate = this.selectComponent("#pickerdatemore");
    pickerdate.shows(function (datestring1, datestring2) {
      that.setData({
        date1: datestring1,
        date2: datestring2,
      })
    });
  },

  // 时区部分
  clickRegion: function (e) {
    var pickerregion = this.selectComponent("#pickerregion");
    var that = this;
    that.setData({
      inputDisplay: false,
    })
    pickerregion.shows(function (datestring) {
      that.setData({
        inputDisplay: true,
      })
      if (datestring) {

        var arr = datestring.split("-");
        that.setData({
          province: arr[0],
          city: arr[1],
          area: arr[2]
        })
      }
    });
  },

  // 时间选择
  changeTime:function(){
    var that = this;
    var pickertime = this.selectComponent("#pickertime");
    pickertime.shows(function (datestring) {
      that.setData({
        date3: datestring,
      })
    });
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
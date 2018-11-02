var areaTool = require('../utils/area.js');
var index = [0, 0, 0]
var provinces = areaTool.getProvinces();
var citys = areaTool.getCitys(index[0]);
var areas = areaTool.getAreas(index[0], index[1]);

Component({

  /**
   * 组件的属性列表
   */

  properties: {
    list: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
      }
    },
    show: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changePath) {
        if (newVal) {
          this.rollingup();
        }
        else {
          this.rollingdown();
        }
      }
    },
    name: {
      type: String,
      value: ''
    }
    ,
    value: {
      type: Array,
      value: [0],
      observer: function (newVal, oldVal, changePath) {
        this.data.selectedindex = JSON.parse(JSON.stringify(newVal));
        this.setData({
          selectedindex: this.data.selectedindex,
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animation: {},
    animationData: {},
    selectedindex: [],

    callback: null,
    provinces: provinces,
    citys: areaTool.getCitys(index[0]),
    areas: areaTool.getAreas(index[0], index[1]),
    value: [0, 0, 0],
    province: '北京市',
    city: '北京市',
    area: '东城区'
  },

  attached: function () {
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    this.animation = animation
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hidemodal: function () {
      this.setData({
        show: false,
        value: this.properties.value
      })
      this.data.callback("");
    },
    shows: function (callback) {
      this.setData({
        show: true,
        callback: callback
      })
    },
    confirmmodal: function (e) {
      // this.triggerEvent('myevent', this.data.selectedindex);
      this.setData({ show: false })
      // const val = e.detail.value
      var that = this;
      that.data.callback(that.data.province+"-"+that.data.city+"-"+that.data.area);
    },
    bindChange: function (e) {
      var value = e.detail.value
      var that = this;
      this.setData({
       
      })
      /**
      * 滚动的是省
      * 省改变 市、区都不变
      */
      if (index[0] != value[0]) {
        index = [value[0], 0, 0]
        let selectCitys = areaTool.getCitys(index[0]);
        let selectAreas = areaTool.getAreas(index[0], 0);
        that.setData({
          citys: selectCitys,
          areas: selectAreas,
          value: [index[0], 0, 0],
          province: provinces[index[0]],
          city: selectCitys[0],
          area: selectAreas[0]
        })
      } else if (index[1] != value[1]) {
        /**
         * 市改变了 省不变 区变
         */
        index = [value[0], value[1], 0]
        let selectCitys = areaTool.getCitys(index[0]);
        let selectAreas = areaTool.getAreas(index[0], value[1]);
        that.setData({
          citys: selectCitys,
          areas: selectAreas,
          value: [index[0], index[1], 0],
          province: provinces[index[0]],
          city: selectCitys[index[1]],
          area: selectAreas[0]
        })
      } else if (index[2] != value[2]) {
        /**
         * 区改变了
         */
        index = [value[0], value[1], value[2]]
        let selectCitys = areaTool.getCitys(index[0]);
        let selectAreas = areaTool.getAreas(index[0], value[1]);
        that.setData({
          citys: selectCitys,
          areas: selectAreas,
          value: [index[0], index[1], index[2]],
          province: provinces[index[0]],
          city: selectCitys[index[1]],
          area: selectAreas[index[2]]
        })
      }
    },

    rollingup: function () {
      var that = this;
      that.animation.translate(0, 0).step()
      that.setData({ animationData: that.animation.export() })
    }
    ,
    rollingdown: function () {
      var that = this;
      that.animation.translate(0, "100%").step()
      that.setData({ animationData: that.animation.export() })
    }

  }

})

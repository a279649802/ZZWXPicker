const date = new Date()
const years = []
const months = []
const days = []
const startYear = 1990;
for (let i = startYear; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
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
    value: { "name": "知识社区", "checked": true },
    selectedindex: [],

    // 时间
    years: years,
    months: months,
    days: days,
    value2: [9999, 0, 0],
    callback: null,

    // 新时间选择 (左 + 右)
    // leftChoose:{"year":"2018","month":"3","day":"11"},
    year_L: date.getFullYear(),
    yeartemp_L: date.getFullYear(), // 默认和year一致
    month_L: 1,
    monthtemp_L: 1, // 默认和month一致
    day_L: 1,
    daytemp_L: 1, // 默认和day一致
    chooseLeft: true,

    // rightChoose: { "year": "2018", "month": "3", "day": "11"},
    year_R: date.getFullYear(),
    yeartemp_R: date.getFullYear(), // 默认和year一致
    month_R: 1,
    monthtemp_R: 1, // 默认和month一致
    day_R: 1,
    daytemp_R: 1, // 默认和day一致

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
        value: this.properties.value,
        // 临时被真是数据覆盖
        yeartemp_L: this.data.year_L,
        monthtemp_L: this.data.month_L,
        daytemp_L: this.data.day_L,
        yeartemp_R: this.data.year_R,
        monthtemp_R: this.data.month_R,
        daytemp_R: this.data.day_R,
      })
    },
    shows: function (callback) {
      this.setData({
        show: true,
        callback: callback,
      })
      if (this.data.chooseLeft){
        this.chooseLeft();
      }else{
        this.chooseRight();
      }
    },
    confirmmodal: function (e) {
      // this.triggerEvent('myevent', this.data.selectedindex);
      // this.setData({ show: false })
      // const val = e.detail.value

      this.setData({
        year_L: this.data.yeartemp_L,
        month_L: this.data.monthtemp_L,
        day_L: this.data.daytemp_L,
        year_R: this.data.yeartemp_R,
        month_R: this.data.monthtemp_R,
        day_R: this.data.daytemp_R,
        show: false
      })
      var datastring1 = this.data.yeartemp_L + "-" + (this.data.monthtemp_L > 9 ? this.data.monthtemp_L : "0" + this.data.monthtemp_L) + "-" + (this.data.daytemp_L > 9 ? this.data.daytemp_L : "0" + this.data.daytemp_L);
      var datastring2 = this.data.yeartemp_R + "-" + (this.data.monthtemp_R > 9 ? this.data.monthtemp_R : "0" + this.data.monthtemp_R) + "-" + (this.data.daytemp_R > 9 ? this.data.daytemp_R : "0" + this.data.daytemp_R);
      console.log();
      this.data.callback(datastring1, datastring2);

    },
    bindChange: function (e) {
      const val = e.detail.value
      if (this.data.chooseLeft) { // 左边
        this.setData({
          yeartemp_L: this.data.years[val[0]],
          monthtemp_L: this.data.months[val[1]],
          daytemp_L: this.data.days[val[2]]
        })
      } else {  // 右边
        this.setData({
          yeartemp_R: this.data.years[val[0]],
          monthtemp_R: this.data.months[val[1]],
          daytemp_R: this.data.days[val[2]]
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
    },
    chooseLeft: function () {
      this.setData({
        value2: [this.data.yeartemp_L - startYear, this.data.monthtemp_L - 1, this.data.daytemp_L - 1],
        chooseLeft: true,
      })
    },
    chooseRight: function () {
      this.setData({
        value2: [this.data.yeartemp_R - startYear, this.data.monthtemp_R - 1, this.data.daytemp_R - 1],
        chooseLeft: false,
      })
    }

  }

})

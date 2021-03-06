const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const minutes = []
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
for (let i = 0; i <= 23; i++) {
  hours.push(i)
}
for (let i = 0; i <= 59; i++) {
  minutes.push(i)
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
    year: date.getFullYear(),
    yeartemp: date.getFullYear(), // 默认和year一致
    months: months,
    month: 1,
    monthtemp: 1, // 默认和month一致
    days: days,
    day: 1,
    daytemp: 1, // 默认和day一致

    // 时分
    hours: hours,
    hour: 0,
    hourtemp: 0,
    minutes: minutes,
    minute: 0 ,
    minutetemp :0,
    value2: [9999, 1, 1, 0, 0],
    callback: null
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
        yeartemp: this.data.year,
        monthtemp: this.data.month ,
        daytemp: this.data.day,
        hourtemp : this.data.hour,
        minutetemp: this.data.minute,
      })

    },
    shows: function (callback) {
      this.setData({
        show: true,
        callback: callback,
        value2: [this.data.yeartemp - startYear, this.data.monthtemp - 1, this.data.daytemp - 1, this.data.hour,this.data.minute]
      })
    },
    confirmmodal: function (e) {
      // this.triggerEvent('myevent', this.data.selectedindex);
      // this.setData({ show: false })
      // const val = e.detail.value
      var yeartemp = this.data.yeartemp
      var monthtemp = this.data.monthtemp
      var daytemp = this.data.daytemp
      var hourtemp = this.data.hourtemp
      var minutetemp = this.data.minutetemp
      this.data.callback(yeartemp + "-" + (monthtemp > 9 ? monthtemp : "0" + monthtemp) + "-" + (daytemp > 9 ? daytemp : "0" + daytemp) + '  '+  (hourtemp > 9 ? hourtemp : "0" + hourtemp) + ':' +(minutetemp > 9 ? minutetemp : "0" + minutetemp) )
      this.setData({
        year: yeartemp,
        month: monthtemp,
        day: daytemp,
        hour: hourtemp,
        minute: minutetemp,
        show: false
      })
    },
    bindChange: function (e) {
      const val = e.detail.value
      this.setData({
        yeartemp: this.data.years[val[0]],
        monthtemp: this.data.months[val[1]],
        daytemp: this.data.days[val[2]],
        hourtemp: this.data.days[val[3]],
          minutetemp: this.data.days[val[4]]
      })
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

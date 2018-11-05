# ZZWXPicker
#### Introduce :
This component includes time, region, date picker
#### Show results:
![](https://github.com/a279649802/ZZWXPicker/raw/master/ZZWXPicker.gif)  
#### How To Use:
###### Copy the code in the following file
index.js:
```
  click:function(){
    var that = this;
    var pickerdate = this.selectComponent("#pickerdate");
    pickerdate.shows(function (datestring) {
      that.setData({
        date0: datestring,
      })
    });
  },
```
index.json:
```
{
  "usingComponents": {
    "pickerdate": "/pickerdate/pickerdate",
    "pickerdatemore": "/pickerdatemore/pickerdatemore",
    "pickerregion": "/pickerregion/pickerregion",
    "pickertime": "/pickertime/pickertime"
  }}
```
index.html
```
    <pickerdate id="pickerdate" bindchange="changeDate" name="时间选择">
    </pickerdate>
 <pickerdatemore id="pickerdatemore" bindchange="changeDate" name="时间选择">
    </pickerdatemore>
     <pickerregion  id="pickerregion" bindchange="changeRegion" name="地区选择">
    </pickerregion>
       <pickertime  id="pickertime" bindchange="changeDate" name="时间选择">
    </pickertime>
```

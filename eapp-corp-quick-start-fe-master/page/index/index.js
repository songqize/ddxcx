let app = getApp();


//内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
//替换成开发者后台设置的安全域名


import { EnterpriseInfo, authUrl } from "../../util/config.js"

Page({
  data: {
    corpId: '',
    authCode: '',
    userId: '',
    userName: '',
    hideList: true,
    Outertype: 0,
    todayData: "",//现在的日期
    todayOldDay: "",//当天0点日期
    lastdayData: "",//选择三天前或者更早的日期
    tableData: "",
    items: [
      { name: 'day', value: '最近三天', checked: true },
      { name: 'week', value: '最近一周' },
      { name: 'month', value: '最近一个月' },
    ]
  },
  ResultQuery(e) {
    let _this = this;
    let inputValDate = e.detail.value.inputVal;
    let chinese = _this.textVal(inputValDate);
    let HNameVal, WorkNoVal;
    if (chinese > 0) {
      HNameVal = inputValDate
    } else {
      WorkNoVal = inputValDate
    }
    dd.showLoading();
    dd.httpRequest({
      url: authUrl,
      method: 'GET',
      data: {
        action: '04',
        beginRecordDateTime: _this.data.lastdayData,
        endRecordDateTime: _this.data.todayData,
        textHName: HNameVal,
        textWorkNo: WorkNoVal,
      },
      dataType: 'json',
      success: (res) => {

        // console.log('success----', res.data.Data)

        _this.setData({
          tableData: res.data.Data,
        })
      },
      fail: (res) => {
        console.log("httpRequestFail---", res)
        dd.alert({ content: JSON.stringify(res) });
      },
      complete: (res) => {
        dd.hideLoading();
      }

    });
  },
  radioChange: function (e) {
    //  console.log('选择的时间', e.detail.value)
    let _this = this;

    if (e.detail.value == 'day') {
      let DAYDAT = _this.oldData(-3);
      let EndRecordDateTime = DAYDAT;
      this.setData({
        lastdayData: EndRecordDateTime
      })
    } else if (e.detail.value == 'week') {
      let WEEKDAT = _this.oldData(-7);
      let EndRecordDateTime = WEEKDAT;
      this.setData({
        lastdayData: EndRecordDateTime
      })
    } else if (e.detail.value == 'month') {
      let MONTHDAT = _this.oldData(-30);
      let EndRecordDateTime = MONTHDAT;
      this.setData({
        lastdayData: EndRecordDateTime
      })
    }
  },
  textVal: function CLength(str) {
    let re = /[\u4E00-\u9FA5]/g;
    if (re.test(str))
      return str.match(re).length;
    else return 0;
  },
  TypeChange: function (event) {
    let _this = this;
    _this.setData({
      Outertype: event.target.dataset.on
    })
    if (event.target.dataset.on == 0) {
      _this.getData(0);
    } else {
      let DAYDAT = _this.oldData(-3);
      let EndRecordDateTime = DAYDAT;
      this.setData({
        lastdayData: EndRecordDateTime
      })
      _this.getData(1);
    }
  },
  getData: function (type) {
    let _this = this;
    let beginRecordDateTimeDATE;
    dd.showLoading();
    //console.log(_this.data)
    if (type == 0) {
      beginRecordDateTimeDATE = _this.data.todayOldDay;
    } else {
      beginRecordDateTimeDATE = _this.data.lastdayData;
    }

    dd.httpRequest({
      url: authUrl,
      method: 'GET',
      data: {
        action: '04',
        beginRecordDateTime: beginRecordDateTimeDATE,
        endRecordDateTime: _this.data.todayData,
      },
      dataType: 'json',
      success: (res) => {
        // dd.alert({content: "step2"});
        // console.log('success----', res.data.Data)

        _this.setData({
          tableData: res.data.Data,
        })
      },
      fail: (res) => {
        console.log("httpRequestFail---", res)
        dd.alert({ content: JSON.stringify(res) });
      },
      complete: (res) => {
        dd.hideLoading();
      }

    });
  },
  formatDateTime: function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  oldData: function (p_count) {
    var dd = new Date();
    dd.setDate(dd.getDate() + p_count);//获取p_count天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    if (m < 10) {
      m = '0' + m;
    }
    var d = dd.getDate();
    if (d < 10) {
      d = '0' + d;
    }
    return y + "-" + m + "-" + d + " " + "00:00:00";
  },
  onLoad() {

    let _this = this;
    let olddate = new Date();
    let Newdata = _this.formatDateTime(olddate);
    let yy = olddate.getFullYear();
    let mm = olddate.getMonth() + 1;
    let dd = olddate.getDate();

    let DAYDAT = _this.oldData(-3);
    let EndRecordDateTime = DAYDAT;

    _this.setData({
      corpId: app.globalData.corpId,
      todayData: Newdata,
      todayOldDay: yy + "-" + mm + "-" + dd + " " + "00:00:00",
      lastdayData: EndRecordDateTime
    })

    //dd.alert({content: "step1"});


  },
  onReady() {
    // 页面加载完成
    let _this = this;

    console.log(authUrl);
    _this.getData(0);
  },
})

import {EnterpriseInfo,authUrl} from "../../util/config.js"
Page({
  data: {

    infoData: "",
  },
  getData: function (id) {
    //console.log(JSON.stringify(id))
    //http://106.12.119.226//AjaxServer/TabDutyInfoApp.ashx?action=04&textID=AEDEE7A166E3426E9988C6E3223BE510
    let _this = this;
    dd.showLoading();
    dd.httpRequest({
      url: authUrl,
      method: 'GET',
      data: {
        action: '04',
        textID: id
      },
      dataType: 'json',
      success: (res) => {
        // dd.alert({content: "step2"});
        console.log('success----', res.data.Data)

        _this.setData({
          infoData: res.data.Data[0],
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
  onLoad(query) {
    let _this = this;
    let popsData = query;
    _this.getData(popsData.textID);
    // console.log(JSON.stringify(query))
  },
  onReady() {
    // 页面加载完成

  },
});

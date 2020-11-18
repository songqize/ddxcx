// import { Dd_navigateTo } from "../../../util/filter"

Component({
  mixins: [],
  data: {
    tableData: [

      { "code": "2114031991113000K0", "name": "李雪琴", "text": "2020-11-12 08:10:35", "type": "正常" },

      { "code": "21140319911100017", "name": "王建国", "text": "2020-11-12 08:10:35", "type": "异常" },

      { "code": "2114031991121200017", "name": "李诞", "text": "2020-11-12 08:10:35", "type": "正常" },

      { "code": "211403199111200017", "name": "池子", "text": "2020-11-12 08:10:35", "type": "正常" },

      { "code": "21140319911112017", "name": "罗老师", "text": "2020-11-12 08:10:35", "type": "正常" },

      { "code": "21140319911130017", "name": "roke", "text": "2020-11-12 08:10:35", "type": "正常" },
    ]

  },
  props: {
    onCounterPlusOne: function (data) {
      console.log("调用方法", data)
    },
    tableData: ""
  },
  didMount() {
    let _this = this;
    _this.setData({
      listData: _this.props.tableData,
    })
    console.log("加载时的数局", _this.props.tableData)
  },
  didUpdate() {
    let _this = this;
    let tableDataNew = _this.props.tableData;
    this.setData({
      tableData: tableDataNew,
    });
    console.log("更新后的数局", _this.props.tableData)
  },
  NewPage: function (data) {
    // Dd_navigateTo("../../../page/details/details.axml", {
    //   id: data
    // });
    console.log(data)
  },
  didUnmount() { },
  methods: {
    onChanges(e) {
      console.log(e);
    },
  },
});

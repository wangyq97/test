<template>
  <div>
    <!-- <div style="width: 500px; height: 500px" ref="chart"></div> -->
    <el-select
      style="height: 40px"
      @change="selectAll"
      v-model="value"
      multiple
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.label"
        :value="item.id"
      >
        <el-checkbox class="aaa" v-model="item.ischeck"></el-checkbox>
        <span style="margin-left: 8px">{{ item.label }}</span>
      </el-option>
    </el-select>

    <!-- <select v-model="selectList" @change="handNewChange" multiple placeholder="请选择">
      <option v-for="(item,index) in years" :key="index" :value="item" >
        <input type="checkbox" v-model="item.ischecked" >
        <span>{{item}}</span>
      </option>
    </select> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          id: "allSelect",
          label: "全选",
          ischeck: false,
        },
        {
          id: "选项1",
          label: "黄金糕",
          ischeck: false,
        },
        {
          id: "选项2",
          label: "双皮奶",
          ischeck: false,
        },
        {
          id: "选项3",
          label: "蚵仔煎",
          ischeck: false,
        },
        {
          id: "选项4",
          label: "龙须面",
          ischeck: false,
        },
        {
          id: "选项5",
          label: "北京烤鸭",
          ischeck: false,
        },
      ],
      oldOptions:[],
      value:[],
      // value1: [],
      flag: false,
      // years: [2013, 2014, 2015, 2016, 2017, 2018, 2019],
      // selectList: [],
    };
  },
  methods: {
    selectAll(valArr) {
      const allIdArr = [];
      // 保存所有选项的id
      for (const argumentId of this.options) {
        allIdArr.push(argumentId.id);
      }
      const oldVal = this.oldOptions.length === 1 ? this.oldOptions[0] : [];
      // 当前选中的有'全选'
      if (valArr.includes("allSelect")) {
        this.value = allIdArr;
      }
      // 旧数据包含'全选'，当前选中数据不包含全选
      if (oldVal.includes("allSelect") && !valArr.includes("allSelect")) {
        this.value = [];
      }
      // 旧数据包含'全选'，当前选中数据包含全选
      if (oldVal.includes("allSelect") && valArr.includes("allSelect")) {
        const index = valArr.indexOf("allSelect");
        valArr.splice(index, 1); // 排除全选选项
        this.value = valArr;
      }
      // 旧数据不包含'全选'，当前选中数据不包含'全选'
      if (!oldVal.includes("allSelect") && !valArr.includes("allSelect")) {
        console.log(11);
        // 除了全选外 其他全部选中时
        if (valArr.length === allIdArr.length - 1) {
          this.value = ["allSelect"].concat(valArr);
        }
      }
      // 数据发生变化时保存数据，作为下次对比的旧数据
      this.oldOptions[0] = this.value;
      this.options.forEach(v => {
        v.ischeck = false
        this.value.forEach(e => {
          if (v.id === e) {
            v.ischeck = true;
          }
        })
      })
    },

    handRemoveTag(e) {
      console.log(e);
    },
    handChange(list) {
      console.log(list);
      this.options.forEach((v) => {
        v.ischeck = false;
        list.forEach((e) => {
          if (v.value === e) {
            v.ischeck = true;
          }
        });
      });
    },
    initCharts() {
      console.log(this.$echarts);
      let myChart = this.$echarts.init(this.$refs.chart);
      console.log(this.$refs.chart); // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
  mounted() {
    // this.initCharts();
  },
};
</script>

<style >
.el-select__tags {
  flex-wrap: nowrap !important;
  overflow: hidden !important;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
  font-size: 0 !important;
}
.aaa {
  /* 让 checkbox 的鼠标事件失效 */
  pointer-events: none;
}
</style>

<template>
  <div>
    <el-select
      style="height: 40px"
      @change="selectAll"
      v-model="selectValue"
      multiple
      placeholder="请选择"
    >
      <el-option
        v-for="item in newOptions"
        :key="item.id"
        :label="item.label"
        :value="item.id"
      >
        <el-checkbox class="aaa" v-model="item.ischeck"></el-checkbox>
        <span style="margin-left: 8px">{{ item.label }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "selectMutiple",
  props: {
    options: {
      //传过来的数组
      type: Array,
      default: () => {
        return [];
      },
    },
    label: {
      //option 的label
      type: String,
      default: "label",
    },
    value: {
      //option 的value
      type: String,
      default: "value",
    },
  },
  data() {
    return {
      oldOptions: [],
      selectValue: [],
    };
  },
  computed: {
    newOptions() {
      return this.options;
    },
  },
  methods: {
    selectAll(valArr) {
      const allIdArr = [];
      let emitValue = null; // 导出的值
      // 保存所有选项的id
      for (const argumentId of this.newOptions) {
        allIdArr.push(argumentId.id);
      }
      const oldVal = this.oldOptions.length === 1 ? this.oldOptions[0] : [];
      // 当前选中的有'全选'
      if (valArr.includes("allSelect")) {
        this.selectValue = allIdArr;
      }
      // 旧数据包含'全选'，当前选中数据不包含全选
      if (oldVal.includes("allSelect") && !valArr.includes("allSelect")) {
        this.selectValue = [];
      }
      // 旧数据包含'全选'，当前选中数据包含全选
      if (oldVal.includes("allSelect") && valArr.includes("allSelect")) {
        const index = valArr.indexOf("allSelect");
        valArr.splice(index, 1); // 排除全选选项
        this.selectValue = valArr;
      }
      // 旧数据不包含'全选'，当前选中数据不包含'全选'
      if (!oldVal.includes("allSelect") && !valArr.includes("allSelect")) {
        // 除了全选外 其他全部选中时
        if (valArr.length === allIdArr.length - 1) {
          this.selectValue = ["allSelect"].concat(valArr);
        }
      }
      // 数据发生变化时保存数据，作为下次对比的旧数据
      this.oldOptions[0] = this.selectValue;
      //   let options = JSON.parse(JSON.stringify(this.options))
      this.newOptions.forEach((v) => {
        v.ischeck = false;
        this.selectValue.forEach((e) => {
          if (v.id === e) {
            v.ischeck = true;
          }
        });
      });
      if (this.selectValue.includes("allSelect")) {
        emitValue = this.selectValue.slice(1);
      } else {
        emitValue = this.selectValue;
      }
      this.$emit("selectData", emitValue);
    },
  },
};
</script>

<style>
</style>
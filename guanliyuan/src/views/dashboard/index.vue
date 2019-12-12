<template>
  <div class="app-container">
    <div>
      <el-row>
        <el-col :span="span1">
          <span class="fl">总用户数：</span>
        </el-col>
        <el-col :span="span2">
          <span class="fl">10000</span>
        </el-col>
        <el-col :span="span1">
          <span class="fl">俱乐部总数：</span>
        </el-col>
        <el-col :span="span2">
          <span class="fl">1000</span>
        </el-col>
        <el-col :span="span1">
          <span class="fl">本日新增用户：</span>
        </el-col>
        <el-col :span="span2">
          <span class="fl">10000</span>
        </el-col>
        <el-col :span="span1">
          <span class="fl">本月新增俱乐部：</span>
        </el-col>
        <el-col :span="span2">
          <span class="fl">10000</span>
        </el-col>
      </el-row>
    </div>
    <!-- <component :is="currentRole" /> -->
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import PanelGroup from './admin/components/PanelGroup'
// import adminDashboard from './admin'
// import editorDashboard from './editor'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: 'Dashboard',
  // components: { PanelGroup },
  data() {
    return {
      span1: 3,
      span2: 3,
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

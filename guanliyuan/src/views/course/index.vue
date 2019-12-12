<template>
  <div class="app-container">
    <div class="mg-b">
      <el-input
        v-model="condition.name"
        placeholder="课程名称"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        type="primary"
        @click="pushs(false, false)"
      >新增课程</el-button>
      <el-button
        class="fr"
        type="primary"
        :disabled="infos.length==0"
        @click="deletes"
      >删除课程</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column type="index" label="id" width="50" />
      <el-table-column prop="name" label="课程名称" width="100" />
      <el-table-column prop="date" label="授课内容" />
      <el-table-column prop="num" label="授课图片" width="120" />
      <el-table-column prop="date" label="课时" />
      <el-table-column prop="name" label="操作" width="120" @click="submit">
        <template slot-scope="scope">
          <el-button type="text" @click="pushs(true, scope.row)">维护数据</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height:35px">
      <pagination v-show="tableData.length" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getDate" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      total: 0,
      infos: [],
      condition: {
        name: '',
        package: '',
        coach: ''
      },
      options: [
        {
          lable: '1',
          value: '1'
        },
        {
          lable: '2',
          value: '2'
        }
      ],
      packages: [
        {
          lable: '1',
          value: '1'
        },
        {
          lable: '2',
          value: '2'
        }
      ],
      coachs: [
        {
          lable: '1',
          value: '1'
        },
        {
          lable: '2',
          value: '2'
        }
      ],
      tableData: [
        {
          name: 'asw',
          date: '001',
          money: 0,
          num: '13783490747'
        },
        {
          name: 'asw1',
          date: '0011',
          money: 0,
          num: '13783490748'
        },
        {
          name: 'asw1',
          date: '0011',
          money: 0,
          num: '13783490748'
        },
        {
          name: 'asw1',
          date: '0011',
          money: 0,
          num: '13783490748'
        },
        {
          name: 'asw1',
          date: '0011',
          money: 0,
          num: '13783490748'
        }
      ]
    }
  },
  methods: {
    pushs(res, val) {
      if (res) {
        localStorage.removeItem('course')
        localStorage.setItem('course', JSON.stringify(val))
      }
      this.$router.push({
        path: '/course/courseadd',
        query: {
          pd: res
        }
      })
    },
    handleFilter() {
      this.$message({
        message: '搜索',
        type: 'success'
      })
    },
    // 查询数据接口
    getDate() {},
    // 提交报名信息接口
    submit() {},
    // 表格勾选的数据变化
    handleSelectionChange(res) {
      this.infos = res
    },
    // 删除数据
    deletes() {}
  }
}
</script>

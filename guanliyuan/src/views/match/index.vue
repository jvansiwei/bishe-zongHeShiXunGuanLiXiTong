<template>
  <div class="app-container">
    <div class="mg-b">
      <el-input
        v-model="condition.name"
        placeholder="通知名称"
        style="width: 200px"
        class="filter-item"
        suffix-icon="el-icon-search"
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
      >发布赛事</el-button>
      <el-button
        class="filter-item fr"
        type="primary"
        :disabled="infos.length==0"
        @click="pushs(false, false)"
      >删除数据</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column type="index" label="id" width="50" />
      <el-table-column prop="name" label="赛事名称" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="举办开始日期" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="举办结束日期" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="举办地点" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="赛事内容">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.name">富文本，可以排版</span>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="发布日期" width="120" />
      <el-table-column prop="name" label="操作" width="120" @click="submit">
        <template slot-scope="scope">
          <el-button type="text" @click="pushs(true, scope.row)">详情</el-button>
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
        localStorage.removeItem('match')
        localStorage.setItem('match', JSON.stringify(val))
      }
      this.$router.push({
        path: '/match/add',
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

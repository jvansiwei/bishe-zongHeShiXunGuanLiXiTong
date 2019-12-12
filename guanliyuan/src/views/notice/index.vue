<template>
  <div class="app-container">
    <div class="mg-b">
      <el-input
        v-model="condition.title"
        placeholder="通知名称"
        style="width: 200px"
        class="filter-item"
        suffix-icon="el-icon-search"
        @keyup.enter.native="getDate"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getDate"
      >搜索</el-button>
      <el-button
        class="filter-item"
        type="primary"
        @click="pushs(false, false)"
      >发布通知</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column type="index" label="id" width="50" />
      <el-table-column prop="name" label="通知名称" width="120">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.title">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="通知类型" width="150">
        <template slot-scope="scope">
          <span class="shenglue" :title="qiehuan(scope.row.noticeType+'', types)">{{ qiehuan(scope.row.noticeType+'', types) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="通知内容">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.content">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="发布日期" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" @click="push(true, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height:35px">
      <pagination v-show="tableData.length" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getDate" />
    </div>
    <el-dialog title="通知详情" width="50%" :visible.sync="dialogNotice">
      <el-row>
        <el-col class="jvzhong" :span="24"><b>{{ form.title }}</b></el-col>
        <el-col class="date" :span="24">{{ form.createTime }}</el-col>
        <el-col class="dialogNotice" :span="24">
          <p>{{ form.content }}</p>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { noticelist } from '@/api/notice'
export default {
  components: { Pagination },
  data() {
    return {
      dialogNotice: false,
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
        page: '1',
        limit: '20',
        title: ''
      },
      types: [{
        name: '俱乐部发给学员',
        value: '1'
      }, {
        name: '俱乐部发给教练',
        value: '2'
      }, {
        name: '俱乐部发给学员和教练',
        value: '3'
      }, {
        name: '平台发给学员',
        value: '4'
      }, {
        name: '平台发给教练',
        value: '5'
      }, {
        name: '平台发给学员和教练',
        value: '6'
      }, {
        name: '平台发给俱乐部',
        value: '7'
      }, {
        name: '平台发给所有用户',
        value: '8'
      }, {
        name: '平台发给个人用户',
        value: '9'
      }],
      tableData: [],
      form: {
        title: '',
        createTime: '',
        content: ''
      }
    }
  },
  watch: {
    'condition.title'() {
      this.getDate()
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    pushs(res, val) {
      if (res) {
        localStorage.removeItem('notice')
        localStorage.setItem('notice', JSON.stringify(val))
      }
      this.$router.push({
        path: '/notice/add',
        query: {
          pd: res
        }
      })
    },
    push(res, val) {
      for (const i in this.form) {
        this.form[i] = val[i]
      }
      this.dialogNotice = true
    },
    handleFilter() {
      this.$message({
        message: '搜索',
        type: 'success'
      })
    },
    // 查询数据接口
    getDate() {
      this.condition.page = this.listQuery.page
      this.condition.limit = this.listQuery.limit
      noticelist(this.condition).then(res => {
        this.tableData = res.page.list
        this.total = res.page.totalCount
      })
    },
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
<style scoped>
.jvzhong{
  text-align: center;
}
.date{
  text-align: center;
  color: gray;
  font-size: small
}
.dialogNotice{
  min-height:300px
}
</style>

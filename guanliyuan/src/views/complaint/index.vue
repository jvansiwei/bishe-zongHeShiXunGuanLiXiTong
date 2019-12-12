<template>
  <div class="app-container">
    <div class="mg-b">
      <el-input
        v-model="condition.name"
        placeholder="投诉名称"
        style="width: 200px"
        class="filter-item"
        suffix-icon="el-icon-search"
        @keyup.enter.native="getDate"
      />
      <el-select v-model="condition.name" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getDate"
      >搜索</el-button>
      <!-- <el-button
        class="filter-item"
        type="primary"
        @click="pushs(false, false)"
      >发布通知</el-button> -->
      <!-- <el-button
        class="filter-item fr"
        type="primary"
        :disabled="infos.length==0"
        @click="pushs(false, false)"
      >删除数据</el-button> -->
    </div>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column type="index" label="id" width="50" />
      <!-- <el-table-column prop="name" label="投诉名称" width="100">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row">2015-10-31</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="date" label="投诉用户" width="200">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.nickName">{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="投诉内容">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.content">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="date" label="投诉类型">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row">2015-10-31</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="num" label="投诉日期" width="150">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.createTime">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="120" @click="submit">
        <template slot-scope="scope">
          <el-button type="text" @click="push(true, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height:35px">
      <pagination v-show="tableData.length" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getDate" />
    </div>
    <el-dialog title="投诉详情" :visible.sync="dialogNotice">
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
import { suggestlist } from '@/api/suggest'
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
        userName: '',
        nickName: '',
        mobile: '',
        userType: ''
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
      ],
      form: {
        title: '',
        createTime: '',
        content: ''
      }
    }
  },
  watch: {
    'condition.name'() {
      this.getDate()
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    push(res, val) {
      for (const i in this.form) {
        this.form[i] = val[i]
      }
      this.dialogNotice = true
    },
    pushs(res, val) {
      if (res) {
        localStorage.removeItem('complaint')
        localStorage.setItem('complaint', JSON.stringify(val))
      }
      this.$router.push({
        path: '/complaint/add',
        query: {
          pd: res
        }
      })
    },
    // 查询数据接口
    getDate() {
      this.condition.page = this.listQuery.page
      this.condition.limit = this.listQuery.limit
      const query = {}
      for (const i in this.condition) {
        if (this.condition[i]) {
          query[i] = this.condition[i]
        }
      }
      suggestlist(query).then(res => {
        this.tableData = res.page.list
        this.total = res.page.totalCount
      }).catch({})
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

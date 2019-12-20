<template>
  <div class="app-container">
    <div v-if="panduan&&!panduan_xuesheng">
      <!-- <div class="mg-b">
        <el-button
          class="filter-item"
          type="primary"
          @click="tijiao(false)"
        >提交周报</el-button>
      </div> -->
      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        style="width: 100%;">
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="proName"
          header-align="center"
          align="center"
          label="课题名称">
        </el-table-column>
        <el-table-column
          prop="proSummary"
          header-align="center"
          align="center"
          label="小组成员">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.groupMemberList" :key="index">
              <span class="shenglue" :title="scope.row.groupMemberList[index].username">{{scope.row.groupMemberList[index].username}}</span><br>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createUserId"
          header-align="center"
          align="center"
          label="成员学号">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.groupMemberList" :key="index">
              <span class="shenglue" :title="scope.row.groupMemberList[index].stuId">{{scope.row.groupMemberList[index].stuId}}</span><br>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createUserId"
          header-align="center"
          align="center"
          label="班级">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.groupMemberList" :key="index">
              <span class="shenglue" :title="scope.row.groupMemberList[index].stuClass">{{scope.row.groupMemberList[index].stuClass}}</span><br>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.groupMemberList" :key="index">
              <span style="cursor:pointer;color:blue" @click="getZhoubaoList(scope.row.groupMemberList[index].memberId)">查看</span><br>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="panduan&&panduan_xuesheng">
      <div class="mg-b">
        <el-button
          class="filter-item"
          type="primary"
          @click="panduan_xuesheng=!panduan_xuesheng"
        >返回</el-button>
      </div>
      <el-table :data="dataList1" border style="width: 100%">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column type="index" label="id" width="50" />
        <el-table-column prop="name" label="提交周数">
          <template slot-scope="scope">
            <span>{{ scope.row.weeklyNum }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="提交日期">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="所得分数">
          <template slot-scope="scope">
            <span v-if="scope.row.scores || scope.row.scores==0">{{ scope.row.scores }}</span>
            <span v-else>暂未打分</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="120" @click="submit">
          <template slot-scope="scope">
            <el-button v-if="$store.state.user.panduan!='学生'" type="text" @click="tijiao(true,scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="!panduan&&panduan_xuesheng">
      <div class="mg-b">
        <el-button
          class="filter-item"
          type="primary"
          @click="panduan=!panduan"
        >返回</el-button>
        <el-button
          class="filter-item"
          type="primary"
          @click="dafen()"
        >打分</el-button>
      </div>
      <div style="margin: 10px 0">
        <span>周报次数:</span>
        <span>{{form_text.weeklyNum}}</span>
      </div>
      <div style="margin: 10px 0">
        <span>分数:</span>
        <span v-if="form_text.scores">{{form_text.scores}}</span>
        <span v-else>暂未打分</span>
      </div>
      <texts :curValue="form_text.weeklyContent" @input="newContent"></texts>
    </div>
    <!-- <div v-if="!panduan&&!panduan_xuesheng">
      <div class="mg-b">
        <el-button
          class="filter-item"
          type="primary"
          @click="panduan=!panduan"
        >返回</el-button>
      </div>
      <div style="margin: 10px 0">
        <span>周报次数:</span>
        <el-input
          v-model="form_text.weeklyNum"
          placeholder="第x周"
          style="width: 200px"
          size="mini"
          type="number"
          min="1"
          class="filter-item"
        />
      </div>
      <texts :curValue="form_text.weeklyContent" @input="newContent"></texts>
    </div> -->
  </div>
</template>

<script>
import texts from './texts'
export default {
  components: { texts },
  data () {
    return {
      memberId: '',
      initContent: '', // 默认值
      dialogVisible: true,
      panduan: true, // 判断是列表页还是周报页
      panduan_xuesheng: false, // 判断是否是学生
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
      dataList: [],
      dataList1: [],
      dataListLoading: false,
      dataListLoading1: false,
      form: {
        createTime: '',
        groupId: '',
        leaderUserId: '',
        members: [],
        practiceId: '',
        practiceName: '',
        proId: null,
        proName: null,
        state: 0
      },
      form_text: {
        createTime: '',
        memberId: '',
        scores: '',
        weeklyContent: '',
        weeklyId: '',
        weeklyNum: ''
      }
    }
  },
  created () {
    this.getDataList()
  },
  watch: {
    panduan () {
      if (this.panduan_xuesheng) {
        this.$http({
          url: this.$http.adornUrl('/pro/weekly/list'),
        // 查询选报成功的学生的周报列表
          method: 'get',
          params: this.$http.adornParams({
            'memberId': this.memberId
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList1 = data.data
          } else {
            this.dataList1 = []
          // this.totalPage = 0
          }
        })
      }
    }
  },
  methods: {
    dafen () {
      this.$prompt('请输入分数', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        let query = {
          weeklyId: this.form_text.weeklyId,
          score: value
        }
        if (value > 100 || value < 0) {
          this.$message.success('分数不能小于0或大于100')
          return
        }
        this.$http({
          url: this.$http.adornUrl('/pro/weekly/scoring'),
          method: 'get',
          params: this.$http.adornParams(query)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message.success('打分成功')
            this.panduan = !this.panduan
          } else {
            this.$message.success(data.msg)
            // this.getDataList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        // url: this.$http.adornUrl('/pro/weekly/list'),
        // 查询选报成功的学生列表
        url: this.$http.adornUrl('/pro/group/declare/list'),
        method: 'get',
        params: this.$http.adornParams({
          'state': 1
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.data
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 获取数据列表
    getZhoubaoList (val) {
      this.memberId = val
      this.panduan_xuesheng = !this.panduan_xuesheng
      this.dataListLoading1 = true
      this.$http({
        url: this.$http.adornUrl('/pro/weekly/list'),
        // 查询选报成功的学生的周报列表
        method: 'get',
        params: this.$http.adornParams({
          'memberId': val
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList1 = data.data
        } else {
          this.dataList1 = []
          // this.totalPage = 0
        }
        this.dataListLoading1 = false
      })
    },
    tijiao (pd, val) {
      if (pd) {
        this.form_text = val
      } else {
        this.form_text = {
          createTime: '',
          memberId: '',
          scores: '',
          weeklyContent: '',
          weeklyId: '',
          weeklyNum: ''
        }
      }
      this.panduan = !this.panduan
    },
    submit () {
      let query = {}
      for (let i in this.form_text) {
        if (this.form_text[i]) {
          query[i] = this.form_text[i]
        }
      }
      query.memberId = this.memberId
      query.weeklyContent = this.initContent
      this.$http({
        url: this.$http.adornUrl('/pro/weekly/save'),
        method: 'post',
        data: this.$http.adornParams(query)
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message.success('提交成功')
          this.panduan = !this.panduan
        } else {
          this.$message.success(data.msg)
        }
      })
    },
    newContent (val) {
      console.log(123466789999999)
      console.log(val)
      this.initContent = val
    },
    pushs (res, val) {
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
    handleFilter () {
      this.$message({
        message: '搜索',
        type: 'success'
      })
    },
    // 查询数据接口
    getDate () {},
    // 表格勾选的数据变化
    handleSelectionChange (res) {
      this.infos = res
    },
    // 删除数据
    deletes () {}
  }
}
</script>

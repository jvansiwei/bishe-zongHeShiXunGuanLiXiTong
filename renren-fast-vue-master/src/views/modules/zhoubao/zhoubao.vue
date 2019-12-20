<template>
  <div class="app-container">
    <!-- <div class="mg-b">
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
    </div> -->
    <div v-if="panduan">
      <div class="mg-b">
        <el-button
          class="filter-item"
          type="primary"
          @click="tijiao(false)"
        >提交周报</el-button>
      </div>
      <el-table :data="dataList" border style="width: 100%" @selection-change="handleSelectionChange">
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
            <el-button type="text" @click="tijiao(true,scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <div class="mg-b">
        <el-button
          v-if="form_text.memberId"
          class="filter-item"
          type="primary"
          @click="submit()"
        >提交周报</el-button>
        <el-button
          class="filter-item"
          type="primary"
          @click="panduan=!panduan"
        >返回</el-button>
      </div>
      <div style="margin: 10px 0">
        <span>分数:</span>
        <span v-if="form_text.scores">{{form_text.scores}}</span>
        <span v-else>暂未打分</span>
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
    </div>
    <!-- <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <add />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import texts from './texts'
export default {
  components: { texts },
  data () {
    return {
      initContent: '', // 默认值
      dialogVisible: true,
      panduan: true,
      memberId: '',
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
    this.getInfo()
    this.getDataList()
  },
  methods: {
      // 获取数据列表
    getInfo () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/pro/group/info'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.form = data.data
          for (let i = 0; i < this.form.members.length; i++) {
            if (this.form.members[i].stuId + '' === JSON.parse(localStorage.getItem('userInfo')).stuId) {
              this.memberId = this.form.members[i].memberId
            }
          }
        } else {
          this.$message.success(data.msg)
          // this.getDataList()
        }
        this.dataListLoading = false
      })
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/pro/weekly/list'),
        method: 'get',
        params: this.$http.adornParams({
          'type': this.type
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

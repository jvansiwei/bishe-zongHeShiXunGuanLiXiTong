<template>
  <div class="app-container">
    <div class="mg-b">
      <el-input
        v-model="condition.title"
        placeholder="通知名称"
        style="width: 200px"
        class="filter-item"
        clearable
        @keyup.enter.native="getDate"
      />
      <!-- <el-select v-model="state" placeholder="请选择" style="width:200px">
        <el-option
          v-for="item in options_banben"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select> -->
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getDate"
      >搜索</el-button>
      <el-button
        class="filter-item"
        type="primary"
        @click="tiaozhuan()"
      >发布版本</el-button>
    </div>
    <el-table v-loading="loading" stripe :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- <el-table-column
        type="selection"
        width="45"
      /> -->
      <el-table-column type="index" label="id" width="45" />
      <el-table-column prop="name" label="软件名称" width="130">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.appName">{{ scope.row.appName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="版本" width="100">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.version">{{ scope.row.version }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="系统" width="70">
        <template slot-scope="scope">
          <span>{{ qiehuan(scope.row.appType, types) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="软件类型" width="80">
        <template slot-scope="scope">
          <span>{{ qiehuan(scope.row.plateType, options_banben) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="版本内容">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.versionDesc">{{ scope.row.versionDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="下载地址">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.downloadUrl">{{ scope.row.downloadUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="发布日期" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" @click="pushs(scope.row)">详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <div style="height:35px">
      <pagination v-show="tableData.length" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getDate" />
    </div> -->
    <el-dialog title="版本详情" :visible.sync="dialogNotice">
      <el-row>
        <el-col class="jvzhong" :span="24"><b>{{ form.title }}</b></el-col>
        <el-col class="date" :span="24">{{ form.createTime }}</el-col>
        <el-col class="dialogNotice" :span="24">
          <p>{{ form.content }}</p>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="发布版本" :close-on-click-modal="false" width="50%" :visible.sync="dialogappversionadd">
      <el-row>
        <el-col :span="4">
          <span class="must mt">App名称：</span>
        </el-col>
        <el-col :span="8">
          <el-input v-model="form_fb.appName" />
        </el-col>
        <el-col :span="4">
          <span class="must mt">App版本：</span>
        </el-col>
        <el-col :span="8">
          <el-input v-model="form_fb.version" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <span class="must mt">APP类型：</span>
        </el-col>
        <el-col :span="8">
          <el-select v-model="form_fb.appType" style="width:100%" filterable clearable placeholder="选择类型">
            <el-option
              v-for="item in options_banben"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <span class="must mt">平台类型：</span>
        </el-col>
        <el-col :span="8">
          <el-select v-model="form_fb.plateType" style="width:100%" filterable clearable placeholder="选择平台">
            <el-option
              v-for="item in types"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <span class="must mt">下载地址：</span>
        </el-col>
        <el-col :span="20">
          <el-input v-model="form_fb.downloadUrl" rows="2" type="textarea" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <span class="must mt">更新描述：</span>
        </el-col>
        <el-col :span="20">
          <el-input v-model="form_fb.versionDesc" rows="6" type="textarea" />
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogappversionadd = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination'
import { appversionlist, appversionadd } from '@/api/setting'
export default {
  // components: { Pagination },
  data() {
    return {
      loading: true,
      dialogNotice: false,
      dialogappversionadd: false,
      state: '1',
      total: 0,
      form: {
        title: '',
        createTime: '',
        content: ''
      },
      form_fb: {
        appName: '',
        appType: '',
        createTime: '',
        downloadUrl: '',
        id: '',
        plateType: '',
        version: '',
        versionDesc: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      infos: [],
      condition: {
        appType: '',
        platetype: ''
      },
      options_banben: [{
        name: '用户端',
        value: 1
      }, {
        name: '教练端',
        value: 2
      }],
      types: [{
        name: '安卓',
        value: 1
      }, {
        name: '苹果',
        value: 2
      }
      ],
      types_fb: [{
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
      }],
      tableData: []
    }
  },
  watch: {
    'state'() {
      this.getDate()
    },
    'condition.title'() {
      this.getDate()
    }
  },
  mounted() {
    if (localStorage.getItem('weidu') + '' === '3') {
      localStorage.removeItem('weidu')
      this.state = '3'
    }
    this.getDate()
  },
  methods: {
    add() {
      // if (!this.form_fb.title) {
      //   this.$message.error('标题不能为空')
      //   return
      // }
      // if (!this.form_fb.noticeType) {
      //   this.$message.error('通知类型不能为空')
      //   return
      // }
      // if (!this.form_fb.content) {
      //   this.$message.error('通知内容不能为空')
      //   return
      // }
      this.$confirm('此操作将提交数据, 是否继续?', '发布版本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const query = {}
        for (const i in this.form_fb) {
          query[i] = this.form_fb[i]
        }
        appversionadd(query).then(res => {
          this.$message.success('发布成功')
          for (const i in this.form_fb) {
            this.form_fb[i] = ''
          }
          this.getDate()
        })
        this.dialogappversionadd = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    pushs(val) {
      for (const i in this.form) {
        this.form[i] = val[i]
      }
      this.dialogNotice = true
    },
    tiaozhuan() {
      this.dialogappversionadd = true
    },
    // 查询数据接口
    getDate() {
      this.loading = true
      // this.condition.page = this.listQuery.page
      // this.condition.limit = this.listQuery.limit
      appversionlist(this.condition).then(res => {
        if (res.data) {
          this.tableData = res.data
          // this.total = res.page.totalCount
        } else {
          this.tableData = []
          this.total = 0
        }
        this.loading = false
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
.el-row {
  width: 100%;
  margin: 5px 0px;
}
</style>

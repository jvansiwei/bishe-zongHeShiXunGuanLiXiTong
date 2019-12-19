<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <!-- <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input> -->
        <el-select v-model="type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- <el-button @click="getDataList()">查询</el-button> -->
        <el-button @click="add()">创建团队</el-button>
        <el-button @click="open()">邀请</el-button>
        <el-button v-if="form.leaderUserId == userId" @click="deleteinfo()" title="只有队长登录才会显示删除按钮">删除团队</el-button>
        <!-- <el-button v-if="isAuth('generator:proinfo:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('generator:proinfo:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <div class="info">
      <el-row>
        <el-col :span="8">
          <span>活动名称：</span>
          <span v-if="form.practiceName">{{form.practiceName}}</span>
          <span v-else>未参加活动</span>
        </el-col>
        <el-col :span="8">
          <span>课题名称：</span>
          <span v-if="form.proName">{{form.proName}}</span>
          <span v-else>未选报课题</span>
          <span style="color:blue;cursor:pointer" v-if="form.proId" @click="showInfo">详情</span>
        </el-col>
        <el-col :span="8">
          <span>课题状态：</span>
          <span v-if="form.state==0&&!form.proId">未选报课题</span>
          <span v-if="form.state==0&&form.proId">报名中</span>
          <span v-if="form.state==1">成功选中课题</span>
          <span v-if="form.state==2">选择课题被拒绝</span>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in form.members" :key="index">
        <el-col :span="span">
          <span>学号：</span>
          <span>{{item.stuId}}</span>
          <span v-if="form.leaderUserId == userId&& item.stuId == stuId">（队长）</span>
        </el-col>
        <el-col :span="span">
          <span>姓名：</span>
          <span>{{item.username}}</span>
        </el-col>
        <el-col :span="span">
          <span>任务名：</span>
          <span v-if="item.taskName">{{item.taskName}}</span>
          <span v-if="!item.taskName&&form.leaderUserId != userId">分配任务</span>
          <span v-if="!item.taskName&&form.leaderUserId == userId" style="color:blue;cursor:pointer" @click="showfenPei(item.memberId)">分配任务</span>
        </el-col>
      </el-row>
    </div>
    <el-button style="margin-bottom:10px" @click="isShow=!isShow"><span v-if="isShow">关闭邀请列表</span><span v-else>显示邀请列表</span></el-button>
    <el-table
      v-if="isShow"
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="practiceName"
        header-align="center"
        align="center"
        label="学号">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.stuId">{{scope.row.stuId}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="practiceName"
        header-align="center"
        align="center"
        label="姓名">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.username">{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="practiceName"
        header-align="center"
        align="center"
        label="邀请日期">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.sendTime" v-if="scope.row.sendTime">{{scope.row.sendTime.slice(0, 10)}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="proState"
        header-align="center"
        align="center"
        label="状态">
        <!-- label="0：未发布；1：已发布；2：已分配" -->
        <template slot-scope="scope">
          <span class="shenglue" v-if="scope.row.state==0">暂未回复</span>
          <span class="shenglue" v-else-if="scope.row.state==1">同意</span>
          <span class="shenglue" v-else>拒绝</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="type==0"
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteHandle(scope.row.applyId, '1')" v-if="scope.row.state==0">同意</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.applyId, '2')" v-if="scope.row.state==0">拒绝</el-button>
          <span v-else>已操作</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination> -->
    <el-dialog title="课题详情" :visible.sync="dialog">
      <el-row>
        <!-- 教师编号form_keti.createUserId -->
        <el-col :span="5">
          <span>课题名称</span>
        </el-col>
        <el-col :span="7">
          <span>{{form_keti.proName}}</span>
        </el-col>
        <el-col :span="5">
          <span>课题人数</span>
        </el-col>
        <el-col :span="7">
          <span>{{form_keti.stuNum}}</span>
        </el-col>
        <el-col :span="5">
          <span>课题概述</span>
        </el-col>
        <el-col :span="19">
          <el-input disabled v-model="form_keti.proSummary" type="textarea" placeholder="概述"></el-input>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in form_keti.tasks" :key="index">
        <el-col :span="5">
            <span>任务{{index+1}}</span>
        </el-col>
        <el-col :span="19">
            <el-input disabled v-model="form_keti.tasks[index].taskName" placeholder="任务名称"></el-input>
        </el-col>
        <el-col :span="5">
            <span>任务{{index+1}}的内容</span>
        </el-col>
        <el-col :span="19">
            <el-input disabled v-model="form_keti.tasks[index].taskDesc" type="textarea" rows="3" placeholder="任务内容"></el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialog = false">取 消</el-button> -->
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配任务" :visible.sync="dialog_fenPei">
      <el-row>
        <el-col :span="6">选择任务：</el-col>
        <el-col :span="18">
          <el-select v-model="taskId" placeholder="请选择">
            <el-option
              v-for="item in form_keti.tasks"
              :key="item.taskId"
              :label="item.taskName"
              :value="item.taskId">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_fenPei = false">取 消</el-button>
        <el-button type="primary" :disabled="taskId==''" @click="fenPei()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        dialog_fenPei: false,
        memberId: '',
        taskId: '',
        isShow: false,
        userId: '',
        stuId: '',
        panduan: true,
        span: 8,
        type: 0,
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
        form_keti: {
          proId: '',
          proState: '',
          proName: '',
          proSummary: '',
          stuNum: '',
          tasks: [{
            createTime: '',
            proId: '',
            taskDesc: '',
            taskId: '',
            taskName: '',
            taskState: ''
          }]
          // createUserId: '',
          // createTime: '',
          // updateTime: ''
        },
        options: [{
          name: '收到的邀请',
          value: 0
        }, {
          name: '发送的邀请',
          value: 1
        }],
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    activated () {
      this.userId = JSON.parse(localStorage.getItem('userInfo')).userId
      this.stuId = JSON.parse(localStorage.getItem('userInfo')).stuId
      this.getInfo()
      this.getDataList()
    },
    watch: {
      type () {
        this.getDataList()
      }
    },
    methods: {
      showfenPei (val) {
        this.memberId = val
        this.taskId = ''
        this.dialog_fenPei = true
      },
      fenPei () {
        if (this.taskId + '' === '') {
          this.$message.success('请选择任务')
          return
        }
        let query = {
          memberId: this.memberId,
          taskId: this.taskId
        }
        this.$http({
          url: this.$http.adornUrl('/pro/group/assign/task'),
          method: 'get',
          params: this.$http.adornParams(query)
        }).then(({data}) => {
          this.dialog_fenPei = false
          if (data && data.code === 0) {
            this.$message.success('分配成功')
            this.getInfo()
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      showInfo () {
        this.dialog = true
      },
      // 邀请人进组
      open () {
        this.$prompt('请输入学号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$http({
            url: this.$http.adornUrl('/pro/group/apply'),
            method: 'get',
            params: this.$http.adornParams({
              'userId': value
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message.success('邀请成功')
            } else {
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      // 创建团队
      add () {
        this.$http({
          url: this.$http.adornUrl('/pro/group/create'),
          method: 'post',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message.success('创建成功')
            this.getInfo()
          } else {
            this.$message.success(data.msg)
          }
        })
      },
       // 删除团队
      deleteinfo () {
        this.$http({
          url: this.$http.adornUrl('/pro/group/delete'),
          method: 'post',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message.success('删除成功')
            this.form = {
              createTime: '',
              groupId: '',
              leaderUserId: '',
              members: [],
              practiceId: '',
              practiceName: '',
              proId: null,
              proName: null,
              state: 0
            }
          } else {
            this.$message.success(data.msg)
          }
        })
      },
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
            if (data.data.proId || data.data.proId + '' === '0') {
              this.$http({
                url: this.$http.adornUrl(`/pro/proinfo/info/${this.form.proId}`),
                method: 'get',
                params: this.$http.adornParams()
              }).then(({data}) => {
                if (data && data.code === 0) {
                  this.form_keti.proId = data.proInfo.proId
                  this.form_keti.proState = data.proInfo.proState
                  this.form_keti.stuNum = data.proInfo.stuNum
                  this.form_keti.proName = data.proInfo.proName
                  this.form_keti.proSummary = data.proInfo.proSummary
                  if (data.proInfo.tasks.length) {
                    this.form_keti.tasks = data.proInfo.tasks
                  }
                }
              })
            }
            console.log(this.form)
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
          url: this.$http.adornUrl('/pro/group/apply/list'),
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
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 删除
      deleteHandle (id, val) {
        // var ids = id ? [id] : this.dataListSelections.map(item => {
        //   return item.proId
        // })
        let text = '拒绝'
        if (val === '1') {
          text = '同意'
        }
        this.$confirm('确定' + text + '该申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/pro/group/apply/handle'),
            method: 'get',
            params: this.$http.adornParams({
              'applyId': id,
              'state': val
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.getInfo()
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
.info {
  width: 100%;
  /* height: 300px; */
}
/* .el-row{
  margin: 10px 0;
} */
.el-col{
  margin: 5px 0;
}
</style>

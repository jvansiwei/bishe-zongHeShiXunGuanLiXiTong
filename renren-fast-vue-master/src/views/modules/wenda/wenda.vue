<template>
  <div class="mod-config">
    <el-form v-if="$store.state.user.panduan=='学生'" :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button v-if="$store.state.user.panduan=='学生'" type="primary" @click="tiwen()">提问</el-button>
      </el-form-item>
    </el-form>
    <el-table
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
        prop="stuName"
        header-align="center"
        align="center"
        label="学生姓名"
        width="100">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.stuName">{{scope.row.stuName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="teaName"
        header-align="center"
        align="center"
        label="老师姓名"
        width="100">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.teaName">{{scope.row.teaName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="questionContent"
        header-align="center"
        label="问题内容">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.questionContent">{{scope.row.questionContent}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="answerContent"
        header-align="center"
        label="答复内容">
        <template slot-scope="scope">
          <span v-if="scope.row.answerContent" class="shenglue" :title="scope.row.answerContent">{{scope.row.answerContent}}</span>
          <el-tag type="danger" v-else>暂未答复</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="提出日期">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.createTime" v-if="scope.row.createTime">{{scope.row.createTime}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="更新时间">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.updateTime" v-if="scope.row.updateTime">{{scope.row.updateTime.slice(0, 10)}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        prop="proState"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.proState==0">未发布</span>
          <span v-if="scope.row.proState==1">已发布</span>
          <span v-if="scope.row.proState==2">已分配</span>
        </template>
      </el-table-column> -->
      <el-table-column
        v-if="$store.state.user.panduan != '学生'"
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <span v-if="scope.row.answerContent">已答复</span>
          <el-button v-else type="text" size="small" @click="dialog_dafu(scope.row.queId)">答复</el-button>
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
    <el-dialog title="回答问题" :visible.sync="dialog">
      <el-form :model="form">
        <el-form-item label="答复内容：" label-width="120px">
          <el-input v-model="form.ansContent" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" :disabled="form.ansContent.length==0" title="请输入内容" @click="dafu()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        queId: '',
        form: {
          ansContent: ''
        },
        dataForm: {
          proState: '',
          teaName: '',
          proName: ''
        },
        options: [{
          name: '未发布',
          value: 0
        }, {
          name: '已发布',
          value: 1
        }, {
          name: '已分配',
          value: 2
        }],
        options1: [{
          name: '已发布',
          value: 1
        }, {
          name: '已分配',
          value: 2
        }],
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
      this.getDataList()
    },
    methods: {
      dialog_tiwen (val) {
        this.queId = val
        this.dialog = true
      },
      tiwen () {
        this.$prompt('请输入问题', '提出问题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          // let query = {
          //   queContent: value
          // }
          if (value) {
            this.$http({
              url: this.$http.adornUrl('/pro/que/save'),
              method: 'post',
              data: this.$http.adornStr(value)
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.getDataList()
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          } else {
            this.$message.success('请输入问题')
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      dialog_dafu (val) {
        this.queId = val
        this.dialog = true
      },
      dafu (val, id) {
        this.$http({
          url: this.$http.adornUrl('/pro/que/ans/' + this.queId),
          method: 'post',
          data: this.$http.adornStr(this.form.ansContent)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dialog = false
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        let val = 1
        if (this.$store.state.user.panduan !== '学生') {
          val = 0
        }
        let query = {
          // 'page': this.pageIndex,
          // 'limit': this.pageSize,
          'isStu': val
        }
        this.$http({
          url: this.$http.adornUrl('/pro/que/list'),
          method: 'get',
          params: this.$http.adornParams(query)
        }).then(({data}) => {
          if (data && data.code === 0) {
            // if (this.$store.state.user.panduan !== '学生') {
            //   this.dataList = data.data
            // } else {
            //   this.dataList = []
            //   for (let i = 0; i < data.data.length; i++) {
            //     if (data.data[i].proState + '' !== '0') {
            //       this.dataList.push(data.data[i])
            //     }
            //   }
            // }
            this.dataList = data.data
          } else {
            this.dataList = []
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
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.proId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/generator/proinfo/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
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
.el-dialog {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 80%!important;
}
</style>
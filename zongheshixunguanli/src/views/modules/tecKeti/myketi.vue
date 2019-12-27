<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-select style="width:150px" v-model="state" placeholder="请选择">
          <el-option
            v-for="item in options_cl"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="$store.state.user.panduan!='学生'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="$store.state.user.panduan!='学生'" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        <!-- <el-button v-if="isAuth('generator:proinfo:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('generator:proinfo:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
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
        v-if="state==0"
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="chuli(scope.row.groupMemberList[0].groupId, 1)">同意</el-button>
          <el-button type="text" size="small" @click="chuli(scope.row.groupMemberList[0].groupId, 2)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        state: 0,
        dataForm: {
          proState: '',
          teaName: '',
          proName: ''
        },
        options_cl: [{
          name: '未处理',
          value: 0
        }, {
          name: '选报成功',
          value: 1
        }, {
          name: '选报失败',
          value: 2
        }],
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
    watch: {
      state () {
        this.getDataList()
      }
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/pro/group/declare/list'),
          method: 'get',
          params: this.$http.adornParams({
            'state': this.state
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.data
            this.totalPage = this.dataList.length
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 处理申报
      chuli (id, state) {
        this.$confirm('此操作将处理学生的申报课题请求, 是否确定？', '处理申报信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let query = {
            'groupId': id,
            'state': state
          }
          console.log(query)
          this.$http({
            url: this.$http.adornUrl('/pro/group/declare/handle'),
            method: 'post',
            data: this.$http.adornData(query)
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
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
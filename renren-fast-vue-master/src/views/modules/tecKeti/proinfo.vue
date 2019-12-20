<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input style="width:150px" v-model="dataForm.teaName" placeholder="教师姓名" clearable></el-input>
        <el-input style="width:150px" v-model="dataForm.proName" placeholder="课题名称" clearable></el-input>
        <el-select v-if="$store.state.user.panduan!='学生'" clearable style="width:150px" v-model="dataForm.proState" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-else style="width:150px" clearable v-model="dataForm.proState" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="$store.state.user.panduan!='学生'" @click="getMyList()">查询本人发布课题</el-button>
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
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.proName">{{ scope.row.proName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="proSummary"
        header-align="center"
        align="center"
        label="概述">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.proSummary">{{ scope.row.proSummary }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createUserId"
        header-align="center"
        align="center"
        label="创建者">
        <template slot-scope="scope">
          <span class="shenglue" :title="qiehuan(scope.row.createUserId, table, 'userId' ,'username')" v-if="scope.row.createUserId">{{ qiehuan(scope.row.createUserId, table, 'userId' ,'username')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.createTime" v-if="scope.row.createTime">{{scope.row.createTime.slice(0, 10)}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="更新时间">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.updateTime" v-if="scope.row.updateTime">{{scope.row.updateTime.slice(0, 10)}}</span>
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
          <span v-if="scope.row.proState==0">未发布</span>
          <span v-if="scope.row.proState==1">已发布</span>
          <span v-if="scope.row.proState==2">已分配</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="$store.state.user.panduan!='学生'" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
          <!-- <el-button v-if="$store.state.user.panduan!='学生'" type="text" size="small" @click="deleteHandle(scope.row.proId)">删除</el-button> -->
          <el-button v-if="$store.state.user.panduan=='学生'&&scope.row.proState==1" type="text" size="small" @click="submit(scope.row.proId)">报名</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './proinfo-add-or-update'
  export default {
    data () {
      return {
        table: [],
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
    components: {
      AddOrUpdate
    },
    activated () {
      this.getAll()
      this.getDataList()
    },
    methods: {
      qiehuan (val, shuzu, ziduan1, ziduan2) {
        for (let i = 0; i < shuzu.length; i++) {
          if (shuzu[i][ziduan1] + '' === val + '') {
            return shuzu[i][ziduan2]
          }
        }
      },
      // 获取学生和老师列表
      getAll () {
        let query = {
          roleId: ''
        }
        this.$http({
          url: this.$http.adornUrl('/sys/user/all'),
          method: 'get',
          params: this.$http.adornParams(query)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.table = data.data
          } else {
            this.table = []
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        let query = {
          'page': this.pageIndex,
          'limit': this.pageSize
        }
        for (let i in this.dataForm) {
          if (this.dataForm[i] || this.dataForm[i] === 0) {
            query[i] = this.dataForm[i]
          }
        }
        this.$http({
          url: this.$http.adornUrl('/pro/proinfo/list'),
          method: 'get',
          params: this.$http.adornParams(query)
        }).then(({data}) => {
          if (data && data.code === 0) {
            if (this.$store.state.user.panduan !== '学生s') {
              this.dataList = data.page.list
            } else {
              this.dataList = []
              for (let i = 0; i < data.page.list.length; i++) {
                if (data.page.list[i].proState + '' !== '0') {
                  this.dataList.push(data.page.list[i])
                }
              }
            }
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 获取数据列表
      getMyList () {
        this.$http({
          url: this.$http.adornUrl('/pro/proinfo/list/my'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            // if (this.$store.state.user.panduan !== '学生') {
            //   this.dataList = data.page.list
            // } else {
            //   this.dataList = []
            //   for (let i = 0; i < data.page.list.length; i++) {
            //     if (data.page.list[i].proState + '' !== '0') {
            //       this.dataList.push(data.page.list[i])
            //     }
            //   }
            // }
            this.dataList = data.data
            this.totalPage = this.dataList.length
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 教师处理申报数据
      getApplyList () {
        this.$http({
          url: this.$http.adornUrl('/pro/group/declare/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            // if (this.$store.state.user.panduan !== '学生') {
            //   this.dataList = data.page.list
            // } else {
            //   this.dataList = []
            //   for (let i = 0; i < data.page.list.length; i++) {
            //     if (data.page.list[i].proState + '' !== '0') {
            //       this.dataList.push(data.page.list[i])
            //     }
            //   }
            // }
            this.dataList = data.data
            this.totalPage = this.dataList.length
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 报课题
      submit (id) {
        this.$http({
          url: this.$http.adornUrl('/pro/group/declare'),
          method: 'get',
          params: this.$http.adornParams({
            'proId': id
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message.success('报名成功')
          } else {
            this.$message.error(data.msg)
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
            url: this.$http.adornUrl('/pro/proinfo/delete'),
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
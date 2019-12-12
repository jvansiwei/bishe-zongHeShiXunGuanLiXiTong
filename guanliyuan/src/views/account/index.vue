<template>
  <div class="app-container">
    <div class="mg-b">
      <el-button
        type="primary"
        @click="addinfo"
      >新增</el-button>
      <el-button
        type="primary"
        :disabled="infos.length==0"
        @click="deletes"
      >删除</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%;max-width:800px" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="40"
      />
      <el-table-column type="index" label="id" width="50" />
      <el-table-column prop="name" label="账号">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="密码">
        <template>
          <!-- <span>{{ scope.row.password }}</span> -->
          <span>******</span>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="update(scope.row)">修改</el-button>
          <!-- <el-button type="text" @click="deletes">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="权限" :label-width="formLabelWidth">
          <el-select v-model="form.state" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="!xiugai" type="primary" @click="add">新 增</el-button>
        <el-button v-else type="primary" @click="xiugais">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import Pagination from '@/components/Pagination'
import { accountlist, accountadd, accountdel } from '@/api/account'
export default {
  components: { },
  data() {
    return {
      xiugai: false,
      dialogFormVisible: false,
      title: '新增管理员',
      form: {
        account: '',
        // state: '1',
        createTime: '',
        // id: '',
        password: '',
        salt: '',
        userId: ''
      },
      formLabelWidth: '100px',
      total: 0,
      infos: [],
      condition: {
        name: '',
        package: '',
        coach: ''
      },
      types: [{
        name: '权限一',
        value: '1'
      }, {
        name: '权限二',
        value: '2'
      }, {
        name: '权限三',
        value: '3'
      }],
      tableData: []
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    // 查询数据接口
    getDate() {
      const query = {
        page: 1,
        limit: 100,
        account: ''
      }
      accountlist(query).then(res => {
        if (res.page) {
          this.tableData = res.page.list
          // this.total = res.page.totalCount
          // this.pages = res.page.totalPage
        }
      })
    },
    // 提交报名信息接口
    add() {
      if (!this.form.account) {
        this.$message.success('账号不能为空')
        return
      }
      if (!this.form.password) {
        this.$message.success('账号不能为空')
        return
      }
      this.dialogFormVisible = false
      accountadd(this.form).then(res => {
        if (res.code === 0) {
          this.$message.success('新增成功')
          this.getDate()
        }
      })
    },
    xiugais() {
      if (!this.form.account) {
        this.$message.success('账号不能为空')
        return
      }
      if (!this.form.password) {
        this.$message.success('密码不能为空')
        return
      }
      this.dialogFormVisible = false
      // accountupdate(this.form).then(res => {
      //   if (res.code === 0) {
      //   this.$message.success('账号不能为空')
      //     this.getDate()
      //   }
      // })
    },
    // 表格勾选的数据变化
    handleSelectionChange(res) {
      this.infos = res
    },
    // 删除数据
    deletes() {
      const id = []
      for (let i = 0; i < this.infos.length; i++) {
        // if (this.infos[i].id === 1) {
        //   Toast({
        //     message: this.infos[i].account + '不能删除',
        //     position: 'top',
        //     duration: 2000
        //   })
        //   return
        // }
        id.push(this.infos[i].userId)
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        accountdel(id).then(res => {
          this.$message.success('删除成功')
          this.getDate()
        })
      }).catch(() => {
        this.$message.success('取消操作')
      })
    },
    addinfo() {
      this.xiugai = false
      for (const i in this.form) {
        this.form[i] = ''
      }
      this.form.state = '1'
      this.title = '新增管理员'
      this.dialogFormVisible = true
    },
    update(res) {
      this.xiugai = true
      for (const i in res) {
        this.form[i] = res[i]
      }
      this.form.password = ''
      this.title = '修改管理员'
      this.dialogFormVisible = true
    }
  }
}
</script>
<style>
.el-table td{
  padding: 0
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: -5px;
  width: 100%;
}
.el-dialog{
    position: relative;
    margin: 0 auto 50px;
    background: #FFFFFF;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 90%;
    max-width: 400px;
}
</style>
<style scoped>
.pd-5{
  padding: 3px 0
}
</style>


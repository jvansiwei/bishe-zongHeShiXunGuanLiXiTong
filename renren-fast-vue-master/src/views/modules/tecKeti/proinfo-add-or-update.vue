<template>
  <el-dialog
    width="80%"
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-row v-if="dataForm.proId">
      <el-col :span="8">
        <el-form-item label="课题名称" prop="proName">
          <el-input v-model="dataForm.proName" placeholder="课题名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="课题人数" prop="stuNum">
          <el-input v-model="dataForm.stuNum" type="number" min="0" placeholder="课题人数"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="课题状态" prop="proState">
          <el-select v-model="dataForm.proState" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col :span="12">
        <el-form-item label="课题名称" prop="proName">
          <el-input v-model="dataForm.proName" placeholder="课题名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="课题人数" prop="stuNum">
          <el-input v-model="dataForm.stuNum" type="number" min="0" placeholder="课题人数"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="概述" prop="proSummary">
      <el-input v-model="dataForm.proSummary" type="textarea" placeholder="概述"></el-input>
    </el-form-item>
    <el-row v-for="(item, index) in dataForm.tasks" :key="index">
      <el-col :span="24">
          <span>任务{{index+1}}</span>
          <el-button style="padding: 5px;margin-left:5px;margin-bottom:5px" icon="el-icon-plus" @click="jia" />
          <el-button :disabled="dataForm.tasks.length<2" style="padding: 5px;margin-left:0px" icon="el-icon-minus" @click="jian(index)" />
      </el-col>
      <el-col :span="24">
          <el-input v-model="dataForm.tasks[index].taskName" placeholder="任务名称"></el-input>
      </el-col>
      <el-col :span="24">
          <span>任务{{index+1}}的内容</span>
      </el-col>
      <el-col :span="24">
          <el-input v-model="dataForm.tasks[index].taskDesc" type="textarea" rows="3" placeholder="任务内容"></el-input>
      </el-col>
    </el-row>
    <!-- <el-form-item label="创建者id" prop="createUserId">
      <el-input v-model="dataForm.createUserId" placeholder="创建者id"></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
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
        dataForm: {
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
        dataRule: {
          stuNum: [
            { required: true, message: '', trigger: 'blur' }
          ],
          proName: [
            { required: true, message: '', trigger: 'blur' }
          ],
          proSummary: [
            { required: true, message: '', trigger: 'blur' }
          ]
          // createUserId: [
          //   { required: true, message: '创建者id不能为空', trigger: 'blur' }
          // ],
          // createTime: [
          //   { required: true, message: '创建时间不能为空', trigger: 'blur' }
          // ],
          // updateTime: [
          //   { required: true, message: '更新时间不能为空', trigger: 'blur' }
          // ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.proId = id.proId || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.proId) {
            this.$http({
              url: this.$http.adornUrl(`/pro/proinfo/info/${this.dataForm.proId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.proId = data.proInfo.proId
                this.dataForm.proState = data.proInfo.proState
                this.dataForm.stuNum = data.proInfo.stuNum
                this.dataForm.proName = data.proInfo.proName
                this.dataForm.proSummary = data.proInfo.proSummary
                if (data.proInfo.tasks.length) {
                  this.dataForm.tasks = data.proInfo.tasks
                }
                // this.dataForm.createUserId = data.proInfo.createUserId
                // this.dataForm.createTime = data.proInfo.createTime
                // this.dataForm.updateTime = data.proInfo.updateTime
              }
            })
          }
        })
      },
      jia () {
        this.dataForm.tasks.push({
          createTime: '',
          proId: '',
          taskDesc: '',
          taskId: '',
          taskName: '',
          taskState: ''
        })
      },
      jian (val) {
        if (this.dataForm.tasks.length > 1) {
          this.dataForm.tasks.splice(val, 1)
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/pro/proinfo/${!this.dataForm.proId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'proId': this.dataForm.proId || undefined,
                'proName': this.dataForm.proName,
                'proSummary': this.dataForm.proSummary,
                'stuNum': this.dataForm.stuNum,
                'tasks': this.dataForm.tasks
                // 'createUserId': this.dataForm.createUserId,
                // 'createTime': this.dataForm.createTime,
                // 'updateTime': this.dataForm.updateTime
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>

<style>
/* .el-dialog {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 80%!important;
} */
.el-form-item {
    margin-bottom: 5px;
}
.el-dialog__body {
    padding: 10px 10px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
}
</style>
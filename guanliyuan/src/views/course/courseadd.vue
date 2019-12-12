<template>
  <div class="app-container">
    <div class="mtb">
      <span>课程名称:</span>
    </div>
    <div style="width:50%;max-width:700px">
      <el-input v-model="form.keshi" />
    </div>
    <div class="mtb">
      <span>课时:</span>
    </div>
    <div style="width:50%;max-width:700px">
      <el-input v-model="form.keshi" />
    </div>
    <div class="mtb">
      <span>授课图片:</span>
    </div>
    <div style="width:50%;width:700px">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus" />
      </el-upload>
    </div>
    <div class="mtb">
      <span>授课内容:</span>
    </div>
    <div style="width:50%;width:700px">
      <el-input v-model="form.keshi" rows="3" type="textarea" />
    </div>
    <div style="margin-top: 5px">
      <el-button v-if="!state" type="primary">新增</el-button>
      <el-button type="primary" @click="$router.push('/course')">返回</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      state: false,
      form: {
        title: '',
        neirong: '',
        kecheng: '',
        keshi: ''
      },
      options_kc: []
    }
  },
  mounted() {
    console.log(this.$route.query.pd)
    if (this.$route.query.pd) {
      this.state = true
      const form = JSON.parse(localStorage.getItem('package'))
      if (form.name) {
        this.form.title = form.name
        this.form.neirong = form.date
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.mtb{
  margin: 5px 0;
}
</style>
<style>
.el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 170px;
    height: 130px;
    margin: 0 8px 8px 0;
    display: inline-block;
}
.el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 130px;
    height: 130px;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
}
</style>

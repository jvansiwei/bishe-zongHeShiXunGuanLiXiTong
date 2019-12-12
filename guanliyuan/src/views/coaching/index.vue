<template>
  <div>
    <el-form style="padding:50px">
      <el-row class="el-row1">
        <el-col :span="4">
          <span>教练风采：</span>
        </el-col>
        <el-col :span="20">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="maximgs"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove2"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-col>
      </el-row>
      <el-row class="el-row2">
        <el-col :span="4">
          <span />
        </el-col>
        <el-col :span="20">
          <el-input v-for="(item, index) in xunhuan" :key="index" v-model="item.name" style="width:148px;margin-right: 4px" rows="3" type="textarea" />
        </el-col>
      </el-row>
      <el-row class="el-row" style="margin-top: -6px">
        <el-col :span="8">
          <span />
        </el-col>
        <el-col :span="16">
          <el-button
            class="filter-item"
            type="primary"
          >提交</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xunhuan: [{ name: 'Runoob' },
        { name: 'Google' },
        { name: 'Taobao' }],
      value: '',
      maximgs: 3,
      imageUrl: '',
      name: '轮滑俱乐部',
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      form: {
        jianjie: '',
        diqu: [],
        dizhi: ''
      },
      maps: [{
        value: 'zhinan',
        label: '河南',
        children: [{
          value: 'zhengzhou',
          label: '郑州',
          children: [{
            value: 'yizhi',
            label: '中原区'
          }, {
            value: 'fankui',
            label: '二七区'
          }, {
            value: 'xiaolv',
            label: '金水区'
          }, {
            value: 'kekong',
            label: '荥阳'
          }]
        }, {
          value: 'daohang',
          label: '南阳',
          children: [{
            value: 'cexiangdaohang',
            label: '唐河县'
          }, {
            value: 'dingbudaohang',
            label: '桐柏县'
          }]
        }]
      }]
    }
  },
  methods: {
    handleRemove1(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
span {
  float: right;
  margin-top: 6px
}
.el-row {
  width: 40%;
  margin: 10px 0px;
}
.el-row1 {
  width: 80%;
  margin: 10px 0px;
}
.el-row2 {
  width: 80%;
  margin-bottom: 10px;
}
.avatar-uploader {
  width: 148px;
  height: 148px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>

<template>
  <div class="app-container">
    <div class="jvzhong">
      <div>
        <el-button v-if="!state" type="primary">发布</el-button>
        <el-button type="primary" @click="$router.push('/match')">返回</el-button>
      </div>
      <div style="width:100%;height:250px">
        <div class="fl">
          <div class="mtb" style="width:200px">
            <span>赛事图片:</span>
          </div>
          <div>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="url" :src="url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
        </div>
        <div class="fl" style="width:500px">
          <div class="mtb">
            <span>赛事标题:</span>
          </div>
          <div class="widths">
            <el-input v-model="form.title" :disabled="state" />
          </div>
          <div class="mtb">
            <span>举办地点:</span>
          </div>
          <div class="widths">
            <el-input v-model="form.title" :disabled="state" />
          </div>
          <div class="mtb">
            <span>赛事日期:</span>
          </div>
          <div class="widths">
            <el-date-picker
              v-model="form.time"
              style="width:236px"
              :disabled="state"
              type="datetime"
              placeholder="选择开始日期"
            />
            至
            <el-date-picker
              v-model="form.time"
              style="width:237px"
              :disabled="state"
              type="datetime"
              placeholder="选择结束日期"
            />
          </div>
        </div>
      </div>
      <div class="mtb">
        <span>赛事内容:</span>
      </div>
      <div class="widths">
        <texts />
      </div>
    </div>
  </div>
</template>

<script>
import texts from '@/components/Tinymce/index'
export default {
  components: { texts },
  data() {
    return {
      url: '',
      state: true,
      form: {
        title: '',
        time: '',
        neirong: ''
      }
    }
  },
  mounted() {
    console.log(this.$route.query.pd)
    if (this.$route.query.pd) {
      this.state = true
      const form = JSON.parse(localStorage.getItem('notice'))
      if (form.name) {
        this.form.title = form.name
        this.form.neirong = form.date
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.url = URL.createObjectURL(file.raw)
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
.jvzhong{
  width: 800px;
  margin: 0 auto;
}
.widths{
  width: 100%;
  /* max-width:700px; */
  min-width: 500px;
}
.mtb{
  margin: 10px 0;
}
.avatar-uploader {
  width: 170px;
  height: 170px;
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
  width: 170px;
  height: 170px;
  line-height: 170px;
  text-align: center;
}
.avatar {
  width: 170px;
  height: 170px;
  display: block;
}
</style>

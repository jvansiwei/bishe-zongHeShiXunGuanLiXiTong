<template>
  <div class="app-container">
    <div class="jvzhong">
      <el-form>
        <el-row class="el-row">
          <el-col :span="span1">
            <span class="must">通知标题：</span>
          </el-col>
          <el-col :span="span2">
            <el-input v-model="form.title" :disabled="state" />
          </el-col>
        </el-row>
        <el-row class="el-row">
          <el-col :span="span1">
            <span class="must">通知类型：</span>
          </el-col>
          <el-col :span="span2">
            <el-select v-model="form.noticeType" :disabled="state" style="width:50%" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row class="el-row">
          <el-col :span="span1">
            <span class="must">通知内容：</span>
          </el-col>
          <el-col :span="span2">
            <el-input v-model="form.content" :disabled="state" rows="10" type="textarea" />
          </el-col>
        </el-row>
        <el-row class="el-row" style="margin-bottom:5px">
          <el-col :span="span1">
            <span />
          </el-col>
          <el-col :span="span2">
            <el-button v-if="!state" type="primary" @click="submit">发布</el-button>
            <el-button type="primary" @click="$router.push('/notice')">返回</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { noticeadd } from '@/api/notice'
export default {
  data() {
    return {
      span1: 4,
      span2: 20,
      state: false,
      form: {
        content: '',
        createTime: '',
        id: 0,
        noticeType: '',
        title: '',
        writer: '',
        writerId: 0,
        writerImg: ''
      },
      types: [{
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
      }, {
        name: '平台发给个人用户',
        value: '9'
      }]
    }
  },
  mounted() {
    console.log(this.$route.query.pd)
    if (this.$route.query.pd) {
      const form = JSON.parse(localStorage.getItem('notice'))
      if (form.title) {
        this.state = true
        this.form.title = form.title
        this.form.noticeType = form.noticeType
        this.form.content = form.content
      }
    }
  },
  methods: {
    submit() {
      if (!this.form.title) {
        this.$message.error('标题不能为空')
        return
      }
      if (!this.form.noticeType) {
        this.$message.error('通知类型不能为空')
        return
      }
      if (!this.form.content) {
        this.$message.error('通知内容不能为空')
        return
      }
      const query = {}
      for (const i in this.form) {
        query[i] = this.form[i]
      }
      noticeadd(query).then(res => {
        this.$message.success('发布成功')
      })
    }
  }
}
</script>

<style scoped>
.mtb{
  margin: 10px 0;
}
span {
  float: left;
  margin-top: 6px
}
.jvzhong{
  width: 50%;
  margin: 0 auto;
}
.el-row {
  width: 100%;
  margin: 5px 0px;
}
</style>

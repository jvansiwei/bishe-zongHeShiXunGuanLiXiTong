<template>
  <div class="app-container setting">
    <div>
      <el-button type="primary" @click="xinzeng">新增</el-button>
      <el-button type="primary">修改</el-button>
      <el-button type="primary" @click="$router.push('/user')">返回</el-button>
    </div>
    <el-form>
      <el-row class="el-row">
        <el-col :span="span1">
          <span>昵称：</span>
        </el-col>
        <el-col :span="span2">
          <el-input v-model="form.title" />
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="span1">
          <span>账号：</span>
        </el-col>
        <el-col :span="span2">
          <el-input v-model="form.title" />
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="span1">
          <span>密码：</span>
        </el-col>
        <el-col :span="span2">
          <el-input v-model="form.title" />
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="span1">
          <span>性别：</span>
        </el-col>
        <el-col :span="span2">
          <el-input v-model="form.title" />
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="span1">
          <span>签名：</span>
        </el-col>
        <el-col :span="span2">
          <el-input v-model="form.title" />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      span1: 4,
      span2: 20,
      state: false,
      form: {
        title: '',
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
  }
}
</script>

<style scoped>
.mtb{
  margin: 10px 0;
}
.setting{
  width: 100%;
  max-width: 500px;
}
span {
  float: left;
  margin-top: 6px
}
.el-row {
  width: 100%;
  margin: 5px 0px;
}
</style>

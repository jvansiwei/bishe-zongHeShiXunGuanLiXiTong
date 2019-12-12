<template>
  <div class="app-container">
    <div>
      <el-button v-if="!state" type="primary">发布</el-button>
      <el-button type="primary" @click="$router.push('/complaint')">返回</el-button>
    </div>
    <div class="mtb">
      <span>投诉标题:</span>
    </div>
    <div style="width:50%;max-width:700px">
      <el-input v-model="form.title" :disabled="state" />
    </div>
    <div class="mtb">
      <span>投诉内容:</span>
    </div>
    <div style="width:50%;max-width:700px">
      <el-input v-model="form.neirong" :disabled="state" rows="5" type="textarea" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
</style>

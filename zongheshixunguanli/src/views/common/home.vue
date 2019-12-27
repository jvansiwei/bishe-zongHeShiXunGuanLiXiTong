<template>
  <div class="mod-home">
    <h3>项目介绍</h3>
    <ul>
      综合实训管理系统任务
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    created () {
      let form = JSON.parse(localStorage.getItem('userInfo'))
      if (form.stuId || form.stuId + '' === '0') {
        this.$router.push('/team-team')
      } else if (form.teaId || form.teaId + '' === '0') {
        this.$router.push('/tecKeti-myketi')
      } else {
        this.$router.push('/sys-practice')
      }
    }
  }
</script>

<style>
  .mod-home {
    line-height: 1.5;
  }
</style>


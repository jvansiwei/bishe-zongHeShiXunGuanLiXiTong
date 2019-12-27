<template>
    <div style="width:100%">
        <editor id="tinymce" v-model="value" :init="init"></editor>
    </div>
</template>

<script>
// 引入基础文件：
    import tinymce from 'tinymce/tinymce'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/themes/silver'
    import 'tinymce/plugins/image'// 插入上传图片插件
    export default {
      name: 'tinymce',
      components: {
        Editor
      },
      props: {
        curValue: {
          type: String,
          default: ''
        }
      },
      data () {
        return {
          init: {
            language_url: '/static/tinymce/langs/zh_CN.js', // 语言包的路径
            language: 'zh_CN', // 语言
            skin_url: '/static/tinymce/skins/ui/oxide', // skin路径
            height: 400, // 编辑器高度
            branding: false, // 是否禁用“Powered by TinyMCE”
            menubar: false, // 顶部菜单栏显示
            elementpath: false,  // 禁用编辑器底部的状态栏
            paste_data_images: true, // 允许粘贴图像
            plugins: 'image',
            toolbar: ['formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'],
            images_upload_handler: (blobInfo, success, failure) => {
              let formData = new FormData()
              formData.append('folder', 'editor/img')
              formData.append('upfile', blobInfo.blob(), blobInfo.filename())
              this.$api.uploadFile(formData).then(response => {
                if (response.code === 1) {
                  let fileArr = response.data.files[0].url
                  success(fileArr)
                }
              })
                            .catch(() => {
                              failure('上传失败')
                            })
            }
          },
          value: this.curValue
        }
      },
      mounted () {
        tinymce.init({})
      },
      watch: {
        curValue (newValue) {
          console.log(66666666)
          this.value = newValue
        },
        value (newValue) {
          let _this = this
          _this.$emit('input', newValue)
        }
      }
    }
</script>
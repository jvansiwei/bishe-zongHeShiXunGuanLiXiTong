<template>
  <div class="app-container">
    <!-- <div class="jvzhong">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <form>
        <el-row class="el-row">
          <el-col v-for="(item, index) in fileList" :key="index" v-dragging="{ item: item, list: fileList, group: 'item' }" :span="24">
            <div class="img" :style="{backgroundImage: 'url(' + item.url + ')' }">
              <div class="img1">
                <el-button class="el-icon-zoom-in icon fl" @click="imagemax(item.url)" />
              </div>
              <div class="img1">
                <el-button class="el-icon-delete icon fr" />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="el-row">
          <el-col :span="24">
            <el-button type="primary">新增</el-button>
            <el-button type="primary">保存</el-button>
          </el-col>
        </el-row>
      </form>
    </div> -->
    <div style="width:100%;height:40px;margin-bottom:10px">
      <div class="fl">
        <el-select v-model="condition.state" style="width:150px" placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.name"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </div>
      <!-- <div class="fl" style="margin-left: 5px">
        <el-upload
          class="upload-demo"
          action="/api/upload"
          multiple
          :show-file-list="false"
          :on-success="success"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div> -->
      <div class="fl">
        <el-button class="fl" style="margin-left: 5px" type="primary" size="small" @click="tianjia">添加</el-button>
      </div>
      <div class="fl">
        <el-button class="fl" style="margin-left: 5px" type="primary" size="small" @click="deletes">删除</el-button>
      </div>
    </div>
    <el-table
      :data="fileList"
      border
      row-key="index"
      align="left"
      style="width:800px"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column
        v-for="(item, index) in col"
        :key="`col_${index}`"
        :prop="dropCol[index].prop"
        :label="item.label"
      /> -->
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column label="轮播图片" width="181">
        <template slot-scope="scope">
          <img class="imgmin" :src="scope.row.url" @click="imagemax(scope.row.url)">
        </template>
      </el-table-column>
      <el-table-column label="排序号" width="180">
        <template slot-scope="scope">
          <!-- <span v-if="!panduan">{{ scope.row.sortNum }}</span> -->
          <el-input
            v-model="scope.row.sortNum"
            style="width: 80px"
          />
          <el-button v-if="condition.state==1" type="text" plain icon="el-icon-edit" @click="update(scope.row)">保存</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="text">详情</el-button> -->
          <el-button v-if="scope.row.state=='0'" type="text" @click="up(scope.row)">上线</el-button>
          <el-button v-else type="text" @click="down(scope.row)">下线</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增图片" style="min-width:700px" :visible.sync="dialogFormadd">
      <el-form :model="form">
        <el-row>
          <el-col class="mb" :span="8">
            <span class="mt">图片类型：</span>
          </el-col>
          <el-col class="mb" :span="16">
            <el-select v-model="form.type" style="width:100%" placeholder="请选择">
              <el-option
                v-for="item in type_lx"
                :key="item.name"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col v-if="form.type==1||form.type==2" class="mb" :span="8">
            <span class="mt">俱乐部名称：</span>
          </el-col>
          <el-col v-if="form.type==1||form.type==2" class="mb" :span="16">
            <el-select v-model="form.clubId" style="width:100%" placeholder="请选择">
              <el-option
                v-for="item in clubs"
                :key="item.name"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col v-if="form.clubId&&form.type==2" class="mb" :span="8">
            <span class="mt">套餐名称：</span>
          </el-col>
          <el-col v-if="form.clubId&&form.type==2" class="mb" :span="16">
            <el-select v-model="form.searchId" style="width:100%" placeholder="请选择">
              <el-option
                v-for="item in packages"
                :key="item.name"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col class="mb" :span="8">
            <span class="mt">上传图片：</span>
          </el-col>
          <el-col class="mb" :span="16">
            <el-upload
              class="avatar-uploader"
              action="/api/upload"
              :show-file-list="false"
              :on-success="success"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormadd = false">取 消</el-button>
        <el-button :disabled="yanzheng()" type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { carousellist, carouseladd, carouseldel, carouseonline, carouseoffline, carouselupdate, carouselclubs, carouselpackages } from '@/api/carousel'
export default {
  data() {
    return {
      dialogFormadd: false,
      panduan: false,
      span1: 6,
      span2: 18,
      infos: [],
      fileList: [],
      table_ls: [],
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        type: '',
        clubId: '',
        searchId: '',
        url: ''
      },
      condition: {
        page: '1',
        limit: '100',
        state: '1'
      },
      clubs: [],
      packages: [],
      type_lx: [
        {
          name: '图片',
          value: 0
        }, {
          name: '俱乐部',
          value: 1
        }, {
          name: '俱乐部套餐',
          value: 2
        }
        // ,{
        //   name: '活动',
        //   value: 3
        // }, {
        //   name: '其他网页',
        //   value: 4
        // }
      ],
      types: [{
        name: '已上线',
        value: '1'
      }, {
        name: '未上线',
        value: '0'
      }]
    }
  },
  watch: {
    'condition.state'() {
      this.getDate()
    },
    'form.clubId'() {
      this.form.searchId = ''
      if (this.form.type === 2) {
        const query = {
          clubId: this.form.clubId
        }
        carouselpackages(query).then(res => {
          this.packages = []
          for (let i = 0; i < res.data.length; i++) {
            this.packages.push({
              name: res.data[i].packageName,
              value: res.data[i].packageId
            })
          }
        })
      }
    },
    'form.type'() {
      if (this.form.type === 2 && this.form.clubId) {
        const query = {
          clubId: this.form.clubId
        }
        carouselpackages(query).then(res => {
          this.packages = []
          for (let i = 0; i < res.data.length; i++) {
            this.packages.push({
              name: res.data[i].packageName,
              value: res.data[i].packageId
            })
          }
        })
      }
    }
  },
  mounted() {
    this.getDate()
    this.rowDrop()
    this.columnDrop()
    carouselclubs().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.clubs.push({
          name: res.data[i].clubName,
          value: res.data[i].id
        })
      }
    })
  },
  methods: {
    yanzheng() {
      if ((this.form.type === 0 || this.form.type === 1 || this.form.type === 2) && this.form.url) {
        // console.log(this.form.clubId)
        // console.log(this.form.searchId)
        if (this.form.type === 1) {
          if (this.form.clubId) {
            return false
          } else {
            return true
          }
        } else if (this.form.type === 2) {
          if (this.form.searchId) {
            return false
          } else {
            return true
          }
        } else {
          return false
        }
      } else {
        return true
      }
    },
    tianjia() {
      for (const i in this.form) {
        this.form[i] = ''
      }
      this.dialogFormadd = true
    },
    update(val) {
      const query = {
        id: val.id,
        sortNum: val.sortNum * 1
      }
      for (let i = 0; i < this.table_ls.length; i++) {
        if (query.id * 1 !== this.table_ls[i].id * 1) {
          if (query.sortNum === this.table_ls[i].sortNum * 1) {
            this.$message.error('排序号不能重复')
            return
          }
        }
      }
      console.log(query)
      carouselupdate(query).then(res => {
        this.$message.success('修改成功')
        this.getDate()
      })
    },
    getDate() {
      carousellist(this.condition).then(res => {
        this.fileList = res.page.list
        if (this.condition.state === '1') {
          this.table_ls = res.page.list
        }
      })
    },
    add(val) {
      const query = {}
      query.type = this.form.type
      if (this.form.type * 1 === 1) {
        query.searchId = this.form.clubId
      }
      if (this.form.type * 1 === 2) {
        query.searchId = this.form.searchId
      }
      if (this.form.url) {
        query.url = this.form.url
      }
      carouseladd(query).then(res => {
        this.$message.success('新增成功,在未上线列表中查看')
        this.dialogFormadd = false
        this.getDate()
      })
    },
    deletes() {
      const id = []
      for (let i = 0; i < this.infos.length; i++) {
        id.push(this.infos[i].id)
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        carouseldel(id).then(res => {
          this.$message.success('删除成功')
          this.getDate()
        })
      }).catch(() => {
        this.$message.info('取消操作')
      })
    },
    up(res) {
      this.$prompt('请输入排序号', '排序', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        if (value * 1 < 1) {
          this.$message.error('排序号应为正整数')
          return
        }
        if (isNaN(value)) {
          this.$message.error('排序号应为正整数')
          return
        }
        const query = {
          id: res.id,
          sortNum: value
        }
        for (let i = 0; i < this.table_ls.length; i++) {
          if (query.id * 1 !== this.table_ls[i].id * 1) {
            if (query.sortNum * 1 === this.table_ls[i].sortNum * 1) {
              this.$message.error('排序号不能重复')
              return
            }
          }
        }
        carouseonline(query).then(res => {
          res.state = '1'
          this.$message.success('上线成功')
          this.getDate()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    down(res) {
      const id = {
        id: res.id
      }
      carouseoffline(id).then(res => {
        res.state = '0'
        this.$message.success('下线成功')
        this.getDate()
      })
    },
    // 行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
        }
      })
    },
    // 列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldItem = this.dropCol[evt.oldIndex]
          this.dropCol.splice(evt.oldIndex, 1)
          this.dropCol.splice(evt.newIndex, 0, oldItem)
        }
      })
    },
    imagemax(res) {
      this.dialogImageUrl = res
      this.dialogVisible = true
      console.log(this.dialogImageUrl)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    success(res, file, fileList) {
      console.log(fileList)
      fileList[fileList.length - 1].url = 'https://' + res.url
      this.imageUrl = 'https://' + res.url
      this.form.url = res.url
    },
    // 表格勾选的数据变化
    handleSelectionChange(res) {
      this.infos = res
    }
  }
}
</script>

<style scoped>
.avatar-uploader {
  width: 200px;
  height: 130px;
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
  width: 200px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 130px;
  display: block;
}
span {
  float: left;
  margin-top: 6px
}
.imgmin{
  width: 160px;
  height: 90px;
}
.img{
  width: 240px;
  height: 135px;
  background-size:240px 135px;
  margin: 5px;
}
/* .img:hover{
  opacity: 0.2;
  width: 320px;
  height: 180px;
  background-size:320px 180px;
  margin: 5px;
} */
.el-row {
  width: 100%;
  margin: 5px 0px;
}
.jvzhong{
  width: 240px;
  /* margin: 0 auto; */
}
.icon{
  font-size: 30px;
  padding: 0;
  opacity: 0.3;
}
/* .icon:hover{
  font-size: 30px;
  padding: 0;
  opacity: 1;
} */
</style>

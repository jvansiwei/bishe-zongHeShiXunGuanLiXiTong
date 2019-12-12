<template>
  <div class="app-container">
    <div class="filter-container" style="padding:0">
      <el-input
        v-model="condition.clubName"
        placeholder="俱乐部名称"
        style="width: 200px"
        class="filter-item"
        suffix-icon="el-icon-search"
        @keyup.enter.native="getDate"
      />
      <el-input
        v-model="condition.mobile"
        placeholder="账号"
        style="width: 200px"
        class="filter-item"
        suffix-icon="el-icon-search"
        @keyup.enter.native="getDate"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getDate"
      >搜索</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="xinzeng"
      >新增</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="id" width="50" />
      <el-table-column type="expand" width="40">
        <template slot-scope="scope">
          <div class="wis">
            <div class="wi_label fl">
              介绍：
            </div>
            <div class="wi_span fl">
              <span class="spans">{{ scope.row.introduction }}</span>
            </div>
          </div>
          <div class="wis">
            <div class="wi_label fl">
              精确地址：
            </div>
            <div class="wi_span fl">
              <span class="spans">{{ scope.row.clubAddress }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="俱乐部名称" width="120">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.clubName">{{ scope.row.clubName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="俱乐部图片" width="95px">
        <template slot-scope="scope">
          <img
            v-if="scope.row.clubLogo"
            style="width: 70px; height: 50px"
            :src="scope.row.clubLogo"
            @click="imgMax(scope.row.clubLogo)"
          >
          <span v-else>暂无图片</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="俱乐部logo" width="95px">
        <template slot-scope="scope">
          <el-image :src="'/api/logos/'+scope.row.id+'.jpg?'+suiji" @click="imgMax('/api/logos/'+scope.row.id+'.jpg?'+suiji)">
            <div slot="error">
              <span>暂无图片</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="俱乐部账号" width="110">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.clubAccount">{{ scope.row.clubAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="绑定的手机号" width="110">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.accountMobile">{{ scope.row.accountMobile }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="所在地区" width="80">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.city">{{ scope.row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="标签">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.labels">{{ scope.row.labels }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="联系电话" width="110">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.clubMobile">{{ scope.row.clubMobile }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="添加日期" width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.createTime" class="shenglue" :title="scope.row.createTime">{{ scope.row.createTime.slice(0,10) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="排序号" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.homeSortNum||scope.row.homeSortNum==0" class="shenglue" :title="scope.row.homeSortNum">{{ scope.row.homeSortNum }}</span>
          <span v-else>暂未排序</span>
          <el-button type="text" plain icon="el-icon-edit" @click="bangding(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="Logo(scope.row)">上传Logo</el-button>
          <!-- <el-button type="text" @click="xiugais(scope.row)">维护</el-button> -->
          <el-button v-if="scope.row.state==0" style="color:red" type="text" @click="OnOff(true,scope.row)">上线</el-button>
          <el-button v-else type="text" @click="OnOff(false,scope.row)">下线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height:35px">
      <pagination v-show="tableData.length" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getDate" />
    </div>
    <el-dialog title="新增俱乐部" style="min-width:700px" :visible.sync="dialogFormadd">
      <el-form :model="query">
        <el-row>
          <el-col class="mb" :span="8">
            <span class="mt">俱乐部名称：</span>
          </el-col>
          <el-col class="mb" :span="16">
            <el-input v-model="query.clubName" autocomplete="off" />
          </el-col>
          <el-col class="mb" :span="8">
            <span class="mt">俱乐部账号：</span>
          </el-col>
          <el-col class="mb" :span="16">
            <el-input v-model="query.mobile" autocomplete="off" />
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormadd = false">取 消</el-button>
        <el-button :disabled="!query.clubName||!query.mobile" type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="维护数据" style="min-width:700px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-row>
          <el-col class="mb" :span="span1">
            <span class="mt">俱乐部名称：</span>
          </el-col>
          <el-col class="mb" :span="span2">
            <el-input v-model="form.clubName" autocomplete="off" />
          </el-col>
          <el-col class="mb" :span="span1">
            <span class="mt">俱乐部账号：</span>
          </el-col>
          <el-col class="mb" :span="span2">
            <el-input v-model="form.name" autocomplete="off" />
          </el-col>
          <el-col class="mb" :span="span1">
            <span class="mt">俱乐部密码：</span>
          </el-col>
          <el-col class="mb" :span="span2">
            <el-select v-model="form.name" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col class="mb" :span="span1">
            <span class="mt">俱乐部所在地区：</span>
          </el-col>
          <el-col class="mb" :span="span2">
            <el-select v-model="form.name" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col class="mb" :span="span1">
            <span class="mt">精确地址：</span>
          </el-col>
          <el-col class="mb" :span="span2">
            <el-input v-model="form.name" autocomplete="off" />
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :disabled="yanzheng()" type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="上传Logo" style="min-width:700px" :visible.sync="dialogLogo">
      <el-form :model="form">
        <el-row>
          <el-col class="mb" :span="8">
            <span class="mt">上传图片：</span>
          </el-col>
          <el-col class="mb" :span="16">
            <el-upload
              class="avatar-uploader"
              :action="'/api/sys/qrcode/stu/upload/'+clubId"
              :headers="sysToken"
              :show-file-list="false"
              :on-success="success"
            >
              <el-image :src="imageUrl" class="avatar">
                <div slot="error" class="image-slot">
                  <i class="el-icon-plus avatar-uploader-icon" style="line-height: none" />
                </div>
              </el-image>
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" /> -->
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLogo = false">取 消</el-button>
        <el-button :disabled="!imageUrl" type="primary" @click="addLogo()">确 定</el-button>
      </div> -->
    </el-dialog>
    <el-dialog title="排序" width="25%" :visible.sync="dialogPaixu">
      <el-form :model="clubs">
        <el-row>
          <el-col class="mb" :span="8">
            <span class="mt must">排序号：</span>
          </el-col>
          <el-col class="mb" :span="16">
            <el-input v-model="clubs.homeSortNum" autocomplete="off" />
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPaixu = false">取 消</el-button>
        <el-button :disabled="!clubs.homeSortNum" type="primary" @click="clubsPaixu">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { clublist, clubadd, clubonline, cluboffline, clubPaixu } from '@/api/club'
import { QRcodeup } from '@/api/QRcode'
// import { coachlist, arealist, packagelist } from '@/api/list'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      sysToken: {
        sysToken: ''
      },
      clubId: '',
      imageUrl: '',
      dialogPaixu: false,
      dialogImageUrl: '',
      suiji: 0,
      xiugai: false,
      span1: 5,
      span2: 7,
      dialogLogo: false,
      dialogVisible: false,
      dialogFormadd: false,
      dialogFormVisible: false,
      clubs: {
        id: '',
        homeSortNum: ''
      },
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      total: 0,
      info: '',
      condition: {
        page: '1',
        limit: '20',
        clubName: '',
        mobile: ''
      },
      query: {
        clubName: '',
        mobile: ''
      },
      form: {
        clubName: '',
        mobile: ''
      },
      options: [
        {
          name: '男',
          value: '1'
        },
        {
          name: '女',
          value: '2'
        }
      ],
      options_gx: [
        {
          name: '父亲',
          value: '1'
        }, {
          name: '母亲',
          value: '2'
        }, {
          name: '爷爷',
          value: '3'
        }, {
          name: '奶奶',
          value: '4'
        }, {
          name: '外公',
          value: '5'
        }, {
          name: '外婆',
          value: '6'
        }
      ], // 家属列表
      tableData: []
    }
  },
  mounted() {
    // this.getCoach()
    // this.getPackage()
    // this.getArea()
    this.sysToken.sysToken = getToken()
    this.getDate()
  },
  methods: {
    bangding(val) {
      this.clubs.id = val.id
      this.clubs.homeSortNum = val.homeSortNum
      this.dialogPaixu = true
    },
    clubsPaixu() {
      this.clubs.homeSortNum = this.clubs.homeSortNum * 1
      clubPaixu(this.clubs).then(res => {
        this.$message.success('排序成功')
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.clubs.id === this.tableData[i].id) {
            this.tableData[i].homeSortNum = this.clubs.homeSortNum
            break
          }
        }
        this.dialogPaixu = false
      })
    },
    imgMax(val) {
      this.dialogImageUrl = val
      this.dialogVisible = true
    },
    OnOff(x, val) {
      let k = ''
      if (x) {
        k = '上线'
      } else {
        k = '下线'
      }
      this.$confirm('是否' + k + '该俱乐部?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const query = {
          clubId: val.id
        }
        if (x) {
          clubonline(query).then(res => {
            val.state = 1
          })
        } else {
          cluboffline(query).then(res => {
            val.state = 0
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    xinzeng() {
      for (const i in this.query) {
        this.query[i] = ''
      }
      this.dialogFormadd = true
    },
    Logo(res) {
      // this.xiugai = true
      this.clubId = res.id
      this.imageUrl = '/api/logos/' + res.id + '.jpg?' + this.suiji
      this.dialogLogo = true
    },
    xiugais(res) {
      this.xiugai = true
      this.form = res
      this.dialogFormVisible = true
    },
    add() {
      clubadd(this.query).then(res => {
        this.$message.success('新增成功')
        this.getDate()
      })
      this.dialogFormadd = false
    },
    addLogo() {
      const query = {
        clubId: this.clubId,
        file: this.imageUrl
      }
      QRcodeup(query).then(res => {
        this.$message.success('新增成功')
        this.getDate()
      })
      this.dialogFormadd = false
    },
    success(res, file, fileList) {
      if (res.code * 1 === 0) {
        this.$message.success('上传Logo成功')
        this.dialogLogo = false
        this.getDate()
      }
    },
    yanzheng() {
      // if (this.form.mobile.length) {
      //   return false
      // } else {
      //   return true
      // }
      return false
    },
    // 代码转换成为名字
    qiehuan(res, shuzu) {
      for (let i = 0; i < shuzu.length; i++) {
        if (res === shuzu[i].value) {
          if (shuzu[i].name) {
            return shuzu[i].name
          } else {
            return ''
          }
        }
      }
      return ''
    },
    // 查询数据接口
    getDate() {
      this.suiji = Date.now()
      this.condition.page = this.listQuery.page
      this.condition.limit = this.listQuery.limit
      const query = {}
      for (const i in this.condition) {
        if (this.condition[i]) {
          query[i] = this.condition[i]
        }
      }
      clublist(query).then(res => {
        this.tableData = res.page.list
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].suiji = i
          this.tableData[i].image = '/api/logos/' + this.tableData[i].id + '.jpg?' + i
        }
        this.total = res.page.totalCount
      }).catch({})
    },
    clicks() {
      this.dialogFormVisible = true
    },
    // 提交报名信息接口
    submit(res) {
      for (const i in this.form) {
        this.form[i] = ''
      }
      this.dialogFormVisible = false
      // signUp(this.form).then(res => {
      //   console.log(res)
      // })
      // if (res.money <= 0) {
      //   this.$message.error('请输入缴费金额')
      // } else if (!res.jiaolian) {
      //   this.$message.error('请选择教练')
      // } else {
      //   this.$confirm('确认缴费' + res.money + '元？', '确认信息', {
      //     distinguishCancelAndClose: true,
      //     confirmButtonText: '缴费',
      //     cancelButtonText: '取消'
      //   })
      //     .then(() => {
      //       this.$message.success('缴费成功')
      //     })
      //     .catch(action => {
      //       this.$message({
      //         type: 'info',
      //         message: action === 'cancel'
      //           ? '放弃缴费并离开页面'
      //           : '停留在当前页面'
      //       })
      //     })
      // }
    }
  }
}
</script>

<style scoped>
.spans{
  word-break:normal;
  width:95%;
  display:block;
  white-space:pre-wrap;
  word-wrap : break-word ;
  overflow: hidden ;
}
.mt{
  margin-top: 6px;
  float: right;
}
.mb{
  margin-bottom: 10px
}
.el-row {
  width: 100%;
  margin: 5px 0px;
}
</style>
<style>
.el-dialog{
    position: relative;
    margin: 0 auto 50px;
    background: #FFFFFF;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 90%;
    max-width: 400px;
}
</style>

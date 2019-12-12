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
      <!-- <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getDate"
      >搜索</el-button> -->
      <el-button
        class="filter-item"
        type="primary"
        @click="xinzeng"
      >新增</el-button>
      <!-- <el-button
        class="filter-item"
        type="primary"
        @click="fenpei"
      >分配二维码</el-button>
      <el-button
        :disabled="datas.length==0"
        class="filter-item"
        type="primary"
        @click="down"
      >下载二维码</el-button> -->
    </div>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
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
          <span v-if="scope.row.clubName" class="shenglue" :title="scope.row.clubName">{{ scope.row.clubName }}</span>
          <span v-else>暂未绑定</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="二维码" width="95px">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.code"
            style="width: 70px; height: 50px"
            :src="'api/club/qrCode/'+scope.row.code+'.jpg'"
            @click="imgMax('/api/club/qrCode/'+scope.row.code+'.jpg')"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
          <span v-else>暂无图片</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="二维码id">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.code">{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="添加日期" width="170">
        <template slot-scope="scope">
          <span v-if="scope.row.createTime" class="shenglue" :title="scope.row.createTime">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="xiugais(scope.row)">维护</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div style="height:35px">
      <pagination v-show="tableData.length" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getDate" />
    </div>
    <el-dialog title="生成二维码" style="min-width:700px" :visible.sync="dialogFormadd">
      <el-form :model="query">
        <el-row>
          <el-col class="mb" :span="9">
            <span class="mt">选择俱乐部：</span>
          </el-col>
          <el-col class="mb" :span="15">
            <el-select v-model="query.clubId" clearable style="width:100%" placeholder="请选择">
              <el-option
                v-for="item in clubs"
                :key="item.name"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col class="mb" :span="9">
            <span class="mt">使用俱乐部logo：</span>
          </el-col>
          <el-col class="mb" :span="15">
            <el-select v-model="query.useLogo" clearable style="width:100%" placeholder="请选择">
              <el-option
                v-for="item in options_sf"
                :key="item.name"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormadd = false">取 消</el-button>
        <el-button :disabled="!query.clubId" type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配二维码" style="min-width:700px" :visible.sync="dialogFenpei">
      <el-form :model="query_fenpei">
        <el-row>
          <el-col class="mb" :span="9">
            <span class="mt must">选择俱乐部：</span>
          </el-col>
          <el-col class="mb" :span="15">
            <el-select v-model="query_fenpei.clubId" style="width:100%" placeholder="请选择">
              <el-option
                v-for="item in clubs"
                :key="item.name"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col class="mb" :span="9">
            <span class="mt must">分配数量：</span>
          </el-col>
          <el-col class="mb" :span="15">
            <el-input v-model="query_fenpei.count" type="num" min="1" autocomplete="off" />
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFenpei = false">取 消</el-button>
        <el-button :disabled="query_fenpei.count<1 || !query_fenpei.clubId" type="primary" @click="add_fenpei()">确 定</el-button>
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
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { clubQRcodelist, clubQRcodeadd, QRcodearrange } from '@/api/QRcode'
import { carouselclubs } from '@/api/carousel'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      datas: [],
      dialogImageUrl: '',
      xiugai: false,
      span1: 5,
      span2: 7,
      dialogVisible: false,
      dialogFenpei: false,
      dialogFormadd: false,
      dialogFormVisible: false,
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
      clubs: [],
      condition: {
        page: '1',
        limit: '20',
        clubName: ''
      },
      query: {
        clubId: '',
        useLogo: ''
      },
      query_fenpei: {
        clubId: '',
        count: ''
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
      options_sf: [
        {
          name: '是',
          value: true
        },
        {
          name: '否',
          value: false
        }
      ],
      tableData: []
    }
  },
  watch: {
    'condition.clubName'() {
      this.getDate()
    }
  },
  mounted() {
    // this.getCoach()
    // this.getPackage()
    // this.getArea()
    this.getDate()
    this.getClubs()
  },
  methods: {
    getClubs() {
      this.clubs = []
      carouselclubs().then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.clubs.push({
            name: res.data[i].clubName,
            value: res.data[i].id
          })
        }
      })
    },
    imgMax(val) {
      this.dialogImageUrl = val
      this.dialogVisible = true
    },
    xinzeng() {
      for (const i in this.query) {
        this.query[i] = ''
      }
      this.dialogFormadd = true
    },
    fenpei() {
      for (const i in this.query_fenpei) {
        this.query_fenpei[i] = ''
      }
      this.dialogFenpei = true
    },
    xiugais(res) {
      this.xiugai = true
      this.form = res
      this.dialogFormVisible = true
    },
    add_fenpei() {
      const form = {}
      for (const i in this.query_fenpei) {
        if (this.query_fenpei[i]) {
          form[i] = this.query_fenpei[i]
        }
      }
      QRcodearrange(form).then(res => {
        this.$message.success('分配成功')
      })
    },
    add() {
      const form = {}
      if (this.query.clubId) {
        form.clubId = this.query.clubId
      }
      if (this.query.useLogo || this.query.useLogo === 0) {
        form.useLogo = this.query.useLogo
      }
      clubQRcodeadd(form).then(res => {
        this.$message.success('新增成功')
        this.getDate()
      })
      this.dialogFormadd = false
    },
    handleSelectionChange(val) {
      this.datas = val
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
      this.condition.page = this.listQuery.page
      this.condition.limit = this.listQuery.limit
      const query = {}
      for (const i in this.condition) {
        if (this.condition[i]) {
          query[i] = this.condition[i]
        }
      }
      clubQRcodelist(query).then(res => {
        this.tableData = res.page.list
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

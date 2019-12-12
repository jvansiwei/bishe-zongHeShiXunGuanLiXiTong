<template>
  <div class="app-container">
    <div class="filter-container" style="padding:0">
      <el-input
        v-model="condition.clubName"
        placeholder="俱乐部名称"
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="getDate"
      />
      <el-input
        v-model="condition.userMobile"
        placeholder="手机号"
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="getDate"
      />
      <el-input
        v-model="condition.userName"
        placeholder="用户名"
        style="width: 110px"
        class="filter-item"
        @keyup.enter.native="getDate"
      />
      <el-input
        v-model="condition.city"
        placeholder="城市"
        style="width: 110px"
        class="filter-item"
        @keyup.enter.native="getDate"
      />
      <el-input
        v-model="condition.inviteCode"
        placeholder="邀请码"
        style="width: 110px"
        class="filter-item"
        @keyup.enter.native="getDate"
      />
      <el-select v-model="condition.state" class="filter-item" style="width: 110px" filterable clearable placeholder="选择状态">
        <el-option
          v-for="item in types"
          :key="item.name"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getDate"
      >搜索</el-button>
      <!-- <el-button
        class="filter-item"
        type="primary"
        @click="xinzeng"
      >新增</el-button> -->
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="id" width="50" />
      <!-- <el-table-column type="expand" width="40">
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
      </el-table-column> -->
      <el-table-column prop="name" label="俱乐部名称" width="120">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.clubName">{{ scope.row.clubName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="了解途径">
        <template slot-scope="scope">
          <span v-if="scope.row.inviteCode" class="shenglue" :title="scope.row.inviteCode">{{ scope.row.inviteCode }}</span><br v-if="scope.row.inviteCode">
          <span class="shenglue" :title="scope.row.listenFrom">{{ scope.row.listenFrom }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="俱乐部地址" width="95px">
        <el-table-column prop="name" label="省" width="80">
          <template slot-scope="scope">
            <span class="shenglue" :title="scope.row.clubProvince">{{ scope.row.clubProvince }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="市" width="80">
          <template slot-scope="scope">
            <span class="shenglue" :title="scope.row.clubCity">{{ scope.row.clubCity }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="区" width="90">
          <template slot-scope="scope">
            <span class="shenglue" :title="scope.row.clubRegion">{{ scope.row.clubRegion }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="name" label="联系人" width="100">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.userName">{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="联系人手机号" width="110">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.userMobile">{{ scope.row.userMobile }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="备注">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row.clubRemarks">{{ scope.row.clubRemarks }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state==0" type="danger" :title="qiehuan(scope.row.state, types)">{{ qiehuan(scope.row.state, types) }}</el-tag>
          <el-tag v-else :title="qiehuan(scope.row.state, types)">{{ qiehuan(scope.row.state, types) }}</el-tag>
          <el-button type="text" plain icon="el-icon-edit" @click="zhuangtai(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="添加日期" width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.createTime" class="shenglue" :title="scope.row.createTime">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="xiugais(scope.row)">维护</el-button>
          <el-button v-if="scope.row.state==0" style="color:red" type="text" @click="OnOff(true,scope.row)">上线</el-button>
          <el-button v-else type="text" @click="OnOff(false,scope.row)">下线</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div style="height:35px">
      <pagination v-show="tableData.length" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getDate" />
    </div>
    <!-- <el-dialog title="新增俱乐部" style="min-width:700px" :visible.sync="dialogFormadd">
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
        <el-button :disabled="!query.clubName||!query.mobile" type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog> -->
    <el-dialog title="更换状态" width="30%" :visible.sync="dialogZhuangtai">
      <el-form :model="form">
        <el-row>
          <el-col class="mb" :span="6">
            <span class="mt must">状态:</span>
          </el-col>
          <el-col class="mb" :span="18">
            <el-select v-model="form.state" style="width:100%" filterable placeholder="选择状态">
              <el-option
                v-for="item in types"
                :key="item.name"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col class="mb" :span="6">
            <span class="mt">试用时长（天）:</span>
          </el-col>
          <el-col class="mb" :span="18">
            <el-input v-model="form.duration" placeholder="可不填，默认为30天" type="number" min="0" autocomplete="off" />
          </el-col>
          <el-col class="mb" :span="6">
            <span class="mt must">备注:</span>
          </el-col>
          <el-col class="mb" :span="18">
            <el-input v-model="form.myRemarks" autocomplete="off" />
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogZhuangtai = false">取 消</el-button>
        <el-button type="primary" :disabled="form.state==''||form.myRemarks==''" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="维护数据" style="min-width:700px" :visible.sync="dialogFormVisible">
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
    </el-dialog> -->
  </div>
</template>

<script>
import { clubadd, clubonline, cluboffline, signuplist, signupUpdate } from '@/api/club'
import { coachlist, arealist, packagelist } from '@/api/list'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      panduan_zt: true,
      xiugai: false,
      span1: 5,
      span2: 7,
      dialogZhuangtai: false,
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
      form: {
        id: '',
        state: '',
        duration: '',
        myRemarks: ''
      },
      condition: {
        clubCityf: '',
        clubName: '',
        clubProvince: '',
        clubRegion: '',
        clubRemarks: '',
        clubScope: '',
        createTime: '',
        inviteCode: '', // 邀请码
        id: '',
        myRemarks: '',
        state: 0,
        updateTime: '',
        userMobile: '',
        userName: ''
      },
      query: {
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
      types: [
        {
          name: '报名成功',
          value: 0
        },
        {
          name: '有意向',
          value: 1
        }, {
          name: '无意向',
          value: 2
        },
        {
          name: '待确定',
          value: 3
        },
        {
          name: '入驻成功',
          value: 4
        }
      ],
      tableData: []
    }
  },
  watch: {
    'condition.userName'() {
      this.getDate()
    },
    'condition.clubName'() {
      this.getDate()
    },
    'condition.userMobile'() {
      this.getDate()
    },
    'condition.city'() {
      this.getDate()
    },
    'condition.state'() {
      this.getDate()
    },
    'condition.inviteCode'() {
      this.getDate()
    }
  },
  mounted() {
    // this.getCoach()
    // this.getPackage()
    // this.getArea()
    this.getDate()
  },
  methods: {
    zhuangtai(val) {
      this.form.id = val.id
      this.form.state = val.state
      this.form.duration = ''
      this.form.myRemarks = ''
      this.query.clubName = val.clubName
      this.query.mobile = val.userMobile
      this.dialogZhuangtai = true
    },
    submit() {
      if (this.form.duration < 0) {
        this.$message.success('试用时长不能小于0')
        return
      }
      this.form.duration = this.form.duration * 1
      signupUpdate(this.form).then(res => {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.form.id === this.tableData[i].id) {
            this.tableData[i].state = this.form.state
            break
          }
        }
        // if (this.form.state * 1 === 4) {
        //   clubadd(this.query).then(res => {
        //     this.$message.success('入驻成功')
        //   })
        // }
        this.dialogZhuangtai = false
      })
    },
    OnOff(x, val) {
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
    },
    xinzeng() {
      for (const i in this.query) {
        this.query[i] = ''
      }
      this.dialogFormadd = true
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
    },
    getCoach() {
      coachlist().then(res => {
        this.dialogFormadd = false
      })
    },
    getPackage() {
      packagelist().then(res => {
        console.log(res)
      })
    },
    getArea() {
      arealist().then(res => {
        console.log(res)
      })
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
      signuplist(query).then(res => {
        this.tableData = res.page.list
        this.total = res.page.totalCount
      }).catch({})
    },
    clicks() {
      this.dialogFormVisible = true
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

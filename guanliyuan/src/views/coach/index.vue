<template>
  <div class="app-container">
    <div class="mg-b">
      <el-input
        v-model="condition.name"
        placeholder="用户名"
        style="width: 200px"
        class="filter-item"
        suffix-icon="el-icon-search"
        @keyup.enter.native="getDate"
      />
      <el-select v-model="condition.name" clearable placeholder="选择教练">
        <el-option
          v-for="item in options_jl"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="condition.coach" clearable placeholder="选择套餐">
        <el-option
          v-for="item in options_tc"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getDate"
      >搜索</el-button>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="pushs(false, false)"
      >新增</el-button>
      <el-button
        class="fr"
        type="primary"
        :disabled="infos.length==0"
        @click="deletes"
      >删除信息</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="40"
      />
      <el-table-column type="expand" width="40">
        <template slot-scope="scope">
          <div class="wis">
            <div class="wi_label fl">
              数据：
            </div>
            <div class="wi_span fl">
              <span class="spans">{{ scope.row.name }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="index" label="id" width="50" />
      <el-table-column prop="name" label="昵称" width="80">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row">{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="头像" width="100px">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row" />
          <el-button type="text" @click="imgmax(scope.row)">详细</el-button>
          <!-- <img
            style="width: 80px; height: 100px"
            :src="url"
            @click="imgmax(scope.row)"
          > -->
        </template>
      </el-table-column>
      <el-table-column prop="name" label="手机号" width="110">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row">{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="性别" width="50">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row">{{ qiehuan('2', options_sex) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="所属俱乐部" width="150">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row">{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="注册日期">
        <template slot-scope="scope">
          <span class="shenglue" :title="scope.row">{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="95">
        <template slot-scope="scope">
          <el-button type="text" @click="clicks(scope.row)">维护</el-button>
          <!-- <el-button v-if="true" type="text" @click="clicks(scope.row)">上线</el-button>
          <el-button v-else type="text" @click="clicks(scope.row)">下线</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div style="height:35px">
      <pagination v-show="tableData.length" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getDate" />
    </div>
    <el-dialog title="维护数据" style="min-width:700px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-row>
          <el-col class="mb" :span="span1">
            <span class="mt must">昵称：</span>
          </el-col>
          <el-col class="mb" :span="span2">
            <el-input v-model="form.name" autocomplete="off" />
          </el-col>
          <el-col class="mb" :span="span1">
            <span class="mt must">手机号：</span>
          </el-col>
          <el-col class="mb" :span="span2">
            <el-input v-model="form.name" autocomplete="off" />
          </el-col>
          <el-col class="mb" :span="span1">
            <span class="mt must">性别：</span>
          </el-col>
          <el-col class="mb" :span="span2">
            <el-select v-model="form.name" style="width:100%;">
              <el-option
                v-for="item in options_sex"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="mb" :span="span1">
            <span class="mt must">个性签名：</span>
          </el-col>
          <el-col class="mb" :span="span2+span2+span1">
            <el-input v-model="form.name" type="textarea" autocomplete="off" />
          </el-col>
        </el-row>
        <el-row>
          <el-col class="mb" :span="span1">
            <span class="mt must">头像：</span>
          </el-col>
          <el-col class="mb" :span="span2">
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
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogimage">
      <div class="maximg">
        <img width="100%" height="100%" :src="url" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { signUplist, signUp } from '@/api/student'
import { coachlist, arealist, packagelist } from '@/api/list'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563879806501&di=cdc5f89efb3b131a944aacbd7efe6df9&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180927%2F79ca17305ef04644a6e760c50dc5fb04.jpeg',
      span1: 5,
      span2: 7,
      span3: 10,
      span4: 14,
      formLabelWidth: '100px',
      dialogimage: false,
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
      infos: [],
      condition: {
        name: '',
        package: '',
        coach: ''
      },
      options_sex: [
        {
          name: '男',
          value: '1'
        },
        {
          name: '女',
          value: '2'
        }
      ],
      options_tc: [
        {
          name: '套餐一',
          value: '1'
        },
        {
          name: '套餐二',
          value: '2'
        }
      ],
      options_skdd: [
        {
          name: '地点一',
          value: '1'
        },
        {
          name: '地点二',
          value: '2'
        }
      ], // 上课地点
      options_jl: [
        {
          name: '教练一',
          value: '1'
        },
        {
          name: '教练二',
          value: '2'
        }
      ], // 教练
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
      form: {
        name: ''
      },
      tableData: [
        {
          name: 'asw',
          date: '001',
          money: 0,
          num: '13783490747'
        },
        {
          name: 'asw1',
          date: '0011',
          money: 0,
          num: '13783490748'
        },
        {
          name: 'asw1',
          date: '0011',
          money: 0,
          num: '13783490748'
        },
        {
          name: 'asw1',
          date: '0011',
          money: 0,
          num: '13783490748'
        },
        {
          name: 'asw1',
          date: '0011',
          money: 0,
          num: '13783490748'
        }
      ]
    }
  },
  mounted() {
    // this.getCoach()
    // this.getPackage()
    // this.getArea()
    // this.getDate()
  },
  methods: {
    imgmax(src) {
      this.dialogimage = true
    },
    pushs(res, val) {
      if (res) {
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(val))
      }
      this.$router.push({
        path: '/coach/add',
        query: {
          pd: res
        }
      })
    },
    getCoach() {
      coachlist().then(res => {
        console.log(res)
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
    clicks(res) {
      this.form = res
      this.dialogFormVisible = true
    },
    // 查询数据接口
    getDate() {
      signUplist(this.condition).then(res => {
        console.log(res)
      })
    },
    // 提交报名信息接口
    submit() {
      this.dialogFormVisible = false
      signUp(this.form).then(res => {
        console.log(res)
      })
    },
    // 表格勾选的数据变化
    handleSelectionChange(res) {
      this.infos = res
    },
    // 删除数据
    deletes() {},
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
.maximg{
  margin: 0 auto;
  width: 350px;
  height: 350px;
}
.maxwi{
  max-width: 200px!important;
}
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
</style>

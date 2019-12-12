<template>
  <el-table
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template>
        <div class="wis">
          <div class="wi_label fl">
            编号
          </div>
          <div class="wi_span fl">
            <span>gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</span>
          </div>
        </div>
        <div class="wis">
          <div class="wi_label fl">
            手机号
          </div>
          <div class="wi_span fl">
            <span><span>213123</span></span>
          </div>
        </div>
        <div class="wis">
          <div class="wi_label fl">
            编号
          </div>
          <div class="wi_span fl">
            <span><span>123123</span></span>
          </div>
        </div>
        <div class="wis">
          <div class="wi_label fl">
            手机号
          </div>
          <div class="wi_span fl">
            <span>gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</span>
          </div>
        </div>
        <div class="wis">
          <div class="wi_label fl">
            手机号
          </div>
          <div class="wi_span fl">
            <span>gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</span>
          </div>
        </div>
        <div class="wis">
          <div class="wi_label fl">
            手机号
          </div>
          <div class="wi_span fl">
            <span>gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="id"
    />
    <el-table-column
      label="商品名称"
      prop="name"
    />
    <el-table-column
      label="描述"
      prop="desc"
    />
  </el-table>
</template>
<script>
export default {
  name: 'Demo',
  data() {
    return {
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔好滋好味鸡蛋仔好滋好味鸡蛋仔好滋好味鸡蛋仔好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    }
  }
}
</script>
<style scoped>
span{
    word-break:normal;
    width:auto;
    display:block;
    white-space:pre-wrap;
    word-wrap : break-word ;
    overflow: hidden ;
}
</style>


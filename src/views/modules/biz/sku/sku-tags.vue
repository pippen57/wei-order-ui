<template>
    <div>
        <el-button size="mini" @click="shopTagInput()">添加规格</el-button>
        <el-dialog
            :visible.sync="visible"
            title="属性"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
        <div v-for="(item, index)  in tags" :key="item.id">
        <div type="success">{{item.propName}}:</div>
            <el-radio-group v-for="i in item.propValue" :key="i.id" v-model="radio">
                <el-radio :label="{id:i.id,idx:index}">{{i.propValue}}</el-radio>
            </el-radio-group>
            <el-divider></el-divider>
        </div>
        </el-dialog>
    </div>
  
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      tags:[]
    };
  },
  methods: {
    shopTagInput() {
      this.visible = true;
      this.propAll()
    },
    propAll(){
        this.$http.get('/biz/productprop/page',
        {
          params: {
            page:  null,
            limit:  null,
          }
        }
      ).then(({ data: res }) => {
        if (res.code !== 0) {
          this.dataList = []
          this.total = 0
          return this.$message.error(res.msg)
        }
        console.log(res);
        this.tags = res.data.list
      }).catch(() => {
      })
    }
  },
};
</script>

<style>
</style>
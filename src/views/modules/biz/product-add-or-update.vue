<template>
  <!-- <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')"  :close-on-click-modal="false"
    :close-on-press-escape="false"> -->
    <div v-if="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()"
      :label-width="$i18n.locale === 'en-US' ? '120px' : '80px'">
      <el-form-item label="商品主图" prop="pic">
        <pic-upload v-model="dataForm.pic"></pic-upload>
      </el-form-item>
      <el-form-item label="商品图片" prop="imgs">
        <mul-pic-upload v-model="dataForm.imgs"></mul-pic-upload>
      </el-form-item>
      <el-form-item label="商品名称" prop="productName">
        <el-input v-model="dataForm.productName" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="原价" prop="originalPrice">
        <el-input-number v-model="dataForm.originalPrice" :min="0" controls-position="right" :precision="2" :step="0.1" ></el-input-number>
      </el-form-item>
      <el-form-item label="现价" prop="price">
        <el-input-number v-model="dataForm.price" :min="0" controls-position="right" :precision="2" :step="0.1" ></el-input-number>
      </el-form-item>
      <el-form-item label="卖点" prop="point">
        <el-input  v-model="dataForm.point" placeholder="简要描述,卖点等"></el-input>
      </el-form-item>
      <el-form-item label="详细描述" prop="content">
        <el-input type="textarea" v-model="dataForm.content" placeholder="详细描述"></el-input>
      </el-form-item>     
      <el-form-item label="商品分类" prop="categoryId">
        <ren-type-tree v-model="dataForm.categoryId" placeholder="商品分类" :type-name.sync="dataForm.categoryName"
          :url="'/biz/category/list'"></ren-type-tree>
      </el-form-item>
      <el-form-item label="SKU">
        <div v-for="item in propSelect" :key="item.id">
        <el-select v-model="item.id" multiple placeholder="请选择" @change="propOptChange">
          <el-option
            v-for="item in propData"
            :key="item.id"
            :label="item.propName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="propOpt" multiple placeholder="请选择" @change="propOptChange">
          <el-option
            v-for="item in propData"
            :key="item.id"
            :label="item.propName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      </el-form-item>
      <el-form-item label="总库存" prop="totalStocks">
        <el-input-number v-model="dataForm.totalStocks" controls-position="right" :min="0"  label="总库存" > </el-input-number>
      </el-form-item>
      <el-form-item label="商品状态" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">下架</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!-- <template slot="footer"> -->
      <el-button @click="cancleHandler()">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    <!-- </template> -->
    <!-- </el-card> -->
  <!-- </el-dialog> -->
    </div>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  data() {
    return {
      visible: false,
      typeList:[],
      propData:{},
      propOpt:null,
      propOptObj:null,

      propSelect:[
        {
          id:null,
          name:'',
          children: [
            {
              id: null,
              name:''
            }
          ]
        }
      ],
      dataForm: {
        id: '',
        productName: '',
        shopId: 1,
        originalPrice: '',
        price: '',
        point: '',
        content: '',
        pic: '',
        imgs: '',
        categoryId: '',
        categoryName:'',
        soldNum: '',
        totalStocks: '',
        status: 1,
        creator: '',
        createDate: '',
        updater: '',
        updateDate: ''
      }
    }
  },
  computed: {
    dataRule() {
      return {
        productName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        price: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        
        content: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        pic: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        status: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getProp()
        if (this.dataForm.id) {
          this.getInfo()
        }
      })
    },
    // 获取信息
    getInfo() {
      this.$http.get(`/biz/product/${this.dataForm.id}`).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.dataForm = {
          ...this.dataForm,
          ...res.data
        }
      }).catch(() => { })
    },
    getProp(){
      this.$http.get(`/biz/productprop/all`).then(({ data: res}) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.propData = res.data
        console.log(this.propData);
      }).catch(() => { })
    },
    propFlt(id){
      var d ={}
      this.propData.forEach(element => {
        if(element.id===id){
d= element
        }
      });
       return d;
    },
    propOptChange(val){
      console.log(val,this.propOpt);
      this.propOptObj=[]
      val.forEach(e => {
        this.propData.forEach(element => {
        if(element.id===e){
          this.propOptObj.push(element)
        }
      });
      });
      console.log(this.propOptObj);
      
    },
    cancleHandler(){
      this.visible = false
      this.$emit('addorUp')
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$http[!this.dataForm.id ? 'post' : 'put']('/biz/product/', this.dataForm).then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
              this.$emit('addorUp')
            }
          })
        }).catch(() => { })
      })
    }, 1000, { 'leading': true, 'trailing': false })
  }
}
</script>

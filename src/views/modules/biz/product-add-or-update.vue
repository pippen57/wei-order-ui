<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" :label-width="$i18n.locale === 'en-US' ? '120px' : '80px'">
          <el-form-item label="商品名称" prop="productName">
          <el-input v-model="dataForm.productName" placeholder="商品名称"></el-input>
      </el-form-item>
          <el-form-item label="店铺id" prop="shopId">
          <el-input v-model="dataForm.shopId" placeholder="店铺id"></el-input>
      </el-form-item>
          <el-form-item label="原价" prop="originalPrice">
          <el-input v-model="dataForm.originalPrice" placeholder="原价"></el-input>
      </el-form-item>
          <el-form-item label="现价" prop="price">
          <el-input v-model="dataForm.price" placeholder="现价"></el-input>
      </el-form-item>
          <el-form-item label="简要描述,卖点等" prop="point">
          <el-input v-model="dataForm.point" placeholder="简要描述,卖点等"></el-input>
      </el-form-item>
          <el-form-item label="详细描述" prop="content">
          <el-input v-model="dataForm.content" placeholder="详细描述"></el-input>
      </el-form-item>
          <el-form-item label="商品主图" prop="pic">
          <el-input v-model="dataForm.pic" placeholder="商品主图"></el-input>
      </el-form-item>
          <el-form-item label="商品图片，以,分割" prop="imgs">
          <el-input v-model="dataForm.imgs" placeholder="商品图片，以,分割"></el-input>
      </el-form-item>
          <el-form-item label="商品分类" prop="categoryId">
          <el-input v-model="dataForm.categoryId" placeholder="商品分类"></el-input>
      </el-form-item>
          <el-form-item label="销量" prop="soldNum">
          <el-input v-model="dataForm.soldNum" placeholder="销量"></el-input>
      </el-form-item>
          <el-form-item label="总库存" prop="totalStocks">
          <el-input v-model="dataForm.totalStocks" placeholder="总库存"></el-input>
      </el-form-item>
          <el-form-item label="默认是1，表示正常状态, -1表示删除, 0下架" prop="status">
          <el-input v-model="dataForm.status" placeholder="默认是1，表示正常状态, -1表示删除, 0下架"></el-input>
      </el-form-item>
              <el-form-item label="更新者" prop="updater">
          <el-input v-model="dataForm.updater" placeholder="更新者"></el-input>
      </el-form-item>
          <el-form-item label="更新时间" prop="updateDate">
          <el-input v-model="dataForm.updateDate" placeholder="更新时间"></el-input>
      </el-form-item>
      </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: '',
        productName: '',
        shopId: '',
        originalPrice: '',
        price: '',
        point: '',
        content: '',
        pic: '',
        imgs: '',
        categoryId: '',
        soldNum: '',
        totalStocks: '',
        status: '',
        creator: '',
        createDate: '',
        updater: '',
        updateDate: ''
      }
    }
  },
  computed: {
    dataRule () {
      return {
        productName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        shopId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        originalPrice: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        price: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        point: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        content: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        pic: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        imgs: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        soldNum: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        totalStocks: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        status: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        updater: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        updateDate: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.getInfo()
        }
      })
    },
    // 获取信息
    getInfo () {
      this.$http.get(`/biz/product/${this.dataForm.id}`).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.dataForm = {
          ...this.dataForm,
          ...res.data
        }
      }).catch(() => {})
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
            }
          })
        }).catch(() => {})
      })
    }, 1000, { 'leading': true, 'trailing': false })
  }
}
</script>

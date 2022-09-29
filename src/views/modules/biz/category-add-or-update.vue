<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" :label-width="$i18n.locale === 'en-US' ? '120px' : '80px'">
          <el-form-item label="店铺ID" prop="shopId">
          <el-input v-model="dataForm.shopId" placeholder="店铺ID"></el-input>
      </el-form-item>
          <el-form-item label="父节点" prop="parentId">
          <el-input v-model="dataForm.parentId" placeholder="父节点"></el-input>
      </el-form-item>
          <el-form-item label="产品类目名称" prop="categoryName">
          <el-input v-model="dataForm.categoryName" placeholder="产品类目名称"></el-input>
      </el-form-item>
          <el-form-item label="类目图标" prop="icon">
          <el-input v-model="dataForm.icon" placeholder="类目图标"></el-input>
      </el-form-item>
          <el-form-item label="类目的显示图片" prop="pic">
          <el-input v-model="dataForm.pic" placeholder="类目的显示图片"></el-input>
      </el-form-item>
          <el-form-item label="排序" prop="seq">
          <el-input v-model="dataForm.seq" placeholder="排序"></el-input>
      </el-form-item>
          <el-form-item label="状态  0：停用   1：正常" prop="status">
          <el-input v-model="dataForm.status" placeholder="状态  0：停用   1：正常"></el-input>
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
        shopId: '',
        parentId: '',
        categoryName: '',
        icon: '',
        pic: '',
        seq: '',
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
        shopId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        categoryName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        icon: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        pic: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        seq: [
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
      this.$http.get(`/biz/category/${this.dataForm.id}`).then(({ data: res }) => {
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
        this.$http[!this.dataForm.id ? 'post' : 'put']('/biz/category/', this.dataForm).then(({ data: res }) => {
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

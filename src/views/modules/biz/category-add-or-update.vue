<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()"
      :label-width="$i18n.locale === 'en-US' ? '120px' : '80px'">
      <el-form-item v-if="dataForm.type !== 2" label="分类图片" prop="pic">
        <pic-upload v-model="dataForm.pic"></pic-upload>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" label="分类名称" prop="categoryName">
        <el-input v-model="dataForm.categoryName" controls-position="right" :min="0" label="分类名称"></el-input>
      </el-form-item>
      <el-form-item label="上级分类">
        <ren-type-tree v-model="dataForm.pid" placeholder="上级分类" :type-name.sync="dataForm.parentName"
          :url="'/biz/category/list'"></ren-type-tree>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" label="排序号" prop="seq">
        <el-input-number v-model="dataForm.seq" controls-position="right" :min="0" label="排序号"></el-input-number>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">下线</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
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
  data() {
    return {
      visible: false,
      dataForm: {
        id: '',
        shopId: '1',
        pid: '0',
        parentName: '',
        categoryName: '',
        icon: '',
        pic: '',
        seq: '',
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

        categoryName: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' },
          { pattern: /\s\S+|S+\s|\S/, message: '请输入正确的分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.getInfo()
        }
      })
    },
    // 获取信息
    getInfo() {
      this.$http.get(`/biz/category/${this.dataForm.id}`).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.dataForm = {
          ...this.dataForm,
          ...res.data
        }
      }).catch(() => { })
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.dataForm.shopId = this.$store.state.shop.shop.id
      
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
        }).catch(() => { })
      })
    }, 1000, { 'leading': true, 'trailing': false })
  }
}
</script>

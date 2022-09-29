<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" :label-width="$i18n.locale === 'en-US' ? '120px' : '80px'">
          <el-form-item label="店铺名称(数字、中文，英文(可混合，不可有特殊字符)，可修改)、不唯一" prop="shopName">
          <el-input v-model="dataForm.shopName" placeholder="店铺名称(数字、中文，英文(可混合，不可有特殊字符)，可修改)、不唯一"></el-input>
      </el-form-item>
          <el-form-item label="店长用户id" prop="userId">
          <el-input v-model="dataForm.userId" placeholder="店长用户id"></el-input>
      </el-form-item>
          <el-form-item label="店长" prop="shopOwner">
          <el-input v-model="dataForm.shopOwner" placeholder="店长"></el-input>
      </el-form-item>
          <el-form-item label="店铺绑定的手机(登录账号：唯一)" prop="mobile">
          <el-input v-model="dataForm.mobile" placeholder="店铺绑定的手机(登录账号：唯一)"></el-input>
      </el-form-item>
          <el-form-item label="店铺公告(可修改)" prop="shopNotice">
          <el-input v-model="dataForm.shopNotice" placeholder="店铺公告(可修改)"></el-input>
      </el-form-item>
          <el-form-item label="店铺简介(可修改)" prop="intro">
          <el-input v-model="dataForm.intro" placeholder="店铺简介(可修改)"></el-input>
      </el-form-item>
          <el-form-item label="店铺联系电话" prop="tel">
          <el-input v-model="dataForm.tel" placeholder="店铺联系电话"></el-input>
      </el-form-item>
          <el-form-item label="店铺所在纬度(可修改)" prop="shopLat">
          <el-input v-model="dataForm.shopLat" placeholder="店铺所在纬度(可修改)"></el-input>
      </el-form-item>
          <el-form-item label="店铺所在经度(可修改)" prop="shopLng">
          <el-input v-model="dataForm.shopLng" placeholder="店铺所在经度(可修改)"></el-input>
      </el-form-item>
          <el-form-item label="店铺详细地址" prop="shopAddress">
          <el-input v-model="dataForm.shopAddress" placeholder="店铺详细地址"></el-input>
      </el-form-item>
          <el-form-item label="店铺所在省份（描述）" prop="province">
          <el-input v-model="dataForm.province" placeholder="店铺所在省份（描述）"></el-input>
      </el-form-item>
          <el-form-item label="店铺所在城市（描述）" prop="city">
          <el-input v-model="dataForm.city" placeholder="店铺所在城市（描述）"></el-input>
      </el-form-item>
          <el-form-item label="店铺所在区域（描述）" prop="area">
          <el-input v-model="dataForm.area" placeholder="店铺所在区域（描述）"></el-input>
      </el-form-item>
          <el-form-item label="店铺logo(可修改)" prop="shopLogo">
          <el-input v-model="dataForm.shopLogo" placeholder="店铺logo(可修改)"></el-input>
      </el-form-item>
          <el-form-item label="店铺相册" prop="shopPhotos">
          <el-input v-model="dataForm.shopPhotos" placeholder="店铺相册"></el-input>
      </el-form-item>
          <el-form-item label="每天营业时间段(可修改)" prop="openTime">
          <el-input v-model="dataForm.openTime" placeholder="每天营业时间段(可修改)"></el-input>
      </el-form-item>
          <el-form-item label="店铺状态(-1:未开通 0: 停业中 1:营业中)，可修改" prop="shopStatus">
          <el-input v-model="dataForm.shopStatus" placeholder="店铺状态(-1:未开通 0: 停业中 1:营业中)，可修改"></el-input>
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
        shopName: '',
        userId: '',
        shopOwner: '',
        mobile: '',
        shopNotice: '',
        intro: '',
        tel: '',
        shopLat: '',
        shopLng: '',
        shopAddress: '',
        province: '',
        city: '',
        area: '',
        shopLogo: '',
        shopPhotos: '',
        openTime: '',
        shopStatus: '',
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
        shopName: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        userId: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        shopOwner: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        shopNotice: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        intro: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        tel: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        shopLat: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        shopLng: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        shopAddress: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        province: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        city: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        area: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        shopLogo: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        shopPhotos: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        openTime: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        shopStatus: [
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
      this.$http.get(`/biz/shop/${this.dataForm.id}`).then(({ data: res }) => {
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
        this.$http[!this.dataForm.id ? 'post' : 'put']('/biz/shop/', this.dataForm).then(({ data: res }) => {
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

<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()"
      :label-width="$i18n.locale === 'en-US' ? '120px' : '120px'">
      <el-form-item label="店铺logo" prop="shopLogo">
        <pic-upload v-model="dataForm.shopLogo"></pic-upload>
      </el-form-item>
      <el-form-item label="店铺名称" prop="shopName">
        <el-input v-model="dataForm.shopName" placeholder="店铺名称(数字、中文，英文(可混合，不可有特殊字符)，可修改)、不唯一"></el-input>
      </el-form-item>
      <el-form-item label="店长" prop="shopOwner">
        <el-input v-model="dataForm.shopOwner" placeholder="店长"></el-input>
      </el-form-item>
      <el-form-item label="店长手机" prop="mobile">
        <el-input v-model="dataForm.mobile" type="number" placeholder="店铺绑定的手机(登录账号：唯一)"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告" prop="shopNotice">
        <el-input v-model="dataForm.shopNotice"  type="textarea" placeholder="店铺公告(可修改)"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介" prop="intro">
        <el-input v-model="dataForm.intro"  type="textarea" placeholder="店铺简介(可修改)"></el-input>
      </el-form-item>
      <el-form-item label="店铺电话" prop="tel">
        <el-input v-model="dataForm.tel" type="number" placeholder="店铺联系电话"></el-input>
      </el-form-item>
     
      <el-form-item label="店铺详细地址" prop="shopAddress">
        <avue-input-map  :params="params" placeholder="请选择地图" v-model="addr" ></avue-input-map>
      </el-form-item>
      <el-form-item label="店铺所在省份" prop="province">
        <el-input v-model="dataForm.province" placeholder="店铺所在省份（描述）"></el-input>
      </el-form-item>
      <el-form-item label="店铺所在城市" prop="city">
        <el-input v-model="dataForm.city" placeholder="店铺所在城市（描述）"></el-input>
      </el-form-item>
      <el-form-item label="店铺所在区域" prop="area">
        <el-input v-model="dataForm.area" placeholder="店铺所在区域（描述）"></el-input>
      </el-form-item>

      <el-form-item label="店铺相册" prop="shopPhotos">
        <mul-pic-upload v-model="dataForm.shopPhotos"></mul-pic-upload>
      </el-form-item>
      <el-form-item label="营业时间段" prop="openTime">
        <el-input v-model="dataForm.openTime" placeholder="每天营业时间段"></el-input>
      </el-form-item>
      <el-form-item label="店铺状态" prop="shopStatus"  size="mini">
        <el-radio-group v-model="dataForm.shopStatus">
          <el-radio :label="-1">未开通</el-radio>
          <el-radio :label="0">停业中</el-radio>
          <el-radio :label="1">营业中</el-radio>
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
import mulPicUpload from '../../../components/mul-pic-upload/src/mul-pic-upload.vue'
export default {
  components: { mulPicUpload },
  data() {
    return {
      visible: false,
      params:{
          zoom: 10,
          // zoomEnable: false,
          // dragEnable: false,
        },
        addr:[ 113.10235504165291, 41.03624227495205, "内蒙古自治区乌兰察布市集宁区新体路街道顺达源广告传媒" ] ,
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
        shopStatus: -1,
        creator: '',
        createDate: '',
        updater: '',
        updateDate: ''
      }
    }
  },
  watch: {
    addr (val) {
      console.log(val);
      this.dataForm.shopLat = val[0]
      this.dataForm.shopLng = val[1]
      this.dataForm.shopAddress = val[2]
    }
  },
  computed: {
    dataRule() {
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
      this.$http.get(`/biz/shop/${this.dataForm.id}`).then(({ data: res }) => {
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
        }).catch(() => { })
      })
    }, 1000, { 'leading': true, 'trailing': false }),
    onSearchResult(pois) {
      //搜索
      let latSum = 0;
      let lngSum = 0;
      let that = this;
      if (pois && pois.length > 0) {
        //如果长度为1则无需转化
        let poi = pois[0];
        let lng = poi["lng"];
        let lat = poi["lat"];
        that.center = [lng, lat];
        that.zoom = 18;
        that.content = poi.name;
        that.searchResult.address = poi.address;
        that.searchResult.latitude = poi.lat;
        that.searchResult.longitude = poi.lng;

        that.form.lon = lng;
        that.form.lat = lat;

        that.getAddress(that.center);
      } else {
        that.searchResult = [];
      }
    },

    // 获取详细地址
    getAddress(center) {
      let _this = this;
      let geocoder = new AMap.Geocoder({});

      geocoder.getAddress(center, function (status, result) {
        if (status === "complete" && result.info === "OK") {
          let obj = result.regeocode.addressComponent;

          let locationName =
            obj.province +
            obj.city +
            obj.district +
            obj.township +
            obj.street +
            obj.streetNumber;

          _this.form.address = locationName;
        }
      });
    }
  }
}
</script>

<template>
  <el-dialog :visible.sync="visible" title="查看退款详情" >
    <el-skeleton :rows="6" animated v-if="!infoLogging"/>
    <div v-else>
  <el-descriptions title="用户信息">
    <el-descriptions-item label="用户头像" v-if="dataForm.avatar"><el-avatar :size="50" :src="dataForm.avatar"></el-avatar></el-descriptions-item>
      <el-descriptions-item label="用户名">{{dataForm.username}}</el-descriptions-item>
      <el-descriptions-item label="电话">{{dataForm.mobile}}</el-descriptions-item>
  </el-descriptions>
      <el-descriptions title="订单信息">
      <el-descriptions-item label="订单Id">{{dataForm.orderId}}</el-descriptions-item>
      <el-descriptions-item label="订单流水号">{{dataForm.orderNumber}}</el-descriptions-item>
      <el-descriptions-item label="订单总金额"><el-tag type="danger">{{dataForm.orderAmount}}</el-tag></el-descriptions-item>
      <el-descriptions-item label="订单支付流水">{{dataForm.payNo}}</el-descriptions-item>
  </el-descriptions>
  <el-descriptions title="退款信息">
    <el-descriptions-item label="退款编号">{{dataForm.refundNumber}}</el-descriptions-item>
      <el-descriptions-item label="微信退款单号">{{dataForm.refundId}}</el-descriptions-item>
      <el-descriptions-item label="支付方式">{{dataForm.payTypeName}}</el-descriptions-item>
      <el-descriptions-item label="退款金额"><el-tag type="danger">{{dataForm.refundAmount}}</el-tag></el-descriptions-item>
      <el-descriptions-item label="退款状态">
        <el-tag v-if="dataForm.returnMoneySts==0">退款处理中</el-tag>
        <el-tag v-if="dataForm.returnMoneySts==1" type="success">退款成功</el-tag>
        <el-tag v-if="dataForm.returnMoneySts==-1" type="danger">退款失败</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="申请时间">{{dataForm.createTime}}</el-descriptions-item>
      <el-descriptions-item label="申请原因">{{dataForm.buyerMsg}}</el-descriptions-item>
      <el-descriptions-item label="退款时间">{{dataForm.refundTime}}</el-descriptions-item>
      <el-descriptions-item label="退款入账账户">{{dataForm.userReceivedAccount}}</el-descriptions-item>
      <el-descriptions-item label="所用资金类型">
        <span v-if="dataForm.fundsAccount==='UNSETTLED'">未结算资金</span>
        <span v-if="dataForm.fundsAccount==='AVAILABLE'">可用余额</span>
        <span v-if="dataForm.fundsAccount==='UNAVAILABLE'">不可用余额</span>
        <span v-if="dataForm.fundsAccount==='OPERATION'">运营户</span>
        <span v-if="dataForm.fundsAccount==='BASIC'">基本账户（含可用余额和不可用余额</span>
      </el-descriptions-item>
  </el-descriptions>
</div>
    <template slot="footer">
      <el-button type="primary" @click="visible = false">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      infoLogging: false,
      dataForm: {
        id: '',
        shopId: '',
        orderId: '',
        orderNumber: '',
        orderAmount: '',
        orderItemId: '',
        refundNumber: '',
        payNo: '',
        refundId: '',
        payType: '',
        payTypeName: '',
        userId: '',
        goodsNum: '',
        refundAmount: '',
        returnMoneySts: '',
        createTime: '',
        refundTime: '',
        buyerMsg: '',
        fundsAccount: '',
        userReceivedAccount: '',
        avatar:'',
        username:'',
        mobile:''
      }
    }
  },

  methods: {
    init () {
      this.visible = true
      this.$nextTick(() => {
        if (this.dataForm.id) {
          this.getInfo()
        }
      })
    },
    // 获取信息
    getInfo () {
      this.infoLogging= false
      this.$http.get(`/biz/orderrefund/${this.dataForm.id}`).then(({ data: res }) => {
        this.infoLogging = true
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.dataForm = {
          ...this.dataForm,
          ...res.data
        }
      }).catch(() => {})
    }
  }
}
</script>

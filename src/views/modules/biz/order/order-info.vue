<template>
  <el-dialog
    title="查看"
    :close-on-click-modal="false"
    :visible.sync="visible"
    top="3vh"
    width="80%"
  >
    <el-form
      :model="dataForm"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <div class="main">
        <div class="content">
          <div class="order-number">
            <div class="num-cont">
              <el-form-item label="订单编号:">
                <span class="text">{{ dataForm.orderNumber }}</span>
              </el-form-item>
              <el-form-item>
                <el-steps
                  :active="stepsStatus"
                  align-center
                  :process-status="dataForm.status == 4 ? 'error' : 'wait'"
                >
                  <el-step
                    title="已下单"
                    :description="dataForm.createTime"
                  ></el-step>
                  <el-step
                    title="已付款"
                    :description="dataForm.payTime"
                  ></el-step>
                  <el-step
                    title="已完成"
                    v-if="dataForm.orderType !== 1"
                    :description="dataForm.finallyTime"
                  ></el-step>
                </el-steps>
              </el-form-item>
            </div>
          </div>
          <div class="order-state">
            <div class="state-cont">
        
              <div class="order-info">
                <div class="order-details">
                  <div class="detail-title">
                    <span class="prompt">用户信息</span>
                  </div>
                  <div class="detail-cont">
                    <div class="detail01">
                      <div class="text-width">
                        <el-form-item label="用户名:">
                          <span>{{ username }}</span>
                        </el-form-item>
                        <el-form-item label="电话:">
                          <span>{{ mobile }}</span>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                  <div class="detail-title">
                    <span class="prompt">用餐信息</span>
                  </div>
                  <div class="detail-cont">
                    <div class="detail01">
                      <div class="text-width">
                        <el-form-item label="用餐方式:">
                          <span>堂食</span>
                        </el-form-item>
                        <el-form-item label="就餐时间:">
                          <span>{{ dataForm.mealTime }}</span>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order-details">
                  <div class="detail-title">
                    <span class="prompt">订单信息</span>
                  </div>
                  <div class="detail-cont">
                    <div class="detail01">
                      <div class="text-width">
                        <el-form-item label="订单状态:">
                            <el-tag v-if="dataForm.status === 1" size="small" type="warning">待付款</el-tag>
                            <el-tag v-if="dataForm.status === 3" size="small" type="success">成功</el-tag>
                            <el-tag v-if="dataForm.status === 4" size="small" type="danger">失败</el-tag>
                        </el-form-item>
                        <el-form-item label="关闭原因:" v-if="dataForm.closeType">
                            <el-tag v-if="dataForm.closeType === 1" size="small" >超时未支付</el-tag>
                            <el-tag v-if="dataForm.closeType === 2" size="small" >退款关闭</el-tag>
                            <el-tag v-if="dataForm.closeType === 4" size="small" >买家取消</el-tag>
                            ({{dataForm.cancelTime}})
                        </el-form-item>
                        <el-form-item label="订单编号:">
                            <span>{{ dataForm.orderNumber }}</span>
                        </el-form-item>
                        <el-form-item label="下单时间:">
                            <span>{{ dataForm.createTime }}</span>
                        </el-form-item>
                        <el-form-item label="订单来源:">
                            <span v-if="dataForm.orderSource==1">微信小程序</span>
                            <span v-if="dataForm.orderSource==2">微信公众号</span>
                            <span v-if="dataForm.orderSource==3">支付宝小程序</span>
                        </el-form-item>
                        <el-form-item label="备注信息:">
                            <span style=" color: red;">{{ dataForm.remarks }}</span>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item-list">
                <el-table :data="dataForm.orderItems" border>
                  <el-table-column prop="" label="商品">
                    <template slot-scope="scope">
                      <div class="prod-con">
                        <img :src="scope.row.pic" class="prod-img" />
                        <span>{{ scope.row.productName }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    label="单价"
                    width="180"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.row.price }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="count"
                    label="数量"
                    width="180"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.row.productCount }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="totalPrice"
                    label="总价"
                    width="180"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.row.productTotalAmount }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <template slot="footer">
      <el-button>商品总价:￥{{ dataForm.total }}</el-button>
      <el-button type="danger">应付金额:￥{{ dataForm.total }}</el-button>
      <el-button type="info" v-if="dataForm.refundStatus==2">退款金额:￥{{ dataForm.balance.totalBalance }}</el-button>
    </template>
  </el-dialog>
</template>
  
  <script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        orderId: 0,
        orderNumber: "",
        remarks: "",
        total: 0,
        actualTotal: 0,
        status: 1,
        userId:null,
        nickName: "",
        orderItems: [],
        createTime: "",
        updateTime: "",
        payTime: "",
        finallyTime: "",
        cancelTime: "",
        mealTime: "",
        closeType: null,
        orderSource:null,
        refundStatus:0,
        balance:{
            totalBalance:0
        },
        userAddrOrder: {},
      },
      username: '',
      avatar: '',
      mobile: '',
      resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
      addOrUpdateVisible: false,
      devyVisible: false,
    };
  },
  watch: {
    visible: function () {
      if (!this.visible) {
        this.devyVisible = false;
        this.addOrUpdateVisible = false;
      }
    },
  },
  computed: {
    stepsStatus: function () {
      if (this.dataForm.finallyTime) {
        return 3;
      }
      if (this.dataForm.payTime) {
        return 2;
      }
      if (this.dataForm.createTime) {
        return 1;
      }
    },
  },
  methods: {
    init(data) {
      console.log(data);
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
      this.dataForm = data.order;
      this.dataForm.orderItems = data.orderItem;
      this.dataForm.balance = data.balance;
      if(this.dataForm.userId){
        this.userInfo()
      } 
    },
    userInfo() {
        this.$http.get(`/biz/wxuser/${this.dataForm.userId}`).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        console.log(res);
        this.username = res.data.username;
        this.mobile = res.data.mobile;
      }).catch(() => {})
    },
    // 表单提交
    dataFormSubmit() {},
    // 修改备注
    changeRemarks() {},
  },
};
</script>
  
  
  <style>
.main {
  height: 100%;
  width: 100%;
  font: 14px Arial, "PingFang SC", "Hiragino Sans GB", STHeiti,
    "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  color: #495060;
}

.content {
  margin: 0 20px;
}

.content .steps {
  margin-top: 50px;
}

.order-number .number-text {
  font-weight: bold;
}

.order-number .text {
  font-size: 14px;
  color: #8a8a8a;
}

.order-state .state-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-left span {
  font-weight: bold;
}

.title-left .text {
  color: red;
}

.state-title .title-mid {
  display: flex;
  align-items: center;
}

.title-mid img {
  width: 18px;
  height: 18px;
}

.title-mid .mid-text {
  color: red;
}

.title-mid .text {
  color: #8a8a8a;
}

.content .order-state {
  position: relative;
  margin-top: 50px;
  border-bottom: 1px solid #e9eaec;
}

.order-state .order-info {
  width: 100%;
  border-top: 1px solid #e9eaec;
  margin: 50px 0;
  margin-top: 30px;
  display: flex;
}

.order-info img {
  width: 18px !important;
  height: 18px !important;
  margin-right: 15px;
}

.order-info .detail-title {
  height: 50px;
  line-height: 50px;
  font-weight: 900;
  display: flex;
  align-items: center;
}

.order-info .order-details {
  width: 50%;
  border-right: 1px solid #e9eaec;
}

.order-info .detail-cont {
  position: relative;
}

.detail-cont .detail01 {
  display: flex;
  height: 100%;
  line-height: 25px;
  margin-top: 15px;
}

.detail01 .text-width {
  width: 100%;
}

.detail02 .text-width {
  width: 100%;
}

.detail-cont .revise-addr {
  color: #4395ff;
  position: absolute;
  top: 15px;
  right: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.order-info .detail-cont {
  border-top: 1px dashed #e9eaec;
  margin: 15px 20px 0 0;
}

.order-info .buyers {
  width: 50%;
  margin-left: 20px;
}

.buyers .buyers-info {
  border-top: 1px dashed #e9eaec;
  margin-top: 15px;
  position: relative;
}

.buyers .detail02 {
  display: flex;
  height: 100%;
  line-height: 25px;
  margin-top: 15px;
}

.buyers .revise-remarks {
  color: #4395ff;
  position: absolute;
  top: 15px;
  right: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.order-state .item-info {
  padding-left: 80%;
  margin: 25px 0;
}

.item-info span {
  margin-bottom: 15px;
  line-height: 30px;
}

.item-info .text {
  position: absolute;
  right: 0;
}

.item-info .amount {
  font-size: 18px;
  color: red;
}

.order-log .log-title {
  height: 50px;
  width: 100%;
  line-height: 50px;
  font-weight: bold;
  /* border-bottom: 1px dashed #e9eaec; */
}

.order-log .log-cont {
  /* margin-top: 15px; */
  color: #4395ff;
}
.order-log .log-cont .el-form-item__content {
  line-height: 1.5em;
}

.item-list .prod-con {
  display: flex;
}
.item-list .prod-con .prod-img {
  width: 100px;
  height: 100px;
  margin-right: 8px;
}
</style>
  
  
  
  
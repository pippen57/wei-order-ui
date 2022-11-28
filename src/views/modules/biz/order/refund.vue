<template>
  <el-dialog
    title="退款"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="40%"
  >
    <div class="item-list">
      <el-table
        :data="dataForm.orderItems"
        border
        ref="formTable"
        @selection-change="dataListSelectionChangeHandle"
      >
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="50"
          v-if="!balanceData.total==balanceData.totalBalance"
        ></el-table-column>
        <el-table-column prop="" label="商品">
          <template slot-scope="scope">
            <div class="prod-con">
              <img :src="scope.row.pic" class="prod-img" />
              <span>{{ scope.row.productName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="数量" width="180" align="center">
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
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="dataRule"
      style="margin-top: 8px; width: 60%"
    >
      <el-form-item label="退款金额" prop="refundAmount">
        <el-input v-model="form.refundAmount" :disabled="balanceData.total==balanceData.totalBalance"></el-input>
        <span style="color: red; margin-left: 10px" >
            <span v-if="balanceData.total==balanceData.totalBalance">已全额退款</span>
            <span v-else> 最多{{(balanceData.total - balanceData.totalBalance).toFixed(2)}}</span>
        </span>
      </el-form-item>
      <el-form-item label="退款原因">
        <el-input
          type="textarea"
          v-model="form.buyerMsg"
          maxlength="70"
          :rows="4"
          :disabled="balanceData.total==balanceData.totalBalance"
          show-word-limit
        >
        </el-input>
        <span style="color: #c0c0c0; margin-left: 10px">
            非必填信息，若填写将展示在下发给用户的退款消息中
        </span>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t("cancel") }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle">{{
        $t("confirm")
      }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import debounce from "lodash/debounce";
export default {
  data() {
    return {
      dataForm: {
        id: 0,
        orderNumber: "",
        remarks: "",
        total: 0,
        status: 1,
        orderItems: [],
        createTime: "",
        updateTime: "",
        payTime: "",
        finallyTime: "",
        cancelTime: "",
      },
      form: { refundAmount: null, buyerMsg: "", orderItems: [], orderId: null },
      balanceData: {
        refund: false,
        total: 0.0,
        totalBalance: 0.0
      },
      visible: false,
      dataListSelections: [],
      resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
    };
  },
  computed: {
    dataRule() {
      var validateRefundAmount = (rule, value, callback) => {
        if (parseFloat(value).toString() == "NaN") {
          return callback(new Error("请填写正确的退款金额"));
        }

        if ((value * 1).toFixed(2) > this.dataForm.total) {
          return callback(new Error("退款金额不能超过" + this.dataForm.total));
        }
        callback();
      };
      return {
        refundAmount: [
          { required: true, message: "退款金额不能为空", trigger: "blur" },
          { validator: validateRefundAmount, trigger: "blur" },
        ],
      };
    },
  },
  methods: {
    init(data) {
      this.visible = true;
      this.dataListSelections = [];
      this.form = {
        refundAmount: null,
        buyerMsg: "",
        orderItems: [],
        orderId: data.order.id,
        shopId: data.order.shopId,
      };
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
        this.$refs["formTable"].clearSelection();
      });
      this.dataForm = data.order;
      this.dataForm.orderItems = data.orderItem;
      this.balance()
    },
    balance (){
        this.$http.get('biz/orderrefund/balance', {params:{orderId:this.dataForm.id}}).then(({ data: res }) => {
            if (res.code !== 0) {
              return this.$message.error(res.msg)
            }
            console.log(res);
            this.balanceData = res.data
          }).catch(() => { })
    },
    // 表单提交
    dataFormSubmitHandle: debounce(
      function () {
        this.$refs["form"].validate((valid) => {
          if (!valid) {
            return false;
          }

          console.log(this.form);
          this.$http.post('biz/orderrefund', this.form).then(({ data: res }) => {
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
        });
      },
      1000,
      { leading: true, trailing: false }
    ),
    dataListSelectionChangeHandle(val) {
      this.dataListSelections = val;
      this.form.refundAmount = 0.0
      this.dataListSelections.forEach((e) => {
        this.form.orderItems.push(e.id);
        this.form.refundAmount = parseFloat(this.form.refundAmount) + parseFloat(e.productTotalAmount);
        this.form.refundAmount = this.form.refundAmount.toFixed(2);
      });
    },
  },
};
</script>

<style scoped>
.item-list .prod-con {
  display: flex;
}
.item-list .prod-con .prod-img {
  width: 100px;
  height: 100px;
  margin-right: 8px;
}
</style>
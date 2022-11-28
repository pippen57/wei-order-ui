<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-order-order">
      <el-form
        :inline="true"
        :model="dataForm"
       
        @keyup.enter.native="getDataList(this.page)"
      >
        <el-form-item>
          <el-input
            v-model="dataForm.orderNumber"
            placeholder="订单编号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <template>
            <el-select
              v-model="dataForm.status"
              clearable
              placeholder="请选择订单状态"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="getDataList()"
            >查询</el-button
          >

          <el-button @click="clearDatas()" size="small">清空</el-button>
        </el-form-item>
      </el-form>
      <div class="main" v-if="dataList.length>0">
        <div class="content">
          <div class="tit">
            <el-row style="width: 100%">
              <el-col :span="10"><span class="item product">商品</span></el-col>
              <el-col :span="3"
                ><span class="item">成交单价/购买数量</span></el-col
              >
              <el-col :span="3"><span class="item">实付金额</span></el-col>
              <el-col :span="3"><span class="item">支付方式</span></el-col>
              <el-col :span="3"><span class="item">订单状态</span></el-col>
              <el-col :span="2"><span class="item">操作</span></el-col>
            </el-row>
          </div>
          <div class="prod" v-for="order in dataList" :key="order.order.id">
            <div class="prod-tit">
              <span>订单编号：{{ order.order.orderNumber }}</span>
              <span>下单时间：{{ order.order.createTime }}</span>
              <!-- <span>买家：19999999999</span>
              <span >联系电话：19999999999</span> -->
            </div>
            <div class="prod-cont">
              <el-row style="width: 100%">
                <el-col :span="12">
                  <div class="prod-item">
                    <div
                      class="items name"
                      v-for="orderItem in order.orderItem"
                      :key="orderItem.id"
                    >
                      <div class="prod-image">
                        <img
                          :src="orderItem.pic"
                          style="height: 100px; width: 100px"
                        />
                      </div>
                      <div class="prod-name">
                        <span>{{ orderItem.productName }}</span>
                        <span class="prod-info">{{ orderItem.skuName }}</span>
                      </div>
                      <div class="prod-price">
                        <span>￥{{ orderItem.price }}</span>
                        <span>×{{ orderItem.productCount }}</span>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="3" style="height: 100%">
                  <div class="item">
                    <div>
                      <span class="totalprice" v-if="order.order.isPayed == 1">
                        ￥{{ order.order.total }}
                        (
                            <el-button
                          type="text"
                          size="small"
                          v-if="order.balance.total == order.balance.totalBalance "
                          >已全额退款</el-button>
                            <el-button
                          type="text"
                          size="small"
                         v-else
                          @click="refundHadle(order)"
                          >退款</el-button>
                          
                          )
                      </span>
                      <span class="totalprice" v-else
                        >￥{{ order.order.total }}
                      </span>
                      <span>共{{ order.order.productNums }}件</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="3" style="height: 100%">
                  <div class="item">
                    <div>
                      <span v-if="order.order.payType === 1">微信支付</span>
                      <span v-else-if="order.order.payType === 2">支付宝</span>
                      <span v-else>手动代付</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="3" style="height: 100%">
                  <div class="item">
                    <span
                      v-if="order.order.status === 1"
                      size="small"
                      type="danger"
                      >待付款
                      <el-button type="success" :icon="paySelectIcon" circle @click="queryPay(order.order.id)"></el-button>
                      </span>
                    <span
                      v-else-if="order.order.status === 3"
                      size="small"
                      type="danger"
                      >成功</span
                    >
                    <span v-else size="small">失败</span>
                  </div>
                </el-col>
                <el-col :span="3" style="height: 100%">
                  <div class="item">
                    <div class="operate">
                      <el-button
                        v-if="$hasPermission('biz:order:info')"
                        type="text"
                        size="small"
                        @click="addOrUpdateHandle(order)"
                        >查看</el-button
                      >
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="remark">
              <div class="buyer-remark">
                <span v-if="order.order.remarks"
                  >备注:{{ order.order.remarks }}</span
                >
                <span v-else>备注: 无</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 空 -->
      <div v-if="dataList.length<=0" class="empty-tips">暂无数据</div>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="page.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="page.pageSize"
        :total="page.total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update
        v-if="addOrUpdateVisible"
        ref="addOrUpdate"
        @refreshDataList="getDataList"
      ></add-or-update>
      <refund
        v-if="refundVisible"
        ref="refund"
        @refreshDataList="getDataList"
      ></refund>
    </div>
  </el-card>
</template>
  
  <script>
import AddOrUpdate from "./order-info";
import Refund from "./refund.vue";
export default {
  data() {
    return {
      dataForm: {},
      dateRange: [],
      options: [
        {
          value: 1,
          label: "待付款",
        },
        {
          value: 3,
          label: "成功",
        },
        {
          value: 4,
          label: "失败",
        },
      ],
      dataList: [],
      dateRange:[],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
      },
      paySelectIcon:"el-icon-refresh-right",
      dataListSelections: [],
      addOrUpdateVisible: false,
      refundVisible: false,
      consignmentInfoVisible: false,
    };
  },
  components: {
    AddOrUpdate,
    Refund,
  },
  activated() {
    this.getDataList(this.page);
  },
  methods: {
    // 获取数据列表
    getDataList(page, params) {
        const loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.8)'
        });
      page = page === undefined ? this.page : page;
      this.$http
        .get("/biz/order/page", {
          params: Object.assign(
            {
              page: page == null ? this.page.currentPage : page.currentPage,
              limit: page == null ? this.page.pageSize : page.pageSize,  
              orderField:"create_time",
              order:"desc",
              orderNumber: this.dataForm.orderNumber,
              status: this.dataForm.status,
              startTime: this.dateRange === null ? null : this.dateRange[0], // 开始时间
              endTime: this.dateRange === null ? null : this.dateRange[1], // 结束时间
            },
            params
          ),
        })
        .then(({ data: res }) => {
          this.dataList = res.data.list;
          this.page.total = res.data.total;
          loading.close();
        });
    },
    queryPay(id){
        if(id){
            this.paySelectIcon = 'el-icon-loading'
            this.$http.get("/biz/order/pay/"+id, {params: {}}).then(({ data: res }) => {
                console.log(res);
                this.paySelectIcon = 'el-icon-refresh-right'
                this.getDataList(this.page);
            });
        }
    },
    // 清除数据
    clearDatas() {
      this.dataForm = {};
      this.dateRange = [];
    },
    // 每页数
    sizeChangeHandle(val) {
      this.page.pageSize = val;
      this.page.currentPage = 1;
      this.getDataList(this.page);
    },
    // 当前页
    currentChangeHandle(val) {
      this.page.currentPage = val;
      this.getDataList(this.page);
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    orderStatus() {},
    refundHadle(val) {
      this.refundVisible = true;
      this.$nextTick(() => {
        this.$refs.refund.init(val);
      });
    },
    // 新增 / 修改
    addOrUpdateHandle(val) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(val);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map((item) => {
            return item.orderId;
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(`/prod/spec/${ids}`),
            method: "delete",
            data: this.$http.adornData(ids, false),
          }).then(({ data }) => {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList(this.page);
              },
            });
          });
        })
        .catch(() => {});
    },
    showConsignmentInfo() {
      this.consignmentInfoVisible = true;
      this.$nextTick(() => {
        this.$refs.consignmentInfo.init();
      });
    },
    getWaitingConsignmentExcel(consignmentInfo) {
      this.$http({
        url: this.$http.adornUrl("/order/order/waitingConsignmentExcel"),
        method: "get",
        params: this.$http.adornParams({
          consignmentName: consignmentInfo.consignmentName,
          consignmentMobile: consignmentInfo.consignmentMobile,
          consignmentAddr: consignmentInfo.consignmentAddr,
          startTime: this.dateRange === null ? null : this.dateRange[0], // 开始时间
          endTime: this.dateRange === null ? null : this.dateRange[1], // 结束时间
        }),
        responseType: "blob", // 解决文件下载乱码问题
      }).then(({ data }) => {
        var blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        });
        const fileName = "待发货信息整理.xls";
        const elink = document.createElement("a");
        if ("download" in elink) {
          // 非IE下载
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    getSoldExcel() {
      this.$http({
        url: this.$http.adornUrl("/order/order/soldExcel"),
        method: "get",
        params: this.$http.adornParams({
          startTime: this.dateRange === null ? null : this.dateRange[0], // 开始时间
          endTime: this.dateRange === null ? null : this.dateRange[1], // 结束时间
        }),
        responseType: "blob", // 解决文件下载乱码问题
      }).then(({ data }) => {
        var blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        });
        const fileName = "销售信息整理.xls";
        const elink = document.createElement("a");
        if ("download" in elink) {
          // 非IE下载
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
  },
};
</script>
  <style lang="scss">
.mod-order-order {
  .tit {
    display: flex;
    height: 45px;
    align-items: center;
  }
  .tit .item {
    padding: 0 10px;
    width: 10%;
    text-align: center;
  }
  .tit .product {
    width: 25%;
  }
  .prod-tit {
    padding: 10px;
    background: #f8f8f9;
    border-left: 1px solid #dddee1;
    border-top: 1px solid #dddee1;
    border-right: 1px solid #dddee1;
  }
  .prod-tit span {
    margin-right: 15px;
  }
  .prod-cont {
    display: flex;
    border-top: 1px solid #dddee1;
    border-bottom: 1px solid #dddee1;
    border-left: 1px solid #dddee1;
    color: #495060;
  }
  .prod-cont .item {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    // width: 10%;
    border-right: 1px solid #dddee1;
    text-align: center;
    height: 100%;
  }
  .prod-cont .item span {
    display: block;
  }
  .prod-cont .prod-item {
    // width: 38%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #dddee1;
  }
  .prod-name {
    width: 55%;
    text-align: left;
  }
  .prod-price {
    position: absolute;
    right: 40px;
    text-align: right;
  }
  .prod-price span {
    display: block;
    margin-bottom: 10px;
  }
  .prod-name .prod-info {
    display: block;
    color: #80848f;
    margin-top: 30px;
  }
  .prod-cont .items.name {
    display: flex;
    position: relative;
    padding: 20px;
    // height: 100px;
    border-bottom: 1px solid #dddee1;
  }
  .prod-cont .items.name:last-child {
    border-bottom: none;
  }
  .prod-image {
    margin-right: 20px;
    width: 100px;
    height: 100px;
  }
  .prod-image img {
    width: 100px;
    height: 100px;
  }
  .item span {
    display: block;
    margin-bottom: 10px;
  }
  .item .operate {
    color: #2d8cf0;
  }
  .item .totalprice {
    color: #c00;
  }
  .prod .remark {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #cee3ff;
    border-left: 1px solid #dddee1;
    border-right: 1px solid #dddee1;
    border-bottom: 1px solid #dddee1;
    margin-bottom: 20px;
  }
  .buyer-remark {
    padding: 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .empty-tips {
    display: block;
    width: 100%;
    text-align: center;
    margin: 50px 0;
    color: #999;
  }
}
</style>
  
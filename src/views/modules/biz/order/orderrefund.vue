<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-biz__orderrefund}">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.orderId" placeholder="订单编号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('biz:orderrefund:delete')" type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border @selection-change="dataListSelectionChangeHandle" style="width: 100%;">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="refundNumber" label="退款编号" header-align="center" align="center" width="280"></el-table-column>
        <el-table-column prop="payTypeName" label="支付名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="orderAmount" label="订单总金额" header-align="center" align="center"></el-table-column>
        <el-table-column prop="refundAmount" label="退款金额" header-align="center" align="center"></el-table-column>
        <el-table-column prop="returnMoneySts" label="退款状态" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.returnMoneySts==0">退款处理中</el-tag>
            <el-button v-if="scope.row.returnMoneySts==0" type="success" size="mini" :icon="paySelectIcon" circle @click="queryRefund(scope.row.id)"></el-button>
            <el-tag v-if="scope.row.returnMoneySts==1" type="success">退款成功</el-tag>
            <el-tag v-if="scope.row.returnMoneySts==-1" type="danger">退款失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="refundTime" label="退款时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="buyerMsg" label="申请原因" header-align="center" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.buyerMsg">
              {{scope.row.buyerMsg}}
            </span>
            <span v-else>
              无
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="userReceivedAccount" label="退款入账账户" header-align="center" align="center"></el-table-column>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="$hasPermission('biz:orderrefund:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">查看</el-button>
            <el-button v-if="$hasPermission('biz:orderrefund:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle">
      </el-pagination>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './orderrefund-add-or-update'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/biz/orderrefund/page',
        getDataListIsPage: true,
        exportURL: '/biz/orderrefund/export',
        deleteURL: '/biz/orderrefund',
        deleteIsBatch: true
      },
      dataForm: {
        id: '',
        
      },
      paySelectIcon:"el-icon-refresh-right",
      orderField:"create_time",
      order:"desc"
    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
    queryRefund(id){
        if(id){
            this.paySelectIcon = 'el-icon-loading'
            this.$http.get("/biz/orderrefund/refund_status/"+id, {params: {}}).then(({ data: res }) => {
                console.log(res);
                this.paySelectIcon = 'el-icon-refresh-right'
                this.getDataList();
            });
        }
    },
  },
}
</script>

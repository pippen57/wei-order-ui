<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-biz__product}">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.id" placeholder="id" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('biz:product:save')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('biz:product:delete')" type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border @selection-change="dataListSelectionChangeHandle" style="width: 100%;">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="pic" label="商品主图" header-align="center" align="center">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 60px" :src="scope.row.pic" :preview-src-list="[scope.row.pic]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="商品名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="originalPrice" label="原价" header-align="center" align="center"></el-table-column>
        <el-table-column prop="price" label="现价" header-align="center" align="center"></el-table-column>
        <el-table-column prop="point" label="卖点" header-align="center" align="center"></el-table-column>
        
        <el-table-column prop="soldNum" label="销量" header-align="center" align="center"></el-table-column>
        <el-table-column prop="totalStocks" label="总库存" header-align="center" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===1">上架</el-tag>
            <el-tag type="danger" v-if="scope.row.status===0">下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" header-align="center" align="center"></el-table-column>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="$hasPermission('biz:product:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
            <el-button v-if="$hasPermission('biz:product:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
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
import AddOrUpdate from './product-add-or-update'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/biz/product/page',
        getDataListIsPage: true,
        exportURL: '/biz/product/export',
        deleteURL: '/biz/product',
        deleteIsBatch: true
      },
      dataForm: {
        id: ''
      }
    }
  },
  components: {
    AddOrUpdate
  }
}
</script>

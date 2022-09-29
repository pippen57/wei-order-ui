<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-biz__bizshop}">
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
          <el-button v-if="$hasPermission('biz:shop:save')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('biz:shop:delete')" type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border @selection-change="dataListSelectionChangeHandle" style="width: 100%;">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="id" label="店铺id" header-align="center" align="center"></el-table-column>
        <el-table-column prop="shopName" label="店铺名称(数字、中文，英文(可混合，不可有特殊字符)，可修改)、不唯一" header-align="center" align="center"></el-table-column>
        <el-table-column prop="userId" label="店长用户id" header-align="center" align="center"></el-table-column>
        <el-table-column prop="shopOwner" label="店长" header-align="center" align="center"></el-table-column>
        <el-table-column prop="mobile" label="店铺绑定的手机(登录账号：唯一)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="shopNotice" label="店铺公告(可修改)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="intro" label="店铺简介(可修改)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="tel" label="店铺联系电话" header-align="center" align="center"></el-table-column>
        <el-table-column prop="shopLat" label="店铺所在纬度(可修改)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="shopLng" label="店铺所在经度(可修改)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="shopAddress" label="店铺详细地址" header-align="center" align="center"></el-table-column>
        <el-table-column prop="province" label="店铺所在省份（描述）" header-align="center" align="center"></el-table-column>
        <el-table-column prop="city" label="店铺所在城市（描述）" header-align="center" align="center"></el-table-column>
        <el-table-column prop="area" label="店铺所在区域（描述）" header-align="center" align="center"></el-table-column>
        <el-table-column prop="shopLogo" label="店铺logo(可修改)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="shopPhotos" label="店铺相册" header-align="center" align="center"></el-table-column>
        <el-table-column prop="openTime" label="每天营业时间段(可修改)" header-align="center" align="center"></el-table-column>
        <el-table-column prop="shopStatus" label="店铺状态(-1:未开通 0: 停业中 1:营业中)，可修改" header-align="center" align="center"></el-table-column>
        <el-table-column prop="creator" label="创建者" header-align="center" align="center"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" header-align="center" align="center"></el-table-column>
        <el-table-column prop="updater" label="更新者" header-align="center" align="center"></el-table-column>
        <el-table-column prop="updateDate" label="更新时间" header-align="center" align="center"></el-table-column>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="$hasPermission('biz:shop:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
            <el-button v-if="$hasPermission('biz:shop:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
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
import AddOrUpdate from './shop-add-or-update'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/biz/shop/page',
        getDataListIsPage: true,
        exportURL: '/biz/shop/export',
        deleteURL: '/biz/shop',
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

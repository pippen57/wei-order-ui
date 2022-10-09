<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-biz__productprop}">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.propName" placeholder="属性名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('biz:productprop:save')" type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border @selection-change="dataListSelectionChangeHandle" style="width: 100%;">
        <el-table-column type="index" label="#" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="propName" label="属性名称" header-align="center" align="center"></el-table-column>
        <el-table-column  label="属性值" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.propValue" effect="plain"
                :key="item.id" class="prop-value">{{item.propValue}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" header-align="center" align="center"></el-table-column>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button v-if="$hasPermission('biz:productprop:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
            <el-button v-if="$hasPermission('biz:productprop:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
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
import AddOrUpdate from './productprop-add-or-update'
export default {
  mixins: [mixinViewModule],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/biz/productprop/page',
        getDataListIsPage: true,
        exportURL: '/biz/productprop/export',
        deleteURL: '/biz/productprop',
        deleteIsBatch: false
      },
      dataForm: {
        propName: ''
      }
    }
  },
  components: {
    AddOrUpdate
  },

}
</script>
<style scoped>
.prop-value{
  display: inline-block;
  margin: 0 5px 5px 0;
}
</style>

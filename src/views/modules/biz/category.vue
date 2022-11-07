<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-biz__bizcategory}">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.categoryName" placeholder="分类名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('biz:category:save')" type="primary" @click="addOrUpdateHandle()">{{ $t('add')
          }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="$hasPermission('biz:category:delete')" type="danger" @click="deleteHandle()">{{
          $t('deleteBatch') }}</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="dataListLoading" :data="dataList" row-key="id" border @selection-change="dataListSelectionChangeHandle"
        style="width: 100%;">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <!-- <el-table-column prop="id" label="类目ID" header-align="center" align="center"></el-table-column> -->
        <el-table-column prop="categoryName" header-align="center" align="center"  width="150" label="分类名称">
        </el-table-column>
        <el-table-column prop="pic" header-align="center" align="center" label="图片">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 60px" :src="scope.row.pic" :preview-src-list="[scope.row.pic]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="status" header-align="center" align="center" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" size="small" type="danger">下线</el-tag>
            <el-tag v-else size="small">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="seq" header-align="center" align="center" label="排序号">
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作">
          <template slot-scope="scope">
            <el-button v-if="$hasPermission('biz:category:update')" type="text" size="small"
              @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
            <el-button v-if="$hasPermission('biz:category:delete')" type="text" size="small"
              @click="deleteHandle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size="limit" :total="total"
        layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle">
      </el-pagination>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './category-add-or-update'
export default {
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/biz/category/list',
        deleteURL: '/biz/category',
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

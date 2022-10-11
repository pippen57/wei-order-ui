<template>
  <div>
  <el-input v-model="showTypeName" :placeholder="placeholder" @focus="typeDialog">
    <el-button slot="append" icon="el-icon-search" @click="typeDialog"></el-button>
  </el-input>
  <el-input :value="value" style="display: none"></el-input>
  <el-dialog :visible.sync="visibleType" width="30%" :modal="false" :title="placeholder" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form size="mini" :inline="true">
      <el-form-item :label="$t('keyword')">
        <el-input v-model="filterText"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default">{{ $t('query') }}</el-button>
      </el-form-item>
    </el-form>
    <el-tree
      class="filter-tree"
      :data="typeList"
      :default-expanded-keys="expandedKeys"
      :props="{ label: 'categoryName', children: 'children' }"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :highlight-current="true"
      node-key="id"
      ref="tree">
    </el-tree>
    <template slot="footer">
      <el-button type="default" @click="cancelHandle()" size="mini">{{ $t('cancel') }}</el-button>
      <el-button v-if="query" type="info" @click="clearHandle()" size="mini">{{ $t('clear') }}</el-button>
      <el-button type="primary" @click="commitHandle()" size="mini">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'RenTypeTree',
  data () {
    return {
      filterText: '',
      visibleType: false,
      typeList: [],
      showTypeName: '',
      expandedKeys: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  props: {
    value: [Number, String],
    typeName: String,
    query: Boolean,
    placeholder: String,
    url: {
      type: String,
      required: false,
      default:''
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    typeName (val) {
      this.showTypeName = val
    }
  },
  methods: {
    typeDialog () {
      this.expandedKeys = null
      if (this.$refs.tree) {
        this.$refs.tree.setCurrentKey(null)
      }
      this.visibleType = true
      this.getTypeList(this.value)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.categoryName.indexOf(value) !== -1
    },
    getTypeList (id) {
      return this.$http.get(this.url).then(({ data: res }) => {
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.typeList = res.data
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(id)
          this.expandedKeys = [id]
        })
      }).catch(() => {})
    },
    cancelHandle () {
      this.visibleType = false
      this.typeList = []
      this.filterText = ''
    },
    clearHandle () {
      this.$emit('input', '')
      this.$emit('update:typeName', '')
      this.showTypeName = ''
      this.visibleType = false
      this.typeList = []
      this.filterText = ''
    },
    commitHandle () {
      const node = this.$refs.tree.getCurrentNode()
      if (!node) {
        this.$message.error(this.$t('type.chooseerror'))
        return
      }
      this.$emit('input', node.id)
      this.$emit('update:typeName', node.categoryName)
      this.showTypeName = node.categoryName
      this.visibleType = false
      this.typeList = []
      this.filterText = ''
    }
  }
}
</script>

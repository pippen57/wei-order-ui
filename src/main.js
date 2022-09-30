import Vue from 'vue'
import Element from 'element-ui'
import App from '@/App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import '@/icons'
import '@/element-ui/theme/index.css'
import '@/assets/scss/aui.scss'
import http from '@/utils/request'
import renRadioGroup from '@/components/ren-radio-group'
import renSelect from '@/components/ren-select'
import renDeptTree from '@/components/ren-dept-tree'
import renTypeTree from '@/components/ren-type-tree'
import renRegionTree from '@/components/ren-region-tree'
import picUpload from '@/components/pic-upload'
import mulPicUpload from '@/components/mul-pic-upload'
import { hasPermission, getDictLabel } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'

Vue.config.productionTip = false
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
Vue.use(Avue);

Vue.use(Element, {
  size: 'default',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(renRadioGroup)
Vue.use(renSelect)
Vue.use(renDeptTree)
Vue.use(renTypeTree)
Vue.use(renRegionTree)
Vue.use(picUpload)
Vue.use(mulPicUpload)
// 挂载全局
Vue.prototype.$http = http
Vue.prototype.$hasPermission = hasPermission
Vue.prototype.$getDictLabel = getDictLabel

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


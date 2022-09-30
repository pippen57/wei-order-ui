import PicUpload from './src/pic-upload'

PicUpload.install = function (Vue) {
  Vue.component(PicUpload.name, PicUpload)
}

export default PicUpload
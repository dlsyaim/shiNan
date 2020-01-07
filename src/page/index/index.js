// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../../router/index'
import store from '../../store/index'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css' //  导入样式
import '../../css/main.css' //导入内页公共样式
// process.env.NODE_ENV === 'development' && require('./mock')
// process.env.NODE_ENV === 'development' && require('../../mock/index')
// require('../../mock/index')
// import './mock' // 模拟数据
import G6 from '@antv/g6'
import { __esModule } from 'webpack-merge/lib/join-arrays-smart'
Vue.prototype.$G6 = G6
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$message = ElementUI.Message
Vue.prototype.$msgbox = ElementUI.MessageBox
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$alert = ElementUI.Alert

// 输入框数据自动去除头尾空格
ElementUI.Input.methods.handleInput = function(event) {
  const value = event.target.value.trim()
  this.$emit('input', value)
  this.setCurrentValue(value)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

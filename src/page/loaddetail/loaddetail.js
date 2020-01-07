import Vue from 'vue'
import App from './index.vue'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css' //  导入样式
import ElementUI from 'element-ui'
import '../../css/main.css' //导入内页公共样式
// require('../../mock/index')
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
  el: '#loaddetail',   
  render: h => h(App)
})

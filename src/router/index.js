import Vue from 'vue'
import Router from 'vue-router'
// components
import EchartsTemp from '@/components/EchartsTemp'
import PopupTemp from '@/components/PopupTemp'

// page


// views
import Home from '@/views/Home'
import Login from '@/views/Login'
import page404 from '@/views/page404'
import EquipChartsIframe from '@/views/equipCharts/index'
import WatchEquipIframe from '@/views/watchEquip/index'

import dome from '@/views/dome/testPage'
import dome2 from '@/views/dome2/testPage'

//线损情况
import LineBad from '@/LineBad/LineBad'
import LineDetali from '@/LineBad/LineDetali'


// 智能运维
// 负载情况
import Load from '@/views/intelliOper/load'
//电压质量
import Voltage from '@/views/intelliOper/voltage'
//三相均衡
import Phase from '@/views/intelliOper/phase'
//功率因素
import Power from '@/views/intelliOper/power'
//线损情况
import Damage from '@/views/intelliOper/damage'
//户变关系
import homelist from '@/views/intelliOper/homelist'
// 异常统计
import statistic from '@/views/abnormalHandler/statistic'
// 统计报表
import form from '@/views/assistantForms/form'
// 报修统计
import repair from '@/views/abnormalHandler/repair'
// 巡检方案
import inspection from '@/views/assistantDecision/inspection'
// 主动抢修
import selfRepair from '@/views/abnormalHandler/selfRepair'
// 停电计划指导
import powerCut from '@/views/assistantDecision/powerCut'
// 主动抢修的详情
// import activerushdetail from '@/views/abnormalHandler/selfRepair/detailpages/selfRepairdetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      name_zh: '首页',
      component: Home
    },
    {
      path: '/courtsManage/EchartsTemp',
      name: 'EchartsTemp',
      name_zh: 'echarts样例',
      component: EchartsTemp
    },

    {
      path: '/courtsManage/PopupTemp',
      name: 'PopupTemp',
      name_zh: '弹窗样例',
      component: PopupTemp
    },
    {
      path: '/equip',
      redirect: '/'
    },
    {
      path: '/equip/EquipCharts',
      name: 'EquipCharts',
      name_zh: '电气设备',
      component: EquipChartsIframe
    },
    {
      path: '/courtsManageequip/EquipCharts',
      name: 'EquipCharts',
      name_zh: '电气设备',
      component: EquipChartsIframe
    },
    {
      path: '/equip/WatchEquip',
      name: 'WatchEquip',
      name_zh: '监控设备',
      component: WatchEquipIframe
    },
    {
      path: '/courtsManageequip/WatchEquip',
      name: 'WatchEquip',
      name_zh: '监控设备',
      component: WatchEquipIframe
    },
    // {
    //   path: '/courtsManage/intelliOper/Power',
    //   name: 'Power',
    //   component: Power
    // },
    {
      path: '/login',
      name: 'Login',
      name_zh: '登录',
      component: Login
    },

    {

      path: '/equip/page404',
      name: 'page404',
      name_zh: '404',
      component: page404
    },
    {
      path: '/courtsManage/intelliOper/LineBad',
      name: 'LineBad',
      name_zh: '线损情况页',
      component: LineBad
    },
    {
      path: '/courtsManage/intelliOper/LineDetali',
      name: 'LineDetali',
      name_zh: '线损情况弹窗页',
      component: LineDetali
    },

  {
    path: '/courtsManage/intelliOper/homelist',
    name: 'homelist',
    name_zh: '户变关系页',
    component: homelist
  },
    {
      path: '/courtsManageequip/dome',
      name: 'dome',
      component: dome
    },
    {
      path: '/courtsManageequip/dome2',
      name: 'dome2',
      component: dome2
    },
    {
      path: '/courtsManage/intelliOper/load',
      name: 'Load',
      name_zh: '负载情况',
      component: Load
    },
    {
      path: '/courtsManage/intelliOper/voltage',
      name: 'Voltage',
      name_zh: '电压质量',
      component: Voltage
    },
    {
      path: '/courtsManage/intelliOper/phase',
      name: 'Phase',
      name_zh: '三相均衡',
      component: Phase
    },
    {
      path: '/courtsManage/intelliOper/power',
      name: 'Power',
      name_zh: '功率因素',
      component: Power
    },
    {
      path: '/courtsManage/intelliOper/damage',
      name: 'Damage',
      name_zh: '线损情况',
      component: Damage
    },
    {
      path: '/courtsManage/abnormalHandler/statistic',
      name: 'statistic',
      name_zh: '异常处理',
      component: statistic
    },
    {
      path: '/courtsManage/abnormalHandler/repair',
      name: 'repair',
      name_zh: '报修统计',
      component: repair
    },
    {
      path: '/courtsManage/assistantForms/form',
      name: 'form',
      name_zh: '统计报表',
      component: form
    },
    {
      path: '/courtsManage/assistantDecision/inspection',
      name: 'inspection',
      name_zh: '巡检方案',
      component: inspection
    },
    {
      path: '/courtsManage/abnormalHandler/selfRepair',
      name: 'selfRepair',
      name_zh: '主动抢修',
      component: selfRepair
    },
    {
      path: '/courtsManage/assistantDecision/powerCut',
      name: 'powerCut',
      name_zh: '巡检方案',
      component: powerCut
    },
    // {
    //   path: '/courtsManage/abnormalHandler/selfRepair',
    //   name: 'activerushdetail',
    //   name_zh: '主动抢修详情',
    //   component: activerushdetail
    // },
  ]
})

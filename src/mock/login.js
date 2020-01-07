const userInfo = {
    status: 200,
    message: '登录成功',
    data: {}
}



let hostUrl = window.location.protocol + "//" + window.location.host;
let ctx = hostUrl + "/shiNan";

const menuData = {
    status: 200,
    message: '成功',
    data: [
      {
        meta: {
          title: '台区综合管理',
          icon: 'ic_gdfubz'
        },
        path: '/courtsManage',
        hidden: false,
        disabled: false,
        children: [
          {
            meta: {
              title: '设备状态',
              icon: 'ic_third'
            },
            path: 'equip',
            hidden: false,
            disabled: false,
            children: [
              {
                meta: {
                  title: '台区概况',
                  icon: 'ic_second_d'
                },
                path: '/EquipCharts',
                hidden: false,
                disabled: false
              },
              {
                meta: {
                  title: '运行监测',
                  icon: 'ic_second_d'
                },
                path: '/WatchEquip',
                hidden: false,
                disabled: false
              },
              // {
              //   meta: {
              //     title: 'dome',
              //     icon: 'ic_second_d'
              //   },
              //   path: '/dome',
              //   hidden: false,
              //   disabled: false
              // },
              // {
              //   meta: {
              //     title: 'dome2',
              //     icon: 'ic_second_d'
              //   },
              //   path: '/dome2',
              //   hidden: false,
              //   disabled: false
              // }
            ]
          },
          {
            meta: {
              title: '智能运维',
              icon: 'ic_third'
            },
            path: '/intelliOper',
            hidden: false,
            disabled: false,
            children: [
              {
                meta: {
                  title: '负载情况',
                  icon: 'ic_second_d'
                },
                path: ctx + '/load',
                hidden: false,
                disabled: false,
              },
              {
                meta: {
                  title: '电压质量',
                  icon: 'ic_second_d'
                },
                path: '/voltage',
                hidden: false,
                disabled: false
              },
              {
                meta: {
                  title: '三相均衡',
                  icon: 'ic_second_d'
                },
                path: '/phase',
                hidden: false,
                disabled: false
              },
              {
                meta: {
                  title: '功率因素',
                  icon: 'ic_second_d'
                },
                path: '/power',
                hidden: false,
                disabled: false
              },
              {
                meta: {
                  title: '线损情况',
                  icon: 'ic_second_d'
                },
                path: '/damage',
                hidden: false,
                disabled: false
              },
              {
                meta: {
                  title: '户变关系',
                  icon: 'ic_second_d'
                },
                path: '/HomeList',
                hidden: false,
                disabled: false
              }
            ]
          }
        ]
      }
    ]
}

export default {
    login: config => {
        return userInfo
    },
    menu: config => {
        return menuData
    }
}

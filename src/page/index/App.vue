<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <div class="header-logo"></div>
        <div class="header-middle">
          <a class="green"><span>抢修状态：</span>抢修状态正常</a>
          <a class="yellow"><span>预警状态：</span>电网状态正常</a>
          <a class="red"><span>保电状态：</span>三级保电等级</a>
        </div>
        <div class="header-right">
          <div class="lunbo">
            <p>
              <a :style="csslunbo()">XXX多云 最高温度:14℃ 最低温度:6℃</a>
            </p>
          </div>
          <div class="header-right-but">
            <a>注销</a>
            <div class="more">
              <p>注销</p>
              <p>退出</p>
            </div>
          </div>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside :width="menuWidth" class="aside">
          <NavMenu :menuData="menuData" :menuWidth="menuWidth" @changeCollapse="changeCollapse"></NavMenu>
        </el-aside>
        <el-main>
          <div class="top-nav">
            <div class="top-nav-left">
              <a>指挥监控</a>
            </div>
            <div class="top-nav-right">
              <template v-for="(list, index) in topNavData">
                <li :class="list.iconClass" :key="index">
                  <p>{{list.title}}</p><a>{{list.quantity}}</a>
                </li>
              </template>
            </div>
            <div class="top-nav-but">
            </div>
          </div>

          <div class="main-box">
              <!-- <div class="top-breadcrumb" v-if="breadcrumbList && breadcrumbList.length > 0">
            <breadcrumb :list="breadcrumbList" />
          </div> -->
            <router-view/>

          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import breadcrumb from '@/components/snxp-breadcrumb'
//import { getMenuData } from '@/api/api'
export default {
  name: 'AppVue',
  provide() {
    return {
      setBreadcrumb: this.setBreadcrumb
    }
  },
  components: { NavMenu, breadcrumb },
  data() {
    return {
      menuWidth: '180',
      menuData: [],
      breadcrumbList: [],
      txtTime:'30',
      topNavData:[
        {
          iconClass:'ic_tagz',
          title:'台区过载',
          quantity:0
        },
        {
          iconClass:'ic_tqzz',
          title:'台区重载',
          quantity:0
        },
        {
          iconClass:'ic_sxbph',
          title:'三相不平衡',
          quantity:0
        },
        {
          iconClass:'ic_ddy',
          title:'低电压',
          quantity:0
        }
      ],
      menuDataReq: {
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
                    path: '/load',
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
              },
              {
                meta: {
                  title: '异常处理',
                  icon: 'ic_third'
                },
                path: '/abnormalHandler',
                hidden: false,
                disabled: false,
                children: [
                  {
                    meta: {
                      title: '异常处理',
                      icon: 'ic_second_d'
                    },
                    path: '/statistic',
                    hidden: false,
                    disabled: false,
                  },
                  {
                    meta: {
                      title: '主动抢修',
                      icon: 'ic_second_d'
                    },
                    path: '/selfRepair',
                    hidden: false,
                    disabled: false
                  },
                  {
                    meta: {
                      title: '报修统计',
                      icon: 'ic_second_d'
                    },
                    path: '/repair',
                    hidden: false,
                    disabled: false
                  },
                ]
              },
              {
                meta: {
                  title: '辅助决策',
                  icon: 'ic_third'
                },
                path: '/assistantDecision',
                hidden: false,
                disabled: false,
                children: [
                  {
                    meta: {
                      title: '巡检方案',
                      icon: 'ic_second_d'
                    },
                    path: '/inspection',
                    hidden: false,
                    disabled: false,
                  },
                  {
                    meta: {
                      title: '停电计划指导',
                      icon: 'ic_second_d'
                    },
                    path: '/powerCut',
                    hidden: false,
                    disabled: false
                  },
                ]
              },
              {
                meta: {
                  title: '统计报表',
                  icon: 'ic_third'
                },
                path: '/assistantForms',
                hidden: false,
                disabled: false,
                children: [
                  {
                    meta: {
                      title: '统计报表',
                      icon: 'ic_second_d'
                    },
                    path: '/form',
                    hidden: false,
                    disabled: false,
                  },
                ]
              },
            ]
          }
        ]
      }
    }
  },
  watch: {
    "$route": {
      handler() {
        console.log(this.$route)
        this.formatBreadcrumbList()
      },
      deep: true
    }
  },
  created() {
    this.menuData = this.menuDataReq.data
  },
  mounted() {

  },
  methods: {
    setBreadcrumb(list) {
      this.$nextTick(() => {
        this.breadcrumbList = list
      })
    },
    formatBreadcrumbList() {
      const currentRoute = this.$route.fullPath
      const currentRouteList = currentRoute.split('/')
      currentRouteList.splice(0, 1)
      this.breadcrumbList = []
      if (currentRoute === '/') {
        return
      }
      for (let i = 0; i < currentRouteList.length; i++) {
        if(i === 0 || i === currentRouteList.length - 1) {
          var obj = {
            name: this.getMenuTitle('/' + currentRouteList[i], this.menuData)
          }
          if (i === 0) {
            obj.icon = 'el-icon-s-home'
            if (i !== currentRouteList.length - 1) {
              obj.path = '/' + currentRouteList[i]
            }
          }
          this.breadcrumbList.push(obj)
        } else {
          this.breadcrumbList.push({
            name: this.getMenuTitle('/' + currentRouteList[i], this.menuData),
            path: '/' + currentRouteList[i]
          })
        }
      }
    },
    getMenuTitle(path, list) {
      var name = ''
      for (let i = 0; i < list.length; i++) {
        if (list[i].path === path) {
          name = list[i].meta.title
          return name
        } else if (list[i].children && list[i].children.length > 0) {
          name = this.getMenuTitle(path, list[i].children)
          return name
        }
      }
      return name
    },
    changeCollapse: function() {
      this.menuWidth = '64'
    },
    csslunbo:function(){
      return {
        'animation-duration': this.txtTime + 's'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header {
  background: #005E67;
  color: #fff;
  height: 44px!important;
  line-height: 44px;
  position: relative;
}
.container {
  height: calc(100vh - 45px);
  .aside {
    background: #008294;
    color: #fff;
    &::-webkit-scrollbar {/*滚动条整体样式*/
      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 10px;
      background: #00B6D4;
    }
    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
      border-radius: 10px;
      background: transparent;
    }
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      li {
        text-align: left;
        background: #00B6D4;
        padding: 20px;
        a {
          color: #fff;
          text-decoration: none;
          &:hover {
            color: #FCFD01;
          }
        }
      }
    }
  }
}
.el-main
{
  padding: 0px;
  position: relative;
  overflow: hidden;
}
  .top-nav
  {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 66px;
    background: #f8f6f6;
    z-index: 2;
    // box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    border-bottom: 2px solid #eeeeee;
  }
  .top-breadcrumb {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    height: 46px;
    line-height: 46px;
    padding: 0 10px;
    background: #fff;
    box-sizing: border-box;
    z-index: 1;
    /deep/ .breadcrumb-wrap {
      height: 100%;
    }
  }
  .main-box
  {
    // padding-top: 120px;
    // padding-top: 90px;
    margin-top: 68px;
    width: 100%;
    height: calc(100% - 68px);
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    .el-breadcrumb{
      // height: 100%;
      // line-height: 46px;
    font-size: 17px;
    height: 30px;
    line-height: 20px;
    }
  }




  .header-logo
  {
    width:371px;
    height: 100%;
    left: 0;
    top: 0;
    background: url("../../assets/logo_1.png") center no-repeat;
    background-size: cover;
    position: absolute;
  }
  .header-right
  {
    width: 330px;
    right: 0;
    top: 0;
    height: 100%;
    position: absolute;
  }
  .top-nav-but
  {
    width: 169px;
    height: 100%;
    float: right;
    background: url("../../assets/btn.png") center no-repeat;
    margin-right: 10px;
    cursor: pointer;
  }
  .header-middle a
  {
    font-size: 16px;
    margin: 0 20px;
    height: 44px;
    line-height: 44px;
    display: inline-block;
    padding-left: 26px;
    background: url("../../assets/ic_tick.png") center left no-repeat;
  }
  .header-middle a span
  {
    color: #fff;
  }
  .header-middle a.red
  {
    color: #f00;
  }
  .header-middle a.yellow
  {
    color: #fff600;
  }
  .header-middle a.green
  {
    color: #0be700;
  }
  .lunbo
  {
    width: 220px;
    border-left: solid 2px #00757b;
    border-right: solid 2px #00757b;
    height: 39px;
    line-height: 39px;
    margin-top: 3px;
    overflow: hidden;
    position: relative;
    float: left;
  }
  .lunbo p
  {
    height: 39px;
    line-height: 39px;
    position: absolute;
    margin: 0;
    padding: 0;
  }
  .lunbo a
  {
    position: relative;
    top: 0;
    left:100%;
    height: 39px;
    line-height: 39px;
    white-space: nowrap;
    animation: txtmove 5s 2.4s infinite linear;
  }
  @keyframes txtmove {
    0% {
      left: 220px;
    }
    100% {
      left: -100%;
    }
  }
  .top-nav-right li
  {
    float: left;
    height: 100%;
    list-style: none;
    padding-left: 68px;
    padding-right: 15px;
    border-right: 2px #eee solid;
    text-align: left;
  }
  .top-nav-right li p
  {
    padding: 0;
    margin: 6px 0 2px 0;
    color: #00356a;
    font-size: 14px;
    text-align: left;
  }
  .top-nav-right li.ic_tagz
  {
    background: url("../../assets/ic_tagz.png") 18px 50% no-repeat;
  }
  .top-nav-right li.ic_tqzz
  {
    background: url("../../assets/ic_tqzz.png") 18px 50% no-repeat;
  }
  .top-nav-right li.ic_sxbph
  {
    background: url("../../assets/ic_sxbph.png") 18px 50% no-repeat;
  }
  .top-nav-right li.ic_ddy
  {
    background: url("../../assets/ic_ddy.png") 18px 50% no-repeat;
  }
  .top-nav-right li a
  {
    display: inline-block;
    width: 62px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    background: #00ba58;
  }
  .header-right-but
  {
    width: 106px;
    float: left;
    height: 44px;
    line-height: 44px;
    background: url("../../assets/ic_user.png") 14px 50% no-repeat;
    position: relative;
  }
  .top-nav-left
  {
    padding-right: 9px;
    float: left;
    height: 100%;
    background: url("../../assets/arrow.png") center right no-repeat;
  }
  .top-nav-left a
  {
    padding: 0 8px;
    background: #bfbfbf;
    width: 14px;
    height: 66px;
    font-size: 14px;
    line-height: 14px;
    color: #00324c;
    vertical-align: middle;
    display: table-cell;
  }
  .header-right-but a
  {
    display: inline-block;
    padding-left: 12px;
    height: 44px;
    line-height: 44px;
    margin-left: 36px;
    background: url("../../assets/ic_arrow_down.png") center left no-repeat;
    cursor: pointer;
  }
  .top-nav-right
  {
    height: 100%;
    float: left;
    padding: 6px 0;
    box-sizing: border-box;
  }
  .header-right-but:hover .more
  {
    opacity: 1;
    visibility: visible;
  }
  .header-right-but .more
  {
    width: 100%;
    position: absolute;
    top: 100%;
    z-index: 9;
    background: #005e67;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s ease-in;
  }
  .header-right-but .more p
  {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0;
    margin: 0;
    float: left;
    cursor: pointer;
    transition: 0.3s ease-in;
    background: transparent;
  }
  .header-right-but .more p:hover
  {
    background: #00b6d3;
  }


</style>

<template>
    <div class="nav-menu">
        <!--
        <el-button class="collapseBtn" @click="handleCollapse">
            <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
        </el-button>
        -->
      <div class="nav-menu-top">
        <div class="top-state">
          <li>
            <p>4220<span>MW</span></p>
            <a>实时负荷</a>
          </li>
          <li>
            <p>4250<span>MW</span></p>
            <a>最高负荷</a>
          </li>
        </div>
      </div>
      <div class="nav-menu-bottom">
        <el-menu
          class="el-menu-vertical"
          :collapse="isCollapse"
          :default-active="path"
          :background-color="bgColor"
          :text-color="textColor"
          :active-text-color="activeTextColor"
          :unique-opened="uniqueOpened"
          :menu-trigger="menuTrigger"
          router
        >
          <MenuSidebar
            :menu="menuData"
            :textColor="textColor"
          >
          </MenuSidebar>
        </el-menu>
      </div>

    </div>
</template>

<script>
import MenuSidebar from '@/components/MenuSidebar'
    export default {
        data() {
            return {
                isCollapse: false,
                path: ''
            }
        },
        components: { MenuSidebar },
        props: {
            bgColor: {
                type: String,
                default: '#008295'
            },
            textColor: {
                type: String,
                default: '#fff'
            },
            activeTextColor: {
                type: String,
                default: '#FFFF00'
            },
            uniqueOpened: {
                type: Boolean,
                default: true
            },
            menuTrigger: {
                type: String,
                default: 'click'
            },
            menuData: {
                type: Array,
                default: () => {
                    return [
                         
                     
                          
                    ]
                    return []
                }
            }
        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$route': 'onRouteChanged'
        },
        created () {
            this.onRouteChanged()
        },
        methods: {
            handleCollapse() {
                this.isCollapse = !this.isCollapse
                this.$emit('changeCollapse')
            },
            onRouteChanged () {
                this.path = this.$route.path
            }
        }
    }
</script>

<style lang="scss" scoped>
    .collapseBtn {
        width: 100%;
        font-size: 20px;
        border-radius: 0;
        border: none;
        outline: none;
        &:hover,
        &:active,
        &:focus {
            background: #fff;
            color: #008295;
        }
    }
    .nav-menu-top
    {
      width: 100%;
      height: 66px;
      padding: 10px;
      box-sizing: border-box;
    }
    .nav-menu-bottom
    {
      width: 100%;
      height: calc(100% - 68px);
      overflow: auto;
    }
    .nav-menu-bottom::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    .nav-menu-bottom::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #00B6D4;
    }
    .nav-menu-bottom::-webkit-scrollbar-track {
      border-radius: 10px;
      background: transparent;
    }
    .nav-menu
    {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .top-state
    {
      width: 100%;
      background: #005E67;
    }
    .top-state li
    {
      width: 50%;
      height: 40px;
      float: left;
      font-size: 12px;
      box-sizing: border-box;
      margin: 0;
      list-style: none;
      margin-top: 4px;
    }
    .top-state li:nth-child(1)
    {
      border-right: 1px #006d84 solid;
    }
    .top-state li:nth-child(2)
    {
      border-left: 1px #005a65 solid;
    }
    .top-state li p{
      padding: 0;
      margin: 0;
      color: #fff600;
      margin-top: 2px;
      font-size: 16px;
    }
    .top-state
    {
      background: #00636f;
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }
    .top-state p span{
      color: #fff600;
      font-size: 12px;
    }
    .top-state a
    {
      font-size: 12px;
    }

    .el-menu-vertical {
        &.el-menu--collapse {
            /*min-height: 400px;*/
            border: none;
            overflow: hidden;
            /deep/ .menu-wrapper {
                .el-menu-item,
                .el-submenu {
                    .el-submenu__title {
                        span, .el-submenu__icon-arrow {
                            display: none;
                        }
                    }
                }
            }
        }
        &:not(.el-menu--collapse) {
            width: 180px;
            margin: 0;
            padding: 0;
            overflow: hidden;
    /*min-height: 400px;*/
}

}

</style>

<!--修改element的菜单样式-->
<style>
  .menu-wrapper > .el-submenu .el-submenu{
    border-top: 1px solid #007687;
    border-bottom: 1px solid #007687;
  }
  .menu-wrapper > .el-submenu .el-submenu:first-of-type{
    border-top-width: 2px;
  }
  .menu-wrapper > .el-submenu .el-submenu:last-of-type{
    border-bottom-width: 2px;
  }
  .el-menu--inline .el-submenu__title
  {
    background-color: #0289a9 !important;
    font-size: 16px;
    font-weight: normal;
  }
  .el-submenu__title
  {
    padding: 0 0 0 45px !important;
    text-align: left;
    font-size: 16px!important;
    font-weight: bold;
    background-color: #01b6d5 !important;
  }
  .el-submenu__title i
  {
    display: none;
  }
  .el-submenu .el-menu-item
  {
    padding: 0 0 0 60px!important;
    width: 100%;
    min-width: 170px!important;
    background-color: #0dc7e3 !important;
    background-repeat: no-repeat;
    background-position: 16px 50%;
    font-size: 16px;
    text-align: left;
    box-sizing: border-box;
    border-top: 1px solid #007687;
    border-bottom: 1px solid #007687;
  }
  .el-submenu .el-menu-item:first-of-type{
    border-top-width: 2px;
  }
  .el-submenu .el-menu-item:last-of-type{
    border-bottom-width: 0;
  }
  .el-submenu .el-menu-item:hover, .el-submenu .el-menu-item.is-active
  {
    background-color: #06324b !important;
  }
  .el-menu-vertical
  {
    padding-right: 10px !important;
    width: 100%;
    box-sizing: border-box;
  }
  .el-menu-item [class^=el-icon-]
  {
    font-size: 30px;
  }
  .el-menu
  {
    border: none!important;
  }
  /*添加图标 一级图标*/
  .ic_gdfubz .el-submenu__title
  {
    height: 50px!important;
    line-height: 50px!important;
    background-image: url("../assets/ic_gdfubz.png");
    background-position: 16px 50%;
    background-repeat: no-repeat;
  }
  /*二级图标*/
  .ic_third .el-submenu__title
  {
    background-image: url("../assets/ic_third.png");
    background-position: 20px 50%;
    background-repeat: no-repeat;
  }
  /*三级图标*/
  .el-menu-item.ic_second_d
  {
    background-image: url("../assets/ic_second_d.png");
    background-position: 36px 50%;
  }
  .el-menu-item.is-active.ic_second_d
  {
    background-image: url("../assets/ic_second_p.png");
    background-position: 36px 50%;
  }
  .el-breadcrumb__inner{
    color: #666666!important;
    font-size: 18px!important;
    font-weight: normal!important;
  }
  .el-breadcrumb__inner.is-link{
    color: #333!important;
    font-size: 18px!important;
    font-weight: normal!important;
  }
  .el-breadcrumb__inner.is-link .el-icon-s-home:before{
    font-size: 24px;
    position: relative;
    top: 1px;
  }
  .el-breadcrumb__separator{
    font-size: 18px;
    margin: 0 9px;
    font-weight: normal!important;
    color: #666666!important;
  }
</style>

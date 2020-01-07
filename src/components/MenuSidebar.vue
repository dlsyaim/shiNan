<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <!-- 最后一级菜单 -->
      <el-menu-item
        v-if="!item.children && !item.hidden"
        :key="item.path"
        :index="parent ? parent + item.path : item.path"
        :disabled="item.disabled"
        :class="item.meta.icon ? item.meta.icon : ''"
      >
        <i :class="item.meta.icon ? item.meta.icon : ''" :style="{color: textColor}"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu
        v-if="item.children && !item.hidden"
        :key="item.path"
        :index="parent ? parent + item.path : item.path"
        :disabled="item.disabled"
        :class="item.meta.icon ? item.meta.icon : ''"
      >
        <template slot="title">
          <i :class="item.meta.icon ? item.meta.icon : ''" :style="{color: textColor}"></i>
          <span> {{ item.meta.title }}</span>
        </template>
        <!-- 递归 -->
        <sidebar-item
          v-if="item.children && item.children.length > 0"
          :menu="item.children"
          :parent="parent ? parent + item.path : item.path"
        />
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: ["menu", "parent", "textColor"],
  data() {
    return {};
  }
}
</script>

<style>

</style>

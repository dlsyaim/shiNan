<template>
  <div class="breadcrumb-wrap" v-if="list && list.length > 0">
        <el-breadcrumb :separator="separator">
            <template v-for="(item, index) in list">
                <el-breadcrumb-item :key="index" v-if="item.path" :to="{path: item.path}">
                    <i v-if="item.icon" :class="item.icon"></i>
                    {{item.name}}
                </el-breadcrumb-item>
                <el-breadcrumb-item :key="index" v-else>
                    <i v-if="item.icon" :class="item.icon"></i>
                    {{item.name}}
                </el-breadcrumb-item>
            </template>  
        </el-breadcrumb>
  </div>
</template>

<script>
export default {
    name: 'snxp-breadcrumb',
    data() {
        return {

        }
    },
    props: { 
        separator: {
            type: String,
            default: '>'
        },
        list: {
            type: Array,
            default: () => {
                return []
            }
        }
    }
}
</script>

<style>
</style>

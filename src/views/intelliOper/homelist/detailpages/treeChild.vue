<template>
  <div class="org-tree-node-children">
        <template v-for="(dom, ind) in treeChild">
          <div class="org-tree-node is-leaf" :key="ind" :class="{ 'is-one': treeChild.length == 1 }">
            <div class="org-tree-node-label">
              <div class="org-tree-node-label-inner">{{ dom.label }}</div>
            </div>

          <template v-if="dom.children">
              <treeChildson :treeChild="dom.children"></treeChildson>
          </template>
          </div>
        </template>
  </div>
</template>
<script>

export default {

  name:"treeChildson",
  props: {
    treeChild:{},
  },
  data() {
    return {

    };
  },
  computed: {

  },
  watch: {


  },
  mounted() {
   
  },
  methods: {

  }
};

</script>
<style scoped>
/* @import './treeList.css' */
.org-tree-container {
  background-color: #fff;
  border: 1px solid #dadada;
  margin-top: 25px;
}
.org-tree-container .headTitle {
  padding-left: 20px;
  position: relative;
}
.org-tree-container .headTitle:before {
  position: absolute;
  top: 2px;
  left: 13px;
  content: '';
  background: #4394e9;
  width: 3px;
  height: 15px;
}
.org-tree {
  display: table;
  text-align: center;
  /* margin: 30px auto 50px; */
}

.org-tree:after,
.org-tree:before {
  content: '';
  display: table;
}

.org-tree:after {
  clear: both;
}

.org-tree > .org-tree-node {
  padding-top: 0;
}

.org-tree > .org-tree-node:after {
  border-left: 0;
}

.org-tree-node.is-leaf {
  padding-left: 10px;
  padding-right: 10px;
}

.horizontal .org-tree-node {
  display: table-cell;
  float: none;
  padding-top: 0;
  padding-left: 84px;
  vertical-align: top;
}

.horizontal .diff-node {
  padding-left: 298px;
}

.horizontal .is-one {
  padding-left: 0;
}

.horizontal .org-tree-node:after {
  top: 50%;
  left: 0;
  border-left: 0;
}

.horizontal .org-tree-node:after,
.horizontal .org-tree-node:before {
  width: 84px;
  height: 50%;
}

.org-tree-node.diff-node:after,
.org-tree-node.diff-node:before {
  content: '';
  width: 298px !important;
}

.org-tree-node,
.org-tree-node-children {
  position: relative;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

/* .org-tree-node .org-node-children-total {
 top: 39px;
  left: -65px;
  padding-left: 0 !important;
}
 .org-tree-node .org-tree-node-children.org-node-children-total::before {
  content: '';
  width: 1px;
  height: calc(100% - 30px);
  top: 0;
  border-left: 1px solid #a6a6a6;
} */

.horizontal > .org-tree-node:only-child:before {
  border-bottom: 0;
}

.horizontal .org-tree-node:only-child:before {
  top: 1px;
  border-bottom: 1px solid #a6a6a6;
}

.horizontal > .org-tree-node:only-child:before {
  border-bottom: 0;
}

.org-tree-node:after,
.org-tree-node:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 19px;
}

.org-tree-node.is-one:after,
.org-tree-node.is-one:before {
  display: none;
}

.org-tree-node:after {
  left: 50%;
  border-left: 1px solid #a6a6a6;
}

.org-tree-node-children:after,
.org-tree-node-children:before,
.org-tree-node:after,
.org-tree-node:before {
  transition: all 0.35s;
}

.horizontal .org-tree-node-label {
  position: relative;
  display: table-cell;
  vertical-align: middle;
}

/* .horizontal .org-title {
  vertical-align: top;
} */

.org-tree-node-label {
  white-space: nowrap;
}

.org-tree-node-label .org-tree-node-label-inner {
  width: 150px;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  text-align: center;
  border-radius: 3px;
  background-color: #4394e9;
  color: #fff;
}

.org-title .org-tree-node-label-inner {
  background-color: #c23531;
}

.diff-node .org-tree-node-label-inner {
  background-color: #f59a23;
}

.horizontal .org-tree-node-children {
  display: table-cell;
  padding-top: 0;
  padding-left: 84px;
}

.horizontal .org-tree-node-children:before {
  top: 50%;
  left: 0;
  width: 84px;
  height: 0;
  border-left: 0;
  border-top: 1px solid #a6a6a6;
}

.org-tree-node-children:before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 20px;
  border-left: 1px solid #a6a6a6;
}

.horizontal .org-tree-node-children > .org-tree-node {
  display: block;
}

.horizontal .org-tree-node.collapsed,
.horizontal .org-tree-node.is-leaf {
  padding-top: 10px;
  padding-bottom: 10px;
}

.horizontal .org-tree-node:not(:first-child):before,
.horizontal .org-tree-node:not(:last-child):after {
  border-top: 0;
  border-left: 1px solid #a6a6a6;
}

.horizontal .org-tree-node:after,
.horizontal .org-tree-node:before {
  width: 84px;
  height: 50%;
}

.org-tree-node:not(:first-child):before,
.org-tree-node:not(:last-child):after {
  border-top: 1px solid #a6a6a6;
}

.horizontal .org-tree-node:not(:only-child):after {
  border-top: 1px solid #a6a6a6;
}

.treeListHeder {
  position: absolute;
  width: calc(100% - 70px);
  top: 10px;
  left: 20px;
  text-align: left;
  color: #555555;
}

.treeListHeder .treeListTitle {
  font-size: 14px;
  position: relative;
  color: #ffffff;
}
.treeListHeder h4 {
  margin-top: 30px;
}

.treeListHeder h4 .deviceName {
  color: #4394e9;
}

.treeListHeder h4 .deviceFloat {
  display: inline-block;
  float: right;
  font-size: 12px;
  margin-top: 0;
}

.treeListHeder h4 .deviceFloat span {
  margin-left: 10px;
}

.treeListHeder h4 .deviceFloat span b {
  width: 12px;
  height: 8px;
  display: inline-block;
  margin: 0 3px;
}

.treeListHeder h4 .deviceFloat span.red b {
  background: #c23531;
}

.treeListHeder h4 .deviceFloat span.blue b {
  background: #4394e9;
}

.treeListHeder h4 .deviceFloat span.yellow b {
  background: #f59a23;
}
/deep/ .el-dialog__headerbtn {
  top: 10px;
  font-size: 20px;
  font-weight: bold;
}
/deep/ .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}
/deep/ .el-dialog__header {
  height: 10px;
  background: rgba(8, 136, 165, 1);
}
</style>

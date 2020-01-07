<template>

  <el-dialog :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
    <div class="treeListHeder">
      <div class="treeListTitle">户变关系</div>
      <h3>注:以PMS为底图,营销数据展示为异常数据</h3>
      <h4>
        设备名称：<span class="deviceName">{{deviceName}}</span>
        <p class="deviceFloat">
          <span class="red"><b></b>台区</span>
          <span class="blue"><b></b>接入点</span>
          <span class="yellow"><b></b>差异接入点</span>
        </p>
      </h4>
    </div>
    <div class="org-tree-container">
      <div class="headTitle"><i class="el-icon-s-operation"></i>图形拓扑</div>
      <div class="org-tree horizontal">
        <div class="org-tree-node">
          <div class="org-tree-node-label org-title">
            <div class="org-tree-node-label-inner">{{treeList.label}}</div>
          </div>
          <div class="org-tree-node-children org-node-children-total">
            <template v-for="(item,index) in treeList.children">
              <div class="org-tree-node is-leaf" :key="index" v-if="!item.children">
                <div class="org-tree-node-label">
                  <div class="org-tree-node-label-inner">{{item.label}}</div>
                </div>
              </div>
              <div class="org-tree-node" :key="index" v-else>
                <div class="org-tree-node-label">
                  <div class="org-tree-node-label-inner">{{item.label}}</div>
                </div>
                <div class="org-tree-node-children">
                  <template v-for="(dom,ind) in item.children">
                    <div class="org-tree-node is-leaf" :key="ind" :class="{'is-one' : item.children.length == 1}">
                      <div class="org-tree-node-label">
                        <div class="org-tree-node-label-inner">{{dom.label}}</div>
                      </div>
                    </div>
                  </template>

                </div>
              </div>
            </template>
            <div class="org-tree-node is-leaf diff-node">
              <div class="org-tree-node-label">
                <div class="org-tree-node-label-inner">用户</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>



</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: true,
        deviceName: '华鹏成山1号配变',
        treeList: {
          label: '华鹏成山1号配变',
          children: [{
              label: '产品研发部',
              children: [{
                label: '研发-前端'
              }, {
                label: '研发-后端'
              }, {
                label: 'UI设计'
              }]
            },
            {
              label: '销售部',
              children: [{
                  label: '销售一部'
                },
                {
                  label: '销售二部'
                }
              ]
            },
            {
              label: '分支箱',
              children: [{
                label: '接入点'
              }]
            },
            {
              label: 'HR人事'
            }
          ]
        }
      }
    },
    methods: {
      handleClose(done) {
        this.$emit("on-close")
      }
    },
    mounted() {

    }
  }
</script>


<style scoped>
  /* @import './treeList.css' */
  .org-tree-container {
    background-color: #fff;
    border: 1px solid #aaaaaa;
    margin-top: 50px;
  }

  .org-tree-container .headTitle {
    height: 35px;
    line-height: 35px;
    background: #01b6d5;
    text-align: left;
    padding-left: 10px;
    color: #FFFFFF;
    font-weight: bold;
  }

  .org-tree-container .headTitle i {
    margin-right: 5px;
    font-size: 18px;
    display: inline-block;
    vertical-align: middle;
  }

  .org-tree {
    display: table;
    text-align: center;
    margin: 30px auto 50px;
  }

  .org-tree:after,
  .org-tree:before {
    content: "";
    display: table;
  }

  .org-tree:after {
    clear: both;
  }

  .org-tree>.org-tree-node {
    padding-top: 0;
  }

  .org-tree>.org-tree-node:after {
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
    content: "";
    width: 298px !important;
  }

  .org-tree-node,
  .org-tree-node-children {
    position: relative;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .org-tree-node .org-node-children-total {
    top: 39px;
    left: -65px;
    padding-left: 0 !important
  }

  .org-tree-node .org-tree-node-children.org-node-children-total::before {
    content: "";
    width: 1px;
    height: calc(100% - 30px);
    top: 0;
    border-left: 1px solid #a6a6a6;
  }

  .horizontal>.org-tree-node:only-child:before {
    border-bottom: 0;
  }

  .horizontal .org-tree-node:only-child:before {
    top: 1px;
    border-bottom: 1px solid #a6a6a6;
  }

  .horizontal>.org-tree-node:only-child:before {
    border-bottom: 0;
  }

  .org-tree-node:after,
  .org-tree-node:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 19px;
  }

  .org-tree-node.is-one:after,
  .org-tree-node.is-one:before {
    display: none
  }

  .org-tree-node:after {
    left: 50%;
    border-left: 1px solid #a6a6a6;
  }

  .org-tree-node-children:after,
  .org-tree-node-children:before,
  .org-tree-node:after,
  .org-tree-node:before {
    transition: all .35s;
  }

  .horizontal .org-tree-node-label {
    position: relative;
    display: table-cell;
    vertical-align: middle;
  }

  .horizontal .org-title {
    vertical-align: top
  }

  .org-tree-node-label {
    white-space: nowrap;
  }

  .org-tree-node-label .org-tree-node-label-inner {
    width: 120px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    text-align: center;
    border-radius: 3px;
    background-color: #4592ff;
    color: #fff;
  }

  .org-title .org-tree-node-label-inner {
    background-color: #c23531
  }

  .diff-node .org-tree-node-label-inner {
    background-color: #f59a23
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
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 20px;
    border-left: 1px solid #a6a6a6;
  }

  .horizontal .org-tree-node-children>.org-tree-node {
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
    top: 20px;
    left: 20px;
    text-align: left;
    color: #555555
  }

  .treeListHeder .treeListTitle {
    font-size: 14px;
    font-weight: bold;
    position: relative;
  }

  .treeListHeder .treeListTitle:before {
    position: absolute;
    top: 2px;
    left: -8px;
    content: "";
    width: 3px;
    height: 15px;
    background-color: rgb(3, 132, 151);

  }

  .treeListHeder h3 {
    text-align: center;
    margin-top: -20px;
    font-size: 18px;
  }

  .treeListHeder h4 {
    font-size: 16px;
  }

  .treeListHeder h4 .deviceName {
    color: #4592ff;
  }

  .treeListHeder h4 .deviceFloat {
    display: inline-block;
    float: right;
    font-size: 12px;
  }

  .treeListHeder h4 .deviceFloat span {
    margin-left: 10px;
  }

  .treeListHeder h4 .deviceFloat span b {
    width: 8px;
    height: 8px;
    display: inline-block;
    margin: 0 3px;
  }

  .treeListHeder h4 .deviceFloat span.red b {
    background: #c23531;
  }

  .treeListHeder h4 .deviceFloat span.blue b {
    background: #4592ff;
  }

  .treeListHeder h4 .deviceFloat span.yellow b {
    background: #f59a23;
  }

  /deep/ .el-dialog__headerbtn {
    font-size: 20px;
    font-weight: bold;
  }
</style>

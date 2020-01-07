<template>
  <el-dialog :visible.sync="dialogVisible" width="80%" height="400px" :before-close="handleClose">
    <div class="treeListHeder">
      <div class="treeListTitle">户变关系</div>
      <h4>
        设备名称：
        <span class="deviceName">{{ deviceName }}</span>
        <p class="deviceFloat">
          <span class="red">
            <b></b>
            台区
          </span>
          <span class="blue">
            <b></b>
            接入点
          </span>
          <span class="yellow">
            <b></b>
            差异接入点
          </span>
        </p>
      </h4>
    </div>
    <div class="org-tree-container">
      <p class="headTitle">图形拓补</p>
      <div class="org-tree horizontal">
        <div class="org-tree-node">
          <div class="org-tree-node-label org-title">
            <div class="org-tree-node-label-inner">{{ treeList.label }}</div>
          </div>
          <div class="org-tree-node-children org-node-children-total">
            <template v-for="(item, index) in treeList.children">
              <div class="org-tree-node is-leaf" :key="index" v-if="!item.children">
                <div class="org-tree-node-label">
                  <div class="org-tree-node-label-inner">{{ item.label }}</div>
                </div>
              </div>
              <div class="org-tree-node" :key="index" v-else>
                <div class="org-tree-node-label">
                  <div class="org-tree-node-label-inner">{{ item.label }}</div>
                </div>
                <div class="org-tree-node-children">
                  <template v-for="(dom, ind) in item.children">
                    <div class="org-tree-node is-leaf" :key="ind" :class="{ 'is-one': item.children.length == 1 }">
                      <div class="org-tree-node-label">
                        <div class="org-tree-node-label-inner">{{ dom.label }}</div>
                      </div>
                      <template v-if="dom.children">
                        <div class="org-tree-node-children">
                           <template v-for="(obj, id) in dom.children">
                             <div class="org-tree-node is-leaf" :key="id" :class="{ 'is-one': dom.children.length == 1 }">
                               <div class="org-tree-node-label">
                                  <div class="org-tree-node-label-inner">{{ obj.label }}</div>
                                </div>
                                <template v-if="obj.children">
                                  <div class="org-tree-node-children">
                                    <template v-for="(child, id) in obj.children">
                                      <div class="org-tree-node is-leaf" :key="id" :class="{ 'is-one': obj.children.length == 1 }">
                                        <div class="org-tree-node-label">
                                            <div class="org-tree-node-label-inner">{{ child.label }}</div>
                                          </div>
                                      </div>
                                    </template>
                                  </div>
                                </template>
                             </div>
                          </template>
                        </div>
                      </template>

                    </div>
                  </template>
                </div>
              </div>
            </template>
           <!-- <div class="org-tree-node is-leaf diff-node">
              <div class="org-tree-node-label"><div class="org-tree-node-label-inner">用户</div></div>
            </div> -->
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
      deviceName: '武康站2号配变',
      treeList: {
        label: '武康站2号配变',
        children: [
          {
            label: '低压11号C分支箱',
          },
          {
            label: '低压8号D分支箱',
            children: [
              {
                label: 'D分支箱',
                children: [
                  {
                    label: '用户接入点',
                  },
                ]
              }
            ]
          },
          {
            label: '低压9号B分支箱',
            children: [
              {
                label: 'B分支箱',
                children: [
                  {
                    label: '用户接入点',
                    children: [
                      {
                        label: '上海电信实业(集团)有限公司',
                      },
                      {
                        label: '上海市徐汇区灯光广告管理所',
                      }
                    ]
                  },
                  {
                    label: '用户接入点',
                    children: [
                      {
                        label: '上海徐汇副食品有限公司',
                      },
                    ]
                  },
                ]
              }
            ]
          },
          {
            label: '低压10号E分支箱',
            children: [
              {
                label: 'E分支箱',
                children: [
                  {
                    label: '用户接入点',
                      children: [
                      {
                        label: '李杏荣',
                      },
                      {
                        label: '赵石民',
                      }
                    ]
                  },
                  {
                    label: '用户接入点',
                    children: [
                      {
                        label: '俞季华',
                      }
                    ]
                  },
                ]
              }
            ]
          },
          {
            label: '低压11号C分支箱',
            children: [
              {
                label: 'C分支箱',
                children: [
                  {
                    label: '用户接入点',
                    children: [
                      {
                        label: '彭德馨',
                      },
                      {
                        label: '肖春兰',
                      },
                      {
                        label: '陆美英',
                      },
                      {
                        label: '沈光蕾',
                      },
                       {
                        label: '吴友余',
                      },
                       {
                        label: '沈光蕾',
                      },
                       {
                        label: '顾龙林',
                      },
                       {
                        label: '武钦成',
                      },
                       {
                        label: '沈国炎',
                      },
                       {
                        label: '沈惠明',
                      },
                       {
                        label: '李桂英',
                      },
                       {
                        label: '陈琦',
                      },
                       {
                        label: '张学文',
                      },
                       {
                        label: '朱杏文',
                      },
                       {
                        label: '丁晔',
                      },
                       {
                        label: '唐桂宝',
                      },
                       {
                        label: '丁晔',
                      },
                       {
                        label: '张伍福',
                      },
                       {
                        label: '罗颖元',
                      },
                       {
                        label: '顾风有',
                      },
                       {
                        label: '黎文',
                      },
                       {
                        label: '杨子弘',
                      },
                       {
                        label: '黄芹',
                      },
                       {
                        label: '沈叶',
                      },
                       {
                        label: '徐五妹',
                      },
                       {
                        label: '徐五妹',
                      },
                       {
                        label: '应雅琴',
                      },
                       {
                        label: '徐恩家',
                      },
                       {
                        label: '朱翠珍',
                      },
                       {
                        label: '田厚状',
                      },
                       {
                        label: '赵国宝',
                      },
                       {
                        label: '赵锦琳',
                      },
                       {
                        label: '胡昆洪',
                      },
                       {
                        label: '诸君赞',
                      },
                       {
                        label: '张维润',
                      },
                       {
                        label: '蒋文英',
                      },
                       {
                        label: '赵国宝',
                      },
                       {
                        label: '潘锡贤',
                      },
                       {
                        label: '吴瑞卿',
                      },
                       {
                        label: '吴竹燕',
                      },
                       {
                        label: '卢智慧',
                      },
                    ]
                  },
                ]
              }
            ]
          },
          {
            label: '低压12号武康路393号乙',
          },

        ]
      }
    };
  },
  methods: {
    handleClose(done) {
      this.$emit('on-closes');
      this.dialogVisible=false
    }
  },
  mounted() {}
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
/deep/  .el-dialog{
    margin-top: 10vh !important;
    height: 600px  !important;
}
.org-tree-container{
   overflow: auto;
   height: 485px;
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

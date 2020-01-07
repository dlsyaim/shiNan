<template>
  <div class="details">
     <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>
              <i class="el-icon-s-home"></i><span>供电服务保障</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              智能运维
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              <span @click="back" class="back">异常处理</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
              详情
          </el-breadcrumb-item>
      </el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-col :span="8">
        <el-form-item label="所属公司">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="所属站房">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="设备名称">
          <el-input v-model="formInline.user" placeholder="请填写"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="电压等级">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="负载情况">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="button_right">
        <span>查询</span>
        <span>重置</span>
      </el-col>
    </el-form>
    <div class="table_content">
      <span class="details">明细:</span>
      <div class="table_content_top">
        <!-- <span >
        </span> -->
        <a>重点关注台区：</a>
        <span @click='showDialogs("a368871bbc8a039c966589ed330165a3685dcf401b")'>
           &nbsp;&nbsp;&nbsp;武康站1号配变&nbsp;&nbsp;&nbsp;
        </span>
        <span @click='showDialogs("a36892a8598a039c966589ed330165a3686954402b")'>
           &nbsp;&nbsp;&nbsp;武康站2号配变&nbsp;&nbsp;&nbsp;
        </span>
        <span @click='showDialogs("82e6226af58a039c935d779143015d82e5dda17fda")'>
           吴兴公房1号配变变压器
        </span>
        <span @click='showDialogs("4174db7bc4ff8080815837504601584174866c5e16")'>
           吴兴公房2号配变变压器
        </span>
      </div>
      <div class="table">
      <el-table
          :data="tableData"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          element-loading-spinner="el-icon-loading"
          border
          highlight-current-row
          style="width: 100%"
          height='calc(100% - 12px)'
          :header-cell-style="{background:'#cbecf2',color:'#333333'}"
        >
          <el-table-column fixed prop="SBMC" label="设备名称" width="128"></el-table-column>
          <el-table-column prop="relationship " label="查看户变关系" width="128">
            <template slot-scope="scope">
              <div @click="showDialogs(scope.row.SBID)" style="cursor: pointer">
                <i class="el-icon-location-outline" style="color: #FC4E4A"></i>
                <span style="color:#ccc;">异常分析</span>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="SBID" label="设备id" width="128"></el-table-column> -->
          <el-table-column prop="BB" label="变比" width="128"></el-table-column>
          <!-- <el-table-column prop="RTU_WHBZ" label="班组" width="128"></el-table-column> -->
          <el-table-column prop="RTU_DEPT" label="班组名称" width="128"></el-table-column>
          <el-table-column prop="ZDFZL" label="最大负载率" width="128"></el-table-column>
          <el-table-column prop="PJFZL" label="平均负载率" width="128"></el-table-column>
          <el-table-column prop="FSCS" label="发生次数" width="128"></el-table-column>
          <el-table-column prop="LJTS" label="累计天数" width="128"></el-table-column>
          <el-table-column prop="LXTS" label="连续天数" width="128"></el-table-column>
          <el-table-column prop="ZZ" label="最值" width="128"></el-table-column>
          <el-table-column prop="FSSJ" label="发生日期" width="132"></el-table-column>
          <el-table-column prop="SSGS" label="公司" width="132"></el-table-column>
          <el-table-column prop="SBLX" label="设备类型" width="132"></el-table-column>
          <el-table-column prop="EDRL" label="额定容量" width="132"></el-table-column>
          <el-table-column prop="ZRL" label="总装接容量" width="132"></el-table-column>
          <el-table-column prop="FJDYHRL" label="非居大用户装接容量" width="132"></el-table-column>
          <el-table-column prop="JMRL" label="居民装接容量" width="132"></el-table-column>
          <el-table-column prop="FJMRL" label="非居民装接容量" width="132"></el-table-column>
        </el-table>
         <el-pagination
            background
            prev-text="上一页"
            next-text="下一页"
            @size-change="handleSizeChange"
            @current-change="handleSizeChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, jumper, next, pager, prev"
            :total="total">
          </el-pagination>
      </div>
    </div>
    <el-dialog width="100%" height="100%" id="same_month" :title="FHQXName" :visible.sync="showDialog">
      <div class="locure">
        <div class="locure_charts">
          <gCharts :data='gChartsData' :option='gChartsOption' :tuli="tuli" :id='"TDcharts"'></gCharts>
        </div>
      </div>
      <div class="equipment">
        <div class='equipment_title'>
          实时告警
        </div>
        <div class="equipment_name">
          <template v-for="list in ycData">
          <ul>
            <li>
              <span class='title'>设备名称:</span>
              <span>{{list.SBMC}}</span>
            </li>
            <li>
              <span class='title'>警告名称:</span>
              <span>{{list.measTypeStr}}</span>
            </li>
            <li>
              <span class='title'>警告类型:</span>
              <span>{{list.SBLX}}</span>
            </li>
            <li>
              <span class='title'>警告时间:</span>
              <span>{{list.time}}</span>
            </li>
          </ul>
          </template>
        </div>
      </div>
      
    </el-dialog>
    
  </div>
  
</template>

<script>
import gCharts from "../../components/gCharts";
import { getFZMXData,getHBGXSBXQata,getSSGJData } from "@/api/api";
export default {
  //  inject: ['setBreadcrumb'],
  components: {
    gCharts
  },
  props: {
  },
  data() {
    return {
      images:[{
        n: require("../../images/ic_byq_n.svg"),
        p: require("../../images/ic_byq_p.svg"),
      },{
        n: require("../../images/ic_dycx_n.svg"),
        p: require("../../images/ic_dycx_p.svg"),
      },{
        n: require("../../images/ic_df_n.svg"),
        p: require("../../images/ic_df_p.svg"),
      },{
        n: require("../../images/ic_jrd_n.svg"),
        p: require("../../images/ic_jrd_p.svg"),
      },{
        n: require("../../images/ic_user_n.svg"),
        p: require("../../images/ic_user_p.svg"),
      }],
      tuli:require("../../images/tuli.png"),
      tableData:[],
      currentPage:1,
      pageSize: 10,
      chartOption: {},
      postData:{},
      dialogFormVisible: false,
      // 嬾加載
      loading:false,
      returnData: null,
      showDialog: false,
      FHQXName:'华山成鹏1号变',
      exampleId:{},
      sbid:'',
      ycData:[],
      total:0,
      formInline: {
        user: "",
        region: ""
      },
      gChartsOption:{
        pixelRatio: 2,
        modes: {
          default: [{
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              var data = item.get('model').data;
              data.collapsed = collapsed;
              return true;
            }
        }, 'drag-canvas', 'zoom-canvas']
        },
        defaultNode: {
          anchorPoints: [[0, 0.5], [1, 0.5]],
        },
        defaultEdge: {
          shape: 'cubic-horizontal',
          style: {
            stroke: '#A3B1BF'
          }
        },
      },
      gChartsData:{
        /*
        "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
        "SBMC": "武康站2号配变",
        "QDSBLX": "配电变压器",
        "QDSBMC": "武康站2号配变",
        "children": [
            {
                "SBID": "a368d4b6c18a039c966589ed330165a368ab364083",
                "SBMC": "低压7号武康路1850号",
                "SBLX": "低压出线开关",
                "SJSBLX": "配电变压器",
                "SJSBLXMC": "配电变压器",
                "SJSBID": "a36892a8598a039c966589ed330165a3686954402b",
                "QDSBLXMC": "配电变压器",
                "GROUPID": null,
                "XH": null,
                "SBLXMC\n": null,
                "QDSBLX": "配电变压器",
                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                "QDSBMC": "武康站2号配变",
                "SJSBMC": "武康站2号配变",
                "id": "低压7号武康路1850号",
                "events": null
            },
            {
                "SBID": "a368df59708a039c966589ed330165a368b5d3408f",
                "SBMC": "低压8号D分支箱",
                "SBLX": "低压出线开关",
                "SJSBLX": "配电变压器",
                "SJSBLXMC": "配电变压器",
                "SJSBID": "a36892a8598a039c966589ed330165a3686954402b",
                "QDSBLXMC": "配电变压器",
                "GROUPID": null,
                "XH": null,
                "SBLXMC\n": null,
                "QDSBLX": "配电变压器",
                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                "QDSBMC": "武康站2号配变",
                "SJSBMC": "武康站2号配变",
                "id": "低压8号D分支箱",
                "events": null,
                "children": [
                    {
                        "SBID": "SBID00000000A205A9680148F3B35E66421D4ECA91",
                        "SBMC": "D分支箱",
                        "SBLX": "分支箱",
                        "SJSBLX": "低压出线开关",
                        "SJSBLXMC": "低压出线开关",
                        "SJSBID": "a368df59708a039c966589ed330165a368b5d3408f",
                        "QDSBLXMC": "配电变压器",
                        "GROUPID": null,
                        "XH": null,
                        "SBLXMC\n": null,
                        "QDSBLX": "配电变压器",
                        "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                        "QDSBMC": "武康站2号配变",
                        "SJSBMC": "低压8号D分支箱",
                        "id": "D分支箱",
                        "events": null,
                        "children": [
                            {
                                "SBID": "FF000000-0000-0036-2000-000000000200-12415",
                                "SBMC": "武康路392号",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID00000000A205A9680148F3B35E66421D4ECA91",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "D分支箱",
                                "id": "武康路392号",
                                "events": null,
                                "children": [
                                    {
                                        "YHBH": "0127017124",
                                        "LXDZ": "上海市徐汇区武康路392号西",
                                        "DYDJMC": "交流220V",
                                        "LXR": "新春百货综合商店",
                                        "HTRL": "6",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12415",
                                        "JRDMC": "武康路392号",
                                        "YHMC": "新春百货综合商店",
                                        "YDDZ": "武康路392号西",
                                        "GDDY": "07",
                                        "YHLX": "03",
                                        "YHLXMC": "低非",
                                        "LXDH": null,
                                        "ZJRL": "6",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "新春百货综合商店"
                                    }
                                ]
                            },
                            {
                                "SBID": "FF000000-0000-0036-2000-000000000200-68870",
                                "SBMC": "武康路390号",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID00000000A205A9680148F3B35E66421D4ECA91",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "D分支箱",
                                "id": "武康路390号",
                                "events": null,
                                "children": [
                                    {
                                        "YHBH": "0129001787",
                                        "LXDZ": "威海路489号603室",
                                        "DYDJMC": "交流10kV",
                                        "LXR": "蒋帮伟",
                                        "HTRL": "520",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-68870",
                                        "JRDMC": "武康路390号",
                                        "YHMC": "上海汽车集团股份有限公司",
                                        "YDDZ": "武康路390号",
                                        "GDDY": "22",
                                        "YHLX": "01",
                                        "YHLXMC": "高大",
                                        "LXDH": "021-24011042",
                                        "ZJRL": "500",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "上海汽车集团股份有限公司"
                                    }
                                ]
                            },
                            {
                                "SBID": "FF000000-0000-0036-2000-000000000200-13530",
                                "SBMC": "武康路392号甲",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID00000000A205A9680148F3B35E66421D4ECA91",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "D分支箱",
                                "id": "武康路392号甲",
                                "events": null,
                                "children": [
                                    {
                                        "YHBH": "0121023481",
                                        "LXDZ": "上海市徐汇区武康路400弄5号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "方芬",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "方芬",
                                        "YDDZ": "武康路400弄5号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64521107",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "方芬"
                                    },
                                    {
                                        "YHBH": "0124041591",
                                        "LXDZ": "上海市徐汇区武康路392号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "陈鸿章",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "陈鸿章",
                                        "YDDZ": "武康路392号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64715160",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "陈鸿章"
                                    },
                                    {
                                        "YHBH": "0121914772",
                                        "LXDZ": "上海市徐汇区武康路392号201室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "池洪蔚",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "池洪蔚",
                                        "YDDZ": "武康路392号201室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66581726",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "池洪蔚"
                                    },
                                    {
                                        "YHBH": "0122023614",
                                        "LXDZ": "上海市徐汇区武康路400弄5号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "诸葛明",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "诸葛明",
                                        "YDDZ": "武康路400弄5号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66167778",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "诸葛明"
                                    },
                                    {
                                        "YHBH": "0122041574",
                                        "LXDZ": "上海市徐汇区武康路400弄5号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "曹珊",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "曹珊",
                                        "YDDZ": "武康路400弄5号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64667598",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "曹珊"
                                    },
                                    {
                                        "YHBH": "0121023482",
                                        "LXDZ": "上海市徐汇区武康路400弄5号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "曹锡麟",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "曹锡麟",
                                        "YDDZ": "武康路400弄5号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66174889",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "曹锡麟"
                                    },
                                    {
                                        "YHBH": "0121023480",
                                        "LXDZ": "上海市徐汇区武康路400弄4号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "吴芳敏",
                                        "HTRL": "6",
                                        "YHZT": "2",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "吴芳敏",
                                        "YDDZ": "武康路400弄4号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64315224",
                                        "ZJRL": "6",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "吴芳敏"
                                    },
                                    {
                                        "YHBH": "0124044663",
                                        "LXDZ": "上海市徐汇区武康路392号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "梁黎明",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "童田田",
                                        "YDDZ": "武康路392号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": null,
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "童田田"
                                    },
                                    {
                                        "YHBH": "0122022633",
                                        "LXDZ": "上海市徐汇区武康路392号302室",
                                        "DYDJMC": "交流380V（含400V）",
                                        "LXR": "王力群",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "王力群",
                                        "YDDZ": "武康路392号302室",
                                        "GDDY": "08",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66147966",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "王力群"
                                    },
                                    {
                                        "YHBH": "0121023493",
                                        "LXDZ": "上海市徐汇区武康路392号401室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "任伊铨",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "任伊铨",
                                        "YDDZ": "武康路392号401室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64317296",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "任伊铨"
                                    },
                                    {
                                        "YHBH": "0121023491",
                                        "LXDZ": " 徐汇区武康路392号301室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "沈文治",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "沈文治",
                                        "YDDZ": "武康路392号301室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64679365",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "沈文治"
                                    },
                                    {
                                        "YHBH": "0061775408",
                                        "LXDZ": "上海市徐汇区武康路400弄5号车间",
                                        "DYDJMC": "交流220V",
                                        "LXR": "袁志冲",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "袁志冲",
                                        "YDDZ": "武康路400弄5号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-54652473",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "袁志冲"
                                    },
                                    {
                                        "YHBH": "0121923147",
                                        "LXDZ": "上海市徐汇区武康路400弄4号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "陈蝶华",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "陈蝶华",
                                        "YDDZ": "武康路400弄4号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66581089",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "陈蝶华"
                                    },
                                    {
                                        "YHBH": "0122022630",
                                        "LXDZ": " 徐汇区武康路392号201室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "李冰洁",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "李冰洁",
                                        "YDDZ": "武康路392号201室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": null,
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "李冰洁"
                                    },
                                    {
                                        "YHBH": "0121023488",
                                        "LXDZ": " 徐汇区武康路392号3室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "魏鲁南",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "魏鲁南",
                                        "YDDZ": "武康路392号3室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66219609",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "魏鲁南"
                                    },
                                    {
                                        "YHBH": "0124017757",
                                        "LXDZ": "闵行区龙茗路1897弄2号401室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "陈如光",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "陈如光",
                                        "YDDZ": "武康路392弄3楼",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64715158",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "陈如光"
                                    },
                                    {
                                        "YHBH": "0122022629",
                                        "LXDZ": "上海市徐汇区武康路392号102室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "曹露",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "曹露",
                                        "YDDZ": "武康路392号102室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66814712",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "曹露"
                                    },
                                    {
                                        "YHBH": "0121023492",
                                        "LXDZ": "上海市徐汇区武康路392号103室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "曹德良",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "曹德良",
                                        "YDDZ": "武康路392号103室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64332894",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "曹德良"
                                    },
                                    {
                                        "YHBH": "0122022632",
                                        "LXDZ": "上海市徐汇区武康路392号301室",
                                        "DYDJMC": "交流380V（含400V）",
                                        "LXR": "振大房产",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "振大房产",
                                        "YDDZ": "武康路392号301室",
                                        "GDDY": "08",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66581882",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "振大房产"
                                    },
                                    {
                                        "YHBH": "0060923693",
                                        "LXDZ": "上海市徐汇区武康路392号402室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "王莹瑛",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "王莹瑛",
                                        "YDDZ": "武康路392号402室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64668965",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "王莹瑛"
                                    },
                                    {
                                        "YHBH": "0060196427",
                                        "LXDZ": "上海市徐汇区武康路400弄2号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "时运房地产",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "黄鞍江",
                                        "YDDZ": "武康路400弄2号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64922650",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "黄鞍江"
                                    },
                                    {
                                        "YHBH": "0121023487",
                                        "LXDZ": "上海市徐汇区武康路392号2室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "裘锡良",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "裘锡良",
                                        "YDDZ": "武康路392号2室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64668964",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "裘锡良"
                                    },
                                    {
                                        "YHBH": "0124041095",
                                        "LXDZ": "上海市徐汇区武康路392号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "邵素梅",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "邵素梅",
                                        "YDDZ": "武康路392号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64663250",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "邵素梅"
                                    },
                                    {
                                        "YHBH": "0122022628",
                                        "LXDZ": "上海市徐汇区武康路392号101室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "曹露",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "曹露",
                                        "YDDZ": "武康路392号101室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66814699",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "曹露"
                                    },
                                    {
                                        "YHBH": "0124038727",
                                        "LXDZ": "上海市徐汇区武康路392号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "叶永昌",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "叶永昌",
                                        "YDDZ": "武康路392号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64669477",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "叶永昌"
                                    },
                                    {
                                        "YHBH": "0121023490",
                                        "LXDZ": "上海市徐汇区武康路392号3室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "王秉忠",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "王秉忠",
                                        "YDDZ": "武康路392号3室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": null,
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "王秉忠"
                                    },
                                    {
                                        "YHBH": "0122022631",
                                        "LXDZ": "上海市徐汇区武康路392号202室",
                                        "DYDJMC": "交流380V（含400V）",
                                        "LXR": "张琪",
                                        "HTRL": "12",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "张琪",
                                        "YDDZ": "武康路392号202室",
                                        "GDDY": "08",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": null,
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "张琪"
                                    },
                                    {
                                        "YHBH": "0121914774",
                                        "LXDZ": "上海市徐汇区武康路392号4楼",
                                        "DYDJMC": "交流220V",
                                        "LXR": "彭曙",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "彭曙",
                                        "YDDZ": "武康路392号4楼",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64668840",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "彭曙"
                                    },
                                    {
                                        "YHBH": "0121023494",
                                        "LXDZ": "上海市徐汇区武康路392号2楼",
                                        "DYDJMC": "交流220V",
                                        "LXR": "王宇文",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "王宇文",
                                        "YDDZ": "武康路392号2楼",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64670921",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "王宇文"
                                    },
                                    {
                                        "YHBH": "0121023484",
                                        "LXDZ": "徐汇区武康路392号甲303室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "周懿怡",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "周懿怡",
                                        "YDDZ": "武康路392号三楼",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64745410",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "周懿怡"
                                    },
                                    {
                                        "YHBH": "0124041388",
                                        "LXDZ": "上海市徐汇区武康路392号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "程友奇",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-13530",
                                        "JRDMC": "武康路392号甲",
                                        "YHMC": "程友奇",
                                        "YDDZ": "武康路392号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66792911",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "程友奇"
                                    }
                                ]
                            },
                            {
                                "SBID": "FF000000-0000-0036-2000-000000000200-13541",
                                "SBMC": "武康路400弄5号",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID00000000A205A9680148F3B35E66421D4ECA91",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "D分支箱",
                                "id": "武康路400弄5号",
                                "events": null,
                                "children": []
                            },
                            {
                                "SBID": "FF000000-0000-0036-2000-000000000200-13531",
                                "SBMC": "武康路392号乙",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID00000000A205A9680148F3B35E66421D4ECA91",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "D分支箱",
                                "id": "武康路392号乙",
                                "events": null,
                                "children": []
                            },
                            {
                                "SBID": "FF000000-0000-0036-2000-000000000200-13540",
                                "SBMC": "武康路400弄4号",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID00000000A205A9680148F3B35E66421D4ECA91",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "D分支箱",
                                "id": "武康路400弄4号",
                                "events": null,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "SBID": "a368ea193c8a039c966589ed330165a368c08d409b",
                "SBMC": "低压9号B分支箱",
                "SBLX": "低压出线开关",
                "SJSBLX": "配电变压器",
                "SJSBLXMC": "配电变压器",
                "SJSBID": "a36892a8598a039c966589ed330165a3686954402b",
                "QDSBLXMC": "配电变压器",
                "GROUPID": null,
                "XH": null,
                "SBLXMC\n": null,
                "QDSBLX": "配电变压器",
                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                "QDSBMC": "武康站2号配变",
                "SJSBMC": "武康站2号配变",
                "id": "低压9号B分支箱",
                "events": null,
                "children": [
                    {
                        "SBID": "SBID00000028A887A007474581BFEF7754C1965146",
                        "SBMC": "B分支箱",
                        "SBLX": "分支箱",
                        "SJSBLX": "低压出线开关",
                        "SJSBLXMC": "低压出线开关",
                        "SJSBID": "a368ea193c8a039c966589ed330165a368c08d409b",
                        "QDSBLXMC": "配电变压器",
                        "GROUPID": null,
                        "XH": null,
                        "SBLXMC\n": null,
                        "QDSBLX": "配电变压器",
                        "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                        "QDSBMC": "武康站2号配变",
                        "SJSBMC": "低压9号B分支箱",
                        "id": "B分支箱",
                        "events": null,
                        "children": [
                            {
                                "SBID": "FF000000-0000-0036-2000-000000000200-72555",
                                "SBMC": "低压供电箱",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID00000028A887A007474581BFEF7754C1965146",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "B分支箱",
                                "id": "低压供电箱",
                                "events": null,
                                "children": [
                                    {
                                        "YHBH": "1122686875",
                                        "LXDZ": "上海市徐汇区蒲汇塘路56号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "上海市徐汇区灯光广告管理所",
                                        "HTRL": "0.8",
                                        "YHZT": "2",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-72555",
                                        "JRDMC": "低压供电箱",
                                        "YHMC": "上海市徐汇区灯光广告管理所",
                                        "YDDZ": "上海市徐汇区武康路33号杆对面",
                                        "GDDY": "07",
                                        "YHLX": "03",
                                        "YHLXMC": "低非",
                                        "LXDH": null,
                                        "ZJRL": "0.8",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "上海市徐汇区灯光广告管理所"
                                    },
                                    {
                                        "YHBH": "0060717606",
                                        "LXDZ": "杨浦区三门路1号210室办公室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "上海电信实业(集团)有限公司",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-72555",
                                        "JRDMC": "低压供电箱",
                                        "YHMC": "上海电信实业(集团)有限公司",
                                        "YDDZ": "武康路淮海路东南侧",
                                        "GDDY": "07",
                                        "YHLX": "03",
                                        "YHLXMC": "低非",
                                        "LXDH": "021-62253791",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "上海电信实业(集团)有限公司"
                                    }
                                ]
                            },
                            {
                                "SBID": "FF000000-0000-0036-2000-000000000200-58729",
                                "SBMC": "淮海中路1854号",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID00000028A887A007474581BFEF7754C1965146",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "B分支箱",
                                "id": "淮海中路1854号",
                                "events": null,
                                "children": [
                                    {
                                        "YHBH": "0061116372",
                                        "LXDZ": "上海市徐汇区淮海中路1854号(理发店)",
                                        "DYDJMC": "交流380V（含400V）",
                                        "LXR": "葛永海",
                                        "HTRL": "19.5",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-58729",
                                        "JRDMC": "淮海中路1854号",
                                        "YHMC": "上海徐汇副食品有限公司",
                                        "YDDZ": "淮海中路1854号",
                                        "GDDY": "08",
                                        "YHLX": "03",
                                        "YHLXMC": "低非",
                                        "LXDH": "021-62561620",
                                        "ZJRL": "19.5",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "上海徐汇副食品有限公司"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "SBID": "a368f615488a039c966589ed330165a368cc8140ab",
                "SBMC": "低压10号E分支箱",
                "SBLX": "低压出线开关",
                "SJSBLX": "配电变压器",
                "SJSBLXMC": "配电变压器",
                "SJSBID": "a36892a8598a039c966589ed330165a3686954402b",
                "QDSBLXMC": "配电变压器",
                "GROUPID": null,
                "XH": null,
                "SBLXMC\n": null,
                "QDSBLX": "配电变压器",
                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                "QDSBMC": "武康站2号配变",
                "SJSBMC": "武康站2号配变",
                "id": "低压10号E分支箱",
                "events": null,
                "children": [
                    {
                        "SBID": "SBID000000F01C8205910949D4A0A14786DD9B279E",
                        "SBMC": "E分支箱",
                        "SBLX": "分支箱",
                        "SJSBLX": "低压出线开关",
                        "SJSBLXMC": "低压出线开关",
                        "SJSBID": "a368f615488a039c966589ed330165a368cc8140ab",
                        "QDSBLXMC": "配电变压器",
                        "GROUPID": null,
                        "XH": null,
                        "SBLXMC\n": null,
                        "QDSBLX": "配电变压器",
                        "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                        "QDSBMC": "武康站2号配变",
                        "SJSBMC": "低压10号E分支箱",
                        "id": "E分支箱",
                        "events": null,
                        "children": [
                            {
                                "SBID": "SBID000000090D63DB390F4292AE7E01F91F9BF195",
                                "SBMC": "武康E#2（12487路控箱）",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID000000F01C8205910949D4A0A14786DD9B279E",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "E分支箱",
                                "id": "武康E#2（12487路控箱）",
                                "events": null,
                                "children": [
                                    {
                                        "YHBH": "1381220269",
                                        "LXDZ": "徐家汇路579号5楼",
                                        "DYDJMC": "交流380V（含400V）",
                                        "LXR": "财务室",
                                        "HTRL": "15",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000090D63DB390F4292AE7E01F91F9BF195",
                                        "JRDMC": "武康E#2（12487路控箱）",
                                        "YHMC": "上海市城市综合管理事务中心(上海市地下管线监察事务中心)",
                                        "YDDZ": "上海市徐汇区武康路泰安路交叉口以西(合杆路灯)[12487]",
                                        "GDDY": "08",
                                        "YHLX": "03",
                                        "YHLXMC": "低非",
                                        "LXDH": "53018005",
                                        "ZJRL": "15",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "上海市城市综合管理事务中心(上海市地下管线监察事务中心)"
                                    },
                                    {
                                        "YHBH": "1381217852",
                                        "LXDZ": "徐家汇路579号5楼",
                                        "DYDJMC": "交流380V（含400V）",
                                        "LXR": "财务室",
                                        "HTRL": "15",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000090D63DB390F4292AE7E01F91F9BF195",
                                        "JRDMC": "武康E#2（12487路控箱）",
                                        "YHMC": "上海市城市综合管理事务中心(上海市地下管线监察事务中心)",
                                        "YDDZ": "上海市徐汇区武康路泰安路交叉口以西(合杆监控)",
                                        "GDDY": "08",
                                        "YHLX": "03",
                                        "YHLXMC": "低非",
                                        "LXDH": "53018005",
                                        "ZJRL": "15",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "上海市城市综合管理事务中心(上海市地下管线监察事务中心)"
                                    }
                                ]
                            },
                            {
                                "SBID": "SBID000000FFE8373B8F6E400ABA6B8DE809CBEAAE",
                                "SBMC": "武康E3号（汽车工业备用）",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID000000F01C8205910949D4A0A14786DD9B279E",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "E分支箱",
                                "id": "武康E3号（汽车工业备用）",
                                "events": null,
                                "children": []
                            },
                            {
                                "SBID": "FF000000-0000-0036-2000-000000000200-58711",
                                "SBMC": "淮海中路1818弄8号",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID000000F01C8205910949D4A0A14786DD9B279E",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "E分支箱",
                                "id": "淮海中路1818弄8号",
                                "events": null,
                                "children": [
                                    {
                                        "YHBH": "0121048754",
                                        "LXDZ": "上海市徐汇区淮海中路1818弄8号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "赵石民",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-58711",
                                        "JRDMC": "淮海中路1818弄8号",
                                        "YHMC": "赵石民",
                                        "YDDZ": "淮海中路1818弄8号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64151387",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "赵石民"
                                    },
                                    {
                                        "YHBH": "0122042162",
                                        "LXDZ": " 徐汇区淮海中路1818弄8号2楼",
                                        "DYDJMC": "交流220V",
                                        "LXR": "李杏荣",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-58711",
                                        "JRDMC": "淮海中路1818弄8号",
                                        "YHMC": "李杏荣",
                                        "YDDZ": "淮海中路1818弄8号2楼",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64316505",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "李杏荣"
                                    },
                                    {
                                        "YHBH": "0121917778",
                                        "LXDZ": "上海市徐汇区淮海中路1818弄8号",
                                        "DYDJMC": "交流220V",
                                        "LXR": "俞季华",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-58711",
                                        "JRDMC": "淮海中路1818弄8号",
                                        "YHMC": "俞季华",
                                        "YDDZ": "淮海中路1818弄8号",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64313086",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "俞季华"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "SBID": "a36902084c8a039c966589ed330165a368d86c40bb",
                "SBMC": "低压11号C分支箱",
                "SBLX": "低压出线开关",
                "SJSBLX": "配电变压器",
                "SJSBLXMC": "配电变压器",
                "SJSBID": "a36892a8598a039c966589ed330165a3686954402b",
                "QDSBLXMC": "配电变压器",
                "GROUPID": null,
                "XH": null,
                "SBLXMC\n": null,
                "QDSBLX": "配电变压器",
                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                "QDSBMC": "武康站2号配变",
                "SJSBMC": "武康站2号配变",
                "id": "低压11号C分支箱",
                "events": null,
                "children": [
                    {
                        "SBID": "SBID00000082504C3E998B4D948933BD0595316AB7",
                        "SBMC": "C分支箱",
                        "SBLX": "分支箱",
                        "SJSBLX": "低压出线开关",
                        "SJSBLXMC": "低压出线开关",
                        "SJSBID": "a36902084c8a039c966589ed330165a368d86c40bb",
                        "QDSBLXMC": "配电变压器",
                        "GROUPID": null,
                        "XH": null,
                        "SBLXMC\n": null,
                        "QDSBLX": "配电变压器",
                        "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                        "QDSBMC": "武康站2号配变",
                        "SJSBMC": "低压11号C分支箱",
                        "id": "C分支箱",
                        "events": null,
                        "children": [
                            {
                                "SBID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                "SBMC": "武康C2#（武康435乙）",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID00000082504C3E998B4D948933BD0595316AB7",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "C分支箱",
                                "id": "武康C2#（武康435乙）",
                                "events": null,
                                "children": [
                                    {
                                        "YHBH": "0122024570",
                                        "LXDZ": "上海市徐汇区武康路435号4号车间",
                                        "DYDJMC": "交流220V",
                                        "LXR": "彭德馨",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "彭德馨",
                                        "YDDZ": "武康路435号4号车间",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66581895",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "彭德馨"
                                    },
                                    {
                                        "YHBH": "0060151711",
                                        "LXDZ": "徐汇区武康路435号306室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "肖春兰",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "肖春兰",
                                        "YDDZ": "武康路435号6室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": null,
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "肖春兰"
                                    },
                                    {
                                        "YHBH": "0122016151",
                                        "LXDZ": "上海市徐汇区武康路435号0室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "陆美英",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "陆美英",
                                        "YDDZ": "武康路435号0室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66581856",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "陆美英"
                                    },
                                    {
                                        "YHBH": "0122016150",
                                        "LXDZ": "上海市徐汇区武康路435号1室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "吴友余",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "吴友余",
                                        "YDDZ": "武康路435号1室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": null,
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "吴友余"
                                    },
                                    {
                                        "YHBH": "0122024569",
                                        "LXDZ": "上海市徐汇区武康路435号5室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "武钦成",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "武钦成",
                                        "YDDZ": "武康路435号5室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66109486",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "武钦成"
                                    },
                                    {
                                        "YHBH": "0122016144",
                                        "LXDZ": "上海市徐汇区武康路435号47室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "沈国炎",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "沈国炎",
                                        "YDDZ": "武康路435号47室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66814803",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "沈国炎"
                                    },
                                    {
                                        "YHBH": "0060147807",
                                        "LXDZ": "上海市徐汇区武康路435号8室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "李桂英",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "李桂英",
                                        "YDDZ": "武康路435号8室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64458205",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "李桂英"
                                    },
                                    {
                                        "YHBH": "0121965216",
                                        "LXDZ": "上海市徐汇区武康路435号20室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "张学文",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "张学文",
                                        "YDDZ": "武康路435号20室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66144976",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "张学文"
                                    },
                                    {
                                        "YHBH": "0121902457",
                                        "LXDZ": " 徐汇区武康路435号底楼",
                                        "DYDJMC": "交流220V",
                                        "LXR": "朱杏文",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "朱杏文",
                                        "YDDZ": "武康路435号底楼",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64035425",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "朱杏文"
                                    },
                                    {
                                        "YHBH": "0122022727",
                                        "LXDZ": " 徐汇区武康路435号3室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "丁晔",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "丁晔",
                                        "YDDZ": "武康路435号3室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66230776",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "丁晔"
                                    },
                                    {
                                        "YHBH": "0121917779",
                                        "LXDZ": "上海市徐汇区武康路435号16室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "唐桂宝",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "唐桂宝",
                                        "YDDZ": "武康路435号16室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66814790",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "唐桂宝"
                                    },
                                    {
                                        "YHBH": "0122016145",
                                        "LXDZ": "上海市徐汇区武康路435号48室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "黎文",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "黎文",
                                        "YDDZ": "武康路435号48室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": null,
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "黎文"
                                    },
                                    {
                                        "YHBH": "0122016146",
                                        "LXDZ": "上海市徐汇区武康路435号50室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "黄芹",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "黄芹",
                                        "YDDZ": "武康路435号50室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-54362943",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "黄芹"
                                    },
                                    {
                                        "YHBH": "0122016143",
                                        "LXDZ": "上海市徐汇区武康路435号46室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "杨子弘",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "杨子弘",
                                        "YDDZ": "武康路435号46室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66109265",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "杨子弘"
                                    },
                                    {
                                        "YHBH": "0124064605",
                                        "LXDZ": "上海市徐汇区武康路435号55室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "罗颖元",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "罗颖元",
                                        "YDDZ": "武康路435号55室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66792924",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "罗颖元"
                                    },
                                    {
                                        "YHBH": "0121048783",
                                        "LXDZ": "上海市徐汇区武康路435号51室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "沈光蕾",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "沈光蕾",
                                        "YDDZ": "武康路435号51室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66581323",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "沈光蕾"
                                    },
                                    {
                                        "YHBH": "0121048780",
                                        "LXDZ": "上海市徐汇区武康路435号底层东",
                                        "DYDJMC": "交流220V",
                                        "LXR": "顾龙林",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "顾龙林",
                                        "YDDZ": "武康路435号底层东",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66581310",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "顾龙林"
                                    },
                                    {
                                        "YHBH": "1341639081",
                                        "LXDZ": " 徐汇区武康路435号304室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "沈惠明",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "朱阿伏",
                                        "YDDZ": "上海市徐汇区武康路435号304室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": null,
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "朱阿伏"
                                    },
                                    {
                                        "YHBH": "0122055992",
                                        "LXDZ": "上海市徐汇区武康路435号5室-3楼",
                                        "DYDJMC": "交流220V",
                                        "LXR": "陈琦",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "陈琦",
                                        "YDDZ": "武康路435号5室-3楼",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66581908",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "陈琦"
                                    },
                                    {
                                        "YHBH": "0122055993",
                                        "LXDZ": "上海市徐汇区武康路435号3室-3楼",
                                        "DYDJMC": "交流220V",
                                        "LXR": "徐五妹",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "徐五妹",
                                        "YDDZ": "武康路435号3室-3楼",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64739733",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "徐五妹"
                                    },
                                    {
                                        "YHBH": "0124002857",
                                        "LXDZ": "上海市徐汇区武康路435号45车间",
                                        "DYDJMC": "交流220V",
                                        "LXR": "张伍福",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "张伍福",
                                        "YDDZ": "武康路435号45车间",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-56744733",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "张伍福"
                                    },
                                    {
                                        "YHBH": "0122018749",
                                        "LXDZ": "上海市徐汇区武康路435号2室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "顾风有",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "顾风有",
                                        "YDDZ": "武康路435号2室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66814816",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "顾风有"
                                    },
                                    {
                                        "YHBH": "1198945294",
                                        "LXDZ": "徐汇区武康路435号3楼11室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "沈叶",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "SBID000000B03E57FCA686487BB4AEC7399912B8A0",
                                        "JRDMC": "武康C2#（武康435乙）",
                                        "YHMC": "沈叶",
                                        "YDDZ": "上海市徐汇区武康路435号11室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": null,
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "沈叶"
                                    }
                                ]
                            },
                            {
                                "SBID": "FF000000-0000-0036-2000-000000000200-12387",
                                "SBMC": "武康路435号",
                                "SBLX": "用户接入点",
                                "SJSBLX": "分支箱",
                                "SJSBLXMC": "分支箱",
                                "SJSBID": "SBID00000082504C3E998B4D948933BD0595316AB7",
                                "QDSBLXMC": "配电变压器",
                                "GROUPID": null,
                                "XH": null,
                                "SBLXMC\n": null,
                                "QDSBLX": "配电变压器",
                                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                                "QDSBMC": "武康站2号配变",
                                "SJSBMC": "C分支箱",
                                "id": "武康路435号",
                                "events": null,
                                "children": [
                                    {
                                        "YHBH": "0122016142",
                                        "LXDZ": "上海市徐汇区武康路435号44室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "朱翠珍",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "朱翠珍",
                                        "YDDZ": "武康路435号44室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66269100",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "朱翠珍"
                                    },
                                    {
                                        "YHBH": "0121910786",
                                        "LXDZ": "上海市徐汇区武康路435号15室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "卢智慧",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "卢智慧",
                                        "YDDZ": "武康路435号15室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64739116",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "卢智慧"
                                    },
                                    {
                                        "YHBH": "0121906824",
                                        "LXDZ": "上海市徐汇区武康路435号13室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "诸君赞",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "诸君赞",
                                        "YDDZ": "武康路435号13室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-64337188",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "诸君赞"
                                    },
                                    {
                                        "YHBH": "0122016149",
                                        "LXDZ": " 徐汇区武康路435号12室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "应雅琴",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "应雅琴",
                                        "YDDZ": "武康路435号12室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": null,
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "应雅琴"
                                    },
                                    {
                                        "YHBH": "0122016147",
                                        "LXDZ": "上海市徐汇区武康路435号53室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "张维润",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "张维润",
                                        "YDDZ": "武康路435号53室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66581843",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "张维润"
                                    },
                                    {
                                        "YHBH": "0121048778",
                                        "LXDZ": " 徐汇区武康路435号二层西",
                                        "DYDJMC": "交流220V",
                                        "LXR": "赵锦琳",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "赵锦琳",
                                        "YDDZ": "武康路435号二层西",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66581297",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "赵锦琳"
                                    },
                                    {
                                        "YHBH": "0122016141",
                                        "LXDZ": "上海市徐汇区武康路435号52室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "吴瑞卿",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "吴瑞卿",
                                        "YDDZ": "武康路435号52室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66168051",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "吴瑞卿"
                                    },
                                    {
                                        "YHBH": "0122016148",
                                        "LXDZ": "上海市徐汇区武康路435号54室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "徐恩家",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "徐恩家",
                                        "YDDZ": "武康路435号54室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66238966",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "徐恩家"
                                    },
                                    {
                                        "YHBH": "0060429508",
                                        "LXDZ": "上海市徐汇区武康路435号低层24室车间",
                                        "DYDJMC": "交流220V",
                                        "LXR": "黄富梅",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "潘锡贤",
                                        "YDDZ": "武康路435号低层24室车间",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "64985366",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "潘锡贤"
                                    },
                                    {
                                        "YHBH": "0124075080",
                                        "LXDZ": "上海市徐汇区武康路435号7室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "田厚状",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "田厚状",
                                        "YDDZ": "武康路435号7室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": null,
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "田厚状"
                                    },
                                    {
                                        "YHBH": "0121048781",
                                        "LXDZ": "上海市徐汇区武康路435号18室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "赵国宝",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "赵国宝",
                                        "YDDZ": "武康路435号18室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66224835",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "赵国宝"
                                    },
                                    {
                                        "YHBH": "0121949460",
                                        "LXDZ": " 徐汇区武康路435号14室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "胡昆洪",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "胡昆洪",
                                        "YDDZ": "武康路435号14室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66088881",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "胡昆洪"
                                    },
                                    {
                                        "YHBH": "0060585921",
                                        "LXDZ": "上海市徐汇区武康路435号17号车间",
                                        "DYDJMC": "交流220V",
                                        "LXR": "蒋文英",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "蒋文英",
                                        "YDDZ": "武康路435号17号车间",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-54652615",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "蒋文英"
                                    },
                                    {
                                        "YHBH": "0122016152",
                                        "LXDZ": " 徐汇区武康路435号11室",
                                        "DYDJMC": "交流220V",
                                        "LXR": "吴竹燕",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "吴竹燕",
                                        "YDDZ": "武康路435号11室",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66255502",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "吴竹燕"
                                    },
                                    {
                                        "YHBH": "0060124093",
                                        "LXDZ": "上海市徐汇区武康路435号19车间",
                                        "DYDJMC": "交流220V",
                                        "LXR": "赵国宝",
                                        "HTRL": "3",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "赵国宝",
                                        "YDDZ": "武康路435号19车间",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66814738",
                                        "ZJRL": "3",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "赵国宝"
                                    },
                                    {
                                        "YHBH": "0123006689",
                                        "LXDZ": "上海市徐汇区武康路435号底楼13号车间",
                                        "DYDJMC": "交流220V",
                                        "LXR": "施红生",
                                        "HTRL": "2",
                                        "YHZT": "0",
                                        "JRDID": "FF000000-0000-0036-2000-000000000200-12387",
                                        "JRDMC": "武康路435号",
                                        "YHMC": "施红生",
                                        "YDDZ": "武康路435号底楼13号车间",
                                        "GDDY": "07",
                                        "YHLX": "04",
                                        "YHLXMC": "居民",
                                        "LXDH": "021-66581934",
                                        "ZJRL": "2",
                                        "DYSM": "1",
                                        "GDDW": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05",
                                        "id": "施红生"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "SBID": "a3690cb6068a039c966589ed330165a368e31440c7",
                "SBMC": "低压12号武康路393号乙",
                "SBLX": "低压出线开关",
                "SJSBLX": "配电变压器",
                "SJSBLXMC": "配电变压器",
                "SJSBID": "a36892a8598a039c966589ed330165a3686954402b",
                "QDSBLXMC": "配电变压器",
                "GROUPID": null,
                "XH": null,
                "SBLXMC\n": null,
                "QDSBLX": "配电变压器",
                "QDSBID": "a36892a8598a039c966589ed330165a3686954402b",
                "QDSBMC": "武康站2号配变",
                "SJSBMC": "武康站2号配变",
                "id": "低压12号武康路393号乙",
                "events": null
            }
        ],
        "SBLXMC": "配电变压器",
        "SJSBID": "-1",
        "id": "武康站2号配变",
        "QDSBLXMC": "配电变压器",
        "SBID": "a36892a8598a039c966589ed330165a3686954402b",
        "events": {
            "停电告警": {
                "devId": 10,
                "measType": 14002,
                "measTypeStr": "停电告警",
                "dataTime": "2019-10-29 20:08:45",
                "almType": 1,
                "val": 1.0,
                "sbid": "a36892a8598a039c966589ed330165a3686954402b"
            }
        }*/
      },
      maxData:[],
      defectWeekOption: {
        legend: {
          data: ["负荷曲线", ]
        },
        xAxis: {
          nameTextStyle: {
          fontSize: 20,
          },
          name: "时刻",
          data: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96",]
        },
        yAxis: {
          name: "负荷曲线",
          splitLine: {
            show: false
          },
        },
        yAxis: {
          name: "负荷曲线",
          nameTextStyle: {
            fontSize: 20,
            padding: [0, 0, 30, 0],
          },
          type: 'value',
          nameLocation :'center',
          nameRotate:90,
          splitLine: {
            lineStyle: {
              color: "#E4E4E4",
            }
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [{
          startValue: '2014-06-01'
        },{
          type: 'inside'
        }],
        series: [{
            name: '负荷曲线',
            symbol: 'none',
            smooth: true,
            type: 'line',
            symbolSize: 1,
            data: ["126","120","111","150","166","126","136","176","136","176","126","90","111","150","166","126","136","176","136","176","126","120","111","150","166","126","80","176","136","176","126","120","70","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126","136","176","136","176","126","120","111","150","166","126"],
            itemStyle: {
              normal: {
                color: "#f55a36"
              }
            }
          },
        ]
      },
    };

  },
  mounted() {
    this.getLocationData();
    this.list();
  },

  computed:{

  },
  methods: {
    getGchartData(data){
      let datas=[];
      for(let i=0;i<data.length;i++){
        let sj={};
        sj.shape='image';
        if(data[i].SBID)
        {
          sj.id=data[i].SBID;
        }else
        {
          sj.id=data[i].YHBH;
        }
        if(data[i].SBMC)
        {
          sj.label=data[i].SBMC;
        }else
        {
          sj.label=data[i].YHMC;
        }
        let type;
        let events;
        if(data[i].events)
        {
          events=true;
          sj.events=data[i].events;
          sj.style={
            fill: '#f00',
            fontSize:20,
          };
        }else
        {
          events=false;
          sj.events='';
          sj.style={
            fill: '#3385ff',
            fontSize:20,
          };
        }
        if(data[i].SBLX)
        {
          type=this.getType(data[i].SBLX,events);
          sj.img=type.img;
          sj.size=type.size;
          sj.collapsed=type.collapsed;
        }else
        {
          type=this.getType(-1,events);
          sj.img=type.img;
          sj.size=type.size;
          sj.collapsed=type.collapsed;
        }
        if(data[i].children)
        {
          sj.children=this.getGchartData(data[i].children);
        }
        datas.push(sj);
      };
      return datas;
    },
    getType(data,type){
      if(type)
      {
        switch(data){
          case "配电变压器":
            return {
              img:this.images[0].p,
              size:100,
            }
          case "低压出线开关":
            return {
              img:this.images[1].p,
              size:80,
            }
          case "分支箱":
            return {
              img:this.images[2].p,
              size:60,
            }
          case "用户接入点":  
            return {
              img:this.images[3].p,
              size:40,
              collapsed:true,
            }
          default:    //用户
            return {
              img:this.images[4].p,
              size:20,
              collapsed:true,
            }
        }
      }else
      {
        switch(data){
          case "配电变压器":
            return {
              img:this.images[0].n,
              size:100,
            }
          case "低压出线开关":
            return {
              img:this.images[1].n,
              size:80,
            }
          case "分支箱":
            return {
              img:this.images[2].n,
              size:60,
            }
          case "用户接入点":  
            return {
              img:this.images[3].n,
              size:40,
              collapsed:true,
            }
          default:    //用户
            return {
              img:this.images[4].n,
              size:20,
              collapsed:true,
            }  
        }
      }
    },
    intiData(data){
      let gChartsData={};
      gChartsData.id=data.SBID;
      gChartsData.label=data.SBMC;
      let type;
      if(data.events)
      {
        type=this.getType(data.QDSBLX,true);
        gChartsData.style={
          fontSize:20,
          fill:"#f00"
        };
      }else
      {
        type=this.getType(data.QDSBLX,false);
        gChartsData.style={
          fontSize:20,
          fill:"#3385ff"
        };
      }
      gChartsData.img=type.img;
      gChartsData.size=type.size;
      gChartsData.events=data.events;
      
      gChartsData.shape='image';
      gChartsData.top=true;
      gChartsData.children=this.getGchartData(data.children);
      this.gChartsData=gChartsData;
    },
    getycData(sbid){
      getSSGJData(sbid).then(res => {
        if (res.code === 0) {
          this.ycData = res.data.list;
          this.intiData(this.gChartsData);
          this.showDialog=true;
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
      })
    },
    showDialogs(sbid){
      let postData={
        SBID:sbid
      }
      getHBGXSBXQata(postData).then(res => {
        if (res.code === 0) {
          this.FHQXName=res.data.SBMC;
          this.gChartsData = res.data;
          this.getycData(postData);
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
        console.log(err);
        this.$message.error(err);
      })
    },
    back(){
      window.location.href="statistic.html"
    },
    /*
    getSBID(data){
      this.sbid=data.SBID;
      this.FHQXName=data.SBMC;
      console.log('设备id:' + this.sbid)
    },*/
     handleSizeChange(index){
      if(this.total<=this.pageSize)
      {
        this.tableData=this.maxData;
        this.currentPage=1;
      }else if(this.total<this.pageSize*index)
      {
        let data=[];
        for (let i=this.pageSize*(index-1);i<this.total.length-this.pageSize*(index-1);i++)
        {
          data.push(this.maxData[i])
        }
        this.tableData=data;
        this.index=1;
      }else
      {
        let data=[];
        for (let i=this.pageSize*(index-1);i<this.pageSize*index;i++)
        {
          data.push(this.maxData[i])
        }
        this.tableData=data;
        this.index=1;
      }
    },
    getLocationData(){
      let datas=location.href.split("?");
      if(datas.length<=1)
      {
        return false
      }else
      {
        datas=datas[1].split("&");
        for(let i=0;i<datas.length;i++)
        {
          this.postData[datas[i].split("=")[0]]=datas[i].split("=")[1]
        }
        return true
      }
    },
    list() {
       getFZMXData(this.postData).then(res => {
          if (res.result_code === 0) {
            this.maxData = res.data;
            this.total=this.maxData.length;
            this.handleSizeChange(1);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err);
        })
    },
  }
};
</script>

<style scoped lang="scss">
.details {
  width: 100%;
  height: 100%;
  padding: 10px 0 10px 10px;
  box-sizing: border-box;
  margin-top: -10px;

}
.equipment_title
{
  width:100%;
  height:40px;
  line-height:40px;
  text-indent:20px;
  background-color: #0dc7e3;
  color:#fff;
  font-size:20px;
  float:left;
}
.equipment_name {
    width:100%;
    height:calc(100% - 40px);
    float: left;
    ul{
      padding:0;
      margin:0;
      list-style: none;
      border-bottom:1px #666 solid;
      float: left;
      width: 100%;
      li{
        list-style: none;
        width:100%;
        float:left;
      }
    }
    span.title {
      font-size: 16px;
      color: #333333;
    }
    span{
      font-size: 16px;
      color: #27b7bb;
    }
  }
.demo-form-inline {
  text-align: left;
  border: 1px solid #cccccc;
  padding: 0 10px;
  padding-top: 8px;
  border-radius: 5px;
  height: 120px;
  box-sizing: border-box;
}
.button_right {
  text-align: right;
  padding-right: 30px;
  span {
    padding: 10px 10px;
    cursor: pointer;
  }
  span:nth-child(1) {
    background-color: #2e414f;
    margin-right: 10px;
    color: #ffffff;
    border-radius: 5px;
  }
  span:nth-child(2) {
    background-color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }
}
.table_content {
  height: calc(100% - 150px);
  width: 100%;
  border: 1px solid #cccccc;
  margin-top: 18px;
  border-radius: 5px;
  position: relative;
  padding: 14px;
  box-sizing: border-box;
  .details {
    position: absolute;
    left: 15px;
    top: -9px;
    font-size: 14px;
    color: #333333;
    text-align: left;
    background-color: #fff;
    width: 52px;
    height: 12px;
    text-align: center;
  }
  .table_content_top {
    text-align: left;
    height: 29px;
    width: 100%;
    margin-top: 15px;
    span {
      padding: 7px 10px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      width: 90px;
      height: 29px;
      border: 1px solid rgba(228, 228, 228, 1);
      border-radius: 4px;
      margin-right: 20px;
      cursor: pointer;
      img {
        vertical-align: bottom;
      }
    }
  }
  .table {
    margin-top: 15px;
    height: calc(100% - 100px);
    .el-pagination{
      text-align: right;
      margin-top: 10px;
    }
    p {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      text-align: left;
    }
  }
}
/deep/.table .el-table td,
.el-table th {
  text-align: center;
}
/deep/.table .el-table th > .cell {
  text-align: center;
}
/deep/#same_month .el-dialog{
    width: 100%;
    height: 100%;
    margin: 0 !important;
}
/deep/#same_month.el-dialog__wrapper
{
    padding: 50px ;
    box-sizing: border-box;
}
/deep/#same_month .el-dialog__header {
  text-align: left;
  background-color: #0888a5;
  padding: 15px 20px 15px;
}
/deep/#same_month .el-dialog__title {
  color: #ffffff;
}
/deep/#same_month .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}
/deep/#same_month .el-dialog__body {
  width: 100%;
  height: calc(100% - 54px);
  padding: 10px;
  box-sizing: border-box;
}
/deep/.table .el-table__body tr.current-row>td{
    background-color: #F5F5F5!important;
  }
.equipment {
  width: 360px;
  height: 100%;
  float:left;
  .equipment_name {
    overflow:hidden;
    overflow-y:auto;
    padding:0 10px;
    box-sizing: border-box;
    line-height: 30px;
    float: left;

    span:nth-child(1) {
      font-weight: bold;
      font-size: 16px;
      color: #333333;
    }
    span:nth-child(2) {
      font-weight: bold;
      font-size: 16px;
      color: #27b7bb;
    }
  }
  .equipment_right {
    float: right;

    font-size: 14px;
    color: #666666;
  }
}
.locure {
  height: 100%;
  width: calc(100% - 360px);
  box-sizing: border-box;
  float:left;
  .locure_charts {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #dadada;
  }
}
.curve_ {
  width: 100%;
  height: 620px;
  box-sizing: border-box;
  padding: 0 20px;
  padding-bottom: 20px;
  .curve_left {
    width: 48.7%;
    height: 500px;
    border: 1px solid #dadada;
    float: right;
    margin-left: 20px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .curve_right {
    width: 48.7%;
    height: 500px;
    border: 1px solid #dadada;
    float: right;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .cure_top {
    border-left: 4px solid #27b7bb;
    text-align: left;
    color: #333333;
    font-size: 16px;
    font-weight: 400;
    margin-top: 28px;
    font-family: Microsoft YaHei;
  }
  /deep/.el-form-item {
    margin-bottom: 18px;
  }
}

</style>

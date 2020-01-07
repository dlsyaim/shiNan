// let baseUrl = "http://10.131.216.134:56890";
// let baseUrl = "http://10.131.216.134:7889";
let hostUrl = window.location.protocol + "//" + window.location.host;

//欣能接口地址
let appDomain = "/zdgdfwbz";
let ctx = hostUrl + appDomain;
let interfacePath = ctx + "/interface";
let snInterface = hostUrl + '/shiNanApi/interface';
//欣能用户采集接口地址
let ycAppDomain = "/edc-citycore-service";
let ycCtx = hostUrl + ycAppDomain;
let ycInterfacePath = ycCtx + "/interface";

//自建接口地址
let selfAppDomain = "/shiNanApi";
let selfCtx = hostUrl + selfAppDomain;
let selfInterfacePath = selfCtx + "/interface";

//欣能用户采集idp接口地址
let idpAppDomain = "/zdgdfwbz";
let idpCtx = hostUrl + idpAppDomain;
let idpInterfacePath = idpCtx + "/idpqry";

// 接口路径
const apiPath = {
  /**电气设备*/
  //站点设备：总数、总容量
  "SN_BDZTJ": interfacePath + "/SN_BDZTJ/0",
  //站点设备：详情
  "SN_BDZMX": interfacePath + "/SN_BDZMX/0",
  //站点设备：柱状图表 数量数据
  "SN_DZLBTJ": snInterface + "/SN_DZLBTJ/0",
  //站点设备：柱状图表 容量数据
  "SN_BZRLTJ": snInterface + "/SN_BZRLTJ/0",
  //站点设备：饼图图表 数据
  "SN_BDZNXTJ": snInterface + "/SN_BDZNXTJ/0",
  //站点设备：4个单元格 容量
  "SN_BDZRLTJ": snInterface + "/SN_BDZRLTJ/0",
  //配电变压器：柱上变压器,箱式变压器,站点 总数 数量
  "SN_PDBYQSLTJ": interfacePath + "/SN_PDBYQSLTJ/0",
  //配电变压器：柱上变压器详情
  "SN_ZSBYQMX": interfacePath + "/SN_ZSBYQMX/0",
  //配电变压器: LX 1 箱式变压器 LX 2 站房变压器  详情
  "SN_PDBYQMX": interfacePath + "/SN_PDBYQMX/0",
  //配电变压器：柱上变压器 图表
  "SN_ZSBYQTJ": interfacePath + "/SN_ZSBYQTJ/0",
  //配电变压器：箱式变压器 图表
  "SN_PDBYQTJ": interfacePath + "/SN_PDBYQTJ/0",
  //配电变压器：饼图 图表
  "SN_BYQNXTJ": interfacePath + "/SN_BYQNXTJ/0",
  //线路：图表
  "SN_XLBZTJ": interfacePath + "/SN_XLBZTJ/0",
  "SN_DYXLBZTJ": interfacePath + "/SN_DYXLBZTJ/0",
  //线路：图表详情
  "SN_XLMX": interfacePath + "/SN_XLMX/0",
  //线路：饼图
  "SN_XLNXTJ": interfacePath + "/SN_XLNXTJ/0",
  //站点设备 配电变压器 线路 分支箱与用户：用户
  "SN_YHFLTJ": snInterface + "/SN_YHFLTJ/0",
  //分支箱与用户：用户表箱
  "MEAS_BOX_STAT": ycInterfacePath + "/meas_box_stat",
  //分支箱与用户：用户表箱 详情
  "MEAS_BOX_DET": ycInterfacePath + "/meas_box_det",
  "SN_YHBX": ycInterfacePath + "/meter_stat",
  // "SN_YHBX": "http://10.130.21.78:18080/edc-citycore-service/meas_box_stat",


  /**设备监控*/
  //配变终端
  "pbzd_general": selfInterfacePath +"/pbzd/general",
  //配变终端 异常详情
  "pbzd_devDetail_error": selfInterfacePath +"/pbzd/devDetail/1",
  "pbzd_devDetail_dataDetail": selfInterfacePath +"/pbzd/dataDetail",
  //配变终端 总数详情
  "pbzd_devDetail": selfInterfacePath +"/pbzd/devDetail",
  //低压监测
  "dyjc_general": selfInterfacePath +"/dyjc/general",
  //低压监测 异常详情
  "dyjc_general_error": selfInterfacePath +"/dyjc/devDetail/1",
  "dyjc_general_dataDetail": selfInterfacePath +"/dyjc/dataDetail",
  //低压监测 总数详情
  "dyjc_devDetail": selfInterfacePath +"/dyjc/devDetail/",
  //分支箱
  "fzxjc_general": selfInterfacePath +"/fzxjc/general",
  "fzxjc_general_error": selfInterfacePath +"/fzxjc/devDetail/1",
  "fzxjc_general_dataDetail": selfInterfacePath +"/fzxjc/dataDetail",
  //分支箱 总数详情
  "fzxjc_devDetail": selfInterfacePath +"/fzxjc/devDetail",
  //台区总表 统计
  "SN_TQZBTJ": interfacePath + "/SN_TQZBTJ/0",
  //台区总表 装置采集情况统计实际监测数
  "SN_ZZCJSJTJ": interfacePath + "/SN_ZZCJSJTJ/0",
  //台区总表 装置采集情况统计-可监测数
  "SN_ZZCJKJCTJ": snInterface + "/SN_ZZCJKJCTJ/0",
  //台区总表 台区采集情况-日统计
  "SN_TQCJRTJ": interfacePath + "/SN_TQCJRTJ/0",
  //台区总表 台区采集情况-月统计
  "SN_TQCJYTJ": interfacePath + "/SN_TQCJYTJ/0",
  //智能电表 智能电表
  "METER_STAT": ycInterfacePath + "/meter_stat",
  //智能电表 智能电表 详情
  "METER_STAT_DET": ycInterfacePath + "/meter_det",

  //HPLC采集的户变关系
  "tg_cons_det": ycInterfacePath + "/tg_cons_det",

  /**负载情况*/
  // 负载月统计
  "SN_FZYTJ": interfacePath + "/SN_FZYTJ/0",
  //负载率
  "SN_PJFZLBZTJ": interfacePath + "/SN_PJFZLBZTJ/0",
  //轻载
  "SN_QZTJ": interfacePath + "/SN_QZTJ/0",
  //重载
  "SN_ZZTJ": interfacePath + "/SN_ZZTJ/0",
  //过载
  "SN_GZTJ": interfacePath + "/SN_GZTJ/0",

  // 电压质量
  //电压合格率
  /*
  "BDZT_GETGDDYHGL": interfacePath + "/BDZT_GETGDDYHGL/0",
  */
   // 低电压柱状图
  "SN_DDYTJ": interfacePath + "/SN_DDYTJ/0",
  //过电压柱状图
  "SN_GDYTJ":interfacePath + "/SN_GDYTJ/0",
  // 杆配占比-统计
  "SN_GPBTJ":interfacePath + "/SN_GPBTJ/0",

  // 三项均衡
   //三项不均衡
   "SN_SXBPHTJ": interfacePath + "/SN_SXBPHTJ/0",
  //  三项均衡重点监控杆配占比
 


  // 功率因素
  // 功率因素
  "SN_GLTJ":interfacePath + "/SN_GLTJ/0",

  //负载明细-日
  "SN_FZMX" : interfacePath + "/SN_FZMX/0",
  //负载明细-月
  "r_n_trans_err_data_m30" : interfacePath + "/xn_ts_site/0",

  //负载明细-负载曲线
  "FZMX_FZQX" : hostUrl + "/zdgdfwbz/idpqry/SBID/HIS/",


  // 线损
  //线损情况
  "TG_LINELOSS_STAT": ycInterfacePath + "/tg_lineloss_stat",

  // 线损
  //负荷曲线
  "IDP_QUERY": idpInterfacePath,



  // 异常处理
  // 异常处理过电压
  "SN_GDYTJ" : interfacePath + "/SN_GDYTJ/0",
  // 重载
  "SN_ZZTJ" : interfacePath + "/SN_ZZTJ/0",
  // 异常事件
  "abnormal": selfInterfacePath + "/abnormal/taiqu/statistics",
  // PMS故障统计
  "SN_GZQXTJ_LY" : interfacePath + "/SN_GZQXTJ_LY/0",
  //报修统计
  "SN_GZQX_QXDMX": interfacePath + '/SN_GZQX_QXDMX/0',
  //停电计划指导
  "SN_JHTJ_TDTZDMX": interfacePath + '/SN_JHTJ_TDTZDMX/0',
  "SN_JHTD_YXYHTJ": interfacePath + '/SN_JHTD_YXYHTJ/0',
  "SN_JHTD_YXYHMX": interfacePath + '/SN_JHTD_YXYHMX/0',

  "powoff_event_stat": ycInterfacePath + "/powoff_event_stat",
  "powoff_event_det": ycInterfacePath + "/powoff_event_det",
  "powoff_event_pms": interfacePath + "/SN_GZQXTJ_LYMX/0",//PMS故障详情
  "gongDanCount": selfInterfacePath + "/zdqx/gongDanCount",
  "GDMX_TQJC": selfInterfacePath + "/zdqx/GDMX/TQJC",
  "GDMX_ZBYC": selfInterfacePath + "/zdqx/GDMX/ZBYC",
  "GDMX_YCGD": selfInterfacePath + "/zdqx/GDMX/YCGD",
  /** 辅助决策*/
  //巡检方案 最高优先级巡检 总数
  "XJFASL": selfInterfacePath + "/zdqx/XJFASL",
  //巡检方案 最高优先级巡检 总数
  "ZGYXJXJ": selfInterfacePath + "/zdqx/ZGYXJXJ",
  //巡检方案 功率因素
  "SN_GLTJ": interfacePath+"/SN_GLTJ/0",
  //巡检方案 日统计明细
  "SN_FZMX": interfacePath+"/SN_FZMX/0",
  //巡检方案 故障频繁台区巡检方案  频繁台区巡检 个数
  "SN_GZQX_PFGZSBTJ": interfacePath+"/SN_GZQX_PFGZSBTJ/0",
  //巡检方案 故障频繁台区巡检方案  频繁台区巡检 明细
  "SN_GZQX_PFGZSBMX": interfacePath+"/SN_GZQX_PFGZSBMX/0",
  //巡检方案 周期巡检工单  台区周期巡检 个数
  "SN_ZQXJ_WXJTQTJ": interfacePath+"/SN_ZQXJ_WXJTQTJ/0",
  //巡检方案 周期巡检工单  台区周期巡检 明细
  "SN_ZQXJ_WXJTQMX": interfacePath+"/SN_ZQXJ_WXJTQMX/0",
  //巡检方案 巡视记录
  "SN_XSJLCX_TQID": interfacePath+"/SN_XSJLCX_TQID/0",


  "SN_GZQXTJ_LYMX":ycInterfacePath + "/SN_GZQXTJ_LYMX",

  // 户变关系-设备详情
  "SN_HBGX": snInterface + "/huBian/HBGX",
  // 户变关系-实时告警
  "SN_SSGJ": snInterface + "/huBian/GZMX",
}


export default apiPath;

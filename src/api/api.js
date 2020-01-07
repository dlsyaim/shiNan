import request from '@/utils/request'
import apiPath from './apiPath'
import moment from "moment"

const shortSSGS = "SP05";
const fullSSGS = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFSP05";
const ycOrgNo = 31402;

// 登录
export function requestLogin(params) {
    return request({
        url: '/login',
        method: 'post',
        params: params
    })
    
}
//根据条件过滤数据
export function filterArray(datas,configs,params){
    return datas.filter(function(item,index,arr){
        let flag=true;
        configs.forEach(function(config,confi,configs){
          let value=item[config.field];
          let param=params[config.field];
          if(param === null || undefined === param || param === ''){
            return
          }
          if(config.type === '='){
              flag=flag&&value===param;
          }else if(config.type === 'like'){
              flag=flag&&value.indexOf(param)!=-1;
          }
        })
        return flag;
    });
  }
// 获取菜单列表
export function getMenuData(params) {
    return request({
        url: '/menu',
        method: 'get',
        params: params
    })
}

// 监控设备
export function getWatchEquipChartsData(params) {
    return request({
        url: '/watchEquipChartsData',
        method: 'get',
        params: params
    })
}

// 以下接口临时需要展示不同数据，正常环境中 一个接口不同参数不同返回即可
// 监控设备-配变终端
export function getDataByPBZD(params) {
    return request({
        url: '/getDataByPBZD',
        method: 'get',
        params: params
    })
}
// 监控设备-台区总表
export function getDataByTQZB(params) {
    return request({
        url: '/getDataByTQZB',
        method: 'get',
        params: params
    })
}
// 监控设备-低压监测
export function getDataByDYJC(params) {
    return request({
        url: '/getDataByDYJC',
        method: 'get',
        params: params
    })
}
// 监控设备-分支箱监测
export function getDataByFZXJC(params) {
    return request({
        url: '/getDataByFZXJC',
        method: 'get',
        params: params
    })
}
// 监控设备-智能电表
export function getDataByZNDB(params) {
    return request({
        url: '/getDataByZNDB',
        method: 'get',
        params: params
    })
}
//智能运维-功率因素-功率因素
export function getPowerFactorData(params) {
    return request({
        url: '/getPowerFactorData',
        method: 'get',
        params: params
    })
}
//智能运维-功率因素-重点监控
export function getPowerKeyMonitorData(params) {
    return request({
        url: '/getPowerKeyMonitorData',
        method: 'get',
        params: params
    })
}
//智能运维-功率因素-详情列表
export function getPowerListData(params) {
    return request({
        url: '/getPowerListData',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-平均负载率-时间
export function getAverageCurrentDate(params) {
    return request({
        url: '/getAverageCurrentDate',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-平均负载率-显示信息
export function getAverageDisplayList(params) {
    return request({
        url: '/getAverageDisplayList',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-平均负载率-echarts数据
export function getAverageTodayData(params) {
    return request({
        url: '/getAverageTodayData',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-轻载-时间
export function getLightCurrentDate(params) {
    return request({
        url: '/getLightCurrentDate',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-轻载-显示信息
export function getLightDisplayList(params) {
    return request({
        url: '/getLightDisplayList',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-轻载-当月显示信息
export function getLightDisplayMonthList(params) {
    return request({
        url: '/getLightDisplayMonthList',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-轻载-当日echarts数据
export function getLightTodayData(params) {
    return request({
        url: '/getLightTodayData',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-轻载-当月echarts数据
export function getLightMonthData(params) {
    return request({
        url: '/getLightMonthData',
        method: 'get',
        params: params
    })
}


// 智能运维-负载情况-过载-时间
export function getOverCurrentDate(params) {
    return request({
        url: '/getOverCurrentDate',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-过载-显示信息
export function getOverDisplayList(params) {
    return request({
        url: '/getOverDisplayList',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-过载-当月显示信息
export function getOverDisplayMonthList(params) {
    return request({
        url: '/getOverDisplayMonthList',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-过载-当日echarts数据
export function getOverTodayData(params) {
    return request({
        url: '/getOverTodayData',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-过载-当月echarts数据
export function getOverMonthData(params) {
    return request({
        url: '/getOverMonthData',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-重载-时间
export function getHeavyCurrentDate(params) {
    return request({
        url: '/getHeavyCurrentDate',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-重载-显示信息
export function getHeavyDisplayList(params) {
    return request({
        url: '/getHeavyDisplayList',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-重载-当月显示信息
export function getHeavyDisplayMonthList(params) {
    return request({
        url: '/getHeavyDisplayMonthList',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-重载-当日echarts数据
export function getHeavyTodayData(params) {
    return request({
        url: '/getHeavyTodayData',
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-重载-当月echarts数据
export function getHeavyMonthData(params) {
    return request({
        url: '/getHeavyMonthData',
        method: 'get',
        params: params
    })
}


//功率因素
export function setPowerTodayData(args) {
    let params = { "SSGS": "SP05", "RQ": 1 };
    if (args) {
        params["RQ"] = args;
    }
    return request({
        url: apiPath.SN_GLTJ,
        method: 'get',
        params: params
    })
}

//功率因素杆配占比
export function setPowerPieTodayData(args) {
    let params = { "SSGS": "SP05", "RQ": 1 };
    if (args) {
        params["RQ"] = args;
    }
    return request({
        url: apiPath.SN_GPBTJ,
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-平均负载率模块数据
export function getAveragrModuleData(args) {
    let params = {"SSGS": "SP05","RQ": 1};
    if(args){
        params["RQ"] = args;
    }
    return request({
        url: apiPath.SN_PJFZLBZTJ,
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-轻载模块数据
export function getLightModuleDayData(args) {
    let params = {"SSGS": "SP05","RQ": 1};
    if(args){
        params["RQ"] = args;
    }
    return request({
        url: apiPath.SN_QZTJ,
        method: 'get',
        params: params
    })
}


// 智能运维-负载情况-重载模块数据
export function getHeavyModuleDayData(args) {
    let params = {"SSGS": "SP05","RQ": 1};
    if(args){
        params["RQ"] = args;
    }
    return request({
        url: apiPath.SN_ZZTJ,
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-重载模块每月数据
export function getHeavyModuleMonthData(args) {
    let params = {"SSGS": "SP05","LX": 3};
    if(args){
        params["KSSJ"] = args;
        params["JSSJ"] = args;
    }
    return request({
        url: apiPath.SN_FZYTJ,
        method: 'get',
        params: params
    })
}


// 智能运维-负载情况-过载模块每天数据
export function getOverModuleDayData(args) {
    let params = {"SSGS": "SP05","RQ": 1};
    if(args){
        params["RQ"] = args;
    }
    return request({
        url: apiPath.SN_GZTJ,
        method: 'get',
        params: params
    })
}

// 智能运维-负载情况-过载模块每月数据
export function getOverModuleMonthData(args) {
    let params = { "SSGS": "SP05", "LX": 2 };
    if (args) {
        params["KSSJ"] = args;
        params["JSSJ"] = args;
    }
    return request({
        url: apiPath.SN_FZYTJ,
        method: 'get',
        params: params
    })
}
/*
//电压质量-电压合格率-分类环形图
export function getVoltageModuleData(args) {
    let {
        SSGS , VOLTTYPE
    } = Object.assign({
        SSGS : fullSSGS ,
        VOLTTYPE : 1
    } , args || {});

    let params = {SSGS ,VOLTTYPE};

    return request({
        url: apiPath.BDZT_GETGDDYHGL,
        method: 'get',
        params: params
    })
}
*/

//电压质量-低电压柱图
export function getLowVoltageModuleTodayData(args) {
    let {
        SSGS , RQ
    } = Object.assign({
        SSGS : shortSSGS ,
        RQ : 1
    } , args || {});

    let params = {SSGS ,RQ};

    return request({
        url: apiPath.SN_DDYTJ,
        method: 'get',
        params: params
    })
}

//电压质量-杆配占比
export function getLowVoltageModuleRateData(args) {
    let {
        SSGS , RQ
    } = Object.assign({
        SSGS : shortSSGS ,
        RQ : 1
    } , args || {});

    let params = {SSGS ,RQ};

    return request({
        url: apiPath.SN_GPBTJ,
        method: 'get',
        params: params
    })
}

//电压质量-过电压柱图
export function getOverVoltageModuleTodayData(args) {
    let {
        SSGS , RQ
    } = Object.assign({
        SSGS : shortSSGS ,
        RQ : 1
    } , args || {});

    let params = {SSGS ,RQ};

    return request({
        url: apiPath.SN_GDYTJ,
        method: 'get',
        params: params
    })
}

//过电压质量-杆配占比
export function getOverVoltageModuleRateData(args) {
    let {
        SSGS , RQ
    } = Object.assign({
        SSGS : shortSSGS ,
        RQ : 1
    } , args || {});

    let params = {SSGS ,RQ};

    return request({
        url: apiPath.SN_GPBTJ,
        method: 'get',
        params: params
    })
}


//功率因素-与重点监控柱图
export function getPowerModuleTodayData(args) {
    let {
        SSGS , RQ
    } = Object.assign({
        SSGS : shortSSGS ,
        RQ : 1
    } , args || {});

    let params = {SSGS ,RQ};

    return request({
        url: apiPath.SN_GLTJ,
        method: 'get',
        params: params
    })
}

//功率因素-与重点监控杆配占比
export function getPowerModuleRateData(args) {
    let {
        SSGS , RQ
    } = Object.assign({
        SSGS : shortSSGS ,
        RQ : 1
    } , args || {});

    let params = {SSGS ,RQ};

    return request({
        url: apiPath.SN_GPBTJ,
        method: 'get',
        params: params
    })
}
// 三项不平衡重点监控杆配占比
export function getSXBPHGPData(params) {
    return request({
        url: apiPath.SN_GPBTJ,
        method: 'get',
        params: params
    })
}

//三相不平衡-与重点监控柱图
export function getNotPhaseModuleTodayData(args) {
    let {
        SSGS , RQ
    } = Object.assign({
        SSGS : shortSSGS ,
        RQ : 1
    } , args || {});

    let params = {SSGS ,RQ};

    return request({
        url: apiPath.SN_SXBPHTJ,
        method: 'get',
        params: params
    })
}

//三相不平衡杆配占比
export function getNotPhaseModuleRateData(args) {
    let {
        SSGS , RQ
    } = Object.assign({
        SSGS : shortSSGS ,
        RQ : 1
    } , args || {});

    let params = {SSGS ,RQ};

    return request({
        url: apiPath.SN_GPBTJ,
        method: 'get',
        params: params
    })
}



//线损
export function getDamageModuleData(args) {
    let {
        org_no ,data_type, data_beg_date, data_end_date
    } = Object.assign({
        org_no : ycOrgNo ,
        data_type : 1 ,
        data_beg_date: '2019-08-02',
        data_end_date: '2019-09-03'
    } , args || {});

    let params = {org_no ,data_type, data_beg_date, data_end_date};

    return request({
        url: apiPath.TG_LINELOSS_STAT,
        method: 'get',
        params: params
    })
}



/**
 * 获取三相不平衡按日统计信息，原始接口封装
 * @param {Object} args
 * @param {String} args.SSGS - 所属公司编号
 * @param {String} args.RQ - 日期
 */
export function _getPhaseDayliStaticsData(args) {
    let {
        SSGS,
        RQ
    } = Object.assign({ SSGS: shortSSGS, RQ: 1 }, args || {});
    let params = { SSGS, RQ };

    return request({
        url: apiPath.SN_SXBPHTJ,
        method: "get",
        params: params
    });
};

/**
 * 获取当日三相不平衡按日统计信息
 */
export function getCurrentPhaseDayliStaticsData(SSGS) {
    SSGS = SSGS || shortSSGS;
    return getPhaseDayliStaticsData({ SSGS: shortSSGS, RQ: 1 });
}

/**
 * 查询指定日期的三相不平衡按日统计信息
 *
 * @param {String} SSGS - 公司编号，默认SP06
 * @param {Date} date - 查询日期
 */
export function getPhaseDayliStaticsData(SSGS, date) {
    SSGS = SSGS || shortSSGS;
    let RQ = moment(date).format("YYYYMMDD");

    return _getPhaseDayliStaticsData({
        SSGS, RQ
    });
}


/**
 * 台区异常状态枚举代码
 */
export const RegionExceptState = {
    QZ: 1,//轻载
    // GZ: 2,过载传2无数据
    GZ: -1,//过载
    ZZ: 3,//重载
    DDY: 4,//低电压
    GDY: 5,//过电压
    SXBPH: 6,//三相不平衡
    DGL: 7,//低功率
    ALL: -1//全部
}


/**
 * 台区运行状态月统计接口
 *
 * @param {Object} args - 参数
 * @param {Number} args.KSSJ - 开始时间,格式：YYYYMM
 * @param {Number} args.JSSJ - 结束时间,格式：YYYYMM
 * @param {RegionExceptState} args.LX - 异常类型
 * @param {String} args.SSGS - 所属公司
 */
export function _getRegionMonthData(args) {
    var date = moment().format("YYYYMM");

    let {
        SSGS, LX, KSSJ, JSSJ
    } = Object.assign({
        SSGS: shortSSGS,
        LX: -1,
        KSSJ: date,
        JSSJ: date
    }, args || {});

    let params = { SSGS, LX, KSSJ, JSSJ };

    return request({
        url: apiPath.SN_FZYTJ,
        method: 'get',
        params: params
    })
}



// 智能运维-负载情况-负载明细-日
export function getFZMXData(params) {
    return request({
        url: apiPath.SN_FZMX,
        method: 'get',
        params: params
    })
}
function getRegionMonthStationApi(state) {
    /**
     * 时间范围查询台区按月统计信息
     * @param {String} ssgs - 所属公司
     * @param {Date} start - 开始时间
     * @param {Date} end - 结束时间
     */
    let getRangeMonthStaticsData = (ssgs, start, end) => {
        let SSGS = ssgs || shortSSGS;
        let KSSJ = parseInt(moment(start).format("YYYYMM"),10);
        let JSSJ = parseInt(moment(end).format("YYYYMM"),10);
        let LX = state;
        return _getRegionMonthData({SSGS , KSSJ,JSSJ,LX});
    };

    /**
     * 获取某月的台区按月统计信息
     * @param {String} ssgs - 所属公司
     * @param {Date} date - 时间
     */
    let getMonthStaticsData = (ssgs, date) => {
        return getRangeMonthStaticsData(ssgs , date , date);
    };

    /**
     * 获取当月台区按月统计信息
     * @param {String} ssgs - 所属公司
     */
    let getCurMonthStaticsData = (ssgs) => {
        let date = new Date();
        return getMonthStaticsData(ssgs , date);
    };

    return {
        getRangeMonthStaticsData,
        getMonthStaticsData,
        getCurMonthStaticsData
    }
}
// 负载明细-负载曲线
export function getFZQX(txt) {
    return request({
        url: apiPath.FZMX_FZQX+txt,
        method: 'get'
    })
}

// 异常处理模块
//  1 异常处理
export function getStatisticRateData(params) {
    return request({
        url: apiPath.SN_GDYTJ,
        method: 'get',
        params: params
    })
}

// 2重载
export function getZZTJRateData(params) {
    return request({
        url: apiPath.SN_ZZTJ,
        method: 'get',
        params: params
    })
}
 // 异常事件
 export function getTQdata(params) {
    return request({
        url: apiPath.abnormal,
        method: 'get',
        params: params
    })
}
// 异常统计-PMS故障统计
export function getSNGZQXTJLYData(params) {
    return request({
        url: apiPath.SN_GZQXTJ_LY,
        method: 'get',
        params: params
    })
}
// 停电计划指导-影响用户明细
export function getTDJHZDYXYHData(params) {
    return request({
        url: apiPath.SN_JHTJ_TDTZDMX,
        method: 'get',
        params: params
    })
}
// 停电计划指导-当日停电影响的低压用户总数
export function getTDZSData(params) {
    return request({
        url: apiPath.SN_JHTD_YXYHTJ,
        method: 'get',
        params: params
    })
}
// 停电计划指导-影响用户明细
export function getYXYHMXData(params) {
    return request({
        url: apiPath.SN_JHTD_YXYHMX,
        method: 'get',
        params: params
    })
}

// 异常处理HPLC采集异常事件停电上报
export function getHPLCData(params) {
    return request({
        url: apiPath.powoff_event_stat,
        method: 'get',
        params: params
    })
}
// 异常处理HPLC采集异常事件停电上报明细
export function getHPLCDatadatail(params) {
    return request({
        url: apiPath.powoff_event_det,
        method: 'get',
        params: params
    })
}

//异常处理PMS故障明细
export function getPMSDatadatail(params) {
    return request({
        url: apiPath.powoff_event_pms,
        method: 'get',
        params: params
    })
}

export function getSNdatail(params) {
    return request({
        url: apiPath.SN_GZQXTJ_LYMX,
        method: 'get',
        params: params 
    })
}


// 配电变压器-柱上变压器明细
export function getZSBYQMXData(params) {
    return request({
        url: apiPath.SN_ZSBYQMX,
        method: 'get',
        params: params
    })
}
// HPLC采集的户变关系
export function getTGCONSDETData(params) {
    return request({
        url: apiPath.tg_cons_det,
        method: 'get',
        params: params
    })
}
// 户变关系-设备详情
export function getHBGXSBXQata(params) {
    return request({
        url: apiPath.SN_HBGX,
        method: 'get',
        params: params
    })
}
// 户变关系-实时告警
export function getSSGJData(params) {
    return request({
        url: apiPath.SN_SSGJ,
        method: 'get',
        params: params
    })
}
//台区轻载按月统计
export const regionMonthStaticsForQZ = getRegionMonthStationApi(RegionExceptState.QZ);
//台区过载按月统计
export const regionMonthStaticsForGZ = getRegionMonthStationApi(RegionExceptState.GZ);
//台区重载按月统计
export const regionMonthStaticsForZZ = getRegionMonthStationApi(RegionExceptState.ZZ);
//台区低电压按月统计
export const regionMonthStaticsForDDY = getRegionMonthStationApi(RegionExceptState.DDY);
//台区过电压按月统计
export const regionMonthStaticsForGDY = getRegionMonthStationApi(RegionExceptState.GDY);
//台区三相不平衡按月统计
export const regionMonthStaticsForSXBPH = getRegionMonthStationApi(RegionExceptState.SXBPH);
//台区低功率按月统计
export const regionMonthStaticsForDGL = getRegionMonthStationApi(RegionExceptState.DGL);
//台区状态按月统计
export const regionMonthStatics = getRegionMonthStationApi(RegionExceptState.ALL);

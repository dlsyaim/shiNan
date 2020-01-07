import {getQueryString} from '@/utils/context'
export default {
  getPowerFactorData: config => {
    return {
      code: 200,
      message: '成功',
      data: {
        lowNumber: 108,
        seriousLowNumber: 43,
        bar: {
          xAxis: ['线路运检一组','线路运检二组','线路运检三组','线路运检四组','配电运检一组','配电运检二组','配电运检三组','配电运检四组'],
          low: [3, 1, 2, 1, 3, 4, 1, 1],
          seriousLow: [3, 5, 10, 1, 9, 15, 2, 8],
          load: [60, 91, 80, 72, 87, 74, 83, 79]
        },
        pie: {
          data: [
            {value: 13, name: '杆变'},
            {value: 7, name: '配变'}
          ]
        }
      }
    }
  },
  getPowerKeyMonitorData: config => {
    return {
      code: 200,
      message: '成功',
      data: {
        bar: {
          xAxis: ['线路运检一组','线路运检二组','线路运检三组','线路运检四组','配电运检一组','配电运检二组','配电运检三组','配电运检四组'],
          three: [3, 1, 2, 1, 3, 4, 1, 1],
          seven: [3, 5, 1, 1, 2, 3, 2, 4]
        },
        pie: {
          data: [
            {value: 13, name: '杆变'},
            {value: 7, name: '配变'}
          ]
        }
      }
    }
  },
  getPowerListData: config => {
    return {
      code: 200,
      message: '成功',
      data: [{
        cz: '',
        sbbm: '001',
        sbmc: '杆变1号',
        ycljts: '3',
        bphljts: '3',
        pblx: '杆变',
        edrl: '10kW',
        syxz: '测试',
        xh: '1型号',
        dydj: '110kv',
        sccj: '测试',
        whbzmc: '线路运检一组',
        ywdwmc: '线路运检一组'
      }, {
        cz: '',
        sbbm: '002',
        sbmc: '杆变2号',
        ycljts: '2',
        bphljts: '1',
        pblx: '杆变',
        edrl: '10kW',
        syxz: '测试',
        xh: '1型号',
        dydj: '110kv',
        sccj: '测试',
        whbzmc: '线路运检一组',
        ywdwmc: '线路运检一组'
      }, {
        cz: '',
        sbbm: '003',
        sbmc: '杆变3号',
        ycljts: '4',
        bphljts: '2',
        pblx: '杆变',
        edrl: '10kW',
        syxz: '测试',
        xh: '1型号',
        dydj: '110kv',
        sccj: '测试',
        whbzmc: '线路运检一组',
        ywdwmc: '线路运检一组'
      }]
    }
  },

  getPbzdGeneral: config => {
    return {
      "code": 0,
      "data": {
        "pbzdSyhb": -1,
        "abnormalPBZD": 100,
        "normalPBZD": 600,
        "taiquNormalPer": 1,
        "taiquNormal": 200,
        "fgl": 0.001,
        "taiquAbnormal": 840,
        "taiquSyhb": 0,
        "fbzdCount": 1,
        "pbzdNormalPer": 0,
        "taiquAbnormalPer": 0,
        "fgtqCount": 1,
        "pbzdAbnormalPer": 0
      }
    }
  },
  getPbzdDevDetailError: config => {
    let url = config.url
    let index = getQueryString("index", url);
    let rows = 10;
    index = (index - 1) * rows;
    let len = index+rows;
    let datas = [];
    for(let i = index; i<len; i++){
      datas.push(
        {
          "id": i,
          "name": "低压检测"+i,
          "relatedName": null,
          "commAddr": "",
          "companyId": 1,
          "company": "公司名称"+i,
          "areaId": 1,
          "area": "area"+i,
          "chlId": 1,
          "chl": "通道名称"+i,
          "templateId": 1,
          "installDate": "2019-09-25 00:00:00",
          "unInstallDate": null,
          "runDate": "2019-09-25 00:00:00",
          "runState": 1,
          "run": null,
          "topic": "topic"+i
        }
      );
    }
    return {
      "code": 0,
      "data": {
        "count": 86,
        "nimsDevs": [...datas]
      }
    }
  },
  getDyjcGeneral: config => {
    return{
      "code": 0,
      "data": {
        "dyjcAbnormalPer": 0,
        "dyjcNormalPer": 0,
        "dyjcCount": 100,
        "dycxNormalPer": 0,
        "dycxSyhb": 0.15,
        "normalDYJC": 100,
        "dycxNormal": 147,
        "dycxAbnormalPer": 0,
        "dycxCount": 0,
        "abnormalDYJC": 22,
        "dyjcSyhb": 0.54,
        "dycxAbnormal": 15,
      }
    }
  },
  getFzxjcGeneral: config => {
    return{
      "code": 0,
      "data": {
        "fzxjcNormalPer": 10,
        "fzxNormal": 19,
        "fzxCount": 120,
        "normalFZXJC": 12,
        "fzxAbnormal": 81,
        "fzxjcSyhb": 0.23,
        "fzxjcCount": 30,
        "fzxjcAbnormalPer": 40,
        "fzxSyhb": 0.1,
        "abnormalFZXJC": 88,
        "fzxNormalPer": 120,
        "fzxAbnormalPer": 0,
      }
    }
  }

}

//平均负载率 当日时期
const averageCurrentDate = {
    code: 200,
    message: 'success',
    data: '2019-09-25'
}

//平均负载率 显示信息
const averageDisplayList = {
    code: 200,
    message: 'success',
    data: [
        {code: 'pzfzl',text: '平均负载率',value: '23.35%', unit: ''}
    ]
}

//平均负载率 echarts数据
const averageTodayData = {
    code: 200,
    message: 'success',
    data: [
        {code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},
    ]
}

//轻载 当日时期
const lightCurrentDate = {
    code: 200,
    message: 'success',
    data: '2019-09-25'
}

//轻载 当日显示信息
const lightDisplayList = {
    code: 200,
    message: 'success',
    data: [
        {code: 'ybqz',text: '一般轻载',value: '8', unit: '台'},
        {code: 'yzqz',text: '严重轻载',value: '18', unit: '台'},
    ]
}

//轻载 当月显示信息
const lightDisplayMonthList = {
    code: 200,
    message: 'success',
    data: [
        {code: 'ybqz',text: '连续三天',value: '28', unit: '台'},
        {code: 'yzqz',text: '累计七天',value: '48', unit: '台'},
    ]
}

//轻载 当日echarts数据
const lightTodayData = {
    code: 200,
    message: 'success',
    data: [
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},],
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},],
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},]
    ]
}

//轻载 当月echarts数据
const lightMonthData = {
    code: 200,
    message: 'success',
    data: [
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},],
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},],
    ]
}

//过载 当日时期
const overCurrentDate = {
    code: 200,
    message: 'success',
    data: '2019-09-25'
}

//过载 当日显示信息
const overDisplayList = {
    code: 200,
    message: 'success',
    data: [
        {code: 'ybqz',text: '一般过载',value: '8', unit: '台'},
        {code: 'yzqz',text: '严重过载',value: '18', unit: '台'},
    ]
}

//过载 当月显示信息
const overDisplayMonthList = {
    code: 200,
    message: 'success',
    data: [
        {code: 'ybqz',text: '连续三天',value: '28', unit: '台'},
        {code: 'yzqz',text: '累计七天',value: '48', unit: '台'},
    ]
}

//过载 当日echarts数据
const overTodayData = {
    code: 200,
    message: 'success',
    data: [
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},],
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},],
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},]
    ]
}

//过载 当月echarts数据
const overMonthData = {
    code: 200,
    message: 'success',
    data: [
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},],
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},],
    ]
}
   
//重载 当日时期
const heavyCurrentDate = {
    code: 200,
    message: 'success',
    data: '2019-09-25'
}

//重载 当日显示信息
const heavyDisplayList = {
    code: 200,
    message: 'success',
    data: [
        {code: 'ybqz',text: '一般重载',value: '8', unit: '台'},
        {code: 'yzqz',text: '严重重载',value: '18', unit: '台'},
    ]
}

//重载 当月显示信息
const heavyDisplayMonthList = {
    code: 200,
    message: 'success',
    data: [
        {code: 'ybqz',text: '连续三天',value: '28', unit: '台'},
        {code: 'yzqz',text: '累计七天',value: '48', unit: '台'},
    ]
}

//重载 当日echarts数据
const heavyTodayData = {
    code: 200,
    message: 'success',
    data: [
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},],
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},],
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},]
    ]
}

//重载 当月echarts数据
const heavyMonthData = {
    code: 200,
    message: 'success',
    data: [
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},],
        [{code: 'bdzxyz',text: '变电中心一站',value: '8'},
        {code: 'bdzxwz',text: '变电中心五站',value: '9'},
        {code: 'pdyjyz',text: '配电运检一组',value: '10'},
        {code: 'pdyjez',text: '配电运检二组',value: '11'},
        {code: 'bdzxsz',text: '变电中心三站',value: '12'},
        {code: 'bdzxyz',text: '变电中心一站',value: '13'},
        {code: 'bdzxwz',text: '变电中心五站',value: '14'},
        {code: 'pdyjyz',text: '配电运检一组',value: '15'},
        {code: 'pdyjez',text: '配电运检二组',value: '16'},
        {code: 'bdzxsz',text: '变电中心三站',value: '17'},],
    ]
}

export default {

    // 获取平均负载率当日时期
    getAverageCurrentDate: config => {
        return averageCurrentDate;
    },

    // 获取平均负载率显示信息
    getAverageDisplayList: config => {
        return averageDisplayList;
    },

    // 获取平均负载率当日echarts数据
    getAverageTodayData: config => {
        return averageTodayData;
    },

    // 获取轻载当日时期
    getLightCurrentDate: config => {
        return lightCurrentDate;
    },

    // 获取轻载当日显示信息
    getLightDisplayList: config => {
        return lightDisplayList;
    },

    // 获取轻载当月显示信息
    getLightDisplayMonthList: config => {
        return lightDisplayMonthList;
    },

    // 获取轻载当日echarts数据
    getLightTodayData: config => {
        return lightTodayData;
    },

    // 获取轻载当月echarts数据
    getLightMonthData: config => {
        return lightMonthData;
    },

    // 获取过载当日时期
    getOverCurrentDate: config => {
        return overCurrentDate;
    },

    // 获取过载当日显示信息
    getOverDisplayList: config => {
        return overDisplayList;
    },

    // 获取过载当月显示信息
    getOverDisplayMonthList: config => {
        return overDisplayMonthList;
    },

    // 获取过载当日echarts数据
    getOverTodayData: config => {
        return overTodayData;
    },

    // 获取过载当月echarts数据
    getOverMonthData: config => {
        return overMonthData;
    },

    // 获取重载当日时期
    getHeavyCurrentDate: config => {
        return heavyCurrentDate;
    },

    // 获取重载当日显示信息
    getHeavyDisplayList: config => {
        return heavyDisplayList;
    },

    // 获取重载当月显示信息
    getHeavyDisplayMonthList: config => {
        return heavyDisplayMonthList;
    },

    // 获取重载当日echarts数据
    getHeavyTodayData: config => {
        return heavyTodayData;
    },

    // 获取重载当月echarts数据
    getHeavyMonthData: config => {
        return heavyMonthData;
    },
}

import Mock from 'mockjs'

import loadAPI from './intelliOper/load'

// 过载
// 当前日期
Mock.mock(/\/getOverCurrentDate/, 'get', loadAPI.getOverCurrentDate)
// 当前显示信息
Mock.mock(/\/getOverDisplayList/, 'get', loadAPI.getOverDisplayList)
// 当月显示信息
Mock.mock(/\/getOverDisplayMonthList/, 'get', loadAPI.getOverDisplayMonthList)
// 当日charts数据
Mock.mock(/\/getOverTodayData/, 'get', loadAPI.getOverTodayData)
// 当月charts数据
Mock.mock(/\/getOverMonthData/, 'get', loadAPI.getOverMonthData)

import Mock from 'mockjs'

import loadAPI from './intelliOper/load'

// 轻载
// 当前日期
Mock.mock(/\/getLightCurrentDate/, 'get', loadAPI.getLightCurrentDate)
// 当前显示信息
Mock.mock(/\/getLightDisplayList/, 'get', loadAPI.getLightDisplayList)
// 当月显示信息
Mock.mock(/\/getLightDisplayMonthList/, 'get', loadAPI.getLightDisplayMonthList)
// 当日charts数据
Mock.mock(/\/getLightTodayData/, 'get', loadAPI.getLightTodayData)
// 当月charts数据
Mock.mock(/\/getLightMonthData/, 'get', loadAPI.getLightMonthData)

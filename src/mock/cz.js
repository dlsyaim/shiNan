
import Mock from 'mockjs'

import loadAPI from './intelliOper/load'


// 重载
// 当前日期
Mock.mock(/\/getHeavyCurrentDate/, 'get', loadAPI.getHeavyCurrentDate)
// 当前显示信息
Mock.mock(/\/getHeavyDisplayList/, 'get', loadAPI.getHeavyDisplayList)
// 当月显示信息
Mock.mock(/\/getHeavyDisplayMonthList/, 'get', loadAPI.getHeavyDisplayMonthList)
// 当日charts数据
Mock.mock(/\/getHeavyTodayData/, 'get', loadAPI.getHeavyTodayData)
// 当月charts数据
Mock.mock(/\/getHeavyMonthData/, 'get', loadAPI.getHeavyMonthData)

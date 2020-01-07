import Mock from 'mockjs'
import loadAPI from './intelliOper/load'

// 平均负载率
// 当前日期
Mock.mock(/\/getAverageCurrentDate/, 'get', loadAPI.getAverageCurrentDate)
// 当前显示信息
Mock.mock(/\/getAverageDisplayList/, 'get', loadAPI.getAverageDisplayList)
// 当前charts数据
Mock.mock(/\/getAverageTodayData/, 'get', loadAPI.getAverageTodayData)

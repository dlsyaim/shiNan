import Mock from 'mockjs'
import loginAPI from './login'
import equipAPI from './equip'

// 登录相关
Mock.mock(/\/login/, 'post', loginAPI.login)
Mock.mock(/\/menu/, 'get', loginAPI.menu)

// 设备相关
// Mock.mock(/\/watchEquipChartsData/, 'get', equipAPI.watchEquipChartsData)
// Mock.mock(/\/getDataByPBZD/, 'get', equipAPI.getDataByPBZD)
Mock.mock(/\/getDataByTQZB/, 'get', equipAPI.getDataByTQZB)
// Mock.mock(/\/getPowerFactorData/, 'get', powerAPI.getPowerFactorData)
// Mock.mock(/\/getPowerKeyMonitorData/, 'get', powerAPI.getPowerKeyMonitorData)
// Mock.mock(/\/getPowerListData/, 'get', powerAPI.getPowerListData)
// Mock.mock(/\/pbzd\/general/, 'get', powerAPI.getPbzdGeneral)
// Mock.mock(/\/pbzd\/devDetail\/1/, 'get', powerAPI.getPbzdDevDetailError)
// Mock.mock(/\/pbzd\/devDetail/, 'get', powerAPI.getPbzdDevDetailError)
// Mock.mock(/\/dyjc\/general/, 'get', powerAPI.getDyjcGeneral)
// Mock.mock(/\/dyjc\/devDetail\/1/, 'get', powerAPI.getPbzdDevDetailError)
// Mock.mock(/\/dyjc\/devDetail/, 'get', powerAPI.getPbzdDevDetailError)
// Mock.mock(/\/fzxjc\/general/, 'get', powerAPI.getFzxjcGeneral)
// Mock.mock(/\/fzxjc\/devDetail\/1/, 'get', powerAPI.getPbzdDevDetailError)
// Mock.mock(/\/fzxjc\/devDetail/, 'get', powerAPI.getPbzdDevDetailError)


const watchEquipChartsData = {
    code: 200,
    message: 'success',
    data: [
        {
            title: '配变终端',
            inlineData: [
                {
                    key: '安装总数：',
                    value: 6718,
                    unit: '台'
                },
                {
                    key: '覆盖率：',
                    value: 58,
                    unit: '%'
                },
                {
                    key: '覆盖台区数：',
                    value: 3897,
                    unit: '台'
                }
            ],
            chartsData: [
                {
                    title: '装置采集情况',
                    data: [
                        {value: 6000, name: '正常', unit: '台'},
                        {value: 718, name:'异常', unit: '台'}
                    ]
                },
                {
                    title: '台区采集情况',
                    data: [
                        {value: 886, name: '正常', unit: '台'},
                        {value: 437, name:'异常', unit: '台'}
                    ]
                }
            ]

        }
    ]
}

export default {
    watchEquipChartsData: config => {
        return watchEquipChartsData
    },
    getDataByPBZD: config => {
        return {
            code: 200,
            message: '成功',
            data: {
                inlineData: [
                    {
                        key: '安装总数：',
                        value: 6718,
                        unit: '台'
                    },
                    {
                        key: '覆盖率：',
                        value: 58,
                        unit: '%'
                    },
                    {
                        key: '覆盖台区数：',
                        value: 3897,
                        unit: '台'
                    }
                ],
                chartsData: [
                    [ 6000, 718 ],
                    [ 886, 437 ]
                ],
                basis: [
                    {
                        type: 'up',
                        value: 3.6
                    },
                    {
                        type: 'down',
                        value: 3.6
                    }
                ]
            }
        }
    },
    getDataByTQZB: config => {
        return {
            code: 200,
            message: '成功',
            data: {
                inlineData: [
                    {
                        key: '安装总数：',
                        value: 6233,
                        unit: '台'
                    },
                    {
                        key: '覆盖台区数：',
                        value: 4672,
                        unit: '台'
                    }
                ],
                chartsData: [
                    [
                        {value: 9517, name: '正常', unit: '台'},
                        {value: 517, name:'异常', unit: '台'}
                    ],
                    [
                        {value: 8650, name: '正常', unit: '台'},
                        {value: 850, name:'异常', unit: '台'}
                    ]
                ],
                basis: [
                    {
                        type: 'up',
                        value: 3.6
                    },
                    {
                        type: 'down',
                        value: 3.6
                    }
                ]
            }
        }
    }
}

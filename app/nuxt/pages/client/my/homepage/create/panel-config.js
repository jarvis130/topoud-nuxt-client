export const typesInit = [
    { type: '6' },
    { type: '1', panelName: '企业介绍' },
    { type: '8', remark: 2, panelName: '荣誉介绍' },
    { type: '8', panelName: '企业风采' }
]
export const typesAll = [
    {
        cate: '文字',
        list: [
            {
                type: '1',
                _panelName: '标题',
                remark: 'titleOnly',
                _content: [{}]
            },
            {
                type: '1',
                _panelName: '正文',
                remark: 'contentOnly',
                _content: [{ _productName: '正文' }]
            },
            {
                type: '1',
                _panelName: '标题+正文',
                _content: [{ _productName: '正文' }]
            }
        ]
    },
    {
        cate: '图片',
        list: [
            {
                type: '8',
                _tips: '点击添加单图',
                _content: [{}]
            },
            {
                type: '8',
                remark: 2,
                _tips: '点击添加双图',
                _content: [{}, {}]
            },
            {
                type: '8',
                remark: 3,
                _tips: '点击添加三图',
                _content: [{}, {}, {}]
            },
            {
                type: '6',
                _tips: '点击添加幻灯图片',
                _content: []
            }
        ]
    }
]

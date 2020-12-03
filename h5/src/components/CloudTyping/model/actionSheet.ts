export interface IActionSheet {
    type: string,
    name: string,
    children?: IActionSheet[]
}
export const loadArticle: IActionSheet[] = [
    {
        type: 'loadArticle',
        name: '群载文',
        children: [
            {
                type: 'loadGroupArticle',
                name: '鹤一'
            }, {
                type: 'loadGroupArticle',
                name: '鹤二'
            }, {
                type: 'loadGroupArticle',
                name: '键心阁'
            }, {
                type: 'loadGroupArticle',
                name: '五林风'
            }, {
                type: 'loadGroupArticle',
                name: '晴天'
            },
        ]
    },
    {
        type: 'loadArticle',
        name: '剪贴板'
    }
]

export const postArticle: IActionSheet[] = [
    {
        type: 'postArticle',
        name: '单字',
        children: [
            {
                type: 'postWords',
                name: '前五百单字'
            },
            {
                type: 'postWords',
                name: '中五百单字'
            },
            {
                type: 'postWords',
                name: '后五百单字'
            },
            {
                type: 'postWords',
                name: '前一千五单字'
            }
        ]
    },
    {
        type:'postArticle',
        name: '随机一文'
    },
    {
        type:'postArticle',
        name: '自定义文章'
    }
]
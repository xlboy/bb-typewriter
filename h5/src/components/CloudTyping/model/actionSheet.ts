import typingGroups from './typingGroup'
export interface IActionSheet {
    type: string,
    name: string,
    children?: IActionSheet[]
}

export const loadArticle: IActionSheet[] = [
    {
        type: 'loadArticle',
        name: '群载文',
        children: typingGroups.map(o => ({ type: 'loadGroupLatestArticle', name: o.name }))
    },
    {
        type: 'loadArticle',
        name: '群赛文',
        children: typingGroups.map(o => ({ type: 'loadGroupMatchArticle', name: o.name }))
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
        type: 'postArticle',
        name: '随机一文'
    },
    {
        type: 'postArticle',
        name: '自定义文章'
    }
]
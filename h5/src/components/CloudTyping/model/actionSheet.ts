import typingGroups from '@/model/typingGroup'
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
                type: 'postASingleWord',
                name: '前五百'
            },
            {
                type: 'postASingleWord',
                name: '中五百'
            },
            {
                type: 'postASingleWord',
                name: '后五百'
            },
            {
                type: 'postASingleWord',
                name: '前一千五'
            }
        ]
    },
    {
        type: 'postArticle',
        name: '常用词组'
    },
    {
        type: 'postArticle',
        name: '自定义文章'
    }
]
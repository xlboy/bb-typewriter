import { typingGroups } from "@/constants/typing";
export interface IActionSheet {
    type: string,
    name: string,
    disabled?: boolean,
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
        name: '常用词组',
        children: [
            {
                type: 'postChinesePhrase',
                name: '二字词组'
            }
        ]
    },
    {
        type: 'postArticle',
        name: '自定义文章'
    }
]

export const typingModel: IActionSheet[] = [
    {
        type: 'typingModel',
        name: '跟打模式',
        disabled: true
    },
    {
        type: 'typingModel',
        name: '看打模式',
        disabled: false
    }
]
import { reactive } from 'vue';

interface IBaseLayouNavBar {
    title: string;
    rightVisible?: boolean;
    rightIconName?: string;
    rightClick?: Function;
}
interface IBaseLayou {
    navBar: IBaseLayouNavBar;
    setNavBar(navBar: IBaseLayouNavBar): void;
}
let baseLayout: IBaseLayou
function createBaseLayout(): IBaseLayou {
    return (baseLayout = {
        navBar: reactive({
            title: '标题',
            rightVisible: false,
            rightIconName: 'search',
            rightClick: () => 1
        }),
        setNavBar(navBar: IBaseLayouNavBar) {
            Object.assign(this.navBar, navBar);
        }
    })
}
export default function (): IBaseLayou {
    return baseLayout || createBaseLayout()
}
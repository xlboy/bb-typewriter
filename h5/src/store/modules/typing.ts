// // 跟打练习模块

// import { TypingSource, TypingState } from '@/interface/typing';

// const state: TypingState = {
//   time: {
//     start: 0, // 开始练习的时间
//     tempStart: 0, // 中间临时暂停的时间
//     pause: 0, // 总暂停时间
//     end: 0, // 结束练习的时间
//     total: 0, // 总计时间
//   },
//   basis: {
//     backSpace: 0, // 当前退格
//     backChange: 0, // 当前回改
//     totalKey: 0, // 当前总键数
//     haveInput: '', // 已输入内容
//   },
//   source: {
//     content: "", // 练习对照的内容
//     index: 0, // 练习内容的(序号/段号)
//   }
// };
// export default {
//   namespaced: true,
//   state,
//   getters: {
//     getSpeed(state: TypingState): number {
//       /* 速度 */
//       const { haveInput } = state.basis
//       const { total } = state.time
//       const result: string = ((haveInput.length / total) * 60).toFixed(2)
//       return ['Infinity', 'NaN'].includes(result) ? 0 : +result
//     },
//     getKeystroke(state: TypingState): number {
//       /* 击键 */
//       const { totalKey } = state.basis
//       const { total } = state.time
//       const result: string = (totalKey / total).toFixed(2)
//       return ['Infinity', 'NaN'].includes(result) ? 0 : +result
//     },
//     getYardsLong(state: TypingState): number {
//       /* 码长 */
//       const { totalKey, haveInput } = state.basis
//       const result: string = (totalKey / haveInput.length).toFixed(2)
//       return ['Infinity', 'NaN'].includes(result) ? 0 : +result
//     },
//   },
//   mutations: {
//     SetSource(state: TypingState, source: TypingSource) {
//       state.source = source;
//     },

//   }
// };
interface DemoState {
  count: number;
}
const state: DemoState = {
  count: 0
};
export default {
  state,
  mutations: {
    increase(state: DemoState) {
      console.log(state);
      state.count++;
    },
    decrease(state: DemoState) {
      console.log(state);
      state.count--;
    }
  }
};
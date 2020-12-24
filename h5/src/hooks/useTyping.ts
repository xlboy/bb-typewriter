import { reactive, computed, watch, onMounted } from "vue";
import { IFinishCallback, ITypingResult, ITypingSource, ITypingState, IUseTyping } from '@/interface/ITyping'

// 起一个唯一的代号，用来引入provide/inject
export const TypingSymbol = Symbol('typing')

/**
 * 
 * @param finishCallback 练习完成回调
 * @param type 打字监听的两种模式(downKey/inputVal)。
 * downKey是按下键盘某键进行监听，这里针对pc端。移动端是监听不到键盘按下某键的。在精准程度上，此模式会更佳
 * inputVal是监听输入框的值进行处理，这里精准程度不如downKey模式，但此模式兼容PC端与移动端。
 * @param inputId 若type为downKey类型，则需要传一个相对应的输入框id进来，在本hooks里会将其进行键盘事件注册
 */

export default function (
  finishCallback: IFinishCallback,
  type: 'downKey' | 'inputVal',
  inputId?: string
): IUseTyping {

  // 返回辅助型的数据
  const initAidState = (): ITypingState => {
    return {
      time: {
        start: 0, // 开始练习的时间
        tempStart: 0, // 中间临时暂停的时间
        pause: 0, // 总暂停时间
        end: 0, // 结束练习的时间
        total: 0, // 总计时间
      },
      basis: {
        backSpace: 0, // 当前退格
        backChange: 0, // 当前回改
        totalKey: 0, // 当前总键数
      }
    }
  }
  const state = reactive({
    aid: initAidState(),
    ref: {
      source: {
        content: "只期待后来的你能快乐".repeat(5), // 练习对照的内容
        index: 1, // 练习内容的(序号/段号)
      },
      haveInput: '', // 已输入内容
      typingModel: "跟打模式", // 练习模式, "跟打模式" | "看打模式"
      typingType: {
        type: "", // 练习类型, "单字" | "词组" | "自定义文章" | "剪贴板"
        data: {}, // 所带的自定义值,可能是字数,可能是其他
      }
    }
  })

  // 计算处理的数据
  const getters = {
    getSpeed: computed((): number => {
      /* 速度 */
      const { total } = state.aid.time
      const result: string = ((state.ref.haveInput.length / total) * 60).toFixed(2)
      return ['Infinity', 'NaN'].includes(result) ? 0 : +result
    }),
    getKeystroke: computed((): number => {
      /* 击键 */
      const { totalKey } = state.aid.basis
      const { total } = state.aid.time
      const result: string = (totalKey / total).toFixed(2)
      return ['Infinity', 'NaN'].includes(result) ? 0 : +result
    }),
    getYardsLong: computed((): number => {
      /* 码长 */
      const { totalKey } = state.aid.basis
      const result: string = (totalKey / state.ref.haveInput.length).toFixed(2)
      return ['Infinity', 'NaN'].includes(result) ? 0 : +result
    }),
    getSourceContentLength: computed((): number => {
      /* 文段字数长度 */
      return state.ref.source.content.length
    }),
    getHasInputProgress: computed((): number => {
      /* 当前已输入内容在全部内容中的百分比 */
      return (state.ref.haveInput.length / getters.getSourceContentLength.value) * 100
    })
  }

  // 抛出需要对数据进行改动的接口
  const mutations = {
    SetSource(source: ITypingSource) {
      /* 设置练习内容源 */
      Object.assign(state.ref.source, source)
      this.ResetTyping()
    },
    ResetTyping() {
      /* 重置数据 */
      state.ref.haveInput = ''
      state.aid = initAidState()
    },
    AddBackSpace() {
      /* 退格+1 */
      state.aid.basis.backSpace++
    },
    SetBackChange(changeNum: number) {
      /* 设置回改 */
      state.aid.basis.backChange += changeNum
    },
    AddTotalKey() {
      /* 总键数+1 */
      state.aid.basis.totalKey++
    },
    UpdateStartTime() {
      /* 更新开始时间 */
      state.aid.time.start = +new Date()
    },
    UpdateTotalTime() {
      /* 更新总耗时间 */
      state.aid.time.total = (+new Date() - state.aid.time.start - state.aid.time.pause) / 1000
    },
    UpdateEndTime() {
      /* 更新结束时间 */
      state.aid.time.end = +new Date()
    },
    SetTypingModel(model: "跟打模式" | "看打模式") {
      state.ref.typingModel = model
    },
    SetTypingType(type: "单字" | "词组" | "自定义文章" | "剪贴板" | "群载文" | "群赛文", data = {}) {
      state.ref.typingType.type = type
      state.ref.typingType.data = data
    },
  }

  // 注册键盘模式的监听
  function downKeyListenReg() {
    // 如模式为downKey键盘监听模式，则给dom注册键盘事件
    if (type === 'downKey') {
      const inputDom = inputId && document.getElementById(inputId)
      if (inputDom) {
        inputDom.onkeydown = event => {
          // 开打，计时，揍他丫的
          if (state.aid.time.start === 0) mutations.UpdateStartTime()

          if (state.aid.time.end === 0) {
            const { code } = event
            switch (code) {
              case 'Backspace':
                mutations.AddBackSpace()
                break;
            }
            mutations.AddTotalKey() // 总按下的键+1
            mutations.UpdateTotalTime() // 更新当前总耗时间
          }
        }
      }
    }
  }

  // 练习完成事件
  function typingFinish() {
    mutations.UpdateEndTime()
    const errorNum = ((num = 0, target = state.ref): number => {
      /* 计算错误的字数 */
      target.haveInput.split('').forEach((v, i) => v !== target.source.content[i] && num++)
      return num
    })()

    const typingResults: ITypingResult = {
      speed: getters.getSpeed.value,
      keystroke: getters.getKeystroke.value,
      yardsLong: getters.getYardsLong.value,
      totalTime: state.aid.time.total,
      backSpace: state.aid.basis.backSpace,
      backChange: state.aid.basis.backChange,
      totalKey: state.aid.basis.totalKey,
      errorNum,
      totalCharSize: state.ref.source.content.length
    }
    finishCallback(typingResults)
  }

  onMounted(() => {
    downKeyListenReg()
  })

  watch(
    () => state.ref.haveInput,
    (newVal, oldVal) => {
      const sourceContextLength = state.ref.source.content.length
      state.ref.haveInput = state.ref.haveInput.substr(0, sourceContextLength) // 过滤输入框的值，不允超过练习内容长度

      const { time } = state.aid

      // 输入框清空咯，重置打字数据
      if (newVal.length === 0) mutations.ResetTyping()

      // end == 0 （打字未结束）
      if (time.end === 0) {
        // start != 0（打字进行中）
        if (time.start !== 0) {

          if (type === 'inputVal') mutations.UpdateTotalTime() // 实时更新总耗时间，计算实时的打字速度

        } else if (type === 'inputVal') mutations.UpdateStartTime() // 更新开始时间

        // 判断是否回改
        if (newVal.length < oldVal.length) {
          const changeNum = Math.abs(newVal.length - oldVal.length)
          mutations.SetBackChange(changeNum)
        }

        // 练习完成
        if (newVal.length === sourceContextLength) typingFinish()
      }
    })
  return {
    refState: state.ref,
    getters,
    mutations
  }
}

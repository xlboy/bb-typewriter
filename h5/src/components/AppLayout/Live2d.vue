<template>
  <div class="live2d" id="live2dBox" style="width: 60px; height: 80px;">
    <canvas
      id="live2d"
      width="70"
      height="100"
      style="margin-top: -10px"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
function defaultEvent(e: Event) {
  e.preventDefault();
}
export default defineComponent({
  name: "Live2d",
  setup(props, { emit }) {
    onMounted(() => {
      interface GlobalThis {
        loadlive2d: Function;
      }
      ((window as unknown) as GlobalThis).loadlive2d(
        "live2d",
        "model/hijiki/hijiki.model.json"
      );

      const block: HTMLElement | null = document.getElementById("live2dBox");
      let oW: number, oH: number, lastTime: number;
      if (block) {
        // 绑定touchstart事件
        block.addEventListener(
          "touchstart",
          function(e) {
            if (lastTime) {
              if (+new Date() - lastTime < 300) {
                emit("open-sidebar");
              } else {
                lastTime = +new Date();
              }
            } else {
              lastTime = +new Date();
            }
            const touches = e.touches[0];
            oW = touches.clientX - block.offsetLeft;
            oH = touches.clientY - block.offsetTop;
            //阻止页面的滑动默认事件
            document.addEventListener("touchmove", defaultEvent, false);
          },
          false
        );

        block.addEventListener(
          "touchmove",
          function(e) {
            const touches = e.touches[0];
            let oLeft = touches.clientX - oW;
            let oTop = touches.clientY - oH;
            const { clientWidth, clientHeight } = document.documentElement;
            if (oLeft < 0) {
              oLeft = 0;
            } else if (oLeft > clientWidth - block.offsetWidth) {
              oLeft = clientWidth - block.offsetWidth;
            }
            if (oTop < 0) {
              oTop = 0;
            } else if (oTop > clientHeight - block.offsetHeight) {
              oTop = clientHeight - block.offsetHeight;
            }
            block.style.left = oLeft + "px";
            block.style.top = oTop + "px";
          },
          false
        );

        block.addEventListener(
          "touchend",
          function() {
            document.removeEventListener("touchmove", defaultEvent, false);
          },
          false
        );
      }
    });
    return {};
  }
});
</script>

<style lang="scss" scoped>
.live2d {
  position: fixed;
  overflow: hidden;
  z-index: 99999;
  right: 0px;
  bottom: 0px;
}
</style>

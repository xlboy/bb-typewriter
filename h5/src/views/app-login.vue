<template>
  <div class="login">
    <van-form>
      <van-field
        v-model="form.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-row justify="space-around" style="margin-top: 10px">
        <van-col span="10">
          <van-button round type="primary" block @click="onSubmit('login')"
            >闭着眼登录</van-button
          ></van-col
        >
        <van-col span="10">
          <van-button
            round
            type="success"
            block
            @click="onSubmit('regAndLogin')"
            >注册并登录</van-button
          ></van-col
        >
      </van-row>
    </van-form>
  </div>
</template>

<script lang="ts">
import useBaseLayout from "@/hooks/useBaseLayout";
import { Toast } from "vant";
import { defineComponent, inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { mapActions, useStore } from "vuex";
export default defineComponent({
  name: "AppLogin",
  setup() {
    const baseLayout = useBaseLayout();
    baseLayout.setNavBar({
      title: "登陆或注册",
      rightVisible: false,
    });

    const form = reactive({
      username: "",
      password: "",
    });

    const $store = useStore();
    const $router = useRouter();
    const AppSwitchSidebar = inject("AppSwitchSidebar") as any;

    function onSubmit(type: "login" | "regAndLogin") {
      const { username, password } = form;
      if (!username || !password) {
        return Toast("用户名或密码不可为空");
      }

      if (type === "login") {
        userLogin();
      } else {
        userRegAndLogin();
      }

      async function userLogin() {
        const result = await $store.dispatch("user/login", {
          username,
          password,
        });
        if (result) {
          Toast("登陆成功，快遨游宇宙吧！");
          $router.push({ name: "CloudTyping" });
          AppSwitchSidebar.openSidebar();
        } else {
          Toast("账号或密码有误，请重试");
        }
      }

      async function userRegAndLogin() {
        const result = await $store.dispatch("user/regAndLogin", {
          username,
          password,
        });
        if (result) {
          Toast("注册成功，已为您自动登陆，快遨游宇宙吧！");
          $router.push({ name: "CloudTyping" });
          AppSwitchSidebar.openSidebar();
        } else {
          Toast("用户名已存在，请重试");
        }
      }
    }

    return {
      form,
      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
}
</style>

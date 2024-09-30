<template>
  <div
    class="f-s login-page"
    v-loading="loading"
    :element-loading-text="$store.state.en.alerts.loadings"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="bg1">
      <router-link to="/">
        <img src="../assets/logo.png" style="margin: 50px 50px" />
      </router-link>
    </div>
    <div class="login-main f-c f">
      <b class="title">{{ $en("register.name") }}</b>
      <div>
        <div>
          <input
            class="inputs"
            :placeholder="$en('register.username')"
            v-model="name"
          />
        </div>
        <div class="input-body" :class="show ? 'showClass' : ''">
          <input
            class="inputs"
            :placeholder="$en('register.password')"
            maxlength="50"
            type="password"
            v-model="password"
          />
          <input
            class="inputs hide"
            :placeholder="$en('register.password')"
            maxlength="50"
            v-model="password"
          />
          <img
            src="../assets/image/show.png"
            class="input-show"
            @click="show = true"
          />
          <img
            src="../assets/image/show1.png"
            class="input-show hide"
            @click="show = false"
          />
        </div>
        <div class="input-body" :class="show ? 'showClass' : ''">
          <input
            class="inputs"
            :placeholder="$en('register.confirm_password')"
            maxlength="50"
            type="password"
            v-model="passwords"
          />
          <input
            class="inputs hide"
            :placeholder="$en('register.confirm_password')"
            maxlength="50"
            v-model="passwords"
          />
          <img
            src="../assets/image/show.png"
            class="input-show"
            @click="show = true"
          />
          <img
            src="../assets/image/show1.png"
            class="input-show hide"
            @click="show = false"
          />
        </div>
        <div>
          <input
            class="inputs"
            :placeholder="$en('register.mobile_number')"
            v-model="regPhone"
            type="text"
            oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
          />
        </div>
        <div class="input-body">
          <input
            class="inputs"
            :placeholder="$en('register.verification_code')"
            maxlength="6"
            v-model="codeVal"
            type="text"
            oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
          />
          <span class="sendBtn" @click="send()" v-show="code"
            >{{ $en("register.send") }}
          </span>
          <span class="sendBtn stop" v-show="!code"
            >{{ $en("register.send") }} {{ codeTime }}
          </span>
        </div>
      </div>
      <div class="f-s save-main">
        <div class="save f-c" @click="passTrue = !passTrue">
          <span
            class="bor f-c"
            :style="{ background: passTrue ? 'green' : 'white' }"
          >
            <i class="el-icon-check" v-show="passTrue"></i>
          </span>
          {{ $en("register.remember_me") }}
        </div>
        <div>
          <router-link to="/forgot-password" class="pass">
            {{ $en("register.forget_password") }}
          </router-link>
        </div>
      </div>
      <div class="f-c loginBtn" @click="loginBtnFx">
        {{ $en("register.button") }}
      </div>
      <div class="f-c reg">
        {{ $en("register.text") }}
        <router-link class="reg-text" to="/login">{{
          $en("register.sign_in")
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  userRegisterregister,
  userRegistersendRegisterSms,
} from "../api/galApi";

import state from "@/store/state";

export default {
  data() {
    return {
      loginType: true,
      show: false,
      passTrue: true,
      phone: "",
      codeVal: "",
      codeTime: 60,
      code: true,
      loading: false,
      name: "",
      password: "",
      passwords: "",
      regPhone: "",
    };
  },
  methods: {
    send() {
      let that = this;
      if (that.name.length < 6) {
        this.$codes(state.en.rules.username, 2);
        return false;
      }
      if (!state.rule.phoneNo.test(that.regPhone)) {
        this.$codes(state.en.rules.phoneNo, 2);
        return false;
      }
      userRegistersendRegisterSms(that.regPhone).then((res) => {
        if (res.code == 0) {
          this.$codes(state.codes[res.code], 1);
          this.code = false;
          var timer = setInterval(() => {
            this.codeTime--;
            if (this.codeTime <= 0) {
              clearInterval(timer);
              this.codeTime = 60;
              this.code = true;
            }
          }, 1000);
        } else {
          this.$codes(state.codes[res.code], 2);
        }
      });
    },
    loginBtnFx() {
      let that = this;
      if (that.name.length < 6) {
        this.$codes(state.en.rules.username, 2);
        return false;
      }
      if (!state.rule.password.test(that.password)) {
        this.$codes(state.en.rules.password, 2);
        return false;
      }
      if (that.password != that.passwords) {
        this.$codes(state.en.rules.new_password, 2);
        return false;
      }
      if (!state.rule.phoneNo.test(this.regPhone)) {
        this.$codes(state.en.rules.phoneNo, 2);
        return false;
      }

      if (this.codeVal.length < 1) {
        this.$codes(state.en.rules.code, 2);
        return false;
      }
      this.loading = true;
      setTimeout((res) => {
        that.loading = false;
      }, 2500);

      userRegisterregister(
        this.name,
        this.password,
        this.regPhone,
        this.codeVal,
        ""
      ).then((res) => {
        this.loading = false;
        if (res.code == 0) {
          this.saveFx(res.data);
          this.$codes(state.codes[res.code], 1);
          if (this.passTrue) {
            state.savePass = {
              name: this.name,
              password: this.password,
            };
            localStorage.setItem("savePass", JSON.stringify(state.savePass));
          } else {
            state.savePass = "";
            localStorage.setItem("savePass", "");
          }
        } else {
          this.$codes(state.codes[res.code], 2);
        }
      });
    },
    saveFx(v) {
      let that = this;
      state.userInfo = v.memberInfo;
      state.userInfo.avatar =
        state.iconUrl + state.static.headIcon[state.userInfo.userIcon];
      localStorage.setItem("memberInfo", JSON.stringify(state.userInfo));
      state.requestHeader["auth-token"] = state.userInfo.authToken;
      that.$money();
      setTimeout(() => {
        that.$router.push("/");
      }, 800);
      that.$gameError(v.allGamePlatform);
    },
  },
};
</script>

<style lang="scss" scoped></style>

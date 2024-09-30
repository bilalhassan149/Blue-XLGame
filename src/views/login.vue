<template>
  <div
    class="f-s login-page"
    v-loading="loading"
    :element-loading-text="$en('alerts.loadings')"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="bg">
      <router-link to="/">
        <img src="../assets/logo.png" style="margin: 50px 50px" />
      </router-link>
    </div>
    <div class="login-main f-c f">
      <div class="f-c toggle-main">
        <div
          class="text"
          @click="loginType = true"
          :class="{ toggle: loginType }"
        >
          <div class="border">
            <img class="img" src="../assets/image/shadow.png" />
          </div>
          {{ $en("auth.acc_login") }}
        </div>
        <div class="border1"></div>
        <div
          class="text"
          @click="loginType = false"
          :class="{ toggle: !loginType }"
        >
          <div class="border">
            <img class="img" src="../assets/image/shadow.png" />
          </div>
          {{ $en("auth.mbl_login") }}
        </div>
      </div>
      <b class="title">{{ $en("auth.login") }}</b>

      <div v-show="loginType">
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
      </div>
      <div v-show="!loginType">
        <div>
          <input
            class="inputs"
            :placeholder="$en('register.mobile_number')"
            v-model="phone"
            type="text"
            oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
          />
        </div>
        <div class="input-body" :class="show ? 'showClass' : ''">
          <input
            class="inputs"
            :placeholder="$en('register.verification_code')"
            maxlength="6"
            v-model="codeVal"
            type="text"
            oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
          />
          <span class="sendBtn" @click="send()" v-show="code">{{
            $en("register.send")
          }}</span>
          <span class="sendBtn stop" v-show="!code"
            >{{ $en("register.send") }} {{ codeTime }}</span
          >
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
        {{ $en("register.sign_in") }}
      </div>
      <div class="f-c reg">
        {{ $en("auth.no_acc") }}
        <router-link class="reg-text" to="/register">{{
          $en("register.button")
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  userLoginloginBySms,
  userLoginlogin,
  suserLoginsendLoginSmse,
} from "../api/galApi";

import state from "@/store/state";

export default {
  data() {
    return {
      loginType: true,
      show: false,
      passTrue: true,
      name: "",
      password: "",
      phone: "",
      codeVal: "",
      codeTime: 60,
      code: true,
      loading: false,
    };
  },
  created() {
    if (state.savePass) {
      this.name = state.savePass.name;
      this.password = state.savePass.password;
      this.passTrue = true;
    }
  },
  methods: {
    send() {
      if (!state.rule.phoneNo.test(this.phone)) {
        this.$codes(this.$en("rules.phoneNo"), 2);
        return false;
      }
      suserLoginsendLoginSmse(this.phone).then((res) => {
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
      if (that.loginType) {
        if (that.name.length < 6) {
          this.$codes(this.$en("rules.username"), 2);
          return false;
        }
        if (!state.rule.password.test(that.password)) {
          this.$codes(this.$en("rules.password"), 2);
          return false;
        }
        that.loading = true;
        setTimeout(() => {
          that.loading = false;
        }, 2000);
        userLoginlogin(that.name, that.password).then((res) => {
          that.loading = false;
          if (res.code == 0) {
            localStorage.setItem("loginInterval", Date.now());
            if (res.data) {
              if (!res.data.memberInfo) {
                this.$codes(state.en.alerts.login_failed, 2);
                return;
              }
            }
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
            this.saveFx(res.data);
          } else {
            if (res.code == 1000) {
              this.$codes(this.$en("alerts.password_error", res.msg), 2);
            } else {
              this.$codes(state.codes[res.code], 2);
            }
          }
        });
      } else {
        //验证码登录
        if (!state.rule.phoneNo.test(this.phone)) {
          this.$codes(this.$en("rules.phoneNo"), 2);
          return false;
        }
        if (this.codeVal.length < 3) {
          this.$codes(this.$en("rules.code"), 2);
          return false;
        }
        that.loading = true;
        setTimeout(() => {
          that.loading = false;
        }, 2000);
        userLoginloginBySms(this.phone, this.codeVal).then((res) => {
          that.loading = false;
          if (res.code == 0) {
            localStorage.setItem("loginInterval", Date.now());
            this.saveFx(res.data);
            this.$codes(state.codes[res.code], 1);
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        });
      }
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

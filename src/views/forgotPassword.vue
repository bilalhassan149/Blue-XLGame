<template>
  <div
    class="f-s login-page"
    v-loading="loading"
    element-loading-text="拼命加载中.."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <div class="bg">
      <router-link to="/">
        <img src="../assets/logo.png" style="margin: 50px 50px" />
      </router-link>
    </div>
    <div class="login-main f-c f" v-if="!changeForm">
      <b class="title">{{ $en("auth.forgot_pswd") }}</b>
      <div>
        <div>
          <input
            maxLength="25"
            v-model="userName"
            class="inputs"
            :placeholder="$en('register.username')"
            type="text"
          />
        </div>
        <div>
          <input
            v-model="mobileNumber"
            maxLength="11"
            oninput="value=value.replace(/[^\d]/g,'')"
            class="inputs"
            :placeholder="$en('register.mobile_number')"
            type="text"
          />
        </div>
        <div class="input-body">
          <input
            class="inputs"
            :placeholder="$en('register.verification_code')"
            maxlength="6"
            type="text"
            v-model="verficationCode"
            oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
          />
          <span
            class="sendBtn"
            :class="{ stop: codeTime < 60 }"
            @click="codeTime === 60 && getVerificationCode()"
            >{{ $en("register.send") }}
            {{ codeTime < 60 ? codeTime : "" }}</span
          >
        </div>
      </div>
      <div class="f-c loginBtn" @click="checkVerifyCode()">
        {{ $en("user.submit_btn") }}
      </div>
      <div class="f-c reg">
        {{ $en("register.return") }}
        <router-link class="reg-text" to="/login">{{
          $en("register.sign_in")
        }}</router-link>
      </div>
    </div>
    <div class="login-main f-c f" v-if="changeForm">
      <b class="title">{{ $en("auth.chng_pswd") }}</b>
      <div>
        <div>
          <input
            v-model="password"
            class="inputs"
            :placeholder="$en('register.password')"
            type="text"
          />
        </div>
        <div>
          <input
            v-model="confirmPassword"
            class="inputs"
            :placeholder="$en('register.confirm_password')"
            type="text"
          />
        </div>
      </div>
      <div class="f-c loginBtn" @click="changePassword()">
        {{ $en("auth.chng_pswd") }}
      </div>
      <div class="f-c reg">
        {{ $en("register.return") }}
        <router-link class="reg-text" to="/login">{{
          $en("register.sign_in")
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  userResetPasswordforgetcheckVerifyCode,
  userResetPasswordforgetresetPassword,
  userResetPasswordforgetsendVerifyCode,
} from "@/api/galApi";
import state from "@/store/state";

export default {
  data() {
    return {
      changeForm: false,
      userName: "",
      mobileNumber: "",
      verficationCode: "",
      password: "",
      confirmPassword: "",
      loading: false,
      codeTime: 60,
    };
  },
  methods: {
    getVerificationCode() {
      if (!this.userName) {
        this.$codes(state.en.rules.username, 2);
        return;
      } else {
        if (this.mobileNumber.length === 11) {
          userResetPasswordforgetsendVerifyCode(
            this.userName,
            this.mobileNumber
          ).then((res) => {
            if (res.code === 0) {
              this.$codes(state.codes[res.code], 1);
              var timer = setInterval(() => {
                this.codeTime--;
                if (this.codeTime <= 0) {
                  clearInterval(timer);
                  this.codeTime = 60;
                }
              }, 1000);
            } else {
              this.$codes(state.codes[res.code], 2);
            }
          });
        } else {
          this.$codes(state.en.rules.phoneNo, 2);
        }
      }
    },
    checkVerifyCode() {
      if (!this.userName) {
        this.$codes(state.en.rules.username, 2);
        return;
      } else if (!this.mobileNumber) {
        this.$codes(state.en.rules.phoneNo, 2);
        return;
      } else if (!this.verficationCode) {
        this.$codes(state.en.rules.code, 2);

        return;
      } else {
        userResetPasswordforgetcheckVerifyCode(
          this.userName,
          this.mobileNumber,
          this.verficationCode
        ).then((res) => {
          if (res.code === 0) {
            this.$codes(state.codes[res.code], 1);
            this.changeForm = true;
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        });
      }
    },
    changePassword() {
      let reg = state.rule.password;
      if (!reg.test(this.password)) {
        this.$codes(state.en.rules.password, 2);
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.$codes(state.en.rules.new_password, 2);
      } else {
        this.loading = true;
        userResetPasswordforgetresetPassword(
          this.userName,
          this.mobileNumber,
          this.password
        ).then((res) => {
          if (res.code === 0) {
            this.loading = false;
            this.$codes(state.codes[res.code], 1);
            this.$router.push("/login");
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.aler_container {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 3000;
  top: 0;
  background: rgba(0, 0, 0, 0.8);

  .alert {
    padding: 40px 70px;
    width: 629px;
    flex-shrink: 0;
    border-radius: 30px;
    background: linear-gradient(
      63deg,
      #1a1c2b -6.54%,
      #1a1c2b -6.54%,
      #09c905 269.58%
    );
    box-shadow: 7px 7px 20px 0px rgba(0, 0, 0, 0.58);
    text-align: center;
    margin: 70px auto;
    color: #fff;
    line-height: 25px;
    .link {
      color: #247cff;
    }
  }
}
.stop {
  background: #a1a1a1;
  cursor: not-allowed;
}
</style>

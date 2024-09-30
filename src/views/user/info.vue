<template>
  <div>
    <div
      class="personal_info"
      v-loading="loading"
      :element-loading-text="$store.state.en.alerts.loadings"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <div style="font-weight: bold">{{ $en("user.basic_info") }}</div>
      <div class="basic_info">
        <div class="field">
          <div class="label">{{ $en("user.nick_name") }}:</div>
          <div class="user_text">{{ customerInfo.username }}</div>
        </div>
        <div class="field">
          <div class="label">{{ $en("user.actual_name") }}:</div>
          <input
            type="text"
            v-model="names"
            :placeholder="
              $store.state.user.realName
                ? $store.state.user.realName
                : $en('inputs.real_name')
            "
            :disabled="$store.state.user.realName ? true : false"
          />
        </div>
        <div class="field">
          <div class="label">{{ $en("user.id_number") }}:</div>
          <input
            type="text"
            v-model="fromcard"
            :placeholder="
              $store.state.user.identityCard
                ? $store.state.user.identityCard
                : $en('inputs.id_number')
            "
            :disabled="$store.state.user.identityCard ? true : false"
            oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
          />
        </div>
        <div class="field">
          <div class="label">{{ $en("user.reg_date") }}:</div>
          <div class="gray user_text">
            {{ $gettime(customerInfo.registerTime) }}
          </div>
        </div>
        <button
          class="submit_btn"
          :class="{
            btn_bg:
              !$store.state.user.realName || !$store.state.user.identityCard,
          }"
          v-if="!$store.state.user.realName || !$store.state.user.identityCard"
          @click="
            (!$store.state.user.realName || !$store.state.user.identityCard) &&
              sfzBtn()
          "
        >
          {{ $en("user.submit_btn") }}
        </button>
      </div>
      <div style="font-weight: bold">
        {{ $en("user.acc_security") }}
      </div>
      <div class="basic_info">
        <div class="field">
          <div class="label">{{ $en("user.phone") }}:</div>
          <div class="user_text">{{ $store.state.user.customerPhone }}</div>
        </div>
        <div class="field">
          <div class="label">{{ $en("user.email") }}:</div>
          <div class="user_text">
            <div class="gray">
              {{ $store.state.user.customerEmail || $en("inputs.no_email") }}
            </div>
            <button
              class="verify"
              @click="emailModal = true"
              :disabled="$store.state.user.customerEmail ? true : false"
            >
              {{ $en("user.verify_btn") }}
            </button>
          </div>
        </div>
        <div class="field">
          <div class="label">{{ $en("user.user_name") }}:</div>
          <div class="user_text">{{ customerInfo.username }}</div>
        </div>
        <div class="field">
          <div class="label">{{ $en("user.acc_pswd") }}:</div>
          <div class="user_text">
            <div>*********</div>
            <button class="revise" @click="passwordModal = true">
              {{ $en("user.revise_btn") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="email_modal" v-if="emailModal">
      <div class="modal">
        <div class="modal_content">
          <div class="header">
            <div>{{ $en("user.email") }}</div>
            <img
              src="../../assets/image/modalCrossIcon.png"
              @click="
                emailModal = false;
                clearBindData();
              "
            />
          </div>
          <div class="text">
            {{ $en("popups.no_info_modified") }}
          </div>
          <input
            v-model="fromemail"
            type="text"
            :placeholder="$en('inputs.email_address')"
          />
          <div class="code_container">
            <input
              v-model="fromemailCode"
              type="text"
              maxlength="6"
              :placeholder="$en('inputs.verification_code')"
              oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
            />
            <div
              @click="codeTime === 60 && getCode()"
              :class="{ stop: codeTime < 60 }"
              class="code_btn"
            >
              {{ $en("popups.get_verification_code")
              }}<span style="margin-left: 10px">{{
                codeTime < 60 ? codeTime : ""
              }}</span>
            </div>
          </div>
          <button @click="carC1()">
            {{ $en("popups.finish") }}
          </button>
        </div>
      </div>
    </div>
    <div class="password_modal" v-if="passwordModal">
      <div class="modal">
        <div class="modal_content">
          <div class="header">
            <div>{{ $en("auth.chng_pswd") }}</div>
            <img
              src="../../assets/image/modalCrossIcon.png"
              @click="passwordModal = false"
            />
          </div>
          <div class="input_container">
            <div class="label">{{ $en("register.old_password") }}:</div>
            <input
              type="text"
              :placeholder="$en('inputs.original_pswd')"
              v-model="oldPassword"
            />
          </div>
          <div class="input_container">
            <div class="label">{{ $en("register.new_password") }}:</div>
            <input
              type="text"
              :placeholder="$en('inputs.required_pswd')"
              v-model="newPassword"
            />
          </div>
          <div class="input_container">
            <div class="label">{{ $en("register.confirm_password") }}:</div>
            <input
              type="text"
              :placeholder="$en('inputs.pswd_again')"
              v-model="newPassword1"
            />
          </div>
          <button @click="tj3()">{{ $en("popups.finish") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  userBindbindEmail,
  userBindbindRealInfo,
  userBindsendEmailBindCode,
  userInfogetUserInfo,
  userResetPasswordresetPasswordByOld,
} from "@/api/galApi";
import state from "@/store/state";

export default {
  name: "PCXLGameInfo",

  data() {
    return {
      names: "",
      fromcard: "",
      emailModal: false,
      passwordModal: false,
      oldPassword: "",
      newPassword: "",
      newPassword1: "",
      customerInfo: "",
      fromemail: "",
      fromemailCode: "",
      loading: false,
      codeTime: 60,
    };
  },
  mounted() {
    this.getuserInfo();
  },

  methods: {
    tj3() {
      if (!state.rule.password.test(this.newPassword) || !this.oldPassword) {
        this.$codes(state.en.rules.password, 2);
        return;
      }
      if (this.newPassword1 != this.newPassword) {
        this.$codes(state.en.rules.new_password, 2);
        return false;
      }
      if (this.oldPassword !== state.savePass.password) {
        this.$codes("旧密码错误！", 2);
        return;
      }
      if (this.newPassword === state.savePass.password) {
        this.$codes("参数错误-新旧密码相同", 2);
        return;
      }
      if (
        this.newPassword1 == this.newPassword &&
        this.oldPassword &&
        this.newPassword !== state.savePass.password &&
        this.oldPassword === state.savePass.password
      ) {
        this.loading = true;
        this.passwordModal = false;
        userResetPasswordresetPasswordByOld(
          this.oldPassword,
          this.newPassword1
        ).then((res) => {
          if (res.code == 0) {
            this.$codes(state.en.alerts.password_change_success, 1);
            this.tatus7 = false;
            this.$router.push("/login");
            this.loading = false;
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        });
      }
    },
    getuserInfo() {
      userInfogetUserInfo().then((res) => {
        this.customerInfo = res.data.memberInfo;
      });
    },
    getCode() {
      var emailReg = state.rule.email;
      if (emailReg.test(this.fromemail)) {
        userBindsendEmailBindCode(this.fromemail).then((res) => {
          this.$codes(state.codes[res.code], 0);
          var timer = setInterval(() => {
            this.codeTime--;
            if (this.codeTime <= 0) {
              clearInterval(timer);
              this.codeTime = 60;
            }
          }, 1000);
        });
      } else {
        this.$codes(state.en.rules.email, 2);
      }
    },
    async carC1() {
      if (!state.rule.email.test(this.fromemail)) {
        this.$codes(state.en.rules.email, 2);
        return false;
      }
      if (!this.fromemailCode) {
        this.$codes(state.en.rules.code, 2);
        return false;
      }
      if (this.fromemail && this.fromemailCode) {
        userBindbindEmail(this.fromemail, this.fromemailCode).then((res) => {
          if (res.code == 0) {
            this.emailModal = false;
            state.user.customerEmail = this.fromemail;
            this.getuserInfo();
            this.$codes(state.codes[res.code], 1);
            this.clearData();
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        });
      }
    },
    clearBindData() {
      (this.fromemail = ""), (this.fromemailCode = "");
    },
    sfzBtn() {
      if (!this.names) {
        this.$codes(state.en.rules.name, 2);
        return;
      }
      if (!state.rule.idCard.test(this.fromcard)) {
        this.$codes(state.en.rules.idCard, 2);
        return;
      }
      userBindbindRealInfo(this.names, this.fromcard).then((res) => {
        if (res.code == 0) {
          this.getuserInfo();
          this.$codes(state.codes[res.code], 1);
          this.$userData();
        } else {
          this.$codes(state.codes[res.code], 2);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3000;
  font-size: 14px;
  color: white;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .modal_content {
    width: 568px;
    padding: 25px 36px;
    border-radius: 30px;
    background: linear-gradient(64deg, #1a1c2b 49.57%, #c91d05 269.88%);
    box-shadow: 7px 7px 20px 0px rgba(0, 0, 0, 0.58);
    display: flex;
    align-items: center;
    flex-direction: column;
    button {
      width: 300px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
      border: none;
      margin-top: 18px;
      cursor: pointer;
      color: white;
    }
    .code_container {
      width: 435px;
      height: 50px;
      border-radius: 6px;
      background: white;
      padding: 0 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .code_btn {
        padding: 8px;
        height: 35px;
        border-radius: 10px;
        background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
        font-size: 14px;
        cursor: pointer;
      }
      .stop {
        background: #a1a1a1;
        cursor: not-allowed;
      }
      input {
        width: 230px;
        height: 50px;
        border-radius: 10px;
        background: #fff;
        padding: 0;
        margin-bottom: 0;
        margin-left: 0;
      }
    }
  }
}
.email_modal {
  .header {
    position: relative;
    width: 100%;
    color: #fff;
    font-size: 28px;
    line-height: 28px;
    font-weight: bold;
    img {
      height: 24px;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .text {
    width: 352px;
    padding: 31px 0;
  }
  input {
    outline: none;
    border: none;
    width: 435px;
    height: 50px;
    border-radius: 10px;
    background: #fff;
    padding: 0 15px;
    margin-bottom: 13px;
  }
}
.password_modal {
  .modal_content {
    width: 700px;
    .header {
      position: relative;
      width: 100%;
      color: #fff;
      font-size: 28px;
      line-height: 28px;
      font-weight: bold;
      margin-bottom: 44px;
      img {
        height: 24px;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .input_container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 19px;
      .label {
        width: 120px;
        text-align: right;
        white-space: nowrap;
      }
      input {
        outline: none;
        border: none;
        width: 435px;
        height: 50px;
        border-radius: 10px;
        background: #fff;
        padding: 0 15px;
        margin-bottom: 13px;
      }
    }
  }
}
.personal_info {
  width: 800px;
  min-height: 874px;
  border-radius: 20px;
  background: #ececec;
  box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
  padding: 28px 74px;
  color: #304258;
  font-size: 14px;
  letter-spacing: -0.5px;
  .basic_info {
    width: fit-content;
    padding-top: 31px;
    width: 550px;
    margin-left: 50px;
    .field {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      .label {
        text-align: right;
        width: 120px;
      }
      .user_text {
        width: 377px;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      input {
        outline: none;
        border: none;
        width: 377px;
        height: 29px;
        border-radius: 6px;
        background: #d9d9d9;
        padding: 0 14px;
        &:focus {
          background: white;
        }
      }
      .verify {
        width: 79px;
        height: 29px;
        background: #bdc1c7;
        border-radius: 6px;
        cursor: pointer;
        border: none;
      }
      .revise {
        width: 79px;
        height: 29px;
        background: #bdc1c7;
        border-radius: 6px;
        cursor: pointer;
        border: none;
      }
      .gray {
        color: #8b8b8b;
      }
    }
    .submit_btn {
      width: 300px;
      height: 38px;
      border-radius: 10px;
      background: #656565;
      color: white;
      margin: 53px 0 53px 160px;
      border: none;
      cursor: pointer;
    }
    .btn_bg {
      background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
    }
  }
}
</style>

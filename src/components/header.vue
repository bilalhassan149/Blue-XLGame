<template>
  <div class="head-main">
    <header class="head f-c">
      <div class="nav f-c" style="margin-right: 36px">
        <router-link to="/" :class="{ 'active-nav': $route.path === '/home' }">
          <img
            title="汛利娱乐"
            :alt="$en('home.search')"
            class="nav-logo"
            src="../assets/logo.png"
          />
        </router-link>
      </div>
      <div
        class="nav f-c nav-re"
        v-for="(item, index) in $store.state.appIndex"
        :key="index"
      >
        <router-link
          class="nav-text"
          active-class="active-nav"
          :to="linkFx(item)"
        >
          {{ item.gameTypeName }}
        </router-link>
        <div
          class="nav-list"
          v-loading="loadingNav"
          element-loading-text="加载中.."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)"
        >
          <div
            class="f-c nav-list-img"
            v-for="(v, n) in item.platforms"
            :key="n"
          >
            <div class="gameImg-main">
              <img
                class="gameImg"
                :class="{
                  blur: $store.state.gameError.some((e) => e === v.uniqueCode),
                }"
                :src="$store.state.iconUrl + v.pcStatic.navitation.backgroud"
                @click="$goGame(v, n)"
              />
              <div
                class="error"
                v-show="$store.state.gameError.some((e) => e === v.uniqueCode)"
              >
                <img src="../assets/image/maintainaceLogo.png" />
                <div style="margin-left: 31px; :left ">
                  {{ $en("general.maintenance") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- vip -->
      <div class="nav-bor f-c">
        <router-link class="nav f-c f" to="/discount" active-class="active-nav">
          <img src="../assets/image/nav1.png" style="margin-bottom: 1px" />
          {{ $en("discount.title") }}
        </router-link>
        <router-link class="nav f-c f" to="/vips" active-class="active-nav">
          <img src="../assets/image/vip.png" style="margin-bottom: 3px" />
          {{ $en("vip.title") }}
        </router-link>
      </div>
      <!-- login -->

      <!-- user -->
      <div class="nav f-c none" v-if="$store.state.userInfo">
        <div
          class="f-c a-color"
          @click="userFx"
          :class="{ 'active-nav': $route.path === '/user' }"
        >
          <div class="f-c avatar">
            <img
              :src="
                $store.state.iconUrl +
                ($store.state.static.avatar[$store.state.userInfo.userIcon] ||
                  $store.state.static.headIcon[$store.state.userInfo.userIcon])
              "
            />
          </div>
          <div>
            <div class="f-s">
              <b class="name">{{ $store.state.userInfo.username }}</b>
              <div class="vip f-c">
                VIP{{ $store.state.userInfo.userLevel }}
              </div>
            </div>
            <div class="nav-money">{{ $store.state.money || 0 }} ¥</div>
          </div>
        </div>
      </div>
      <div style="display: flex" v-else>
        <div class="f-c login">
          <router-link
            class="login-btn"
            to="/login"
            active-class="active-nav"
            >{{ $en("register.log_in") }}</router-link
          >
        </div>
        <div class="f-c login">
          <router-link
            class="login-btn"
            to="/register"
            active-class="active-nav"
            >{{ $en("register.title") }}</router-link
          >
        </div>
      </div>
    </header>
    <div class="modal" v-if="$store.state.card">
      <div class="modal_content">
        <div class="header">
          <div>{{ $en("popups.imp_notice") }}</div>
          <img
            src="../assets/image/modalCrossIcon.png"
            @click="$store.state.card = false"
          />
        </div>
        <div>{{ $en("popups.bonus_venue") }}</div>
        <div style="font-size: 18px; font-weight: bold; margin: 13px 0">
          {{ integerPart() }}.<span style="font-size: 14px">{{
            decimalPart()
          }}</span>
        </div>
        <div style="width: 276px">
          {{ $en("popups.turnover_question") }}
        </div>
        <div class="input">
          <div>¥</div>
          <input
            type="text"
            :placeholder="$en('inputs.amount')"
            v-model="$store.state.formData.amount"
            @blur="okformdata"
            oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
          />
          <button @click="moneyMax(all)">{{ $en("popups.maximum") }}</button>
        </div>
        <div class="btns">
          <button style="background: #9f9f9f" @click="Gbalance(0)">
            {{ $en("popups.enter_directly") }}
          </button>
          <button @click="Gbalance(1)">
            {{ $en("popups.transfer_balance") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import state from "@/store/state";
import { gameBalancegetNewestBalance, gameLoginpcLogin } from "../api/galApi";

export default {
  dicts: [],
  props: [],
  data() {
    return {
      newestBalance: 0,
      all: 1,
      total_balance: "",
      loadingNav: false,
      link: "",
    };
  },
  mounted() {
    if (this.$logins("no")) {
      this.$money();
    }
  },
  methods: {
    integerPart() {
      const integer = parseInt(state.total_balance);
      return isNaN(integer) ? "" : integer;
    },
    decimalPart() {
      const decimal = parseFloat(state.total_balance).toFixed(2);
      return isNaN(decimal) ? "" : decimal.slice(-2);
    },

    linkFx(item) {
      if (item.gameType == 1) {
        return (this.link = "/sports");
      } else if (item.gameType == 2) {
        return (this.link = "/e-game");
      } else if (item.gameType == 3) {
        return (this.link = "/person");
      } else if (item.gameType == 4) {
        return (this.link = "/chess");
      } else if (item.gameType == 5) {
        return (this.link = "/games");
      } else if (item.gameType == 6) {
        return (this.link = "/lottery");
      }
    },
    userFx() {
      this.$router.push("/user");
      state.navIcon = "purse";
      localStorage.setItem("navIcon", "purse");
    },
    gameBtn(data) {
      let that = this;
      if (that.$logins()) {
        //loading - no-click
        that.loadingNav = true;
        setTimeout(function () {
          that.loadingNav = false;
        }, 1500);
        // 电子游戏 - game
        if (data.platformType == "5") {
          if (that.$logins()) {
            that.$router.push({
              path: "/games",
              query: {
                code: data.uniqueCode,
              },
            });
          }
          return;
        }
        this.openGame(data.uniqueCode);
      }
    },
    openGame(uniqueCode) {
      gameLoginpcLogin(uniqueCode).then((res) => {
        let that = this;
        //gameError
        if (res.data.allGamePlatform) {
          that.$gameError(res.data.allGamePlatform);
        }
        // alert
        if (res.data.loginResultType == 3) {
          state.unique = uniqueCode;
          state.card = true;
          state.formData.amount = "";
          state.total_balance = res.data.loginResultData;
          console.log(state.total_balance, "tot");
          return;
        } else if (res.data.loginResultData) {
          // open - game - link
          localStorage.setItem("ifrUrl", res.data.loginResultData);
          if (that.$route.path == "/ifr") {
            that.$router.push("/ifrs"); //备用跳转 -spare
          } else {
            that.$router.push("/ifr");
          }
        } else {
          that.$codes(state.codes[res.code], 2);
        }
      });
    },
    Gbalance(e) {
      this.$gamebalance(e);
    },
    moneyMax(e) {
      gameBalancegetNewestBalance(0).then((res) => {
        if (e == 1) {
          this.$store.state.formData.amount = res.data.newestBalance;
        }
        this.newestBalance = res.data.newestBalance;
      });
    },
    okformdata(e) {
      let _this = this;
      _this.$store.state.formData[e.currentTarget.dataset.type] =
        e.detail.value;

      if (this.$store.state.formData.amount == "") {
        // this.$message.error("您的余额不足。");
        this.$codes("您的余额不足。", 2);

        return;
      }
    },
  },
  components: { RouterLink },
};
</script>

<style scoped lang="scss">
.head-main {
  padding-top: 64px;
}
.head {
  position: fixed;
  top: 0;
  z-index: 3001;
  width: 100%;
  height: 64px;
  background: linear-gradient(#c91d05, #441209);
  user-select: none;
}
.head .nav {
  height: 64px;
  margin: 0 25px;
  cursor: pointer;
  color: #fff;
  text-decoration: none;
}
.nav-text {
  font-size: 14px;
  color: #fff;
  text-decoration: none;
}
.head .nav:hover {
  border-top: 4px solid #fff;
  border-bottom: 4px solid #fff;
  transition: all ease-out 0.2s;
}
.active-nav {
  height: 64px;
  border-top: 4px solid #fff;
  border-bottom: 4px solid #fff;
  transition: all ease-out 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-logo {
  width: 137.914px;
  height: 41.335px;
  flex-shrink: 0;
  margin: 0 10px 0 10px;
}
.nav-bor {
  border-right: 2px solid #fff;
  border-left: 2px solid #fff;
  margin: 0 20px;
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
  white-space: nowrap;
}
.login {
  width: 107px;
  height: 32px;
  border-radius: 70px;
  border: 1px solid #fff;
  margin: 0 10px;
}
.login-btn {
  color: #fff;
  font-size: 14px;
  width: 99px;
  height: 26px;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
}
.login-btn:hover {
  color: #c01c05;
  background: #fff;
}
.nav-re {
  position: relative;
}
.nav-re:hover .nav-list {
  display: flex;
  @keyframes move {
    0% {
      top: -20px;
      opacity: 0.1;
    }
    100% {
      top: 64px;
      opacity: 1;
    }
  }
}
.nav-list {
  height: 336px;
  background-color: rgba(255, 255, 255, 0.7);
  position: fixed;
  z-index: 102;
  left: 0;
  top: 64px;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  display: none;
  animation-name: move;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  cursor: auto;
}
.nav-list .img {
  width: 429px;
  height: 231px;
}
.nav-list-img .gameImg {
  cursor: pointer;
  max-height: 300px;
  margin: 0 35px;
}
.blur {
  filter: blur(4px);
}
.gameImg-main {
  position: relative;
}
.gameImg-main .error {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 34px;
  top: 0;
  border-radius: 11px;
  z-index: 5;
  width: 390px;
  height: 200px;
  background: rgba(0, 0, 0, 0.5);
  gap: 12px;
  padding-top: 48px;
  padding-bottom: 19px;
  img {
    width: 128.675px;
    height: 101.739px;
    margin: 0 auto;
    opacity: 0.7;
  }
}
.avatar {
  width: 42px;
  height: 42px;
  border-radius: 100px;
  background: linear-gradient(#ef0d74, #fe6407);
  margin: 0 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
.name {
  font-size: 14px;
  margin-right: 5px;
}
.nav-money {
  font-size: 12px;
}
.vip {
  color: #7b7b7b;
  font-size: 14px;
  background: #d9d9d9;
  border-radius: 2px;
  padding: 1px 4px;
}
.a-color {
  text-decoration: none;
  color: #fff;
}
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
    font-size: 14px;
    .header {
      color: #fff;
      font-size: 28px;
      line-height: 28px;
      font-weight: bold;
      margin-bottom: 44px;
      white-space: nowrap;
      position: relative;
      width: 100%;
      img {
        height: 24px;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .input {
      display: flex;
      align-items: center;
      gap: 19px;
      margin-top: 25px;
      width: 435px;
      height: 50px;
      border-radius: 10px;
      background: #fff;
      color: #304258;
      font-size: 28px;
      line-height: 28px;
      font-weight: bold;
      padding: 0 14px;
      input {
        border: none;
        outline: none;
        height: 100%;
        flex: 1;
      }
      button {
        width: 117px;
        height: 35px;
        border-radius: 10px;
        background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
        border: none;
        color: white;
        cursor: pointer;
      }
    }
  }
  .btns {
    display: flex;
    align-items: center;
    gap: 21px;
    margin-top: 31px;
    button {
      width: 206.5px;
      height: 49.56px;
      border-radius: 10px;
      background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
      border: none;
      color: white;
      cursor: pointer;
    }
  }
}
</style>

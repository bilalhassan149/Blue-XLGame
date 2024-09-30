<template>
  <div class="leftNav">
    <div class="leftMain">
      <div class="f-c avatar-main">
        <div class="avatar" @click="showChangeProfileIcon = true">
          <img
            class="img"
            :src="
              $store.state.iconUrl +
              ($store.state.static.avatar[$store.state.userInfo.userIcon] ||
                $store.state.static.headIcon[$store.state.userInfo.userIcon])
            "
          />
          <img class="edit" src="../assets/nav/edit.png" />
        </div>
      </div>
      <div class="data">
        <div class="user-text-main">
          <div>
            <b class="name">{{ $store.state.userInfo.username }}</b>
            <div class="money">￥ {{ $store.state.money }}</div>
          </div>
          <div
            class="vip"
            :style="{ width: $store.state.userInfo.userLevel === 10 && '80px' }"
          >
            V{{ $store.state.userInfo.userLevel }}
            <img :src="vipPoints[$store.state.userInfo.userLevel].vipLogo" />
          </div>
        </div>
        <div>
          {{ day > 0 ? $en("user.joined_days", day) : $en("user.join_day") }}
        </div>
      </div>
      <div class="user-operate">
        <div
          class="f-c f operate"
          :class="{ 'operate-click': $store.state.navIcon == 'Deposit' }"
          @click="clickDeposit()"
        >
          <img
            class="operate-icon"
            style="margin-right: 5px"
            src="../assets/user/deposit.png"
          />
          <img
            class="operate-icon show"
            style="margin-right: 5px"
            src="../assets/user/deposit1.png"
          />
          <span>{{ $en("user.deposit") }}</span>
        </div>
        <div
          class="f-c f operate"
          :class="{ 'operate-click': $store.state.navIcon == 'Transfer' }"
          @click="classBtn('Transfer')"
        >
          <img class="operate-icon" src="../assets/user/transfer.png" />
          <img class="operate-icon show" src="../assets/user/transfer1.png" />
          <span>{{ $en("user.transfer") }}</span>
        </div>
        <div
          class="f-c f operate"
          :class="{ 'operate-click': $store.state.navIcon == 'Withdraw' }"
          @click="clickWithdraw()"
        >
          <img class="operate-icon" src="../assets/user/withdraw.png" />
          <img class="operate-icon show" src="../assets/user/withdraw1.png" />
          <span
            v-bind:style="{
              'margin-right':
                $en('!user.withdraw') === 'Withdraw' ? '10px' : '',
            }"
            >{{ $en("user.withdraw") }}</span
          >
        </div>
      </div>
      <div class="list">
        <div
          class="list-body"
          :class="{ s: $store.state.navIcon == 'purse' }"
          @click="classBtn('purse')"
        >
          <img src="../assets/user/leftNav.png" class="navBtn" />
          <div class="list-image">
            <img class="list-img" src="../assets/user/purse.png" />
          </div>
          <span>{{ $en("user.my_purse") }}</span>
        </div>
        <div
          class="list-body"
          :class="{ s: $store.state.navIcon == 'userVip' }"
          @click="classBtn('userVip')"
        >
          <img src="../assets/user/leftNav.png" class="navBtn" />
          <div class="list-image">
            <img class="list-img" src="../assets/user/vip.png" />
          </div>
          <span>{{ $en("user.vip_status") }}</span>
        </div>
        <div
          class="list-body"
          :class="{ s: $store.state.navIcon == 'transaction' }"
          @click="
            classBtn('transaction');
            $store.state.selectedTransactionRecord = 0;
          "
        >
          <img src="../assets/user/leftNav.png" class="navBtn" />
          <div class="list-image">
            <img class="list-img" src="../assets/user/records.png" />
          </div>
          <span>{{ $en("user.transaction_record") }}</span>
        </div>
        <div
          class="list-body"
          :class="{ s: $store.state.navIcon == 'betting' }"
          @click="classBtn('betting')"
        >
          <img src="../assets/user/leftNav.png" class="navBtn" />
          <div class="list-image">
            <img class="list-img" src="../assets/user/bet.png" />
          </div>
          <span>{{ $en("records.betting_record") }}</span>
        </div>
        <div
          class="list-body"
          :class="{ s: $store.state.navIcon == 'news' }"
          @click="classBtn('news')"
        >
          <img src="../assets/user/leftNav.png" class="navBtn" />
          <div class="list-image">
            <img
              class="list-img"
              src="../assets/user/newsIcon.png"
              style="width: 19px; height: 25px"
            />
          </div>
          <span>{{ $en("user.news_center") }}</span>
        </div>
        <div
          class="list-body"
          :class="{ s: $store.state.navIcon == 'info' }"
          @click="classBtn('info')"
        >
          <img src="../assets/user/leftNav.png" class="navBtn" />
          <div class="list-image">
            <img class="list-img" src="../assets/user/info.png" />
          </div>
          <span>{{ $en("user.personal_info") }}</span>
        </div>
      </div>
      <div class="f-c out" @click="outFx">
        <img class="out-img" src="../assets/user/out.png" />
        <span>{{ $en("user.logout") }}</span>
      </div>
    </div>
    <div class="modal" v-if="showChangeProfileIcon">
      <div class="modal_content">
        <div class="header">
          <div>{{ $en("user.choose_selfie") }}</div>
          <img
            src="../assets/image/modalCrossIcon.png"
            @click="showChangeProfileIcon = false"
          />
        </div>
        <div class="tabs">
          <div
            class="tab"
            :class="{ selected_tab: currentTab === 'real' }"
            @click="currentTab = 'real'"
          >
            {{ $en("user.real_person") }}
          </div>
          <div
            class="tab"
            :class="{ selected_tab: currentTab === 'avatar' }"
            @click="currentTab = 'avatar'"
          >
            {{ $en("user.avatar") }}
          </div>
        </div>
        <div class="profileIcons" v-if="currentTab == 'real'">
          <img
            v-for="(item, key) in $store.state.static.headIcon"
            :key="key"
            :src="$store.state.iconUrl + item"
            @click="updateProfileIcon(key, item)"
          />
        </div>
        <div class="profileIcons" v-if="currentTab == 'avatar'">
          <img
            v-for="(item, key) in $store.state.static.avatar"
            :key="key"
            :src="$store.state.iconUrl + item"
            @click="updateProfileIcon(key, item)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import state from "../store/state";
import {
  logOut,
  userInfogetAllBankCard,
  userInfochangeIcon,
} from "../api/galApi";

export default {
  data() {
    return {
      day: 0,
      userInfo: "",
      showChangeProfileIcon: false,
      currentTab: "real",
      vipPoints: [
        {
          vipLogo: require("../assets/image/vip/vip0.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip1.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip2.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip3.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip4.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip5.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip6.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip7.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip8.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip9.png"),
        },
        {
          vipLogo: require("../assets/image/vip/vip10.png"),
        },
      ],
    };
  },
  beforeMount() {
    this.inits();
  },
  methods: {
    classBtn(val) {
      state.navIcon = val;
      localStorage.setItem("navIcon", state.navIcon);
    },
    async clickWithdraw() {
      userInfogetAllBankCard().then((res) => {
        if (res.data.allBankCard.length > 0) {
          this.classBtn("Withdraw");
        } else {
          this.$codes(state.en.alerts.bank, 2);
          this.classBtn("purse");
        }
      });
      const wvList = await this.$currencyType();
      if (wvList.length > 0) {
        this.classBtn("Withdraw");
      } else {
        this.$codes(state.en.alerts.bank, 2);
        this.classBtn("purse");
      }
    },
    clickDeposit() {
      if (state.user.identityCard) {
        this.classBtn("Deposit");
      } else {
        this.$codes(state.en.alerts.id, 2);
        this.classBtn("info");
      }
    },
    outFx() {
      logOut().then((res) => {
        if (res.code == 0) {
          this.$clear();
        } else {
          this.$codes(state.codes[res.code], 2);
        }
        this.$router.push("/login");
      });
    },
    inits() {
      if (this.$logins() && state.iconUrl) {
        this.userInfo = state.userInfo;
        this.day = this.getDiffDay(
          Date.parse(new Date()),
          this.userInfo.registerTime
        );
        this.$userData();
        this.$bankApi();
        this.$currencyType();
        this.$allGameMoney();
      }
    },
    getDiffDay(myDate_1, myDate_2) {
      let totalDays, diffDate;
      diffDate = Math.abs(myDate_1 - myDate_2); // 取相差毫秒数的绝对值
      totalDays = Math.floor(diffDate / (1000 * 3600 * 24)); // 向下取整
      return totalDays; // 相差的天数
    },
    updateProfileIcon(e, item) {
      userInfochangeIcon(e).then((res) => {
        if (res.code === 0) {
          this.$codes(state.codes[res.code], 1);
          state.userInfo.avatar = state.siteUrl + item;
          state.userInfo.userIcon = e;
          localStorage.setItem("memberInfo", JSON.stringify(state.userInfo));
          this.showChangeProfileIcon = false;
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
    width: 480px;
    flex-shrink: 0;
    border-radius: 30px;
    background: linear-gradient(64deg, #1a1c2b 49.57%, #c91d05 269.88%);
    box-shadow: 7px 7px 20px 0px rgba(0, 0, 0, 0.58);
    padding: 25px 36px;
    .header {
      position: relative;
      width: 100%;
      color: #fff;
      font-weight: bold;
      white-space: nowrap;
      img {
        height: 24px;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .tabs {
      width: 306px;
      height: 33px;
      flex-shrink: 0;
      border-radius: 30px;
      background: linear-gradient(64deg, #c91d05 3.52%, #1a1c2b 138.44%);
      box-shadow: 7px 7px 20px 0px rgba(0, 0, 0, 0.58);
      margin: 25px auto;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 5px;
      .tab {
        width: 145px;
        height: 27px;
        flex-shrink: 0;
        border-radius: 54px;
        color: #fff;
        padding: 4px;
      }
      .selected_tab {
        background: #fff;
        color: #b53d1e;
      }
    }
    .profileIcons {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      width: 100%;
      padding: 0 11px;
      img {
        width: 85px;
        height: 85px;
        flex-shrink: 0;
      }
    }
  }
}
.leftNav {
  box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.8);
  margin-right: 16px;
  border-radius: 20px;
  user-select: none;
}
.leftMain {
  border-radius: 20px;
  background: linear-gradient(140deg, #c91d05, #441209);
  min-height: 840px;
  width: 266px;
  padding: 0px 17px 50px 17px;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  height: 100%;
  .avatar {
    width: 92.5px;
    height: 92.5px;
    margin: -12px 0 18px 0;
    border-radius: 60px;
    background: #b3d6fd;
    position: relative;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .edit {
    position: absolute;
    bottom: -12px;
    right: 0px;
  }
  .data {
    margin: 0 auto;
    width: 202px;
    color: #fff;
    font-size: 14px;
    margin-bottom: 28px;
    user-select: none;
  }
  .vip {
    width: 64px;
    height: 28px;
    margin-right: 20px;
    padding-left: 13px;
    border-radius: 5px;
    background: #d9d9d9;
    color: #7b7b7b;
    font-size: 18px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .vip img {
    height: 48px;
  }
  .operate-icon {
    margin-bottom: 12px;
  }
  .operate-click .operate-icon {
    display: none;
  }
  .show {
    display: none;
  }
  .operate-click .show {
    display: block;
  }
  .operate {
    border-radius: 10px;
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    width: 73px;
    height: 73px;
  }
  .operate-click {
    background: #fff;
    color: #780f00;
  }
  .user-text-main {
    display: flex;
    justify-content: space-between;
  }
  .user-operate {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  .out {
    height: 38px;
    width: 142px;
    background: #fff;
    font-size: 14px;
    color: #be1c05;
    margin: 0 auto;
    border-radius: 100px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: 180px;
    cursor: pointer;
  }
  .out-img {
    margin-right: 8px;
  }
  .list-body {
    display: flex;
    font-size: 14px;
    color: #fff;
    margin-bottom: 30px;
    padding-left: 20px;
    align-items: center;
    cursor: pointer;
    position: relative;
    transition: all ease-out 0.4s;
  }
  .navBtn {
    opacity: 0;
    position: absolute;
    left: -17px;
    top: -7px;
  }
  .list-body.s .navBtn {
    transition: all ease-out 0.3s;
    opacity: 1;
  }
  .list-image {
    width: 50px;
  }
}
</style>

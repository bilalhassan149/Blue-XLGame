<template>
  <div class="purse">
    <div
      class="purse_container"
      v-loading="$store.state.gameMoneyLoading"
      :element-loading-text="$en('alerts.loading')"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    >
      <div class="purse_top">
        <button
          class="recovery_btn"
          @click="
            $store.state.gameMoneyLoading = true;
            $allMoney();
          "
        >
          <img
            :class="[state ? 'g' : 'a']"
            @click="state = !state"
            src="../../assets/user/recoveryIcon.png"
          />
          <div>{{ $en("user.recovery") }}</div>
        </button>
      </div>
      <div class="wallets">
        <button>
          <div class="wallet">
            <img src="../../assets/user/walletIcon.png" />
            <div>{{ $en("user.center_wallet") }}</div>
          </div>
          <div style="font-weight: bold">{{ $store.state.money }}￥</div>
        </button>
        <button>
          <div class="wallet">
            <img src="../../assets/user/lockIcon.png" />
            <div>{{ $en("user.lock_wallet") }}</div>
          </div>
          <div style="font-weight: bold">{{ lockBalance }}￥</div>
        </button>
      </div>
      <div class="protocol">{{ $en("user.cash_card") }}</div>
      <div class="portocol_container">
        <div class="bank">
          <div class="tabs">
            <div
              class="tab"
              :class="{ border_bottom: currentTab === 'Bankcard' }"
              @click="currentTab = 'Bankcard'"
            >
              <img src="../../assets/user/bankCardIcon.png" />
              <div>{{ $en("user.bank_card") }}</div>
            </div>
            <div
              class="tab"
              :class="{ border_bottom: currentTab === 'Virtual Currency' }"
              @click="currentTab = 'Virtual Currency'"
            >
              <img src="../../assets/user/vcIcon.png" />
              <div>{{ $en("user.vc_currency") }}</div>
            </div>
          </div>
          <div v-if="currentTab === 'Bankcard'" class="bank_container">
            <div
              class="bankInfo_card"
              v-for="(bank, index) in bankList"
              :key="index"
            >
              <div class="card_content">
                <div class="banks-icon">
                  <img :src="bank.bankLogo" />
                </div>
                <div>
                  <div>{{ bank.bankName }}</div>
                  <div class="f-c" @click="$copyFx(bank.bankNo)">
                    <div class="bank_no">{{ bank.bankNo }}</div>
                    <img class="cp" src="../../assets/user/copyIcon.png" />
                  </div>
                </div>
              </div>
              <div
                class="card_content"
                @click="
                  showConfirmationPopup = true;
                  paymentId = bank.paymentId;
                "
              >
                <img class="cp" src="../../assets/user/deleteIcon.png" />
              </div>
            </div>
            <button @click="showBankCardPopup()">
              + {{ $en("user.add_bankcard_btn") }}
            </button>
            <div class="info">
              <img src="../../assets/user/infoIcon.png" />
              <div>{{ $en("user.max_card_info") }}</div>
            </div>
          </div>
          <div v-if="currentTab === 'Virtual Currency'" class="bank_container">
            <div
              class="bankInfo_card"
              v-for="(item, index) in currencyList"
              :key="index"
            >
              <div class="card_content">
                <img :src="item.icon" />
                <div>
                  <div>{{ item.walletName }}</div>
                  <div class="f-c" @click="$copyFx(item.walletNo)">
                    <div class="bank_no">{{ item.walletNo }}</div>
                    <img class="cp" src="../../assets/user/copyIcon.png" />
                  </div>
                </div>
              </div>
              <div class="card_content">
                <img
                  class="cp"
                  src="../../assets/user/deleteIcon.png"
                  @click="
                    showConfirmationPopup = true;
                    paymentId = item.paymentId;
                  "
                />
              </div>
            </div>
            <button @click="$store.state.newVirtualWalletPopup = true">
              + {{ $en("user.add_vw_btn") }}
            </button>
            <div class="info">
              <img src="../../assets/user/infoIcon.png" />
              <div>{{ $en("user.max_vw_info") }}</div>
            </div>
          </div>
        </div>
        <div class="sports_record" v-if="$store.state.gameMoney">
          <div
            class="record_data"
            v-for="(item, index) in $store.state.gameMoney.slice(1)"
            :key="index"
          >
            <div class="sport_name">
              <img
                :src="
                  $store.state.iconUrl + $store.state.static.gameIcon[item.key]
                "
              />
              <div>{{ item.name }}</div>
            </div>
            <div
              :style="{
                color:
                  item.bstatus === 1 || item.bstatus === 2 ? '#FF605B' : '',
                fontWeight: item.balance === null ? 'normal' : 'bold',
              }"
            >
              {{
                item.balance === null
                  ? item.bstatus === 1
                    ? $store.state.en.user.venue_maintenance
                    : item.bstatus === 2
                    ? $store.state.en.user.query_failed
                    : ""
                  : item.balance
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="purse_record_container">
      <div class="purse_record">
        <div class="heading">
          <div class="text">{{ $en("records.betting_record") }}</div>
          <button @click="classBtn('betting')">
            {{ $en("records.more") }}
          </button>
        </div>
        <div class="records_data">
          <div v-if="isLoading">
            <p style="text-align: center">{{ $en("alerts.loading") }}</p>
          </div>
          <div v-else>
            <div v-if="bettingRecords?.length === 0">
              <p>{{ $en("records.no_records") }}</p>
            </div>
            <div v-else>
              <div
                class="record"
                v-for="(record, index) in bettingRecords"
                :key="index"
              >
                <div>
                  <div>{{ $en("records.bet_time") }}</div>
                  <div>{{ $en("records.order_number") }}</div>
                  <div>{{ $en("records.bet_amount") }}</div>
                  <div>{{ $en("records.status") }}</div>
                </div>

                <div style="width: 130px">
                  <div>{{ $gettime(record.betTime) }}</div>
                  <div class="line1">{{ record.recordNo }}</div>
                  <div>{{ record.betAmount.toFixed(2) }}</div>
                  <div
                    :class="[
                      record.winLossAmount <= 0 ? 'negative' : 'positive',
                    ]"
                  >
                    {{
                      record.winLossAmount <= 0
                        ? $en("records.loose")
                        : $en("records.win")
                    }}:
                    {{ record.winLossAmount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="$store.state.newBankCardPopup">
      <div class="modal_content">
        <div class="header">
          <div>{{ $en("user.add_bankcard_btn") }}</div>
          <img
            src="../../assets/image/modalCrossIcon.png"
            @click="
              $store.state.newBankCardPopup = false;
              clearData();
            "
          />
        </div>
        <div class="input_contianer">
          <div class="label">{{ $en("popups.cardholder_name") }}:</div>
          <input type="text" :placeholder="user.realName" disabled />
        </div>
        <div class="text">
          {{ $en("popups.consistent_name") }}
        </div>
        <div class="input_contianer">
          <div class="label">{{ $en("popups.card_number") }}:</div>
          <input
            type="text"
            :placeholder="$en('inputs.silver_card_no')"
            v-model="bankCardNumber"
          />
        </div>
        <div class="text">
          {{ $en("popups.clarify_bank_number") }}
        </div>
        <div class="input_contianer">
          <div class="label">{{ $en("popups.branch_address") }}:</div>
          <input
            type="text"
            :placeholder="$en('inputs.bank_branch_address')"
            v-model="bankBranchAddress"
          />
        </div>
        <div class="info">
          <img src="../../assets/user/infoIcon.png" />
          <div>{{ $en("general.any_question") }}</div>
          <div @click="$about()" class="anchor">
            {{ $en("home.customer_service") }}
          </div>
        </div>
        <button @click="addBankCard(bankCardNumber)">
          {{ $en("user.submit_btn") }}
        </button>
      </div>
    </div>
    <div class="modal" v-if="$store.state.newVirtualWalletPopup">
      <div class="modal_content">
        <div class="header">
          <div>{{ $en("user.add_vw_btn") }}</div>
          <img
            src="../../assets/image/modalCrossIcon.png"
            @click="
              $store.state.newVirtualWalletPopup = false;
              clearData();
            "
            style="margin-left: -20px"
          />
        </div>
        <div class="input_contianer">
          <div class="label">{{ $en("popups.wallet_name") }}:</div>
          <input
            type="text"
            :placeholder="$en('inputs.wallet_name')"
            v-model="walletName"
          />
        </div>
        <div class="input_contianer" style="margin-left: -55px">
          <div class="label">{{ $en("popups.vc_protocol") }}:</div>
          <div class="btns">
            <div
              class="btn"
              v-for="(item, index) in allVCProtocol"
              :key="index"
              @click="
                vcProtocol = item.currencyName;
                selectedIndex = index;
              "
              :class="{ selected: index === selectedIndex }"
            >
              {{ item.currencyName }}
            </div>
          </div>
        </div>
        <div class="input_contianer">
          <div class="label">{{ $en("popups.vc_address") }}:</div>
          <input
            type="text"
            :placeholder="$en('inputs.vw_address')"
            v-model="vcAddress"
          />
        </div>
        <div class="info">
          <img src="../../assets/user/infoIcon.png" />
          <div>{{ $en("general.any_question") }}</div>
          <div @click="$about()" class="anchor">
            {{ $en("home.customer_service") }}
          </div>
        </div>
        <button @click="addVirtualWallet()">
          {{ $en("user.submit_btn") }}
        </button>
      </div>
    </div>
    <div class="modal" v-if="showConfirmationPopup">
      <div class="modal_content" style="width: 568px">
        <div style="text-align: center; font-weight: bold; font-size: 28px">
          <div>{{ $en("popups.confirmation") }}</div>
        </div>
        <div style="margin: 24px 0">{{ $en("popups.confirmation_text") }}</div>
        <div class="confirmation_btn">
          <button
            style="background: #656565"
            @click="showConfirmationPopup = false"
          >
            {{ $en("popups.cancel") }}
          </button>
          <button @click="deleteBindedAcc()" style="margin-left: 16px">
            {{ $en("popups.yes") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  gameBalancegetLockBalance,
  serachBank,
  userBindallVCProtocol,
  userBindbatchUnbindBankCard,
  userBindbatchUnbindVCWallet,
  userBindbindBankCard,
  userBindbindVCWallet,
  userInfogetAllBankCard,
  userRecordqueryBetRecordByTimeType,
} from "@/api/galApi";
import state from "@/store/state";

export default {
  name: "PCXLGamepurse",

  data() {
    return {
      currentTab: "Bankcard",
      selectedVC: "EBPay",
      bettingRecords: [],
      isLoading: true,
      lockBalance: "",
      bankList: [],
      currencyList: [],
      allVCProtocol: [],
      user: "",
      walletName: "",
      vcAddress: "",
      vcProtocol: "",
      selectedIndex: 0,
      bankCardNumber: "",
      bankBranchAddress: "",
      state: false,
      showConfirmationPopup: false,
      paymentId: "",
    };
  },
  beforeMount() {
    setTimeout(() => {
      this.user = state?.user;
    }, 1000);
  },
  mounted() {
    this.getBettingRecords();
    this.getLockBalace();
    this.getBankList();
    this.getwall();
  },

  methods: {
    classBtn(val) {
      state.navIcon = val;
      localStorage.setItem("navIcon", state.navIcon);
    },
    showBankCardPopup() {
      if (state.user.realName) {
        state.newBankCardPopup = true;
      } else {
        this.$codes(
          "为了您的资金安全，请前往个人中心填写身份信息，否则无法添加银行卡",
          2
        );
        this.classBtn("info");
      }
    },
    getBettingRecords() {
      userRecordqueryBetRecordByTimeType(1, 10, 3, "").then((res) => {
        this.isLoading = false;
        if (res && res.data && res.data.rows && res.data.rows[0]) {
          this.bettingRecords = res.data.rows[0].recordList;
        }
      });
    },
    getLockBalace() {
      gameBalancegetLockBalance().then((res) => {
        if (res.code === 0) {
          this.lockBalance = res.data.lockBalance;
        }
      });
    },
    async getBankList() {
      userInfogetAllBankCard().then((res) => {
        if (res.code === 0) {
          this.bankList = res.data.allBankCard;
        }
      });

      this.currencyList = await this.$currencyType();
    },
    getwall() {
      userBindallVCProtocol().then((res) => {
        let a = [];
        const allVCProtocol = res.data.allVCProtocol;
        this.vcProtocol = Object.values(allVCProtocol)[0].currencyName;
        for (let key in allVCProtocol) {
          if (Object.prototype.hasOwnProperty.call(allVCProtocol, key)) {
            a.push(allVCProtocol[key]);
          }
        }
        this.allVCProtocol = a;
      });
    },
    addBankCard(e) {
      if (!state.rule.bankCard.test(this.bankCardNumber)) {
        this.$codes(state.en.rules.bankCard, 2);
        return;
      }
      if (!this.bankBranchAddress) {
        this.$codes(state.en.rules.bank_address, 2);
        return;
      }
      serachBank(e).then((res) => {
        if (res.code == 0) {
          userBindbindBankCard(
            this.bankCardNumber,
            this.bankBranchAddress
          ).then((res) => {
            if (res.code === 0) {
              this.$codes(state.codes[res.code], 1);
              this.getBankList();
              state.newBankCardPopup = false;
              this.clearData();
            } else {
              this.$codes(state.codes[res.code], 2);
            }
          });
        } else {
          this.$codes(state.codes[res.code], 2);
        }
      });
    },
    removeBankCard() {
      userBindbatchUnbindBankCard(this.paymentId).then((res) => {
        if (res.code === 0) {
          this.$codes(state.codes[res.code], 1);
          this.getBankList();
          this.showConfirmationPopup = false;
        } else {
          this.$codes(state.codes[res.code], 2);
        }
      });
    },
    addVirtualWallet() {
      if (this.walletName.length < 2) {
        this.$codes(state.en.rules.no_wallet, 2);
        return;
      }
      if (!this.vcAddress) {
        this.$codes(state.en.rules.virtual, 2);
        return;
      }
      if (this.walletName && this.vcProtocol && this.vcAddress) {
        if (this.vcProtocol === "EBPay") {
          if (!state.rule.ebPay.test(this.vcAddress)) {
            this.$codes(state.en.rules.virtual, 2);
            return;
          }
        }
        if (this.vcProtocol === "TRC20") {
          if (!state.rule.trc20.test(this.vcAddress)) {
            this.$codes(state.en.rules.virtual, 2);
            return;
          }
        }
        if (this.vcProtocol === "ERC20") {
          if (!state.rule.erc20.test(this.vcAddress)) {
            this.$codes(state.en.rules.virtual, 2);
            return;
          }
        }
        userBindbindVCWallet(
          this.vcAddress,
          this.vcProtocol,
          this.walletName
        ).then((res) => {
          if (res.code == 0) {
            this.$codes(state.codes[res.code], 1);
            this.getBankList();
            state.newVirtualWalletPopup = false;
            this.clearData();
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        });
      }
    },
    removeVirtualWallet() {
      userBindbatchUnbindVCWallet(this.paymentId).then((res) => {
        if (res.code === 0) {
          this.$codes(state.codes[res.code], 1);
          this.getBankList();
          this.showConfirmationPopup = false;
        } else {
          this.$codes(state.codes[res.code], 2);
        }
      });
    },
    deleteBindedAcc() {
      if (this.currentTab === "Bankcard") {
        this.removeBankCard();
      } else {
        this.removeVirtualWallet();
      }
    },
    clearData() {
      (this.vcAddress = ""),
        (this.walletName = ""),
        (this.bankCardNumber = ""),
        (this.bankBranchAddress = "");
    },
  },
};
</script>

<style lang="scss" scoped>
.purse {
  display: flex;
  gap: 15px;
  color: #304258;
  font-size: 14px;
  letter-spacing: -0.5px;
  .purse_container {
    width: 800px;
    min-height: 874px;
    border-radius: 20px;
    background: #ececec;
    box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
    padding-top: 31px;
    .purse_top {
      display: flex;
      justify-content: center;
      color: #304258;
      font-size: 26px;
      line-height: 26px;
      font-weight: bold;
      margin-left: -55px;
      .recovery_btn {
        display: flex;
        align-items: center;
        gap: 8px;
        color: white;
        border-radius: 50px;
        cursor: pointer;
        background: #b53d1e;
        box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
        padding: 14px 24px;
        margin-left: 60px;
        border: none;
        img {
          width: 23px;
          height: 18.4px;
        }
      }
    }

    .wallets {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 11px;
      margin: 18px;
      button {
        border: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 290px;
        height: 50px;
        border-radius: 10px;
        border: 3px solid #c91d05;
        padding: 0 16px;
        .wallet {
          display: flex;
          align-items: center;
          gap: 16px;
          img {
            width: 25px;
          }
        }
      }
    }
    .protocol {
      width: 92px;
      color: #9c200d;
      font-size: 16px;
      font-weight: bold;
      margin: 40px 0 16px 32px;
      border-bottom: 4px solid #304258;
      text-align: right;
      padding-right: 5px;
    }
    .portocol_container {
      display: flex;
      gap: 8px;
      padding: 15px 15px 15px 0;
      .bank {
        width: 450px;
        .tabs {
          background: #bdc1c7;
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          .tab {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            width: 48%;
            height: 100%;
            color: #304258;
            font-size: 16px;
            cursor: pointer;
            img {
              height: 25px;
            }
          }
          .border_bottom {
            border-bottom: 6px solid #c91d05;
          }
        }
        .bank_container,
        .vc_container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 30px;
          .text {
            padding-left: 30px;
          }
          .bankInfo_card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 400px;
            height: 50px;
            border-radius: 10px;
            border: 3px solid #c91d05;
            background: linear-gradient(
              270deg,
              #e60e25 -57.02%,
              rgba(217, 217, 217, 0) 75.58%
            );
            padding: 0 20px;
            img {
              height: 25px;
            }
            .card_content {
              display: flex;
              align-items: center;
              gap: 18px;
              .bank_no {
                max-width: 270px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
          .info {
            display: flex;
            align-items: center;
            gap: 13px;
            color: #6f839b;
            img {
              height: 25px;
            }
          }
        }
        input {
          width: 300px;
          height: 50px;
          outline: none;
          border: none;
          flex-shrink: 0;
          border-radius: 10px;
          background: #bdc1c7;
          padding: 20px;
          &:focus {
            background-color: white;
          }
        }
        button {
          width: 300px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
          border: none;
          cursor: pointer;
          color: white;
        }
      }
      .sports_record {
        width: 364px;

        .record_data {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 34px;
          border-radius: 89px;
          background: #647182;
          height: 41px;
          margin-bottom: 5px;
          color: white;
          font-weight: bold;
          .sport_name {
            display: flex;
            align-items: center;
            gap: 17px;
            img {
              height: 26px;
              width: 40px;
              object-fit: contain;
            }
          }
        }
        .record_data:nth-of-type(even) {
          background: #304258;
        }
      }
    }
  }
  .purse_record_container {
    border-radius: 20px;
    background: #ececec;
    box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
    min-width: 266px;

    padding: 32px 0;
    .purse_record {
      height: 100%;

      padding: 0 16px;
      font-size: 12px;
      .heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #9c200d;
        font-weight: bold;
        font-size: 14px;
        padding-bottom: 16px;
        button {
          border: none;
          background: transparent;
          cursor: pointer;
          color: #0098e5;
          border-bottom: 2px solid #0098e5;
        }
      }
      .records_data {
        .record {
          display: flex;
          justify-content: space-between;
          border-bottom: 2px solid white;
          padding: 12px 0;
          div > div {
            padding: 6px 0;
          }
        }
      }
    }
  }
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
    width: 754px;
    padding: 25px 36px;
    border-radius: 30px;
    background: linear-gradient(64deg, #1a1c2b 49.57%, #c91d05 269.88%);
    box-shadow: 7px 7px 20px 0px rgba(0, 0, 0, 0.58);
    display: flex;
    // align-items: center;
    flex-direction: column;
    font-size: 14px;
    .header {
      color: #fff;
      font-weight: bold;
      margin-bottom: 44px;
      white-space: nowrap;
      position: relative;
      img {
        height: 24px;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .input_contianer {
      display: flex;
      align-items: center;
      gap: 10px;
      .label {
        width: 200px;
        text-align: right;
        white-space: nowrap;
      }
      input {
        border: none;
        outline: none;
        width: 527px;
        height: 50px;
        flex-shrink: 0;
        border-radius: 10px;
        background: #fff;
        padding: 0 18px;
      }
      .btns {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #304258;

        .btn {
          width: 126px;
          height: 39px;
          margin: 32px 0;
          border-radius: 10px;
          background: #fff;
          padding: 10px;
          cursor: pointer;
        }
        .selected {
          background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
          color: white;
        }
      }
    }
    .info {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 30px 0;
      .anchor {
        color: #4197ff;
        text-decoration: underline;
        cursor: pointer;
      }
      img {
        height: 25px;
      }
    }
    .text {
      width: 566px;
      margin: 24px auto;
    }
    button {
      border: none;
      color: #fff;
      cursor: pointer;
      width: 300px;
      height: 38px;
      flex-shrink: 0;
      border-radius: 10px;
      background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
      margin: 0 auto;
    }
    .confirmation_btn {
      margin: 0 8px;
      margin-top: 15px;
      button {
        width: 193.875px;
      }
    }
  }
}
</style>

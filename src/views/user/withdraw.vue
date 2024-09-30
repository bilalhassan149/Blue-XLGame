<template>
  <div class="withdrawal">
    <div
      class="withdrawal_container"
      v-loading="$store.state.gameMoneyLoading"
      :element-loading-text="$en('alerts.loading')"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    >
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
      <div class="protocol">{{ $en("user.choose_protocol") }}</div>
      <div class="portocol_container">
        <div class="bank">
          <div class="tabs">
            <div
              class="tab"
              :class="{ border_bottom: currentTab === 'Bankcard' }"
              @click="
                currentTab = 'Bankcard';
                amount = '';
                withdrawId = '';
                minAmount = 500;
                maxAmount = 5000;
                getBankList();
                withdrawCardIndex = 0;
              "
            >
              <img src="../../assets/user/bankCardIcon.png" />
              <div>{{ $en("user.bank_card") }}</div>
            </div>
            <div
              class="tab"
              :class="{ border_bottom: currentTab === 'Virtual Currency' }"
              @click="
                currentTab = 'Virtual Currency';
                amount = '';
                withdrawId = '';
                getVcList();
                withdrawCardIndex = 0;
                getExchangeRate();
              "
            >
              <img src="../../assets/user/vcIcon.png" />
              <div>{{ $en("user.vc_currency") }}</div>
            </div>
          </div>
          <div v-if="currentTab === 'Bankcard'" class="bank_container">
            <div class="add_new">
              <div>{{ $en("user.add_new_bankcard") }}</div>
              <img
                src="../../assets/user/addIcon.png"
                @click="
                  classBtn('purse');
                  $store.state.newBankCardPopup = true;
                "
              />
            </div>
            <div class="bankInfo_card">
              <div
                class="card_content"
                v-for="(bank, index) in bankList"
                :key="index"
                :class="{
                  selected_card: withdrawId && index === withdrawCardIndex,
                }"
                @click="
                  withdrawId = bank.paymentId;
                  payWayType = bank.payWayType;
                  withdrawCardIndex = index;
                "
              >
                <div class="banks-icon">
                  <img :src="bank.bankLogo" />
                </div>
                <div>
                  <div>{{ bank.bankName }}</div>
                  <div class="line1" style="width: 320px">
                    {{ bank.bankNo }}
                  </div>
                </div>
              </div>
            </div>
            <div class="withdraw_amt">
              <div>{{ $en("records.amount") }}</div>
              <input
                type="text"
                :placeholder="`请输入取款金额(范围: ${minAmount} ~ ${maxAmount} 元)`"
                oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
                v-model="amount"
              />
              <button
                :class="{ btn_bg: amount > minAmount - 1 }"
                @click="checkWithdrawAmount()"
              >
                {{ $en("user.withdraw_imd") }}
              </button>
            </div>
          </div>
          <div v-if="currentTab === 'Virtual Currency'" class="vc_container">
            <div class="add_new">
              <div>{{ $en("user.add_new_vw") }}</div>
              <img
                src="../../assets/user/addIcon.png"
                @click="
                  classBtn('purse');
                  $store.state.newVirtualWalletPopup = true;
                "
              />
            </div>
            <div class="bankInfo_card">
              <div
                class="card_content"
                v-for="(item, index) in currencyList"
                :key="index"
                @click="
                  withdrawId = item.paymentId;
                  currencyType = item.currencyType;
                  payWayType = item.payWayType;
                  withdrawCardIndex = index;
                  text = item.text;
                  getExchangeRate();
                  getSurplus();
                "
                :class="{
                  selected_card: withdrawId && index === withdrawCardIndex,
                }"
              >
                <img :src="item.icon" />
                <div>
                  <div class="line1" style="width: 320px">
                    {{ item.walletNo }}
                  </div>
                </div>
              </div>
            </div>
            <div class="withdraw_amt">
              <div>{{ $en("records.amount") }}</div>
              <input
                type="text"
                :placeholder="`请输入取款金额(范围: ${minAmount} ~ ${maxAmount} 元)`"
                v-model="amount"
                oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
              />
              <div style="font-weight: normal">
                预计提现 {{ (amount / exchangeRate).toFixed(2) }} {{ text }}
              </div>
              <button
                :class="{ btn_bg: amount > minAmount - 1 }"
                @click="checkWithdrawAmount()"
              >
                {{ $en("user.withdraw_imd") }}
              </button>
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
    <div class="withdrawal_record_container">
      <div class="withdrawal_record">
        <div class="heading">
          <div class="text">{{ $en("records.withdrawal_record") }}</div>
          <button
            @click="
              classBtn('transaction');
              $store.state.selectedTransactionRecord = 1;
            "
          >
            {{ $en("records.more") }}
          </button>
        </div>
        <div class="records_data">
          <div v-if="isLoading">
            <p style="text-align: center">{{ $en("alerts.loading") }}</p>
          </div>
          <div v-else>
            <div v-if="withdrawalRecords.length === 0">
              <p>{{ $en("records.no_records") }}</p>
            </div>
            <div v-else>
              <div
                class="record"
                v-for="(record, index) in withdrawalRecords"
                :key="index"
              >
                <div>
                  <div>{{ $en("records.application_time") }}</div>
                  <div>{{ $en("records.order_number") }}</div>
                  <div>{{ $en("records.process_time") }}</div>
                  <div>{{ $en("records.amount") }}</div>
                  <div>{{ $en("records.status") }}</div>
                  <div>{{ $en("vip.remarks") }}</div>
                </div>
                <div style="width: 130px">
                  <div>{{ $gettime(record.createTime) }}</div>
                  <div class="line1">{{ record.withdrawOrder }}</div>
                  <div>{{ $gettime(record.finishTime) }}</div>
                  <div>{{ record.withdrawAmt.toFixed(2) }}</div>
                  <div>
                    {{ $allState(record.withdrawState, "withdrawState") }}
                  </div>
                  <div style="color: #0dbc53">
                    {{ record.orderRemark || "-" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="showAlertModal">
      <div class="modal_content">
        <div class="header">
          <div>温馨提示</div>
          <img
            src="../../assets/image/modalCrossIcon.png"
            @click="showAlertModal = false"
          />
        </div>
        <div>
          您的有效投注还差:{{
            demandAmount
          }}
          元（拉取注单会有1-10分钟延迟），继续提现将扣除:{{ poundageAmount }}
          元手续费
        </div>
        <div class="btns">
          <button style="background: #9f9f9f" @click="showAlertModal = false">
            取消
          </button>
          <button
            @click="
              currentTab === 'Bankcard'
                ? withdrawBankAmount()
                : withdrawWalletAmount()
            "
          >
            继续提款
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  gameBalancegetLockBalance,
  userInfogetAllBankCard,
  userRecordgetRecord,
  userWithdraw,
  userWithdrawcheckAmount,
  userWithdrawgetCurrencyExchangeRate,
  userWithdrawtodaySurplusTimes,
} from "@/api/galApi";
import state from "@/store/state";

export default {
  name: "PCXLGameWithdraw",

  data() {
    return {
      currentTab: "Bankcard",
      selectedVC: "EBPay",
      withdrawalRecords: [],
      isLoading: true,
      lockBalance: "",
      bankList: [],
      currencyList: [],
      amount: "",
      withdrawId: "",
      withdrawCardIndex: 0,
      showAlertModal: false,
      demandAmount: "",
      poundageAmount: "",
      payWayType: "",
      currencyType: "",
      exchangeRate: "",
      minAmount: 500,
      maxAmount: 5000,
      surplusTime: {},
      state: false,
      text: "",
    };
  },

  mounted() {
    this.getWithdrawalRecords();
    this.getLockBalace();
    this.getBankList();
    this.getVcList();
  },

  methods: {
    classBtn(val) {
      state.navIcon = val;
      localStorage.setItem("navIcon", state.navIcon);
    },
    getWithdrawalRecords() {
      userRecordgetRecord(1, 1, 5, 3).then((res) => {
        this.isLoading = false;
        this.withdrawalRecords = res.data.rows;
      });
    },
    getLockBalace() {
      gameBalancegetLockBalance().then((res) => {
        this.lockBalance = res.data.lockBalance;
      });
    },
    async getBankList() {
      userInfogetAllBankCard().then((res) => {
        this.bankList = res.data.allBankCard;
        this.withdrawId = res.data.allBankCard[0].paymentId;
        this.payWayType = res.data.allBankCard[0].payWayType;
        this.getSurplus();
      });
    },
    async getVcList() {
      this.currencyList = await this.$currencyType();
      this.withdrawId = this.currencyList[0].paymentId;
      this.payWayType = this.currencyList[0].payWayType;
      this.text = this.currencyList[0].text;
      this.getSurplus();
      this.currencyType = this.currencyList[0].currencyType;
    },
    checkWithdrawAmount() {
      if (!this.amount) {
        this.$codes(state.en.alerts.no_money, 2);
        return;
      } else if (this.amount > this.maxAmount) {
        this.$codes(state.en.alerts.money_max + " " + this.maxAmount, 2);
        return;
      } else if (this.amount > state.money) {
        this.$codes(state.en.alerts.insufficient_money, 2);
        return;
      } else if (this.amount < this.minAmount) {
        this.$codes(state.en.alerts.money_min + " " + this.minAmount, 2);
        return;
      } else {
        userWithdrawcheckAmount(this.amount).then((res) => {
          if (res.code === 0) {
            if (this.currentTab === "Bankcard") {
              this.withdrawBankAmount();
            } else {
              this.withdrawWalletAmount();
            }
          } else if (res.code === 21002) {
            this.showAlertModal = true;
            this.demandAmount = res.data.demandAmount;
            this.poundageAmount = res.data.poundageAmount;
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        });
      }
    },
    getExchangeRate() {
      userWithdrawgetCurrencyExchangeRate(this.currencyType).then((res) => {
        if (res.code === 0) {
          this.exchangeRate = res.data.exchangeRate;
        }
      });
    },
    withdrawBankAmount() {
      userWithdraw(this.amount, this.payWayType, this.withdrawId).then(
        (res) => {
          if (res.code === 0) {
            this.showAlertModal = false;
            this.$codes(state.codes[res.code], 1);
            this.$money();
            this.amount = "";
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        }
      );
    },
    getSurplus() {
      userWithdrawtodaySurplusTimes().then((res) => {
        this.minAmount = res.data.amountInterval[this.payWayType].min;
        this.maxAmount = res.data.amountInterval[this.payWayType].max;
        this.surplusTime = res.data.surplusTimes;
      });
    },
    withdrawWalletAmount() {
      userWithdraw(
        this.amount,
        this.payWayType,
        this.withdrawId,
        this.exchangeRate
      ).then((res) => {
        if (res.code === 0) {
          this.showAlertModal = false;
          this.$codes(state.codes[res.code], 1);
          this.$money();
          this.amount = "";
        } else {
          this.$codes(state.codes[res.code], 2);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.withdrawal {
  display: flex;
  gap: 15px;
  color: #304258;
  font-size: 14px;
  letter-spacing: -0.5px;
  .withdrawal_container {
    width: 800px;
    min-height: 874px;

    border-radius: 20px;
    background: #ececec;
    box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
    padding-top: 70px;

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
      border: none;
      margin: 0 auto;
      img {
        width: 23px;
        height: 18.4px;
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
      font-weight: bold;
      padding: 40px 0 0 57px;
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
          gap: 20px;
          padding: 30px;
          .text {
            padding-left: 30px;
          }
          .add_new {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 0 20px;
            img {
              height: 25px;
              cursor: pointer;
            }
          }
          .bankInfo_card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            gap: 10px;
            cursor: pointer;
            img {
              height: 25px;
            }
            .card_content {
              display: flex;
              align-items: center;
              gap: 18px;
              width: 400px;
              height: 50px;
              flex-shrink: 0;
              border-radius: 10px;
              background: #d9d9d9;
              padding: 0 20px;
              border: 3px solid #c91d05;
            }
            .selected_card {
              border: 3px solid #d9d9d9;
              color: #fff;
              background: linear-gradient(180deg, #c91d05 0%, #6b1508 100%);
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
          .withdraw_amt {
            font-weight: bold;
            display: flex;
            flex-direction: column;
            gap: 22px;
            padding: 0 30px;
          }
        }
        .vc_container {
          align-items: start;
          .vc_btns {
            display: flex;
            align-items: center;
            gap: 10px;
            button {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              width: max-content;
              height: 39px;
              border-radius: 10px;
              background: #bdc1c7;
              color: #304258;
              padding: 0 10px;
              img {
                height: 25px;
                cursor: pointer;
              }
            }
            .btn_bg {
              background: linear-gradient(
                173deg,
                #c91d05 19.45%,
                #441209 133.08%
              );
              color: white;
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
          box-shadow: 0px 0px 9px 0px #000 inset;
          padding: 20px;
          &:focus {
            background-color: white;
          }
        }
        button {
          width: 300px;
          height: 38px;
          flex-shrink: 0;
          border-radius: 10px;
          background: #656565;
          border: none;
          cursor: pointer;
          color: white;
        }
        .btn_bg {
          background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
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
          height: 41px;
          margin-bottom: 5px;
          color: white;
          background: #647182;
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
  .withdrawal_record_container {
    border-radius: 20px;
    background: #ececec;
    box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
    min-width: 266px;

    padding: 32px 0;
    .withdrawal_record {
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
    width: 468px;
    padding: 25px 36px;
    border-radius: 30px;
    background: linear-gradient(64deg, #1a1c2b 49.57%, #c91d05 269.88%);
    box-shadow: 7px 7px 20px 0px rgba(0, 0, 0, 0.58);
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    .header {
      position: relative;
      width: 100%;
      color: #fff;
      font-size: 28px;
      line-height: 28px;
      font-weight: bold;
      margin-bottom: 44px;
      white-space: nowrap;
      img {
        height: 24px;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
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

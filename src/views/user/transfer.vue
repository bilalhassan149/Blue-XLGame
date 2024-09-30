<template>
  <div class="transfer">
    <div
      class="transfer_container"
      v-loading="$store.state.gameMoneyLoading"
      :element-loading-text="$en('alerts.loading')"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    >
      <div class="wallet_tab">
        <div class="title">{{ $en("user.payment_method") }}</div>
        <div class="tabs">
          <div
            class="tab"
            :class="{ border_bottom: currentTab === 'Wallet' }"
            @click="currentTab = 'Wallet'"
          >
            <div>{{ $en("user.wallet") }}</div>
          </div>
          <div
            class="tab"
            :class="{ border_bottom: currentTab === 'Transfer' }"
            @click="currentTab = 'Transfer'"
          >
            <div>{{ $en("user.transfer") }}</div>
          </div>
        </div>
        <div v-if="currentTab === 'Wallet'">
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
          <div class="transfer_mode">
            <div>{{ $en("user.transfer_mode") }}:</div>
            <button
              :class="{ selected_btn: mode === 0 }"
              @click="
                mode = 0;
                updateTransferMode(0);
              "
            >
              {{ $en("user.auto_transfer") }}
            </button>
            <button
              :class="{ selected_btn: mode === 1 }"
              @click="
                mode = 1;
                updateTransferMode(1);
              "
            >
              {{ $en("user.mannual_transfer") }}
            </button>
          </div>
          <div class="sports_record_container">
            <div class="sports_record">
              <div
                class="record_data"
                v-for="(item, index) in $store.state.gameMoney
                  .slice(1)
                  .slice(0, $store.state.gameMoney.length / 2)"
                :key="index"
              >
                <div class="sport_name">
                  <img
                    :src="
                      $store.state.iconUrl +
                      $store.state.static.gameIcon[item.key]
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
            <div class="sports_record">
              <div
                class="record_data"
                v-for="(item, index) in $store.state.gameMoney
                  .slice(1)
                  .slice($store.state.gameMoney.length / 2)"
                :key="index"
              >
                <div class="sport_name">
                  <img
                    :src="
                      $store.state.iconUrl +
                      $store.state.static.gameIcon[item.key]
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
      </div>
      <div v-if="currentTab === 'Transfer'" class="transfer_tab">
        <div class="transfer_title">{{ $en("user.exchange_dir") }}</div>
        <div class="wallets" style="margin: 0">
          <button>
            <div class="wallet">
              <img src="../../assets/user/walletIcon.png" />
              <el-select v-model="value" filterable placeholder="Plateform">
                <el-option
                  v-for="(item, index) in $store.state.gameMoney"
                  :key="index"
                  :label="item.name"
                  :value="index"
                >
                </el-option>
              </el-select>
            </div>
            <div style="font-weight: bold; white-space: nowrap">
              {{ $store.state.gameMoney[value].balance
              }}{{ $store.state.gameMoney[value].bstatus === 0 ? "￥" : "" }}
            </div>
          </button>
          <button>
            <div class="wallet">
              <img src="../../assets/user/walletIcon.png" />
              <el-select v-model="value1" filterable placeholder="Plateform">
                <el-option
                  v-for="(item, index) in $store.state.gameMoney"
                  :key="index"
                  :label="item.name"
                  :value="index"
                >
                </el-option>
              </el-select>
            </div>
            <div style="font-weight: bold">
              {{ $store.state.gameMoney[value1].balance
              }}{{ $store.state.gameMoney[value1].bstatus === 0 ? "￥" : "" }}
            </div>
          </button>
        </div>
        <div>{{ $en("user.deposit_RMB_amount") }}:</div>
        <div class="input">
          <div>￥</div>
          <input
            v-model="amount"
            type="text"
            :placeholder="$en('inputs.exchange_amount')"
            oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
          />
        </div>
        <button
          class="deposit_btn"
          :class="{ btn_bg: amount }"
          @click="exchangeBalace()"
        >
          {{ $en("user.redeem_now") }}
        </button>
      </div>
    </div>
    <div class="transfer_record_container">
      <div class="transfer_record">
        <div class="heading">
          <div class="text">{{ $en("records.transfer_record") }}</div>
          <button @click="classBtn('transaction')">
            {{ $en("records.more") }}
          </button>
        </div>
        <div class="records_data">
          <div v-if="isLoading">
            <p style="text-align: center">{{ $en("alerts.loading") }}</p>
          </div>
          <div v-else>
            <div v-if="transferRecords.length === 0">
              <p>{{ $en("records.no_records") }}</p>
            </div>
            <div v-else>
              <div
                class="record"
                v-for="(record, index) in transferRecords"
                :key="index"
              >
                <div style="width: 130px">
                  <div>{{ $en("records.transfer_time") }}</div>
                  <div class="line1">{{ $en("records.order_number") }}</div>
                  <div>{{ $en("records.transfer_amount") }}</div>
                  <div>{{ $en("records.status") }}</div>
                </div>
                <div>
                  <div>{{ $gettime(record.createTime) }}</div>
                  <div class="ellipsis">{{ record.orderNo }}</div>
                  <div>{{ record.transferAmount.toFixed(2) }}</div>
                  <div style="color: #d30600">
                    {{ $allState(record.transferStatus, "transferStatus") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  auto,
  gameBalancegetLockBalance,
  gameBalancetransfer,
  userRecordgetRecord,
} from "@/api/galApi";
import state from "@/store/state";

export default {
  name: "PCXLGameTransfer",

  data() {
    return {
      currentTab: "Wallet",
      value: 0,
      value1: 1,
      transferRecords: [],
      isLoading: true,
      lockBalance: "",
      mode: JSON.parse(localStorage.getItem("memberInfo")).freeTransfer,
      amount: "",
      state: false,
    };
  },
  mounted() {
    this.getTransferRecords();
    this.getLockBalace();
  },

  methods: {
    classBtn(val) {
      state.navIcon = val;
      localStorage.setItem("navIcon", state.navIcon);
      state.selectedTransactionRecord = 4;
    },
    getTransferRecords() {
      userRecordgetRecord(4, 1, 5, 3).then((res) => {
        this.isLoading = false;
        this.transferRecords = res.data.rows;
      });
    },
    getLockBalace() {
      gameBalancegetLockBalance().then((res) => {
        this.lockBalance = res.data.lockBalance;
      });
    },
    updateTransferMode(e) {
      auto(e).then((res) => {
        state.userInfo.freeTransfer = e;
        localStorage.setItem("memberInfo", JSON.stringify(state.userInfo));
        this.$codes(state.codes[res.code], 1);
      });
    },
    async getGameMoney() {
      state.gameMoney = await this.$store.dispatch("gameMoney");
    },
    exchangeBalace() {
      if (this.amount) {
        gameBalancetransfer(
          this.amount,
          this.$store.state.gameMoney[this.value1].key,
          this.$store.state.gameMoney[this.value].key
        ).then((res) => {
          if (res.code === 0) {
            this.$codes(state.codes[res.code], 1);
            this.$money();
            this.amount = "";
            this.getGameMoney();
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        });
      } else {
        this.$codes(state.en.alerts.no_money, 2);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.transfer {
  display: flex;
  gap: 15px;
  color: #304258;
  font-size: 14px;
  letter-spacing: -0.5px;
  height: 100%;

  .transfer_container {
    width: 800px;
    border-radius: 20px;
    background: #ececec;
    box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
    padding: 26px 0;
    .wallet_tab {
      display: flex;
      flex-direction: column;
      gap: 24px;
      .title {
        color: #9c200d;
        font-size: 16px;
        padding-left: 74px;
      }
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
          width: 50%;
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
      .transfer_mode {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: 57px;
        button {
          border: none;
          width: 152px;
          height: 40px;
          border-radius: 10px;
          background: #d9d9d9;
          cursor: pointer;
        }
        .selected_btn {
          background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
          color: white;
        }
      }
      .sports_record_container {
        display: flex;
        gap: 16px;
        padding: 22px 57px;
        .sports_record {
          width: 412px;
          .record_data {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 34px;
            border-radius: 89px;
            height: 41px;
            margin-bottom: 5px;
            color: white;
            font-weight: bold;
            background: #647182;
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
    .transfer_tab {
      display: flex;
      flex-direction: column;
      gap: 26px;
      padding: 32px 72px;
      font-size: 16px;
      .transfer_title {
        color: #9c200d;
      }
      .input {
        display: flex;
        align-items: center;
        gap: 20px;
        width: 570px;
        height: 50px;
        border-radius: 10px;
        background: #bdc1c7;
        padding: 0 17px;
        input {
          background: transparent;
          outline: none;
          border: none;
          flex: 1;
          font-size: 14px;
        }
      }
      .deposit_btn {
        width: 300px;
        height: 38px;
        border-radius: 10px;
        background: #656565;
        color: white;
        border: none;
        margin-left: 140px;
        font-size: 14px;
        cursor: pointer;
        margin-top: 10px;
      }
      .btn_bg {
        background: linear-gradient(173deg, #c91d05 19.45%, #441209 133.08%);
      }
    }
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
        min-width: 290px;
        height: 50px;
        border-radius: 10px;
        border: 3px solid #c91d05;
        padding: 0 16px;
        color: #304258;
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
  }
  .transfer_record_container {
    border-radius: 20px;
    background: #ececec;
    box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
    min-width: 266px;
    padding: 32px 0;
    .transfer_record {
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
          .ellipsis {
            white-space: nowrap;
            width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="records">
    <div class="info">
      <img src="../../assets/user/infoIcon.png" />
      <div class="text">
        {{ $en("user.record_info") }}
      </div>
    </div>
    <div class="type_time">
      <div class="left">
        <div>{{ $en("user.type") }}:</div>
        <el-select
          v-model="value"
          filterable
          placeholder="存款"
          @change="(transactionRecords = []), (isLoading = true), (pageNum = 1)"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="right">
        <div class="timeline">
          <button
            :class="{ activeBtn: selectedOption === option.label }"
            @click="
              if (selectedOption !== option.label) {
                selectOption(option.label);
                timeType = option.value;
                isLoading = true;
                transactionRecords = [];
                pageNum = 1;
              }
            "
            v-for="option in btnOptions"
            :key="option.label"
          >
            {{ option.label }}
          </button>
        </div>
        <img
          src="../../assets/user/refreshIcon.png"
          style="cursor: pointer"
          @click="refreshData()"
        />
      </div>
    </div>
    <div class="data">
      <table v-if="value === 0">
        <tr>
          <th style="border-radius: 15px 0 0 15px">
            {{ $en("records.srl_nmbr") }}
          </th>
          <th>{{ $en("user.deposit") }}</th>
          <th>{{ $en("records.application_time") }}</th>
          <th>{{ $en("records.trading_hours") }}</th>
          <th>{{ $en("records.order_number") }}</th>
          <th style="border-radius: 0 15px 15px 0">
            {{ $en("records.status") }}
          </th>
        </tr>
        <tr v-for="(item, index) in transactionRecords" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.rechargeAmt.toFixed(2) }}</td>
          <td>{{ $gettime(item.createTime) }}</td>
          <td>{{ $gettime(item.finishTime) }}</td>
          <td class="f-c" @click="$copyFx(item.rechargeOrder)">
            {{ item.rechargeOrder
            }}<img class="copy_icon" src="../../assets/user/copyIcon.png" />
          </td>
          <td class="stateType" :class="'colorStyle' + item.rechargeState">
            {{ $allState(item.rechargeState, "rechargeState") }}
          </td>
        </tr>
      </table>
      <table v-if="value === 1">
        <tr>
          <th style="border-radius: 15px 0 0 15px">
            {{ $en("records.srl_nmbr") }}
          </th>
          <th>{{ $en("records.withdrawal") }}</th>
          <th>{{ $en("records.application_time") }}</th>
          <th>{{ $en("records.trading_hours") }}</th>
          <th>{{ $en("records.order_number") }}</th>
          <th>{{ $en("records.card_no") }}</th>
          <th style="border-radius: 0 15px 15px 0">
            {{ $en("records.status") }}
          </th>
        </tr>
        <tr v-for="(item, index) in transactionRecords" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.withdrawAmt.toFixed(2) }}</td>
          <td>{{ $gettime(item.createTime) }}</td>
          <td>{{ $gettime(item.finishTime) }}</td>
          <td>{{ item.withdrawOrder }}</td>
          <td class="f-c" @click="$copyFx(item.withdrawAccount)">
            {{ item.withdrawAccount
            }}<img class="copy_icon" src="../../assets/user/copyIcon.png" />
          </td>
          <td class="stateType" :class="'colorStyle' + item.withdrawState">
            {{ $allState(item.withdrawState, "withdrawState") }}
          </td>
        </tr>
      </table>
      <table v-if="value === 2">
        <tr>
          <th style="border-radius: 15px 0 0 15px">
            {{ $en("records.srl_nmbr") }}
          </th>
          <th>{{ $en("records.bonus") }}</th>
          <th>{{ $en("records.issuance_time") }}</th>
          <th style="border-radius: 0 15px 15px 0">
            {{ $en("records.distribution_type") }}
          </th>
        </tr>
        <tr v-for="(item, index) in transactionRecords" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.dividendAmt.toFixed(2) }}</td>
          <td>{{ $gettime(item.createTime) }}</td>
          <td class="stateType" :class="'colorStyle' + item.dividendType">
            {{ $allState(item.dividendType, "dividendType") }}
          </td>
        </tr>
      </table>
      <table v-if="value === 3">
        <tr>
          <th style="border-radius: 15px 0 0 15px">
            {{ $en("records.srl_nmbr") }}
          </th>
          <th>{{ $en("records.betrayal") }}</th>
          <th>{{ $en("records.counterfeit_time") }}</th>
          <th style="border-radius: 0 15px 15px 0">
            {{ $en("records.release_time") }}
          </th>
        </tr>
        <tr v-for="(item, index) in transactionRecords" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.rebateAmt.toFixed(2) }}</td>
          <td>{{ $gettime(item.createTime) }}</td>
          <td>{{ $gettime(item.rebateTime) }}</td>
        </tr>
      </table>
      <table v-if="value === 4">
        <tr>
          <th style="border-radius: 15px 0 0 15px">
            {{ $en("records.srl_nmbr") }}
          </th>
          <th>{{ $en("user.transfer") }}</th>
          <th>{{ $en("records.transfer_time") }}</th>
          <th>{{ $en("records.transfer_out_acc") }}</th>
          <th>{{ $en("records.transfer_acc") }}</th>
          <th style="border-radius: 0 15px 15px 0">
            {{ $en("records.status") }}
          </th>
        </tr>
        <tr v-for="(item, index) in transactionRecords" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.transferAmount.toFixed(2) }}</td>
          <td>{{ $gettime(item.createTime) }}</td>
          <td>{{ pred(item.outWalletCode) }}</td>
          <td>{{ pred(item.inWalletCode) }}</td>
          <td class="stateType" :class="'colorStyle' + item.transferStatus">
            {{ $allState(item.transferStatus, "transferStatus") }}
          </td>
        </tr>
      </table>
      <table v-if="value === 5">
        <tr>
          <th style="border-radius: 15px 0 0 15px">
            {{ $en("records.srl_nmbr") }}
          </th>
          <th>{{ $en("records.amount") }}</th>
          <th>{{ $en("records.transfer_time") }}</th>
          <th>{{ $en("records.game_name") }}</th>
          <th style="border-radius: 0 15px 15px 0">
            {{ $en("records.game_state") }}
          </th>
        </tr>
        <tr v-for="(item, index) in transactionRecords" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.applyAmount.toFixed(2) }}</td>
          <td>{{ $gettime(item.applyTime) }}</td>
          <td>
            {{ $store.state.game.platforms.uniqueCodes[item.uniqueCode] }}
          </td>
          <td>
            {{ $store.state.status.applyState[item.applyState] }}
          </td>
        </tr>
      </table>
      <div class="no_data" v-if="transactionRecords.length === 0 && !isLoading">
        <img src="../../assets/user/emptyIcon.png" />
        <div>{{ $en("records.no_records") }}</div>
        <button @click="classBtn('Deposit')">
          {{ $en("user.deposit_now") }}
        </button>
      </div>
      <div v-if="isLoading">{{ $en("alerts.loading") }}</div>
      <el-pagination
        style="margin-top: 20px"
        :page-size="pageSize"
        :current-page="pageNum"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { userRecordgetRecord } from "@/api/galApi";
import state from "@/store/state";

export default {
  name: "PCXLGameTransaction",

  data() {
    return {
      selectedOption: state.en.user.today,
      btnOptions: [
        { label: state.en.user.today, value: 0 },
        { label: state.en.user.yesterday, value: 1 },
        { label: state.en.user.week, value: 2 },
        { label: state.en.user.month, value: 3 },
      ],

      options: [
        {
          name: state.en.user.deposit,
          value: 0,
        },
        {
          name: state.en.records.withdrawal,
          value: 1,
        },
        {
          name: state.en.records.bonus,
          value: 2,
        },
        {
          name: state.en.records.betrayal,
          value: 3,
        },
        {
          name: state.en.user.transfer,
          value: 4,
        },
        {
          name: state.en.records.activity_application,
          value: 5,
        },
      ],
      value: state.selectedTransactionRecord,
      transactionRecords: [],
      isLoading: true,
      timeType: 0,
      pageSize: 20,
      pageNum: 1,
      total: 20,
    };
  },
  mounted() {
    this.getTransactionRecords();
  },
  watch: {
    value: function () {
      this.getTransactionRecords();
    },
    timeType: function () {
      this.getTransactionRecords();
    },
  },
  methods: {
    classBtn(val) {
      state.navIcon = val;
      localStorage.setItem("navIcon", state.navIcon);
    },
    selectOption(option) {
      this.selectedOption = option;
    },
    handleCurrentChange(e) {
      this.pageNum = e;
      this.getTransactionRecords();
    },
    getTransactionRecords() {
      userRecordgetRecord(
        this.value,
        this.pageNum,
        this.pageSize,
        this.timeType
      ).then((res) => {
        if (res.code === 0) {
          this.isLoading = false;
          this.transactionRecords = res.data.rows;
          this.total = res.data.total;
        }
      });
    },
    refreshData() {
      // this.timeType = 0;
      // this.selectedOption = state.en.user.today;
      this.transactionRecords = [];
      this.getTransactionRecords();
    },
    pred(e) {
      console.log(e);
      if (e == 0) {
        return "主账号";
      }
      let b = "";
      let a = JSON.parse(localStorage.getItem("appIndex"));
      a.forEach((element) => {
        element.platforms.forEach((ele) => {
          if (ele.uniqueCode == e) {
            b = ele.platformName;
          }
        });
      });
      return b;
    },
  },
};
</script>
<style lang="scss" scoped>
.stateType{
  font-weight: bold;
  text-shadow: 0px 1px 2px #ffb5b5;
}
.colorStyle0 {
  color: #f7a670 !important;
  
}
.colorStyle1 {
  color: rgba(28, 253, 39, 0.918) !important;
}
.colorStyle2 {
  color: red !important;
}
</style>

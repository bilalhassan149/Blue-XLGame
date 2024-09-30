<template>
  <div class="records" style="width: 912px">
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
          placeholder="Plateform"
          @change="
            isLoading = true;
            bettingRecords = [];
            pageNum = 1;
          "
        >
          <el-option
            v-for="(item, index) in array"
            :key="index"
            :label="item.platformName"
            :value="item.uniqueCode"
          ></el-option>
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
                bettingRecords = [];
                betDetails = [];
                isLoading = true;
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
    <div class="data betting_detail_table">
      <div>
        <div class="header">
          <div>{{ $en("user.date") }}</div>
          <div style="width: 200px">
            {{ $en("records.order_number") }}
          </div>
          <div>{{ $en("user.plateform") }}</div>
          <div>{{ $en("user.bet_status_hour") }}</div>
          <div>{{ $en("records.bet_amount") }}</div>
          <div>{{ $en("user.turnover") }}</div>
          <div>{{ $en("user.win_loss") }}</div>
          <div>{{ $en("user.result") }}</div>
        </div>
        <div v-for="(rows, rowIndex) in bettingRecords" :key="rowIndex">
          <div class="stat_row">
            <div class="record_date">
              {{ rows.recordDate }}
            </div>
            <div class="total-wid">
              <img class="img" src="../../assets/user/betIcon.png" />
              <div>
                {{ $en("user.num_total") }} ：
                {{ rows.recordDateBetTotalInfo.betNum.toFixed(2) }}
              </div>
            </div>
            <div class="total-wid">
              <b>¥</b> {{ $en("user.rebate") }} ：
              {{ rows.recordDateBetTotalInfo.totalRebate.toFixed(2) }}
            </div>
            <div class="total-wid">
              <b>¥</b> {{ $en("user.turnover") }} ：
              {{ rows.recordDateBetTotalInfo.totalValid.toFixed(2) }}
            </div>
            <div class="total-wid">
              <b>¥</b> {{ $en("user.win_loss") }} ：
              {{ rows.recordDateBetTotalInfo.totalWin.toFixed(2) }}
            </div>
          </div>
          <div
            v-for="(item, index) in rows.recordList"
            :key="index"
            class="rows"
          >
            <div class="row">
              <div>
                {{ $gettime(item.betTime).split(" ")[0] }}
              </div>
              <div
                style="width: 200px"
                class="f-c"
                @click="$copyFx(item.betRecordId)"
              >
                {{ item.betRecordId
                }}<img class="copy_icon" src="../../assets/user/copyIcon.png" />
              </div>
              <div>
                {{ $store.state.game.platforms.uniqueCodes[item.uniqueCode] }}
              </div>
              <div>
                {{ $allState(item.recordStatus, "recordStatus") }}
              </div>
              <div>
                {{ item.betAmount.toFixed(2) }}
              </div>
              <div>
                {{ item.validAmount.toFixed(2) }}
              </div>
              <div>
                {{ item.winLossAmount.toFixed(2) }}
              </div>
              <div :class="[item.winLossAmount <= 0 ? 'negative' : 'positive']">
                <span :style="{ marginLeft: item.uniqueCode < 3000 && '30px' }">
                  {{
                    item.winLossAmount <= 0
                      ? $en("records.loose")
                      : $en("records.win")
                  }}
                </span>
                <span
                  @click="getBetDetails(item, rowIndex, index)"
                  v-if="item.uniqueCode < 3000"
                >
                  <img
                    src="../../assets/icons/arrowOpen.png"
                    v-if="betDetails.length === 0 || openRow !== rowIndex"
                    style="
                      height: 11px;
                      width: 11px;
                      cursor: pointer;
                      margin-left: 20px;
                    "
                  />
                  <img
                    src="../../assets/icons/arrowClose.png"
                    v-if="betDetails.length !== 0 && openRow === rowIndex"
                    style="
                      height: 11px;
                      width: 11px;
                      cursor: pointer;
                      margin-left: 20px;
                    "
                  />
                </span>
              </div>
            </div>
            <div
              v-if="
                betDetails.length !== 0 &&
                rIndex === rowIndex &&
                detailIndex === index
              "
              class="detail_box"
            >
              <div v-for="(bet, index) in betDetails" :key="index">
                <div v-for="(item, index) in bet" :key="index">
                  <span style="font-weight: bold">{{ item.columnName }}: </span
                  >{{
                    item.columnValueType === 1
                      ? $gettime(item.columnValue)
                      : item.columnValue
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isLoading">{{ $en("alerts.loading") }}</div>
      <div class="no_data" v-if="bettingRecords.length === 0 && !isLoading">
        <img src="../../assets/user/emptyIcon.png" />
        <div>{{ $en("records.no_records") }}</div>
      </div>
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
import {
  userRecordqueryBetRecordByTimeType,
  userRecordqueryBetDetails,
} from "@/api/galApi";
import state from "@/store/state";

export default {
  name: "PCXLGameBetting",

  data() {
    return {
      selectedOption: state.en.user.today,
      btnOptions: [
        { label: state.en.user.today, value: 0 },
        { label: state.en.user.yesterday, value: 1 },
        { label: state.en.user.week, value: 2 },
        { label: state.en.user.month, value: 3 },
      ],
      value: "",
      array: [],
      bettingRecords: [],
      isLoading: true,
      timeType: 0,
      betDetails: [],
      rIndex: "",
      detailIndex: "",
      pageSize: 20,
      pageNum: 1,
      total: 20,
      openRow: null,
    };
  },
  mounted() {
    this.getTRtype();
    this.getBettingRecords();
  },
  watch: {
    timeType: function () {
      this.getBettingRecords();
    },
    value: function () {
      this.getBettingRecords();
    },
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
    },
    handleCurrentChange(e) {
      this.pageNum = e;
      this.getBettingRecords();
    },
    getTRtype() {
      let start = new Date(new Date().setHours(0, 0, 0, 0));
      let end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
      this.start = start.getTime();
      this.end = end.getTime();
      let levelRebates_gameTypeLis1 = [
        {
          platformName: "全部",
          uniqueCode: "",
        },
      ];
      let getlevelRebates_gameType = state.appIndex;
      getlevelRebates_gameType.forEach((element) => {
        element.platforms.forEach((el) => {
          levelRebates_gameTypeLis1.push(el);
        });
      });
      this.array = levelRebates_gameTypeLis1;
    },
    getBettingRecords() {
      userRecordqueryBetRecordByTimeType(
        this.pageNum,
        this.pageSize,
        this.timeType,
        this.value
      ).then((res) => {
        if (res.code === 0) {
          this.isLoading = false;
          if (Array.isArray(res.data.rows)) {
            this.total = res.data.total;
            this.bettingRecords = res.data.rows.sort((a, b) => {
              return new Date(b.recordDate) - new Date(a.recordDate);
            });
          }
        }
      });
    },

    refreshData() {
      this.bettingRecords = [];
      this.getBettingRecords();
    },
    getBetDetails(item, rowIndex, index) {
      if (this.rIndex === rowIndex && this.detailIndex === index) {
        this.rIndex = "";
        this.detailIndex = "";
        this.openRow = null;
        this.betDetails = [];
      } else {
        this.rIndex = rowIndex;
        this.detailIndex = index;
        this.openRow = rowIndex;
        this.betDetails = [];
        userRecordqueryBetDetails(item.uniqueCode, item.recordNo).then(
          (res) => {
            if (res.code === 0) {
              this.$codes(state.codes[res.code], 1);
              this.betDetails = res.data.betDetails;
            } else {
              this.$codes(state.codes[res.code], 2);
            }
          }
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.betting_detail_table {
  width: 912px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #ececec;
  box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
  .header {
    display: flex;
    width: 890px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 15px;
    background: #bdc1c7;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    font-size: 14px;
    color: #304258;
    margin: 0 auto;
    div {
      width: 80px;
      text-align: center;
      word-wrap: break-word;
    }
  }
  .stat_row {
    width: 890px;
    height: 38.191px;
    flex-shrink: 0;
    border-radius: 15px;
    background: #304258;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 44px;
    margin: 6px auto;

    .record_date {
      width: 106.406px;
      height: 38.191px;
      flex-shrink: 0;
      border-radius: 15px;
      background: #b53d1e;
      font-weight: bold;
      text-align: center;
      padding: 9px 0;
    }
    .img {
      width: 14px;
      height: 17px;
      margin-right: 8px;
    }
    b {
      margin-right: 8px;
    }
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 913px;
    min-height: 50px;
    flex-shrink: 0;
    padding: 0 24px;
    div {
      width: 80px;
      text-align: center;
      word-wrap: break-word;
    }
  }
  .rows {
    background: #ececec;
  }
  .rows:nth-child(even) {
    background: white;
  }
  .detail_box {
    padding: 6px 34px;
    line-height: 20px;
    font-size: 12px;
    background-color: white;
    border-top: 2px solid #ececec;
  }
  .total-wid {
    min-width: 140px;
    display: flex;
    align-items: center;
  }
}
</style>

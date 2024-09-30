<template>
  <div
    class="deposit-main"
    v-loading="loading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)"
  >
    <div class="deposit-body">
      <div class="deposit-title">{{ $en("user.payment_method") }}</div>
      <div class="f-s">
        <div
          class="type"
          :class="{ toggle: toggle == index }"
          v-for="(item, index) in payWayList"
          :key="index"
          @click="headBtn(index, item)"
        >
          <div class="f-c type-title">
            <img :src="item.payWayIcon" />
            <span class="text">{{ item.payWayName }}</span>
          </div>
          <div class="border"></div>
        </div>
      </div>
      <div class="select">
        <span class="select-title">{{ $en("user.select_chnl") }}:</span>
        <div class="btn-body">
          <div
            class="btn"
            v-for="(item, index) in listVal"
            :key="index"
            @click="selectFx(item, index)"
            :class="{ colors: tabType == index }"
          >
            <img class="pay-img" :src="item.icon" />
            {{ item.payWayTypeName }}
          </div>
        </div>
      </div>
      <div class="money-list">
        <div class="money-alert">{{ $en("user.deposit_vc_amount") }}</div>
        <el-input
          clearable
          class="money-input"
          type="text"
          :placeholder="
            '请输入 ' +
            listVal[tabType].minAmount +
            '~' +
            listVal[tabType].maxAmount
          "
          @click="inputMoneyFx"
          v-model="randomAmount"
          oninput="this.value = this.value.replace(/[^0-9.]/g,'')"
        />
        <div style="padding: 0 20px">
          <div class="money-text" v-if="texts != 'CNY'">
            <span>!</span>
            <div>
              预计支付 {{ (randomAmount / exchangeRate).toFixed(2) }}{{ texts }}
            </div>
            <span v-if="$store.state.status.showVCRate != 0">
              (参考汇率1{{ texts }} = {{ exchangeRate }}CNY)
            </span>
          </div>
          <div class="money-btn-main">
            <div
              class="money-btn"
              v-for="(item, index) in listVal[tabType].randomAmount"
              :key="index"
              @click="moneyBtn(item, index)"
              :class="{ colors: tabMoneyIndex == index }"
            >
              ¥{{ item }}
            </div>
          </div>
          <div class="deposit-btn f-c colors" @click="submit()">
            {{ $en("user.deposit_now") }}
          </div>
        </div>
      </div>
    </div>

    <!-- 记录 record -->
    <div class="records">
      <div class="record">
        <div class="f-s">
          <div class="record-title">{{ $en("records.deposit_record") }}</div>
          <div class="link" @click="classBtn('transaction')">
            {{ $en("records.more") }}
          </div>
        </div>
        <div
          class="record-content"
          v-for="(item, index) in recordData"
          :key="index"
        >
          <div class="f-s record-body">
            <span class="record-text">{{ $en("records.deposit_time") }}</span>
            <div class="record-p">{{ $gettime(item.finishTime) }}</div>
          </div>
          <div class="f-s record-body">
            <span class="record-text">{{
              $en("records.transaction_time")
            }}</span>
            <div class="record-p">{{ $gettime(item.createTime) }}</div>
          </div>
          <div class="f-s record-body">
            <span class="record-text">{{ $en("records.order_number") }}</span>
            <div class="record-p line1" style="width: 130px">
              {{ item.rechargeOrder }}
            </div>
          </div>
          <div class="f-s record-body">
            <span class="record-text">{{ $en("records.amount") }}</span>
            <div class="record-p">{{ item.rechargeAmt.toFixed(2) }}</div>
          </div>
          <div class="f-s record-body">
            <span class="record-text">{{ $en("records.status") }}</span>
            <div class="record-p record-red">
              {{ $allState(item.rechargeState, "rechargeState") }}
            </div>
          </div>
          <div class="record-border"></div>
        </div>
      </div>
    </div>

    <!-- 二维码 er -->
    <el-dialog :visible.sync="showType" title="存款" class="s-mains">
      <div class="s-content">
        <div class="s-text">
          <span class="s-title">需要汇入：</span>
          <span>{{ payInfo.virtualAmount }}{{ texts }}</span>
        </div>
        <div class="s-text">
          <span class="s-title">当前汇率：</span>
          <span>{{ payInfo.exchangeRate }}</span>
        </div>
        <div class="s-text">
          <span class="s-title">支付类型：</span>
          <span>{{ listVal[tabType].payWayTypeName }}</span>
        </div>
      </div>
      <div class="s-body">
        <div class="qrCode f-c">
          <vue-qr :text="payInfo.walletNo" :size="150"></vue-qr>
        </div>
        <div style="flex: 1">
          <div class="texaks">可使用钱包APP扫码二维码完成付款</div>
          <div class="texaks">
            充币地址 :<span> {{ payInfo.walletNo }}</span>
          </div>
          <div class="texaks">
            订单备注码 :<span> {{ payInfo.payOrder }}</span>
          </div>
        </div>
      </div>
      <div class="s-p">1.以充值时显示的充币地址为准，地址并非固定。</div>
      <div class="s-p">2.按照钱包协议转账，否则资产可能会导致丢失。</div>
      <div class="s-p">3.请务必确认设备安全，防止信息泄露或被改。</div>
    </el-dialog>
    <el-dialog
      custom-class="showTypes"
      title="温馨提示"
      class="s-mains"
      :visible.sync="showTypes"
      width="600px"
      top="10%"
      :close-on-click-modal="false"
      @close="closeDialog()"
    >
      <div v-show="!showReminder" class="ale-body">
        <div class="texaks1">
          1.请填写正确的转账金额和附言（备注），否则无法存款。
        </div>
        <div class="texaks1">
          2.下次存款时，请获取新的账号，存入旧账号将无法到账。
        </div>
        <div class="texaks1" style="color: #f86c3b">
          3.转账时，优先复制收款卡号粘贴。
        </div>
        <div class="texaks1">4.若存款有疑问，请联系客服及时处理。</div>
        <div class="texaks1">5.请勿使用支付宝、微信转账至公司账户。</div>
        <div class="texaks money-red f-c">
          ¥ :
          <span>{{ payInfo.rechargeAmount }}</span>
          <img
            src="../../assets/image/copy.png"
            @click="$copyFx(payInfo.rechargeAmount)"
          />
        </div>
        <div class="textx" style="color: #f86c3b">
          (转账金额务必与订单一致）
        </div>
        <div class="textx-content">
          <div class="textx">
            转账银行：<span class="text-color">{{ payInfo.bankName }}</span>
          </div>
          <div class="copy-btn f-c" @click="$copyFx(payInfo.bankName)">
            复制
          </div>
        </div>
        <div class="textx-content">
          <div class="textx">
            银行账号：<span class="text-color">{{ payInfo.bankCardNo }}</span>
          </div>
          <div class="copy-btn f-c" @click="$copyFx(payInfo.bankCardNo)">
            复制
          </div>
        </div>
        <div class="textx-content">
          <div class="textx">
            转账姓名：<span class="text-color">{{ payInfo.bankHolder }}</span>
          </div>
          <div class="copy-btn f-c" @click="$copyFx(payInfo.bankHolder)">
            复制
          </div>
        </div>
        <div class="textx-content">
          <div class="textx">
            支行地址：<span class="text-color">{{ payInfo.bankBranch }}</span>
          </div>
          <div class="copy-btn f-c" @click="$copyFx(payInfo.bankBranch)">
            复制
          </div>
        </div>
        <div class="textx-content">
          <div class="textx">
            附言/备注：
            <span class="text-color">{{ payInfo.remark }}</span>
          </div>
          <div class="copy-btn f-c" @click="$copyFx(payInfo.remark)">复制</div>
        </div>

        <div class="textx" style="color: #f86c3bed">
          （请务必填写正确的附言/备注）
        </div>
        <div class="alert-ale">
          温馨提示：收款账号不定期更换，请于
          <b class="text-color"> {{ time }} </b> 内完成转账款
        </div>
      </div>
      <div v-show="showReminder" class="notify">
        <p>{{ reminderMessage }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import state from "@/store/state";
import {
  userRechargegetAllChannel,
  userRechargegetCurrencyExchangeRate,
  userRechargeapplyPay,
  userRecordgetRecord,
} from "../../api/galApi";
// import vueQr from "vue-qr";

export default {
  // components: { vueQr }, //PayPal
  data() {
    return {
      toggle: 0, //head-type-btn
      loading: false,
      loadingText: "加载中..",
      texts: "", //汇率文本 show-cny-text
      exchangeRate: 1, //汇率
      payWayList: [], // 通道支付类型
      listVal: [{}], // 临时选择通道数组，选择支付类型 click-pay-save
      randomAmount: 0, //money 自定义金额，默认金额
      tabType: 0, // this pay type
      tabMoneyIndex: 0, //当前选择的金额下标值
      inputMoney: "", //input money ， 自定义金额
      payInfo: {
        walletNo: "",
      },
      tabIndex: 0,
      openLink: "",
      showType: false, //alert-border  vue-qr 弹窗二维码
      showTypes: false, //alert-border 暗号弹窗
      showReminder: false, // showTypes -- no time  //时间已过期
      reminderMessage: "",
      time: "15:00",
      recordData: [], //记录
      payWay: "",
    };
  },
  mounted() {
    this.getuserRechargegetAllChannel();
  },
  methods: {
    classBtn(val) {
      state.navIcon = val;
      localStorage.setItem("navIcon", state.navIcon);
      state.selectedTransactionRecord = 0;
    },
    headBtn(e, item) {
      let that = this;
      that.toggle = e;
      that.listVal = item.payWayTypes;
      that.lvFx(that.listVal[0]);
      that.randomAmount = that.listVal[0].randomAmount[0];
      that.tabType = 0;
      that.tabMoneyIndex = 0;
      that.payWay = item.payWay;
    },
    selectFx(item, e) {
      this.tabType = e;
      this.tabMoneyIndex = 0;
      this.randomAmount = this.listVal[e].randomAmount[0];
      this.lvFx(item);
    },
    inputMoneyFx() {
      this.tabMoneyIndex = 99;
    },
    moneyBtn(item, e) {
      this.tabMoneyIndex = e;
      this.randomAmount = item; //money 按钮金额-赋值
    },
    closeDialog() {
      clearInterval(this.timerInterval);
      this.showReminder = false;
      this.showDiv2 = true;
    },
    getuserRechargegetAllChannel() {
      let n = 0; //init 0  初始0
      userRechargegetAllChannel().then((res) => {
        if (res.code != 0) {
          this.$codes(state.codes[res.code], 2);
          // this.loadingText = state.codes[res.code];
        } else {
          if (res.data.allChannel == "") {
            this.$codes(state.en.alerts.no_channel, 2);
            this.loading = true;
            this.loadingText = state.en.alerts.no_channel;
            return;
          }
          res.data.allChannel.forEach((element) => {
            element.index = element.payWay;
            element.payWayName = state.static.payWay[element.payWay].payWayName;
            element.payWayIcon =
              state.iconUrl + state.static.payWay[element.payWay].payWayIcon;
            element.payWayTypes.forEach((el) => {
              el.text = state.status.currencyType[el.currencyType];
              if (state.static.payWayType[el.payWayType]) {
                el.payWayTypeName =
                  state.static.payWayType[el.payWayType].payWayTypeName;
                el.index = el.payWayType;
                if (el.currencyType == 0) {
                  // el.icon = state.iconUrl + element.payWayIcon;
                  el.icon = element.payWayIcon;
                } else {
                  el.icon =
                    state.iconUrl +
                    state.static.virtualCurrencyIcon[el.payWayTypeName];
                }
              }
            });
          });
          this.payWayList = res.data.allChannel;
          this.payWay = res.data.allChannel[0].payWay;
          //init -list  0
          this.listVal = this.payWayList[n].payWayTypes;
          // init 0 , 默认选择金额
          this.randomAmount = this.listVal[n].randomAmount[n];
          // currencyType - api汇率
          this.lvFx(this.listVal[n]);
        }
      });
      // 右边-活动记录
      //存款记录 - deposit
      userRecordgetRecord(0, 1, 5, 3).then((res) => {
        this.recordData = res.data.rows;
      });
    },
    //请求汇率
    lvFx(item) {
      let num = item.currencyType;
      let that = this;
      // 0 == cny（人民币）1:1  ， no api
      this.texts = item.text;
      if (num != 0) {
        this.loading = true;
        // this.loadingText = '请求汇率中';
        setTimeout((res) => {
          that.loading = false;
        }, 2000);
        userRechargegetCurrencyExchangeRate(num).then((res) => {
          this.loading = false;
          if (res.code == 0) {
            this.exchangeRate = res.data.exchangeRate;
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        });
      } else {
        this.exchangeRate = 1;
      }
    },
    //
    submit() {
      // clearInterval(this.timerInterval);
      if (this.randomAmount < this.listVal[this.tabType].minAmount) {
        const minAmount = this.listVal[this.tabType].minAmount;
        this.$codes(state.natives[0][103].replace("{minAmount}", minAmount), 2);
        return;
      }
      if (this.randomAmount > this.listVal[this.tabType].maxAmount) {
        const maxAmount = this.listVal[this.tabType].maxAmount;
        this.$codes(state.natives[0][104].replace("{maxAmount}", maxAmount), 2);
        return;
      }
      userRechargeapplyPay(
        this.payWay,
        this.listVal[this.tabType].payWayType,
        this.randomAmount,
        this.exchangeRate
      ).then((res) => {
        if (res.code == 0) {
          // 弹窗跳转的链接  open-link
          if (res.data.payInfoType == 0) {
            this.openLink = res.data.payInfo;
            window.open(this.openLink.payUrl, "_blank");
            //payInfoType == 0 ，ebpay-充值 , bank-银行卡充值
          } else if (res.data.payInfoType == 1) {
            this.showTypes = true;
            this.payInfo = res.data.payInfo;
            this.timestamp = res.data.payLimitTime;
            //////////////////////////////////Timer////////////////////////////////
            const timestampUnix = Math.floor(this.timestamp / 1000);
            const currentDate = moment();
            const timestampDate = moment.unix(timestampUnix);
            const duration = moment.duration(timestampDate.diff(currentDate));
            const Milliseconds = duration.as("milliseconds");
            const totalSeconds = Math.floor(Milliseconds / 1000); // 15 minutes
            let secondsLeft = totalSeconds;
            this.timerInterval = setInterval(() => {
              secondsLeft--;
              const minutes = Math.floor(secondsLeft / 60);
              const seconds = secondsLeft % 60;
              this.time = `${minutes}:${seconds.toString().padStart(2, "0")}`;
              if (secondsLeft <= 0) {
                clearInterval(this.timerInterval);
                this.showReminder = true;
                this.reminderMessage = "时间已过期，请重新选择充值通道";
              } else {
                this.showReminder = false;
                this.reminderMessage = "";
              }
            }, 1000); // Update every second (1000 milliseconds)
            //////////////////////////////////Timer End here////////////////////////////////
          } else if (res.data.payInfoType == 2) {
            //扫描二维码 vue-qr
            this.payInfo = res.data.payInfo;
            this.payInfo.payOrder = res.data.payOrder;
            this.showType = true;
          }
          this.$codes(state.codes[res.code], 1);
        } else {
          if (res.code == 20034) {
            // this.ckName = true;
            this.$message.error(state.codes[res.code]);
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.deposit-main {
  min-height: 100%;
  user-select: none;
  display: flex;
}
.deposit-title {
  color: #9c200d;
  font-size: 16px;
  margin: 26px 74px 20px 74px;
}
.deposit-body {
  width: 800px;
  background: #f1f1f1;
  border-radius: 20px;
  box-shadow: 1px 4px 25px #999;
}
.type {
  font-size: 14px;
  color: #304258;
  flex: 1;
  background: #bdc1c7;
  cursor: pointer;
  position: relative;
  .text {
    margin: 0 15px;
  }
}
.type-title {
  height: 50px;
}
.type-title img {
  max-height: 28px;
}
.border {
  height: 6px;
  width: 100%;
  background: linear-gradient(135deg, #c91d05, #771200);
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
}
.toggle .border {
  opacity: 1;
}
.select {
  display: flex;
  align-items: center;
  margin: 0px 25px 20px 25px;
  padding: 40px 0 30px 0;
  border-bottom: 4px solid #fff;
}
.select-title {
  font-size: 14px;
  color: #9c200d;
  margin-left: 50px;
}
.btn-body {
  display: flex;
  .btn {
    margin-left: 12px;
    border-radius: 10px;
    font-size: 14px;
    background: #bdc1c7;
    color: #304258;
    min-width: 126px;
    padding: 5px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .pay-click {
    border: 1px solid red;
  }
  .pay-img {
    max-height: 20px;
    margin-right: 10px;
  }
}
.money-list {
  margin: 0 74px;
}
.money-alert {
  color: #304258;
  font-size: 14px;
  padding: 0 20px;
  height: 40px;
  display: flex;
  align-items: center;
}
.money-input,
/deep/ .money-input .el-input__inner {
  color: #304258;
  font-size: 14px;
  padding: 0 20px;
  border-radius: 10px;
  // background: #bdc1c7;
  border: none;
  width: 570px;
  height: 50px;
}
/deep/ .money-input .el-input__inner {
  background: #e5e5e5;
}
.money-text {
  margin: 10px 10px 0 20px;
  font-size: 14px;
  color: #6f839b;
  display: flex;
  align-items: center;
  height: 40px;
  span {
    background: #9c200d;
    color: #fff;
    border-radius: 80px;
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    margin-right: 15px;
  }
}
.money-btn-main {
  display: flex;
  width: 370px;
  // flex-direction: column;
  flex-wrap: wrap;
  margin: 20px 30px 0 30px;
}
.money-btn {
  background: #d9d9d9;
  border-radius: 10px;
  font-size: 14px;
  color: #304258;
  margin: 0 8px 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  min-width: 108px;
  height: 40px;
  cursor: pointer;
}
.deposit-btn {
  background: #656565;
  font-size: 14px;
  color: #fff;
  width: 300px;
  height: 38px;
  border-radius: 10px;
  margin: 36px 20px 0 165px;
  cursor: pointer;
}
.colors {
  background: linear-gradient(180deg, #c91d05, #6d2012) !important;
  color: #fff !important;
}
/deep/ .s-mains .el-dialog {
  // background:linear-gradient(45deg,#1A1C2B,#1A1C2B,#650000) ;
  background: url(../../assets/image/alert/bg.png);
  background-size: 100% 100%;
  padding: 0 70px;
  width: 625px;
  min-height: 455px;
  border-radius: 40px;
  color: #fff;
  font-size: 14px;
  box-shadow: 2px 2px 5px #333;
  .el-dialog__header {
    text-align: center;
  }
  .el-dialog__title {
    color: #fff;
    font-size: 16px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #c01c05;
    font-size: 36px;
  }
  .el-dialog__body {
    color: #fff;
    font-size: 14px;
  }
}

.s-content {
  color: #fff;
  font-size: 14px;
}
.s-body {
  margin: 40px 0 40px 0;
  display: flex;
  .qrCode {
    margin-right: 40px;
    height: 116px;
    width: 116px;
    overflow: hidden;
  }
}
.s-title {
  width: 120px;
  display: inline-block;
}
.texaks {
  line-height: 20px;
}
.records {
  border-radius: 20px;
  background: #ececec;
  box-shadow: 4px 15px 60px 0px rgba(0, 0, 0, 0.2);
  min-width: 266px;
  min-height: 874px;

  padding: 32px 0;
  margin-left: 15px;
  .record {
    height: 100%;

    padding: 0 16px;
    .record-title {
      color: #9c200d;
      font-size: 14px;
      font-weight: bold;
    }
    .link {
      color: #0098e5;
      font-size: 14px;
      border-bottom: 2px solid;
      // height:20px;
      padding: 2px 4px;
      text-decoration: none;
      cursor: pointer;
    }
  }
}
.record-body {
  height: 40px;
}
.record-text {
  color: #304258;
  font-size: 12px;
}
.record-p {
  color: #647182;
  font-size: 12px;
  width: 130px;
  word-break: break-all;
  text-align: left;
}
.record-red {
  color: #d30600;
}
.record-content {
  margin: 30px 0 0 0;
  text-align: center;
  .record-border {
    height: 2px;
    border-radius: 10px;
    background: #fff;
    width: 210px;
    margin: 10px auto 0 auto;
  }
}
.showTypes {
  background: #999;
}
.texaks1 {
  padding: 1px;
}
.money-red {
  font-weight: bold;
  margin: 30px 0 30px 0;
  font-size: 20px;
}
.money-red span {
  color: #be1c05;
  padding: 0 5px;
}
.money-red img {
  cursor: pointer;
}
.textx-content {
  display: flex;
  justify-content: space-between;
}
.textx {
  line-height: 20px;
  margin-bottom: 15px;
}
.text-color {
  color: #be1c05;
}
.copy-btn {
  color: #be1c05;
  background: #fff;
  border-radius: 5px;
  width: 52px;
  padding: 0 12px;
  height: 23px;
  cursor: pointer;
}
.alert-ale {
  line-height: 30px;
  font-size: 14px;
  text-align: center;
  margin: 0 auto;
}
</style>

import state from "../store/state";
import {
  gameBalancegetNewestBalance,
  getJsonXq,
  pcAfterDiscount,
  userInfogetAllVCWallet,
  userInfogetAllBankCard, //银行卡 bank
  userInfogetCustomerInfo,
  gameLoginpcLogin, // open-game
  gameBalanceallBack,
  gameBalancegetLockBalance,
} from "../api/galApi";
import store from "../store";

// 翻译
export function en(text, res) {
  //If you need to add other conversion methods, you can add methods
  let texts = text.split(".");
  let val = "";
  let vals = "";
  if (state.en[texts[0]]) {
    val = state.en[texts[0]][texts[1]];
  }

  //判断是否有转换值 - Judgment conversion value
  if (val) {
    if (res) {
      vals = val.replace(/{{value}}/g, res);
    } else {
      vals = val.replace(/\n/g, "<br>");
    }
    return vals;
  } else {
    return text;
  }
}

// 复制
export function copyFx(text) {
  if (text) {
    //浏览器禁用了非安全域的 navigator.clipboard 对象
    //在线上环境会报错 TypeError: Cannot read properties of undefined (reading 'writeText')
    codes("复制成功", 1);
    if (!navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      // 判断是否支持拷贝
      if (!document.execCommand("copy")) return Promise.reject();
      // 创建标签，并隐藏
      const textArea = document.createElement("textarea");
      textArea.style.position = "fixed";
      textArea.style.top = textArea.style.left = "-100vh";
      textArea.style.opacity = "0";
      textArea.value = text;
      document.body.appendChild(textArea);
      // 聚焦、复制
      textArea.focus();
      textArea.select();
      return new Promise((resolve, reject) => {
        // 不知为何，必须写这个三目，不然copy不上
        document.execCommand("copy") ? resolve() : reject();
        textArea.remove();
      });
    }
  }
}

//投注状态
export function allState(e, type) {
  if (state.status) {
    return state.status[type][e];
  }
}

//缓存点击 - wait -click
//use  if(!this.$wait() ){return}
export function waitFx() {
  if (state.wait == 0) {
    state.wait = 1;
    setTimeout(function () {
      state.wait = 0;
    }, 1000);
    return true;
  } else {
    this.$message("请勿频繁操作");
    return false;
  }
}

//money
export function moneyFx() {
  gameBalancegetNewestBalance(0).then((res) => {
    state.money = res.data?.newestBalance;
  });
}

//login check
export function logins(text) {
  if (state.userInfo.authToken) {
    return true;
  } else {
    if (text != "no") {
      codes("相关内容需登录后，方可浏览。");
      this.$router.push("/login");
    }
    return false;
  }
}

//客服 //注意只能在方法里调用 fx / about
export function about() {
  let data = "";
  if (state.userInfo != "") {
    data = state.userInfo.username;
  } else {
    data = "游客";
  }
  let url = state.jsonUrl + state.jsons.thirdPartyInfo;
  getJsonXq(url).then((res) => {
    window.open(
      res.data.datas.customerService.url + '?metadata={"name":"' + data + '"}',
      "_blank"
    );
  });
}

export function gamebalance(e) {
  state.nav = e;
  if (state.nav == 0) {
    state.money = 0;
  } else {
    if (state.nav == 1) {
      if (state.formData.amount == "") {
        this.$codes(state.en.alerts.no_money, 2);
        return false;
      }

      if (state.formData.amount > state.money) {
        this.$codes(state.en.alerts.insufficient_money, 2);
        return false;
      }
      state.money = state.formData.amount;
    }
  }
  pcAfterDiscount(state.unique, state.money).then((res) => {
    state.gameList = res.data.loginResultData;
    localStorage.setItem("gameList", JSON.stringify(state.gameList));
    if (res.data.loginResultType == 1) {
      this.$router.push({
        path: "/games",
        query: { code: state.unique },
      });
    } else if (res.data.loginResultType == 3) {
      state.card = true;
      state.formData.amount = "";
      state.total_balance = res.data.loginResultData;
      return;
    } else if (res.data.loginResultData) {
      // open - game - link
      localStorage.setItem("ifrUrl", res.data.loginResultData);
      if (this.$route.path == "/ifr") {
        this.$router.push("/ifrs"); //备用跳转 -spare
      } else {
        this.$router.push("/ifr");
      }
    } else {
      codes(state.codes[res.code], 2);
    }
  });
  state.card = false;
}

export function games(e) {
  if (!e) {
    this.$message.error("该场馆正在维护中，无法进入");
    return true;
  }
}

export function game(data) {
  let arr = [];
  let selectGame = JSON.parse(localStorage.getItem("game")).platforms
    .uniqueCodes;
  for (let key in data) {
    for (let val in selectGame) {
      if (key == val) {
        arr.push({
          key: key, // label 字段
          balance: data[key].balance,
          name: selectGame[key], // value字段
        });
      }
    }
  }
  return arr;
}
// add -game-error-list
export function gameError(data) {
  state.gameError = []; // init
  data.forEach((res) => {
    if (res.platformStatus != 0) {
      state.gameError.push(res.uniqueCode);
    }
  });
  localStorage.setItem("gameError", JSON.stringify(state.gameError));
}
export function goGame(v) {
  state.unique = v.uniqueCode;
  let that = this;
  if (logins()) {
    gameLoginpcLogin(v.uniqueCode).then((res) => {
      //gameError
      state.gameList = res.data.loginResultData;
      localStorage.setItem("gameList", JSON.stringify(state.gameList));

      if (res.data.allGamePlatform) {
        that.$gameError(res.data.allGamePlatform);
      }
      // alert
      if (res.data.loginResultType == 1) {
        that.$router.push({
          path: "/games",
          query: { code: v.uniqueCode },
        });
      } else if (res.data.loginResultType == 3) {
        state.card = true;
        state.formData.amount = "";
        state.total_balance = res.data.loginResultData;
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
        codes(state.codes[res.code], 2);
      }
    });
  }
}

export function clear() {
  state.userInfo = "";
  localStorage.setItem("memberInfo", "");
}

// time new-url
export function time(url) {
  return url + "?time=" + new Date().getTime();
}

var times = "";
export function codes(codes, num) {
  // 0 灰色提示-ALerts，1成功-SUCCESS，2失败-error , 99 - hide
  // let that = this;
  if (!codes) {
    state.alertVal = 2; // 0 1 2 33
    state.alertContent = "系统提示错误：error";
  } else if (!num) {
    state.alertVal = 0;
  } else {
    state.alertVal = num; // 0 1 2 33
  }
  state.alertContent = codes;

  clearTimeout(times);
  //
  times = setTimeout(function () {
    state.alertVal = 99; // 0 1 2 33
  }, 2500);
}

//虚拟币类型之类转换 //虚拟币类型加入数据 ，currencyType- type，name ,img
export function currencyType() {
  let data = "";
  //reject
  return new Promise((resolve) => {
    userInfogetAllVCWallet().then((res) => {
      data = res.data.allVCWallet;
      data.forEach((el) => {
        el.text = state.status.currencyType[el.currencyType];
        el.icon =
          state.iconUrl + state.static.virtualCurrencyIcon[el.vcProtocol];
      });
      state.currency = data;
      resolve(data);
    });
  });
}
export function bankApi() {
  return new Promise((resolve) => {
    let data = "";
    userInfogetAllBankCard().then((res) => {
      state.bank = res.data.allBankCard;
      resolve(data);
    });
  });
}

// data -api  用户资料
export function userData() {
  return new Promise((resolve) => {
    let that = this;
    userInfogetCustomerInfo().then((res) => {
      if (res.code == 9999) {
        setTimeout((res) => {
          that.$router.push("/login");
        }, 1000);
      } else {
        state.user = res.data.customerInfo;
        resolve(state.user);
      }
    });
  });
}

export function gettime(num) {
  if (num == 0) {
    return "无";
  } else {
    var time = new Date(num);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return (
      y +
      "-" +
      add0(m) +
      "-" +
      add0(d) +
      " " +
      add0(h) +
      ":" +
      add0(mm) +
      ":" +
      add0(s)
    );
  }
}
function add0(m) {
  return m < 10 ? "0" + m : m;
}

//一键回收， all-money return
export function allMoney() {
  if (!waitFx()) {
    return;
  }
  gameBalanceallBack().then(async (res) => {
    codes(state.codes[res.code], res.code == 0 ? 1 : 2);
    let that = this;
    let balanceStat = state.status.balanceStatus;
    //获取游戏列表， game-money-list
    state.gameMoney = await that.$store.dispatch("gameMoney");
    if (!state.gameMoney) {
      return;
    }
    state.money = state.gameMoney[0].balance;
    state.gameMoney.forEach((element) => {
      if (element.bstatus != 0) {
        element.balance = balanceStat[element.bstatus];
      }
    });
    //锁定钱包余额 - Lock balance
    LockFx();
  });
}
//获取游戏列表， game-money-list
export async function allGameMoney() {
  LockFx();
  let that = this;
  let balanceStat = state.status.balanceStatus;
  state.gameMoney = await that.$store.dispatch("gameMoney");
  if (!state.gameMoney) {
    return;
  }
  state.money = state.gameMoney[0].balance;
  // that.$money();
  state.gameMoney.forEach((element) => {
    if (element.bstatus != 0) {
      element.balance = balanceStat[element.bstatus];
    }
  });
}

//锁定钱包余额 - Lock balance
export function LockFx() {
  gameBalancegetLockBalance().then((res) => {
    state.lockBalance = res.data.lockBalance;
    // codes(state.codes[res.code],res.code == 0?1:2)
  });
}

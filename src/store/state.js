// import en from "../locales/en.json";
import en from "../locales/en-china.json";

let state = {
  en: en,
  // head-set
  requestHeader: {
    // "content-type": 'application/x-www-form-urlencoded',
    "accept-language": "zh-CN,zh;q=0.9,en-US;",
    "auth-token": localStorage.getItem("memberInfo")
      ? JSON.parse(localStorage.getItem("memberInfo")).authToken
      : "",
    // "auth-token": "10b25f21-e737-4023-9311-a6b7104bf62a"
  },
  // json-list
  jsons: localStorage.getItem("JsonList")
    ? JSON.parse(localStorage.getItem("JsonList"))
    : "",
  cn: 0, //语言 json[0]
  static: localStorage.getItem("staticResources")
    ? JSON.parse(localStorage.getItem("staticResources"))
    : "",
  status: localStorage.getItem("status")
    ? JSON.parse(localStorage.getItem("status"))
    : "",
  appIndex: localStorage.getItem("appIndex")
    ? JSON.parse(localStorage.getItem("appIndex"))
    : "",
  game: localStorage.getItem("game")
    ? JSON.parse(localStorage.getItem("game"))
    : "",
  //登陆用户信息
  userInfo: localStorage.getItem("memberInfo")
    ? JSON.parse(localStorage.getItem("memberInfo"))
    : "",
  // userInfo: { authToken:"10b25f21-e737-4023-9311-a6b7104bf62a"},
  //用户资料、身份证 id
  user: "",
  // user-save-password
  savePass: localStorage.getItem("savePass")
    ? JSON.parse(localStorage.getItem("savePass"))
    : "",
  baseURL: localStorage.getItem("apiUrl"),
  iconUrl: localStorage.getItem("iconUrl"), // temporary-api
  jsonUrl: localStorage.getItem("jsonUrl"), // temporary-api
  siteUrl: localStorage.getItem("siteUrl"), // temporary-api
  //跳转地址 open-link
  ifrUrl: localStorage.getItem("ifrUrl") ? localStorage.getItem("ifrUrl") : "",
  //正则-rule
  rule: JSON.parse(localStorage.getItem("rule")),
  bank: "", // 银行卡
  currency: "", //虚拟币列表
  act: [],
  navigation: false,
  navigationType: "全部",
  kaile: "全部",
  // 游戏维护状态  gameError -loading ,  当状态不等于零，则是维护中
  // When the state is not equal to zero, it is maintenance
  gameError: localStorage.getItem("gameError")
    ? JSON.parse(localStorage.getItem("gameError"))
    : [],
  nav: 0,
  card: false,
  total_balance: 0,
  formData: {
    amount: "",
  },
  unique: 0,
  durationInMilliseconds: 0,
  dz: "", //电子游戏码-num
  Nlist: {},
  Blist: {},
  IconUrl: "",
  NavTitle: "",
  // save - version
  ver: localStorage.getItem("ver")
    ? JSON.parse(localStorage.getItem("ver"))
    : {
        appIndex: "",
      },
  codes: "", //responseCode
  natives: "", //nativesCode
  money: 0, //Total balance/Current balance
  lockBalance: 0, // 锁定余额
  wait: 0, //wait api 1 time // 设置反点击
  alertVal: -1,
  alertContent: "",
  //导航图标-点亮标志 , 默认 - 显示个人资料, init-data-icon
  //用户中心需要显示的组件 -  show user component page
  navIcon: localStorage.getItem("navIcon")
    ? localStorage.getItem("navIcon")
    : "purse",
  userShowPage: "purse",
  showLoginComponents: false,
  userCenterComponentTitle: 0,
  //游戏列表
  gameMoney: [],
  gameMoneyLoading: true,
  newBankCardPopup: false,
  newVirtualWalletPopup: false,
  selectedTransactionRecord: 0,
  gameList: JSON.parse(localStorage.getItem("gameList")),
  // defaultAPI: "xunli08", //formal
  // protocol: "https:",
  defaultAPI: 'xl0735',//test
  protocol:'http:'
};

export default state;

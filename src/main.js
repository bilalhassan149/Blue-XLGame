import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
//初始化路由 启动
import VueRouter from "vue-router";
Vue.use(VueRouter);
//导入router-路径
import router from "./router";
//element-ui组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// import axios from "axios";
// Vue.use(axios)

import store from "./store";

Vue.prototype.$urls = [
  `${
          document.domain === "localhost"
            ? state.protocol
            : window.location.protocol
        }//json.${
          document.domain === "localhost"
            ? state.defaultAPI
            : document.domain.split(".")[1]
        }.com`,
];

//fx
import {
  en,
  allState,
  moneyFx,
  waitFx,
  logins,
  about,
  gamebalance,
  games,
  game,
  goGame,
  clear,
  currencyType,
  time,
  codes,
  bankApi,
  userData,
  gameError,
  gettime,
  allMoney,
  allGameMoney,
  copyFx,
} from "./assets/allFx";

// 翻译-translate
Vue.prototype.$en = en;

//状态类型转换 - type
Vue.prototype.$allState = allState;

//缓存点击 - wait -click
Vue.prototype.$wait = waitFx;

//刷新余额 - alance - money
Vue.prototype.$money = moneyFx;

//login check
Vue.prototype.$logins = logins;

//客服 //注意只能在方法里调用 fx / about
Vue.prototype.$about = about;

//gamebalance
Vue.prototype.$gamebalance = gamebalance;
//games
Vue.prototype.$games = games;
//game
Vue.prototype.$game = game;
//game-error
Vue.prototype.$gameError = gameError;
//open-game
Vue.prototype.$goGame = goGame;
// allMoney-game-return  - 一键回收
Vue.prototype.$allMoney = allMoney;
// api allMoney-game
Vue.prototype.$allGameMoney = allGameMoney;
// copy-复制
Vue.prototype.$copyFx = copyFx;

//clear
Vue.prototype.$clear = clear;
//time new-url
Vue.prototype.$time = time;
//codes
Vue.prototype.$codes = codes;
//time type
Vue.prototype.$gettime = gettime;

//虚拟币类型加入数据 ，currencyType- type，name
Vue.prototype.$currencyType = currencyType;
//银行卡 bank-list
Vue.prototype.$bankApi = bankApi;
// data -api  用户资料
Vue.prototype.$userData = userData;

//引入全局组件
// 引入二维码
import vueQr from "vue-qr";
import state from "./store/state";
Vue.component("vueQr", vueQr);

//设置路由标题配置
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");

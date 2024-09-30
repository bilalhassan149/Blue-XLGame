import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  //设置默认路径,引入home页显示
  {
    path: "/",
    redirect: "home",
    meta: {
      title: "汛利娱乐-home",
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home"),
    meta: {
      title:
        "汛利娱乐-汛利体育、真人、电竞、电子、棋牌 - xunli Entertainment index",
    },
  },
  {
    path: "/login",
    name: "登录页",
    component: () => import("../views/login"),
    meta: {
      title: "汛利娱乐-登录-login",
    },
  },
  {
    path: "/user",
    name: "用户中心-user",
    component: () => import("../views/user"),
    meta: {
      title: "用户中心-user",
    },
  },
  {
    path: "/ifr",
    name: "嵌入页（游戏类）-ifr-game",
    component: () => import("../views/ifr"),
    meta: {
      title: "汛利娱乐-汛利体育、真人、电竞、电子、棋牌、sports、e-game",
    },
  },
  {
    path: "/ifrs",
    name: "嵌入页（游戏类）-ifr-game - 备用跳转 - spare",
    component: () => import("../views/ifrs"),
    meta: {
      title: "汛利娱乐-汛利体育、真人、电竞、电子、棋牌、sports、e-game",
    },
  },
  {
    path: "/sports",
    name: "汛利体育-sports",
    component: () => import("../views/game/sports"),
    meta: {
      title: "汛利体育-sports",
    },
  },
  {
    path: "/e-game",
    name: "电竞-e-game",
    component: () => import("../views/game/e-game"),
    meta: {
      title: "电竞-e-game",
    },
  },
  {
    path: "/person",
    name: "真人-person",
    component: () => import("../views/game/person"),
    meta: {
      title: "真人-person",
    },
  },
  {
    path: "/chess",
    name: "棋牌-chess",
    component: () => import("../views/game/chess"),
    meta: {
      title: "棋牌-chess",
    },
  },
  {
    path: "/person",
    name: "真人-person",
    component: () => import("../views/game/person"),
    meta: {
      title: "真人-person",
    },
  },
  {
    path: "/games",
    name: "电子-games",
    component: () => import("../views/game/games"),
    meta: {
      title: "电子-games",
    },
  },
  {
    path: "/lottery",
    name: "彩票-lottery",
    component: () => import("../views/game/lottery"),
    meta: {
      title: "彩票-lottery",
    },
  },
  {
    path: "/vips",
    name: "vip",
    component: () => import("../views/vip"),
    meta: {
      title: "vip",
    },
  },
  {
    path: "/discount",
    name: "优惠-discount",
    component: () => import("../views/discount"),
    mata: {
      title: "优惠-discount",
    },
  },
  {
    path: "/register",
    name: "注册-register",
    component: () => import("../views/register"),
    meta: {
      title: "注册-register",
    },
  },
  {
    path: "/forgot-password",
    name: "找回密码-recover password",
    component: () => import("../views/forgotPassword"),
    meta: {
      title: "找回密码-recover password",
    },
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test"),
    meta: {
      title: "测试",
    },
  },
  {
    path: "/betting-responsibility",
    name: "Betting Responsibility",
    component: () => import("../views/info/bettingResponsibility"),
    meta: {
      title:
        "汛利娱乐-汛利体育、真人、电竞、电子、棋牌 - xunli Entertainment index",
    },
  },
  {
    path: "/terms-and-conditions",
    name: "Terms and Conditions",
    component: () => import("../views/info/termsAndConditions"),
    meta: {
      title:
        "汛利娱乐-汛利体育、真人、电竞、电子、棋牌 - xunli Entertainment index",
    },
  },
  {
    path: "/contact-us",
    name: "/contact-us",
    component: () => import("../views/info/contactUs"),
    meta: {
      title:
        "汛利娱乐-汛利体育、真人、电竞、电子、棋牌 - xunli Entertainment index",
    },
  },
  {
    path: "/privacy-protection",
    name: "privacy and protection",
    component: () => import("../views/info/privacyProtection"),
    meta: {
      title:
        "汛利娱乐-汛利体育、真人、电竞、电子、棋牌 - xunli Entertainment index",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

<template>
  <div
    id="app"
    class="app"
    v-loading="appLoading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <alerts></alerts>
    <headers v-show="statusLo"></headers>
    <router-view style="min-height: 600px"></router-view>
    <bottom v-show="statusLo && bottomNav" />
    <div class="about" @click="$about" v-show="statusLo && bottomNav">
      <img src="../src/assets/image/customerServiceIcon.png" />
    </div>
  </div>
</template>

<script>
import { getJsonXq, recordApiError, userLoginloginLog } from "./api/galApi";

import state from "./store/state";
import headers from "./components/header";
import bottom from "./components/bottom";
import alerts from "./components/alert.vue";

export default {
  name: "App",
  components: { bottom, headers, alerts },
  data() {
    return {
      statusLo: true,
      bottomNav: false,
      appLoading: true,
      loadingText: "加载中..",
    };
  },
  watch: {
    $route: {
      handler(val, oldval) {
        if (
          val.path == "/login" ||
          val.path == "/register" ||
          val.path == "/forgot-password" ||
          val.path == "/change-password"
        ) {
          this.statusLo = false;
        } else {
          this.statusLo = true;
        }
        if (val.path == "/ifr") {
          this.bottomNav = false;
        } else {
          this.bottomNav = true;
        }
        this.$store.state.NavTitle = oldval.meta.title;
      },
      deep: true,
    },
  },
  mounted() {
    const fourHours = 4 * 60 * 60 * 1000;
    if (Date.now() - localStorage.getItem("loginInterval") >= fourHours) {
      setInterval(() => {
        this.userLoginloginLogFunc();
      }, fourHours);
    }
  },
  beforeMount() {
    let that = this;
    let apiTrue = false;
    let json = "/V2/xlMain.json";
    that.$urls.forEach((api) => {
      let main = api + json;
      getJsonXq(main)
        .then((res) => {
          if (res.status == 200) {
            if (!apiTrue) {
              apiTrue = true;
              state.jsonUrl = api;
              this.jsonFx(res);
              localStorage.setItem("jsonUrl", state.jsonUrl);
            }
          }
        })
        .catch(() => {
          this.sbSj(main, 404);
        });
    });
  },
  methods: {
    userLoginloginLogFunc() {
      userLoginloginLog(state.userInfo.username).then((res) => {
        if (res.code === 0) {
          localStorage.setItem("loginInterval", Date.now());
        }
      });
    },
    //请求main.json
    async jsonFx(res) {
      //getJson().then((res) => {
      let that = this;
      setTimeout(function () {
        that.appLoading = false;
      }, 400);

      let cn = (state.jsons = res.data[state.cn]); //json[0]
      let url = state.jsonUrl;
      //save
      localStorage.setItem("JsonList", JSON.stringify(cn));
      //------ping-------api-----------
      that.getApiUrl(cn.apiUrl, cn.apiTestMethod);
      await that.pingApi(cn.iconUrl, cn.iconTestMethod, 1);
      that.pingApi(cn.siteUrl, cn.siteTestMethod, 2);
      // that.pingApi(cn.pcUrl, '/img/logo.png', 3);
      //获取banner ，rule-正则，类型
      that.getbanner(cn.staticResourcesVersionNo, url + cn.staticResources);
      //获取游戏列表 ,  index-game-list
      this.getgame(cn.appIndexVersionNo, url + cn.appIndex);
      //各状态 - all - status
      that.statusFx(cn.stateAndTypeVersionNo, url + cn.stateAndType);
      //获取游戏菜单-games-list , 最后加载  last-api
      that.gamesFx(cn.platformsAndGamesVersionNo, url + cn.platformsAndGames);
      //response Code
      that.codeFx(cn.responseCodeVersionNo, url + cn.responseCode);
      //Native Code
      that.nativeFx(cn.nativeCodeVersionNo, url + cn.nativeCode);

      //});
    },
    //获取banner ，rule-正则，类型
    async getbanner(ver, url) {
      let old = state.static;
      if (!old || old.ver !== ver) {
        await getJsonXq(url).then((res) => {
          state.static = res.data.datas;
          state.static.ver = ver;
          //save
          localStorage.setItem("staticResources", JSON.stringify(state.static));
        });
      }
      // 判断跳转手机端-if PC open - phone
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      if (flag != null) {
        this.$codes(state.en.alerts.mobile_device);
        setTimeout(function () {
          window.location.href = state.static.downloadInfo[2].indexUrl;
        }, 500);
      }
      //save - rule
      this.$store.commit("ruleFx", state.static.regularExpression);
    },
    //game - appindex
    async getgame(ver, url) {
      let old = state.appIndex;
      if (!old || state.ver.appIndex != ver) {
        await getJsonXq(url).then((res) => {
          state.appIndex = res.data.datas;
          state.ver.appIndex = ver;
          //save
          localStorage.setItem("appIndex", JSON.stringify(state.appIndex));
          localStorage.setItem("ver", JSON.stringify(state.ver));
        });
      }

      /////////////////////////////NavBar////////////////////////////////////////////
      state.appIndex.forEach((el) => {
        this.ary = [];
        el.platforms.forEach((ell) => {
          this.ary.push(ell.pcStatic.navitation);
        });
        state.Nlist[el.gameTypeName] = this.ary;
      });
      /////////////////////////////End NavBar////////////////////////////////////////
    },
    //获取游戏菜单-games-list
    gamesFx(ver, url) {
      let old = state.game;
      if (!old || old.ver != ver) {
        getJsonXq(url).then((res) => {
          //登录之后需要存储起来-save
          state.game = res.data.datas;
          state.game.ver = ver;
          localStorage.setItem("game", JSON.stringify(state.game));
        });
      }
    },
    ////各状态 - all - status
    statusFx(ver, url) {
      let old = state.status;
      if (!old || old.ver !== ver) {
        getJsonXq(url).then((res) => {
          //登录之后需要存储起来-save
          state.status = res.data.datas;
          state.status.ver = ver;
          localStorage.setItem("status", JSON.stringify(state.status));
        });
      }
    },
    //ping ip
    getApiUrl() {
      const apiUrl = [
        `${
          document.domain === "localhost"
            ? state.protocol
            : window.location.protocol
        }//api.${
          document.domain === "localhost"
            ? state.defaultAPI
            : document.domain.split(".")[1]
        }.com`,
      ];
      state.baseURL = apiUrl;
      localStorage.setItem("apiUrl", apiUrl);
    },
    // icon-get-api
    pingApi() {
      const iconUrl = [
        `${
          document.domain === "localhost"
            ? state.protocol + "//img." + state.defaultAPI + ".com"
            : window.location.protocol +
              "//static." +
              document.domain.split(".")[1] +
              ".com"
        }`,
      ];
      state.iconUrl = iconUrl;
      localStorage.setItem("iconUrl", iconUrl);

      const siteUrl = [
        `${
          document.domain === "localhost"
            ? state.protocol
            : window.location.protocol
        }//site.${
          document.domain === "localhost"
            ? state.defaultAPI
            : document.domain.split(".")[1]
        }.com`,
      ];
      state.siteUrl = siteUrl;
      localStorage.setItem("siteUrl", siteUrl);
    },
    sbSj(code, urls) {
      recordApiError("NewPC", 0, urls, code);
    },
    codeFx(ver, url) {
      let old = state.codes;
      if (!old || state.ver.codes != ver) {
        getJsonXq(url).then((res) => {
          state.codes = res.data;
          state.ver.codes = ver;
          localStorage.setItem("codes", JSON.stringify(state.codes));
          localStorage.setItem("ver", JSON.stringify(state.ver));
        });
      }
    },
    nativeFx(ver, url) {
      let old = state.natives;
      if (!old || state.ver.natives != ver) {
        getJsonXq(url).then((res) => {
          state.natives = res.data;
          state.ver.natives = ver;
          localStorage.setItem("natives", JSON.stringify(state.natives));
          localStorage.setItem("ver", JSON.stringify(state.ver));
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "./assets/style.scss";

.about {
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 101;
  cursor: pointer;
  margin-right: 10px;
  img {
    height: 78px;
    margin: -40px 0 10px -5px;
  }
}
</style>

<template>
  <div>
    <div class="discount_content">
      <div class="content_container">
        <img
          src="../../src/assets/games/discount.png"
          alt=""
          style="width: 1840px; height: 558px"
        />
        <div
          class="discount_game"
          v-for="(item, index) in actList.activities"
          :key="index"
        >
          <div class="time">
            <img class="time-img" :src="$store.state.iconUrl + item.icon_pc" />
            {{ item.timeRange }}
          </div>
          <img
            class="img"
            @click="ckClcik(item)"
            :src="$store.state.iconUrl + item.banner_pc"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getJsonXq } from "@/api/galApi";
import store from "@/store";
import state from "@/store/state";

export default {
  name: "discountPage",
  data() {
    return {
      actList: [],
    };
  },
  mounted() {
    this.initFx();
  },
  methods: {
    initFx() {
      if (state.appIndex) {
        let list = [];
        state.appIndex.forEach((element) => {
          if (element.gameTypeName == "电子") {
            list = element;
          }
        });
        this.list = list;
        this.getYH(state.jsonUrl + state.jsons.activities);
      }
    },
    ckClcik(item) {
      if (!this.$logins()) {
        return;
      }
      if (item.jumpType == "native") {
        let url = item.html_pc;
        this.$router.push(url);
        window.scrollTo(0, 0);
      } else if (item.jumpType == "url") {
        let url = state.siteUrl + item.html_pc;
        localStorage.setItem("ifrUrl", url);
        this.$router.push("/ifr");
      }
    },

    getYH(jsonurl) {
      getJsonXq(jsonurl).then((res) => {
        this.actList = res.data.datas;
        store.commit("act", res.data.datas.activities);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.discount_content {
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  .content_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    .discount_game {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #fff;
      font-size: 24px;
      position: relative;
      cursor: pointer;
      .img {
        border-radius: 40px;
        height: 300px;
        width: 1224px;
        margin: 12px 0;
      }
      .title {
        font-weight: bold;
      }
      .time {
        position: absolute;
        top: 30px;
        left: 64px;
        color: #58a1ff;
        font-size: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border: 2px solid white;
        padding: 8px;
        border-radius: 34px;
      }
      .time-img {
        height: 34px;
      }
      .time1 {
        position: absolute;
        top: 75px;
        left: 146px;
      }
      .time2 {
        position: absolute;
        top: 80px;
        left: 168px;
      }
      .time2 {
        position: absolute;
        top: 80px;
        left: 168px;
      }
      .time3 {
        display: none;
      }
      .time4 {
        position: absolute;
        top: 62px;
        left: 160px;
      }
      button {
        width: 163px;
        height: 48px;
        flex-shrink: 0;
        border-radius: 72px;
        background: linear-gradient(89deg, #9113bc 15.75%, #5ffbff 113.41%);
        color: white;
        border: none;
        font-size: 14px;
        margin: 10px 0;
        cursor: pointer;
      }
    }
  }
}
</style>

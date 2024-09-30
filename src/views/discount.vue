<template>
  <div>
    <div class="discount view_width">
      <div class="banner_content">
        <div style="font-size: 32px; line-height: 32px; letter-spacing: 22px">
          {{ $en("discount.xunli_offering") }}
        </div>
        <div style="font-size: 96px; line-height: 96px">
          {{ $en("discount.xunli_discount1") }} <br />
          {{ $en("discount.xunli_discount2") }}!
        </div>
      </div>
    </div>
    <div class="discount_content">
      <div class="content_container">
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
.discount {
  background-image: url("../assets/games/discount.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: 904px;

  .banner_content {
    display: flex;
    flex-direction: column;
    color: #152334;
    font-weight: bold;
    line-height: 1;
    gap: 8px;
    padding-left: 300px;
    padding-top: 300px;
  }
}
.discount_content {
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  .content_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 94px;
    padding: 120px;
    .discount_game {
     
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #fff;
      gap: 6px;
      font-size: 24px;
      position: relative;
      cursor: pointer;
      .img {
        border-radius: 11px;
        background: linear-gradient(83deg, #331356 -7.41%, #781000 140.21%);
        box-shadow: 4px 4px 12px 0px rgba(181, 0, 30, 0.4);
        height: 280px;
        width: 1180px;
      }
      .title {
        font-weight: bold;
      }
      .time {
        position: absolute;
        top: 63px;
        left: 74px;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        height: 50px;
        display: flex;
        align-items: center;
      }
      .time-img {
        background: none !important;
        margin: 0 10px 0 0;
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

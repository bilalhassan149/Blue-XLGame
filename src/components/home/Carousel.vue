<template>
  <div class="carousel">
    <el-carousel :interval="5000" arrow="always" height="720px">
      <el-carousel-item
        v-for="(item, index) in $store.state.static.bannerResources"
        :key="index"
      >
        <div style="padding: 0 40px">
          <img
            :src="$store.state.iconUrl + item.banner_pc"
            @click="jump(item)"
          />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { gameLoginpcLogin } from "@/api/galApi";
import state from "@/store/state";

export default {
  name: "PCXLGameCarousel",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    jump(item) {
      if (!this.$logins()) {
        return;
      }
      if (item.redirectHtml) {
        state.ifrUrl = state.siteUrl + item.redirectHtml;
        localStorage.setItem("ifrUrl", state.siteUrl + item.redirectHtml);
        this.$router.push("/ifr");
      }
      if (item.redirectPlatform) {
        gameLoginpcLogin(item.redirectPlatform).then((res) => {
          if (res.code == 0) {
            state.ifrUrl = res.data.loginResultData;
            localStorage.setItem("ifrUrl", state.ifrUrl);
            this.$router.push("/ifr");
          } else {
            this.$codes(state.codes[res.code], 2);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 720px;
  cursor: pointer;
  object-fit: fill;
}
</style>

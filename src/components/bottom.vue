<template>
  <div class="bottmSw">
    <div class="f-c f bottom-main">
      <div class="xbtTitle" style="margin-top: 30px">
        {{ $en("footer.xunli_about1") }}
      </div>
      <div class="xbtTitle">
        {{ $en("footer.xunli_about2") }}
      </div>
      <div class="texsls f-a sb" style="margin-top: 30px">
        <div class="imgsa" v-for="(item, index) in Imglist" :key="index">
          <div
            class="imgsa"
            :style="{
              background: `url(${item}) no-repeat center center / 100% 100%`,
            }"
          ></div>
        </div>
      </div>
      <div class="texsl f-c ct">
        <div
          class="tesUrl"
          v-for="(item, index) in list"
          :key="index"
          @click="TieClick(item.url)"
        >
          {{ item.title }}
        </div>
      </div>

      <div class="xbtTitle" style="margin-bottom: 30px">
        {{ $en("footer.xunli_copyrights") }}
      </div>
    </div>
  </div>
</template>

<script>
import state from "@/store/state";

export default {
  name: "bottmSw",
  data() {
    return {
      list: [
        {
          title: state.en.footer.footer_link1,
          url: "/betting-responsibility",
        },
        {
          title: state.en.footer.footer_link2,
          url: "/privacy-protection",
        },
        {
          title: state.en.footer.footer_link3,
          url: "/terms-and-conditions",
        },
        {
          title: state.en.footer.footer_link4,
          url: "/contact-us",
        },
      ],
      Imglist: [
        require("../../public/img/footer/fsc.png"),
        require("../../public/img//footer/mga.png"),
        require("../../public/img/footer/pagcor.png"),
      ],
    };
  },
  methods: {
    TieClick(e) {
      this.$router.push(e);
    },
  },
};
</script>
<style scoped lang="scss">
.bottom-main {
  width: 1200px;
  margin: 0 auto;
}

.bottmSw {
  min-height: 300px;
  background: #34354f;
  color: #a5aabc;
  line-height: 100px;
}
.texsl {
  width: 1200px;
  height: 70px;
}
.texsls {
  width: 1000px;
  height: 70px;
}
.imgsa {
  width: 187px;
  height: 60px;
}
.tesUrl {
  // width: 100px;
  padding: 0 50px;
  height: 30px;
  line-height: 30px;
  color: #c7cddd;
  text-align: center;
  font-size: 14px;
  color: #6c7ba8;
  cursor: pointer;
}
.xbtTitle {
  width: 1200px;
  height: 17px;
  margin: 3px auto;
  line-height: 17px;
  font-size: 14px;
  color: #6c7ba8;
  text-align: center;
}
</style>

<template>
  <div class="trophies">
    <div v-for="(trophy, index) in trophies" :key="index">
      <div class="trophy">
        <img :src="trophy.icon" height="150" width="128" />
        <div class="count">{{ trophy.count }}</div>
        <div class="text">
          {{ trophy.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import state from "@/store/state";

export default {
  name: "PCXLGameTrophies",

  data() {
    return {
      trophies: [
        {
          icon: require("../../assets/image/home/trophies/trophy1.png"),
          count: 38,
          text: state.en.home.trophy1,
        },
        {
          icon: require("../../assets/image/home/trophies/trophy2.png"),
          count: 14,
          text: state.en.home.trophy2,
        },
        {
          icon: require("../../assets/image/home/trophies/trophy3.png"),
          count: 9,
          text: state.en.home.trophy3,
        },
        {
          icon: require("../../assets/image/home/trophies/trophy4.png"),
          count: 2,
          text: state.en.home.trophy4,
        },
        {
          icon: require("../../assets/image/home/trophies/trophy5.png"),
          count: 3,
          text: state.en.home.trophy5,
        },
        {
          icon: require("../../assets/image/home/trophies/trophy6.png"),
          count: 2,
          text: state.en.home.trophy6,
        },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.trophies {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-top: -16px;
  .trophy {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    .count {
      color: #b33b1d;
      font-size: 40px;
      font-weight: bold;
      line-height: 40px;
    }
    .text {
      font-size: 14px;
      color: #292c3b;
      text-align: center;
    }
  }
}
</style>
